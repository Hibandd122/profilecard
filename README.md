# 🌌 COSMIC PROFILE CARD 3.0

Một trang cá nhân (Profile Card) hiện đại, tương tác cao với thiết kế Glassmorphism sống động và các hiệu ứng không gian (vũ trụ, sao rơi, mây tinh vân). Dự án được thiết kế có thể dễ dàng cá nhân hóa và tối ưu chạy mượt mà trên cả máy tính lẫn thiết bị di động.

🔗 **Live Demo:** [https://profilecard-azure.vercel.app/](https://profilecard-azure.vercel.app/)

## 🌟 Chức năng nổi bật

*   **Hiệu ứng Không gian Đa tầng:** Canvas nền sao rơi, mây tinh vân và dải ngân hà cuộn xoáy mượt mà.
*   **Chế độ Sáng/Tối (Light/Dark Mode):** Chuyển đổi linh hoạt giữa giao diện "Sâu thẳm huyền bí" và "Rực rỡ sắc màu" dạng lưới Gradient (Animated Mesh).
*   **Audio Reactive (Tương tác Âm nhạc):** Khi nhạc phát, thẻ Profile và Avatar sẽ nhịp theo từng tiếng Bass / nhịp điệu của bài hát cực sống động.
*   **Hiệu ứng Tương tác (Interactive):** 
    *   Thẻ Card xoay 3D (Tilt) khi rê chuột (chỉ bật trên Desktop để tối ưu hiệu năng).
    *   Hạt pháo bông (Particles) nổ lấp lánh khi click phím chuột vào bất kì đâu.
    *   Bắn tim tung tóe khi click trực tiếp vào Avatar.
*   **Đếm ngược (Countdown):** Đồng hồ đếm ngược thiết kế khối lập phương (Flip clock) đẹp mắt theo thời gian thực.
*   **Bộ sưu tập Waifu (Danh sách yêu thích):** Bảng xếp hạng các nhân vật yêu thích, kèm thanh thân mật (Affection Bar) mượt mà có hiệu ứng di chuột.
*   **Tối ưu chuẩn Mobile:** Tự động tắt bớt hiệu ứng 3D siêu nặng khi xem trên điện thoại, đảm bảo FPS luôn cao và không nóng máy.

## 🚀 Hướng dẫn Cài đặt & Sử dụng

Profile Card này thuần **HTML, CSS, và Vanilla JavaScript**. Không yêu cầu cài đặt framework phức tạp nào.

1.  **Chạy dự án:**
    Bạn chỉ cần mở trực tiếp file `index.html` trong bất kỳ trình duyệt web hiện đại nào (Chrome, Firefox, Safari, Edge...). Ngay lập tức trang web sẽ hoạt động. Mọi tài nguyên đều đã được thiết lập sẵn thư mục.

2.  **Cách tùy chỉnh (Config):**
    Tất cả dữ liệu chính đều được quản lý tập trung ở file `js/config.js`. Bạn mở file này ra để chỉnh sửa thông tin cá nhân của riêng mình cho dễ:
    *   **Tên & Avatar:** Sửa đổi mẩu `avatars` gốc (nhớ đưa ảnh của bạn vào thư mục `assets/`) và `pageName`.
    *   **Mục tiêu đếm ngược:** Đổi `targetDate` theo giờ chuẩn ISO 8601 (ví dụ: `"2026-04-03T18:30:00+07:00"`).
    *   **Máy đánh chữ (Typewriter Roles):** Đổi các danh xưng, châm ngôn bay bổng ở mảng `roles`.
    *   **Danh sách Nhạc (Music Playlist):** Thêm tên và đường dẫn file MP3 yêu thích vào mảng `music.playlist`.
    *   **Mạng xã hội:** Thay link trực tiếp trong khối `social`.

## 📁 Cấu trúc Thư mục

```text
├── assets/                  # Nơi lưu trữ hình ảnh avatar, icon, file nhạc MP3...
├── css/
│   ├── style-base.css       # File gốc định dạng biến (Colors, Light/Dark theme), Typography.
│   ├── style-backgrounds.css# Style quy định toàn bộ hệ thống lớp nến (Stars, Nebula).
│   ├── style-card.css       # Style cho khung hiển thị 3D chính (Glassmorphism card).
│   ├── style-left.css       # Style cột trái: Avatar, Tên, Logo MXH.
│   ├── style-right.css      # Style cột phải: Countdown, Bảng xếp hạng, Trình phát nhạc.
│   └── style-responsive.css # Style Responsive tinh chỉnh dành riêng cho Mobile/Tablet.
├── js/
│   ├── config.js            # Nơi lưu toàn bộ dữ liệu cấu hình dự án của bạn !!!
│   ├── avatar.js            # Xử lý xoay, đổi avatar ngẫu nhiên và hiệu ứng nổ tim.
│   ├── countdown.js         # Logic tính toán lật đồng hồ đếm ngược.
│   ├── darkmode.js          # Tính năng chuyển đổi Light/Dark Mode ghi nhớ localStorage.
│   ├── music.js             # Trình phát nhạc, Audio Context và Audio Reactive logic.
│   ├── spark.js             # Hiệu ứng hạt lấp lánh bay ngẫu nhiên và khi click chuột.
│   ├── stars.js             # Vẽ nền Background sao rơi (Canvas).
│   ├── tilt.js              # Nghiêng thẻ Card 3D theo con trỏ chuột.
│   ├── typewriter.js        # Đánh chữ tự động (Typewriter text effect).
│   ├── reveal.js            # Hiệu ứng hiển thị mượt mà.
│   ├── ripple.js            # Hiệu ứng sóng lan tỏa.
│   ├── parallax.js          # Lớp cuộn Parallax (nếu có).
│   └── social.js            # Chức năng điều hướng nút mở mxh.
└── index.html               # File Giao diện chính nối mọi thành phần.
```

## 🛠️ Công nghệ sử dụng
*   HTML5 & CSS3 (Flexbox/Grid, Animations, Variables mạnh mẽ)
*   Vanilla JavaScript (Canvas API, Web Audio API, DOM Manipulation)
*   Font Awesome (v6.4.0) cho Icons
*   Google Fonts (Inter)

---
*Được tinh chỉnh cho một trải nghiệm lướt Web cá nhân không nhàm chán!* 🎨✨
