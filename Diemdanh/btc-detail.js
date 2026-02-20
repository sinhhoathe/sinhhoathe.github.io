// Conference Detail Management - Multi Tenant

let conferenceId = null;
let conferenceData = null;
let allRecords = [];
const currentUsername = sessionStorage.getItem('btc_username');

// Check login
if (!currentUsername) {
    window.location.href = 'login.html';
}

// DOM Elements
const manualForm = document.getElementById('manualForm');
const attendanceList = document.getElementById('attendanceList');
const searchInput = document.getElementById('searchInput');
const refreshBtn = document.getElementById('refreshBtn');
const exportBtn = document.getElementById('exportBtn');
const btnCopyLink = document.getElementById('btnCopyLink');

// Statistics elements
const totalAttendeesEl = document.getElementById('totalAttendees');
const presentCountEl = document.getElementById('presentCount');
const manualCountEl = document.getElementById('manualCount');

// Conference info elements
const conferenceNameEl = document.getElementById('conferenceName');
const conferenceCodeEl = document.getElementById('conferenceCode');
const conferenceStatusEl = document.getElementById('conferenceStatus');
const conferenceTimeEl = document.getElementById('conferenceTime');
const conferenceLocationEl = document.getElementById('conferenceLocation');

// Getting ID from URL
function getConferenceIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Check account status real-time
function checkAccountStatus() {
    firebase.database().ref(`Diemdanh/Users/${currentUsername}`).once('value', (snapshot) => {
        if (!snapshot.exists()) {
            alert('Tài khoản của bạn đã bị xóa hoặc ngừng kích hoạt!');
            sessionStorage.clear();
            window.location.href = 'login.html';
        }
    });
}

// Load conference data
function loadConferenceData() {
    checkAccountStatus(); // Verify account first
    conferenceId = getConferenceIdFromUrl();
    
    if (!conferenceId) {
        alert('Không tìm thấy ID hội nghị!');
        window.location.href = 'btc-list.html';
        return;
    }

    // Path: Diemdanh/Conferences/{id}
    const confRef = firebase.database().ref(`Diemdanh/Conferences/${conferenceId}`);
    confRef.on('value', (snapshot) => {
        conferenceData = snapshot.val();
        if (!conferenceData) {
            alert('Hội nghị không tồn tại!');
            window.location.href = 'btc-list.html';
            return;
        }
        displayConferenceInfo();
    });
}

// Display conference information
function displayConferenceInfo() {
    conferenceNameEl.textContent = conferenceData.name || 'Hội nghị';
    conferenceCodeEl.textContent = conferenceData.code || 'N/A';
    
    const statusBadge = conferenceData.isOpen ? 
        '<span class="tag is-success is-medium">Đang mở</span>' : 
        '<span class="tag is-danger is-medium">Đã đóng</span>';
    conferenceStatusEl.innerHTML = statusBadge;

    const startTime = conferenceData.startTime ? 
        new Date(conferenceData.startTime).toLocaleString('vi-VN') : 'Chưa đặt';
    const endTime = conferenceData.endTime ? 
        new Date(conferenceData.endTime).toLocaleString('vi-VN') : 'Chưa đặt';
    conferenceTimeEl.textContent = `${startTime} - ${endTime}`;

    if (conferenceData.latitude && conferenceData.longitude) {
        conferenceLocationEl.textContent = 
            `${conferenceData.latitude.toFixed(6)}, ${conferenceData.longitude.toFixed(6)} (${conferenceData.radius || 100}m)`;
    } else {
        conferenceLocationEl.textContent = 'Chưa cấu hình';
    }
}

// Load attendance records for this conference
function loadAttendanceRecords() {
    if (!conferenceId) return;

    // Path: Diemdanh/Records/{conferenceId}
    const recordsRef = firebase.database().ref(`Diemdanh/Records/${conferenceId}`);
    recordsRef.on('value', (snapshot) => {
        allRecords = [];
        const data = snapshot.val();
        
        if (data) {
            Object.keys(data).forEach(key => {
                allRecords.push({ ...data[key], id: key });
            });
        }

        // Sort by timestamp (newest first)
        allRecords.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        
        updateStatistics();
        renderAttendanceList(allRecords);
    });
}

// Update statistics
function updateStatistics() {
    totalAttendeesEl.textContent = allRecords.length;
    
    const presentRecords = allRecords.filter(r => r.status === 'present');
    presentCountEl.textContent = presentRecords.length;
    
    const manualRecords = allRecords.filter(r => r.status === 'manual');
    manualCountEl.textContent = manualRecords.length;
}

// Render attendance list
function renderAttendanceList(records) {
    if (records.length === 0) {
        attendanceList.innerHTML = '<tr><td colspan="8" class="has-text-centered">Chưa có dữ liệu điểm danh</td></tr>';
        return;
    }

    attendanceList.innerHTML = records.map((record, index) => {
        const time = record.timestamp ? new Date(record.timestamp).toLocaleString('vi-VN') : 'N/A';
        const distance = record.distance !== null && record.distance !== undefined ? 
                        `${record.distance}m` : 'N/A';
        const type = record.status === 'manual' ? 
                    '<span class="tag is-warning">Thủ công</span>' : 
                    '<span class="tag is-success">Tự động</span>';
        
        return `
            <tr>
                <td>${index + 1}</td>
                <td>${time}</td>
                <td><strong>${record.fullName || 'N/A'}</strong></td>
                <td>${record.organization || 'N/A'}</td>
                <td>${record.phone || 'N/A'}</td>
                <td>${distance}</td>
                <td>${type}</td>
                <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${record.notes || ''}">
                    ${record.notes || ''}
                </td>
                <td>
                    <button class="button is-small is-danger" onclick="deleteRecord('${record.id}')">
                        🗑️
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// Manual attendance
manualForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const manualData = {
        fullName: document.getElementById('manualName').value.trim(),
        organization: document.getElementById('manualOrg').value.trim(),
        phone: document.getElementById('manualPhone').value.trim(),
        conferenceId: conferenceId,
        conferenceCode: conferenceData?.code || '',
        conferenceName: conferenceData?.name || '',
        notes: 'Điểm danh thủ công bởi BTC',
        latitude: null,
        longitude: null,
        distance: null,
        accuracy: null,
        status: 'manual',
        timestamp: firebase.database.ServerValue.TIMESTAMP
    };

    try {
        await firebase.database().ref(`Diemdanh/Records/${conferenceId}`).push(manualData);
        alert('✓ Đã thêm điểm danh thủ công!');
        manualForm.reset();
    } catch (error) {
        console.error('Error adding manual attendance:', error);
        alert('✗ Lỗi: ' + error.message);
    }
});

// Delete record
window.deleteRecord = async function(recordId) {
    if (!confirm('Bạn có chắc muốn xóa bản ghi này?')) {
        return;
    }

    try {
        await firebase.database().ref(`Diemdanh/Records/${conferenceId}/${recordId}`).remove();
        alert('✓ Đã xóa bản ghi!');
    } catch (error) {
        console.error('Error deleting record:', error);
        alert('✗ Lỗi khi xóa: ' + error.message);
    }
};

// Search functionality
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    if (!query) {
        renderAttendanceList(allRecords);
        return;
    }

    const filtered = allRecords.filter(record => {
        return (
            (record.fullName || '').toLowerCase().includes(query) ||
            (record.organization || '').toLowerCase().includes(query) ||
            (record.phone || '').toLowerCase().includes(query)
        );
    });

    renderAttendanceList(filtered);
});

// Refresh button
refreshBtn.addEventListener('click', () => {
    refreshBtn.classList.add('is-loading');
    loadAttendanceRecords();
    setTimeout(() => {
        refreshBtn.classList.remove('is-loading');
    }, 500);
});

// Copy attendance link
btnCopyLink.addEventListener('click', () => {
    const baseUrl = window.location.origin + window.location.pathname.replace('btc-detail.html', '');
    const link = `${baseUrl}index.html?c=${conferenceId}`;
    
    navigator.clipboard.writeText(link).then(() => {
        alert(`✓ Đã sao chép link điểm danh!\n\nLink: ${link}\nMã hội nghị: ${conferenceData.code}`);
    }).catch(() => {
        prompt('Sao chép link này:', link);
    });
});

// Export to CSV
exportBtn.addEventListener('click', () => {
    if (allRecords.length === 0) {
        alert('Không có dữ liệu để xuất!');
        return;
    }

    const headers = ['STT', 'Thời gian', 'Họ và tên', 'Đơn vị', 'SĐT', 'Khoảng cách (m)', 'Loại', 'Ghi chú'];
    const rows = allRecords.map((record, index) => {
        const time = record.timestamp ? new Date(record.timestamp).toLocaleString('vi-VN') : '';
        const distance = record.distance !== null && record.distance !== undefined ? record.distance : '';
        const type = record.status === 'manual' ? 'Thủ công' : 'Tự động';
        
        return [
            index + 1,
            time,
            record.fullName || '',
            record.organization || '',
            record.phone || '',
            distance,
            type,
            record.notes || ''
        ];
    });

    // Create CSV content
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Add BOM for UTF-8
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Download
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    const fileName = `diem-danh-${conferenceData?.code || conferenceId}-${Date.now()}.csv`;
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Initialize
loadConferenceData();
loadAttendanceRecords();
