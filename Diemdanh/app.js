// Attendance Form Logic with GPS Verification - Multi Tenant SaaS
// URL Format: index.html?c={conferenceId}&u={username}

const form = document.getElementById('attendanceForm');
const submitBtn = document.getElementById('submitBtn');
const statusBox = document.getElementById('statusBox');
const statusText = document.getElementById('statusText');

let conferenceId = null;
let ownerUsername = null;
let conferenceConfig = null;

// Get Params from URL
function getUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    // Support both old format (?conference=...) and new format (?c=...&u=...)
    const c = urlParams.get('c') || urlParams.get('conference');
    const u = urlParams.get('u'); 
    return { c, u };
}

// Load conference configuration
function loadConferenceConfig() {
    const params = getUrlParams();
    conferenceId = params.c;
    ownerUsername = params.u;
    
    // Validate params
    if (!conferenceId) {
        showStatus('❌ Lỗi: Link không hợp lệ (Thiếu mã ID hội nghị).', 'error');
        submitBtn.disabled = true;
        return;
    }

    // Owner username check removed for internal system

    if (!window.firebase || !window.firebase.apps || !window.firebase.apps.length) {
        console.error('Firebase not initialized');
        return;
    }

    // Path: Diemdanh/Conferences/{id}
    const configRef = firebase.database().ref(`Diemdanh/Conferences/${conferenceId}`);
    
    configRef.on('value', (snapshot) => {
        conferenceConfig = snapshot.val();
        if (!conferenceConfig) {
            showStatus('❌ Hội nghị không tồn tại hoặc đã bị xóa!', 'error');
            submitBtn.disabled = true;
        } else {
            console.log('Conference config loaded:', conferenceConfig);
            // Update page title with conference name
            if (conferenceConfig.name) {
                document.querySelector('h1').textContent = `📋 ${conferenceConfig.name}`;
            }
            // Update start time display
            if (conferenceConfig.startTime) {
                const startDate = new Date(conferenceConfig.startTime);
                const timeStr = startDate.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
                const dateStr = startDate.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
                document.getElementById('timeDisplay').textContent = `⏰ Bắt đầu: ${timeStr} - ${dateStr}`;
            } else {
                document.getElementById('timeDisplay').textContent = '';
            }
        }
    });
}

// Show status message
function showStatus(message, type) {
    statusBox.style.display = 'block';
    statusText.textContent = message;
    statusBox.className = 'status-box status-' + type;
}

// Hide status message
function hideStatus() {
    statusBox.style.display = 'none';
}

// Calculate distance between two GPS coordinates (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
}

// Get current GPS position
function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Trình duyệt không hỗ trợ định vị GPS'));
            return;
        }

        showStatus('Đang xác định vị trí...', 'waiting');

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy
                });
            },
            (error) => {
                let errorMessage = 'Không thể xác định vị trí';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Bạn đã từ chối quyền truy cập vị trí';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Thông tin vị trí không khả dụng';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Hết thời gian chờ xác định vị trí';
                        break;
                }
                reject(new Error(errorMessage));
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    });
}

// Validate conference code and time
function validateAttendance(conferenceCode) {
    if (!conferenceConfig) {
        throw new Error('Chưa tải được cấu hình hội nghị. Vui lòng thử lại.');
    }

    // Check conference code - DISABLED
    /*
    if (conferenceConfig.code !== conferenceCode) {
        throw new Error('Mã hội nghị không đúng!');
    }
    */

    // Check if attendance is open
    if (!conferenceConfig.isOpen) {
        throw new Error('Hội nghị chưa mở điểm danh!');
    }

    // Check time window
    const now = Date.now();
    if (conferenceConfig.startTime && now < conferenceConfig.startTime) {
        throw new Error('Chưa đến thời gian điểm danh!');
    }
    if (conferenceConfig.endTime && now > conferenceConfig.endTime) {
        throw new Error('Đã hết thời gian điểm danh!');
    }

    return true;
}

// Validate GPS location
function validateLocation(userLat, userLon) {
    if (!conferenceConfig || !conferenceConfig.latitude || !conferenceConfig.longitude) {
        throw new Error('Chưa cấu hình vị trí hội nghị!');
    }

    const distance = calculateDistance(
        userLat,
        userLon,
        conferenceConfig.latitude,
        conferenceConfig.longitude
    );

    const allowedRadius = conferenceConfig.radius || 100; // Default 100m

    if (distance > allowedRadius) {
        throw new Error(
            `Bạn đang ở ngoài khu vực hội nghị!\n` +
            `Khoảng cách: ${Math.round(distance)}m (cho phép: ${allowedRadius}m)`
        );
    }

    return { distance, allowedRadius };
}

// Get Public IP Address
async function getIpAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data.ip || null;
    } catch (error) {
        console.warn('Cannot get IP:', error);
        return null;
    }
}


// Check if IP already exists in this conference
async function checkIpDuplicate(ip) {
    if (!ip) return false; // Skip check if IP not found
    
    // Query records by IP (Client-side filtering for simplicity on small datasets)
    // For large scale, we should index 'ip' in Firebase rules
    const recordsRef = firebase.database().ref(`Diemdanh/Records/${conferenceId}`);
    const snapshot = await recordsRef.orderByChild('ip').equalTo(ip).once('value');
    
    return snapshot.exists();
}

// Save attendance record
async function saveAttendance(data) {
    if (!window.firebase || !window.firebase.apps || !window.firebase.apps.length) {
        throw new Error('Firebase chưa được khởi tạo');
    }

    // Save to Diemdanh path: Diemdanh/Records/{conferenceId}
    const attendanceRef = firebase.database().ref(`Diemdanh/Records/${conferenceId}`);
    const newRecordRef = attendanceRef.push();
    
    await newRecordRef.set({
        ...data,
        conferenceId: conferenceId,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        id: newRecordRef.key
    });

    return newRecordRef.key;
}

// Handle form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.classList.add('is-loading');

    try {
        // Get form data
        const formData = {
            fullName: document.getElementById('fullName').value.trim(),
            organization: document.getElementById('organization').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            notes: document.getElementById('notes').value.trim()
        };

        // Validate conference time
        validateAttendance(null);

        // 1. GET IP
        showStatus('Đang kiểm tra thông tin...', 'waiting');
        const ip = await getIpAddress();

        // 2. CHECK DUPLICATE IP
        if (ip) {
            const isDuplicate = await checkIpDuplicate(ip);
            if (isDuplicate) {
                throw new Error('⚠️ Bạn đã điểm danh!\n\nNếu bạn đang dùng chung WiFi, vui lòng TẮT WiFi và bật 4G để điểm danh tiếp.');
            }
        }

        // 3. Get GPS position
        showStatus('Đang xác định vị trí của bạn...', 'waiting');
        const position = await getCurrentPosition();

        // Validate location
        const locationInfo = validateLocation(position.latitude, position.longitude);

        // Prepare attendance data
        const attendanceData = {
            ...formData,
            latitude: position.latitude,
            longitude: position.longitude,
            accuracy: position.accuracy,
            distance: Math.round(locationInfo.distance),
            conferenceName: conferenceConfig.name || 'Hội nghị',
            status: 'present',
            ip: ip || 'N/A' // Save IP address (Prevent undefined)
        };

        // Save to Firebase
        showStatus('Đang lưu thông tin...', 'waiting');
        await saveAttendance(attendanceData);

        // Success
        showStatus(
            `✓ Điểm danh thành công!\n` +
            `Khoảng cách: ${Math.round(locationInfo.distance)}m`,
            'success'
        );

        // Reset form after 3 seconds
        setTimeout(() => {
            form.reset();
            hideStatus();
            submitBtn.disabled = false;
            submitBtn.classList.remove('is-loading');
        }, 3000);

    } catch (error) {
        console.error('Attendance error:', error);
        showStatus('✗ ' + error.message, 'error');
        submitBtn.disabled = false;
        submitBtn.classList.remove('is-loading');
    }
});

// Initialize
loadConferenceConfig();
