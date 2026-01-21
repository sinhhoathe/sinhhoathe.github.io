# HỆ THỐNG ĐIỂM DANH ĐIỆN TỬ CÓ XÁC THỰC VỊ TRÍ

## 📋 Mô tả

Hệ thống điểm danh điện tử được xây dựng nhằm hỗ trợ công tác ghi danh đại biểu tham dự hội nghị một cách nhanh chóng, chính xác và hạn chế tình trạng điểm danh hộ.

## ✨ Tính năng chính

### Đối với Đại biểu:

- ✅ Điểm danh qua link do BTC cung cấp
- 📍 Xác thực vị trí GPS tự động
- 📱 Giao diện thân thiện trên mobile
- ⚡ Phản hồi nhanh chóng

### Đối với Ban Tổ chức:

- ⚙️ Cấu hình thông tin hội nghị
- 📍 Thiết lập vị trí và bán kính cho phép
- ⏰ Cài đặt thời gian mở/đóng điểm danh
- 🔑 Quản lý mã hội nghị
- ✍️ Điểm danh thủ công cho đại biểu không có smartphone
- 📊 Xem danh sách và thống kê real-time
- 📥 Xuất dữ liệu ra file CSV/Excel

## 🚀 Cài đặt

### 1. Cấu hình Firebase

1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Tạo project mới hoặc sử dụng project hiện có
3. Bật **Realtime Database**
4. Sao chép cấu hình Firebase vào file `firebase.config.js`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

### 2. Cấu trúc Database

Hệ thống sử dụng cấu trúc Firebase Realtime Database như sau:

```
attendance/
  ├── config/
  │   ├── conferenceName: "Tên hội nghị"
  │   ├── conferenceCode: "Mã hội nghị"
  │   ├── latitude: 21.0285
  │   ├── longitude: 105.8542
  │   ├── radius: 100
  │   ├── isOpen: true
  │   ├── startTime: timestamp
  │   └── endTime: timestamp
  │
  └── records/
      ├── {recordId1}/
      │   ├── fullName: "Nguyễn Văn A"
      │   ├── organization: "Đơn vị"
      │   ├── phone: "0912345678"
      │   ├── latitude: 21.0285
      │   ├── longitude: 105.8542
      │   ├── distance: 50
      │   ├── status: "present" | "manual"
      │   └── timestamp: timestamp
      └── ...
```

### 3. Quy tắc bảo mật Firebase

Thêm rules sau vào Firebase Realtime Database:

```json
{
  "rules": {
    "attendance": {
      "config": {
        ".read": true,
        ".write": false
      },
      "records": {
        ".read": false,
        ".write": true,
        "$recordId": {
          ".read": false
        }
      }
    }
  }
}
```

**Lưu ý:** Đây là rules cơ bản. Nên thêm authentication để bảo mật tốt hơn.

## 📖 Hướng dẫn sử dụng

### Đối với Ban Tổ chức:

1. **Truy cập trang quản lý:** Mở file `btc.html`

2. **Cấu hình hội nghị:**

   - Nhập tên hội nghị
   - Tạo mã hội nghị (ví dụ: HN2026)
   - Click "📍 Lấy vị trí hiện tại" hoặc nhập tọa độ thủ công
   - Thiết lập bán kính cho phép (mặc định 100m)
   - Chọn thời gian bắt đầu và kết thúc
   - Bật "Mở điểm danh"
   - Click "💾 Lưu cấu hình"

3. **Chia sẻ link điểm danh:**

   - Gửi link `index.html` và mã hội nghị cho đại biểu

4. **Điểm danh thủ công:**

   - Sử dụng form "Điểm danh thủ công" cho đại biểu không có smartphone

5. **Xem danh sách:**
   - Danh sách cập nhật real-time
   - Sử dụng ô tìm kiếm để lọc
   - Click "📥 Xuất Excel" để tải dữ liệu

### Đối với Đại biểu:

1. **Truy cập link điểm danh** do BTC cung cấp

2. **Điền thông tin:**

   - Họ và tên
   - Đơn vị
   - Số điện thoại
   - Mã hội nghị (do BTC cung cấp)
   - Ghi chú (nếu có)

3. **Cho phép truy cập vị trí** khi trình duyệt yêu cầu

4. **Click "Xác nhận điểm danh"**

5. **Chờ xác thực:**
   - Hệ thống kiểm tra vị trí
   - Nếu thành công: Hiển thị thông báo xanh
   - Nếu thất bại: Hiển thị lỗi và lý do

## ⚠️ Lưu ý quan trọng

### Về GPS:

- Đại biểu phải **bật GPS** trên thiết bị
- Đại biểu phải **cho phép trình duyệt** truy cập vị trí
- Độ chính xác GPS phụ thuộc vào thiết bị và môi trường
- Trong nhà có thể kém chính xác hơn ngoài trời

### Về bảo mật:

- Nên thêm Firebase Authentication
- Trang BTC nên có mật khẩu bảo vệ
- Thay đổi Firebase rules phù hợp với yêu cầu

### Về tương thích:

- Hỗ trợ hầu hết trình duyệt hiện đại
- Yêu cầu kết nối internet
- Tốt nhất trên Chrome, Safari, Edge

## 🔧 Khắc phục sự cố

### Không lấy được vị trí GPS:

1. Kiểm tra GPS đã bật chưa
2. Kiểm tra quyền truy cập vị trí của trình duyệt
3. Thử tải lại trang
4. Thử trình duyệt khác

### Điểm danh không thành công:

1. Kiểm tra mã hội nghị có đúng không
2. Kiểm tra đã mở điểm danh chưa
3. Kiểm tra thời gian điểm danh
4. Kiểm tra khoảng cách đến địa điểm hội nghị

### Dữ liệu không hiển thị:

1. Kiểm tra kết nối Firebase
2. Kiểm tra Firebase rules
3. Mở Console để xem lỗi

## 📁 Cấu trúc thư mục

```
Diemdanh/
├── index.html          # Trang điểm danh cho đại biểu
├── btc.html           # Trang quản lý cho BTC
├── app.js             # Logic điểm danh
├── btc.js             # Logic quản lý
├── firebase.config.js # Cấu hình Firebase
└── README.md          # Tài liệu hướng dẫn
```

## 🆘 Hỗ trợ

Nếu gặp vấn đề, vui lòng liên hệ:

- 📧 Email: support@attendancesystem.com
- 🌐 Website: [Hệ thống Điểm danh]

---

**Phát triển bởi:** Hệ thống Điểm danh GPS
**Phiên bản:** 1.0.0
**Ngày cập nhật:** 05/01/2026
