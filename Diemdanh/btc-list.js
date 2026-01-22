// Conference List Management - Multi Tenant

let allConferences = [];
let editingConferenceId = null;
const currentUsername = sessionStorage.getItem('btc_username');

// Check login again to be safe
if (!currentUsername) {
    window.location.href = 'login.html';
}

// DOM Elements
const conferenceList = document.getElementById('conferenceList');
const conferenceModal = document.getElementById('conferenceModal');
const conferenceForm = document.getElementById('conferenceForm');
const btnCreateConference = document.getElementById('btnCreateConference');
const btnSaveConference = document.getElementById('btnSaveConference');
const btnCancelModal = document.getElementById('btnCancelModal');
const closeModal = document.getElementById('closeModal');
const getCurrentLocationBtn = document.getElementById('getCurrentLocation');
const modalTitle = document.getElementById('modalTitle');

// Check account status real-time
function checkAccountStatus() {
    firebase.database().ref(`Diemdanh/Users/${currentUsername}`).once('value', (snapshot) => {
        if (!snapshot.exists()) {
            alert('Tài khoản của bạn đã bị xóa hoặc ngừng kích hoạt!');
            sessionStorage.clear();
            window.location.href = 'login.html';
        } else {
            // Also check expiry date if needed
            const userData = snapshot.val();
            const now = new Date();
            const expiryDate = new Date(userData.expiryDate);
            if (now > expiryDate) {
                alert('Gói dịch vụ của bạn đã hết hạn! Vui lòng gia hạn.');
                sessionStorage.clear();
                window.location.href = 'login.html';
            }
        }
    });
}

// Load all conferences for THIS user
function loadConferences() {
    checkAccountStatus(); // Verify account first

    // Simplified: Load all conferences (or filter by owner if strictly needed, but internal system implies trusted access)
    // For now, let's load ALL conferences from Diemdanh/Conferences
    // If you want to filter by owner, we can do it client side or query
    const conferencesRef = firebase.database().ref(`Diemdanh/Conferences`);
    conferencesRef.on('value', (snapshot) => {
        allConferences = [];
        const data = snapshot.val();
        
        if (data) {
            Object.keys(data).forEach(key => {
                const conf = { ...data[key], id: key };
                // Filter by owner client-side to keep list clean
                if (conf.owner === currentUsername) {
                    allConferences.push(conf);
                }
            });
        }

        // Sort by created date (newest first)
        allConferences.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        
        renderConferenceList();
    });
}

// Render conference list
function renderConferenceList() {
    if (allConferences.length === 0) {
        conferenceList.innerHTML = `
            <div class="column is-12">
                <div class="has-text-centered" style="padding: 3rem;">
                    <p class="has-text-grey is-size-5">📭 Chưa có hội nghị nào</p>
                    <p class="has-text-grey">Click "Tạo hội nghị mới" để bắt đầu</p>
                </div>
            </div>
        `;
        return;
    }

    conferenceList.innerHTML = allConferences.map(conf => {
        const statusBadge = conf.isOpen ? 
            '<span class="tag is-success">Đang mở</span>' : 
            '<span class="tag is-danger">Đã đóng</span>';
        
        const createdDate = conf.createdAt ? 
            new Date(conf.createdAt).toLocaleDateString('vi-VN') : 'N/A';
        
        const startDate = conf.startTime ? 
            new Date(conf.startTime).toLocaleString('vi-VN') : 'Chưa đặt';
        
        const endDate = conf.endTime ? 
            new Date(conf.endTime).toLocaleString('vi-VN') : 'Chưa đặt';

        // Get attendance count (Placeholder)
        const attendanceCount = 0; 

        return `
            <div class="column is-4">
                <div class="card conference-card" style="position: relative;">
                    <div class="status-badge">${statusBadge}</div>
                    <div class="card-content">
                        <h3 class="title is-5">${conf.name || 'Hội nghị'}</h3>
                        <p class="subtitle is-6 has-text-grey">Mã: <strong>${conf.code || 'N/A'}</strong></p>
                        
                        <div class="content is-small">
                            <p><strong>📅 Tạo:</strong> ${createdDate}</p>
                            <p><strong>⏰ Bắt đầu:</strong> ${startDate}</p>
                            <p><strong>⏰ Kết thúc:</strong> ${endDate}</p>
                            <p><strong>📍 Bán kính:</strong> ${conf.radius || 100}m</p>
                        </div>

                        <div class="buttons">
                            <button class="button is-primary is-small is-fullwidth" onclick="viewConference('${conf.id}')">
                                📊 Xem chi tiết
                            </button>
                            <button class="button is-info is-small" onclick="editConference('${conf.id}')">
                                ✏️ Sửa
                            </button>
                            <button class="button is-warning is-small" onclick="copyLink('${conf.id}')">
                                🔗 Link
                            </button>
                            <button class="button is-dark is-small" onclick="showQrCode('${conf.id}')">
                                📱 QR
                            </button>
                            <button class="button is-danger is-small" onclick="deleteConference('${conf.id}')">
                                🗑️
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Open modal for creating new conference
btnCreateConference.addEventListener('click', () => {
    editingConferenceId = null;
    modalTitle.textContent = 'Tạo hội nghị mới';
    conferenceForm.reset();
    document.getElementById('isOpen').checked = true;
    conferenceModal.classList.add('is-active');
});

// Close modal
function closeConferenceModal() {
    conferenceModal.classList.remove('is-active');
    conferenceForm.reset();
    editingConferenceId = null;
}

closeModal.addEventListener('click', closeConferenceModal);
btnCancelModal.addEventListener('click', closeConferenceModal);

// Get current location
getCurrentLocationBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
        alert('Trình duyệt không hỗ trợ định vị GPS');
        return;
    }

    getCurrentLocationBtn.classList.add('is-loading');
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            document.getElementById('latitude').value = position.coords.latitude.toFixed(6);
            document.getElementById('longitude').value = position.coords.longitude.toFixed(6);
            getCurrentLocationBtn.classList.remove('is-loading');
            alert('✓ Đã lấy vị trí hiện tại!');
        },
        (error) => {
            getCurrentLocationBtn.classList.remove('is-loading');
            alert('✗ Không thể lấy vị trí: ' + error.message);
        },
        { enableHighAccuracy: true }
    );
});

// Save conference
btnSaveConference.addEventListener('click', async () => {
    const name = document.getElementById('conferenceName').value.trim();
    // Generate random code for new conference or use existing logic if needed
    // Since we removed the input, we'll generate one if it's a new conference, 
    // or keep the old one if editing (handled below).
    let code = ''; 

    if (!name) {
        alert('Vui lòng nhập tên hội nghị!');
        return;
    }

    // FINAL SECURITY CHECK: Check if user still exists on server before saving
    try {
        const userSnapshot = await firebase.database().ref(`Diemdanh/Users/${currentUsername}`).once('value');
        if (!userSnapshot.exists()) {
            alert('⛔ TÀI KHOẢN ĐÃ BỊ XÓA!\nBạn không còn quyền thực hiện thao tác này.');
            sessionStorage.clear();
            window.location.href = 'login.html';
            return;
        }
        
        // Check expiry date as well
        const userData = userSnapshot.val();
        if (new Date() > new Date(userData.expiryDate)) {
             alert('⛔ GÓI CƯỚC ĐÃ HẾT HẠN!\nVui lòng gia hạn để tiếp tục tạo hội nghị.');
             return; // Don't redirect, just block action
        }
    } catch (err) {
        console.error('Auth check failed:', err);
        alert('Lỗi kiểm tra xác thực. Vui lòng thử lại.');
        return;
    }

    const conferenceData = {
        name: name,
        // code: code, // Will set below based on edit/create mode
        latitude: parseFloat(document.getElementById('latitude').value) || null,
        longitude: parseFloat(document.getElementById('longitude').value) || null,
        radius: parseInt(document.getElementById('radius').value) || 100,
        isOpen: document.getElementById('isOpen').checked,
        startTime: document.getElementById('startTime').value ? 
                   new Date(document.getElementById('startTime').value).getTime() : null,
        endTime: document.getElementById('endTime').value ? 
                 new Date(document.getElementById('endTime').value).getTime() : null,
        updatedAt: firebase.database.ServerValue.TIMESTAMP,
        owner: currentUsername // Important for ownership tracking
    };

    try {
        btnSaveConference.classList.add('is-loading');

        if (editingConferenceId) {
            // Update existing conference
            // We don't overwrite the code when editing, so we don't include it in update data unless necessary
            // But here we just update the fields we have in conferenceData.
            // Let's make sure we find the old code if we need it, but actually 'update' performs a partial update 
            // so if we don't include 'code' key, it won't change.
            // However, conferenceData currently doesn't have 'code'.
            
            await firebase.database().ref(`Diemdanh/Conferences/${editingConferenceId}`).update(conferenceData);
            alert('✓ Đã cập nhật hội nghị!');
        } else {
            // Create new conference
            // Generate simple random 6-digit code
            const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
            conferenceData.code = randomCode;
            conferenceData.createdAt = firebase.database.ServerValue.TIMESTAMP;
            
            await firebase.database().ref(`Diemdanh/Conferences`).push(conferenceData);
            alert('✓ Đã tạo hội nghị mới!');
        }

        closeConferenceModal();
    } catch (error) {
        console.error('Error saving conference:', error);
        alert('✗ Lỗi: ' + error.message);
    } finally {
        btnSaveConference.classList.remove('is-loading');
    }
});

// Edit conference
window.editConference = function(conferenceId) {
    const conference = allConferences.find(c => c.id === conferenceId);
    if (!conference) return;

    editingConferenceId = conferenceId;
    modalTitle.textContent = 'Chỉnh sửa hội nghị';

    document.getElementById('conferenceName').value = conference.name || '';
    // document.getElementById('conferenceCode').value = conference.code || ''; // Removed
    document.getElementById('latitude').value = conference.latitude || '';
    document.getElementById('longitude').value = conference.longitude || '';
    document.getElementById('radius').value = conference.radius || 100;
    document.getElementById('isOpen').checked = conference.isOpen || false;

    if (conference.startTime) {
        const startDate = new Date(conference.startTime);
        document.getElementById('startTime').value = formatDateTimeLocal(startDate);
    }
    if (conference.endTime) {
        const endDate = new Date(conference.endTime);
        document.getElementById('endTime').value = formatDateTimeLocal(endDate);
    }

    conferenceModal.classList.add('is-active');
};

// Format date for datetime-local input
function formatDateTimeLocal(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

// View conference details
window.viewConference = function(conferenceId) {
    window.location.href = `btc-detail.html?id=${conferenceId}`;
};

// Copy attendance link
window.copyLink = function(conferenceId) {
    const conference = allConferences.find(c => c.id === conferenceId);
    if (!conference) return;

    const baseUrl = window.location.origin + window.location.pathname.replace('btc-list.html', '');
    const link = `${baseUrl}index.html?c=${conferenceId}`;
    
    navigator.clipboard.writeText(link).then(() => {
        alert(`✓ Đã sao chép link điểm danh!\n\n${link}`);
    }).catch(() => {
        prompt('Sao chép link này:', link);
    });
};

// Show QR Code
const qrModal = document.getElementById('qrModal');
const closeQrModal = document.getElementById('closeQrModal');
let qrCodeObj = null;

window.showQrCode = function(conferenceId) {
    const conference = allConferences.find(c => c.id === conferenceId);
    if (!conference) return;

    const baseUrl = window.location.origin + window.location.pathname.replace('btc-list.html', '');
    const link = `${baseUrl}index.html?c=${conferenceId}`;

    document.getElementById('qrConfName').textContent = conference.name;
    document.getElementById('qrcode').innerHTML = ''; // Clear old QR

    // Generate QR
    qrCodeObj = new QRCode(document.getElementById("qrcode"), {
        text: link,
        width: 180,
        height: 180,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });

    qrModal.classList.add('is-active');
};

// Close QR Modal
closeQrModal.addEventListener('click', () => {
    qrModal.classList.remove('is-active');
});

// Download QR
document.getElementById('downloadQr').addEventListener('click', () => {
    const imgInfo = document.querySelector('#qrcode img');
    if (imgInfo) {
        const link = document.createElement('a');
        link.href = imgInfo.src;
        link.download = `QR_DiemDanh_${new Date().getTime()}.png`;
        link.click();
    }
});

// Delete conference
window.deleteConference = async function(conferenceId) {
    const conference = allConferences.find(c => c.id === conferenceId);
    if (!conference) return;

    if (!confirm(`Bạn có chắc muốn xóa hội nghị "${conference.name}"?\n\nLưu ý: Dữ liệu điểm danh của hội nghị này cũng sẽ bị xóa vĩnh viễn!`)) {
        return;
    }

    try {
        // Delete conference
        await firebase.database().ref(`Diemdanh/Conferences/${conferenceId}`).remove();
        // Delete records associated with it
        await firebase.database().ref(`Diemdanh/Records/${conferenceId}`).remove();
        
        alert('✓ Đã xóa hội nghị và dữ liệu điểm danh!');
    } catch (error) {
        console.error('Error deleting conference:', error);
        alert('✗ Lỗi khi xóa: ' + error.message);
    }
};

// Initialize
loadConferences();
