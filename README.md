<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=shark&height=200&color=gradient&text=Mikagu_Hola&reversal=false&fontAlign=50&desc=✨%20Cosmic%20Profile%20Card%20✨&descAlign=60&fontColor=ffffff" width="100%"/>
  
  <p align="center">
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
    <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
    <img src="https://img.shields.io/badge/Waifu-Approved-FF69B4?style=for-the-badge" />
  </p>
  
  <h1>🌌 ULTIMATE INTERACTIVE PROFILE CARD</h1>
  <p><i>Nơi công nghệ và thẩm mỹ vũ trụ giao thoa – Một chiếc card sống động với hiệu ứng 3D, âm nhạc và tương tác thông minh.</i></p>
  
  <a href="https://profilecard-azure.vercel.app/"><img src="https://img.shields.io/badge/DEMO-LIVE-ff69b4?style=for-the-badge&logo=vercel" /></a>
  <a href="https://github.com/Hibandd122/profilecard/issues"><img src="https://img.shields.io/badge/REPORT-BUG-red?style=for-the-badge&logo=github" /></a>
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge" />
</div>

---

## 🌟 Tổng Quan

**Mikagu_Hola** là dự án profile card mang phong cách **cosmic futuristic**, kết hợp hiệu ứng đồ họa thời thượng (sao động, tinh vân, hào quang, RGB flow) và khả năng tương tác thông minh (xoay ảnh, bắn tim, phát nhạc kèm visualizer). Dự án đã được triển khai thành công trên **Vercel** và hoạt động mượt mà trên cả desktop lẫn mobile.

> 💡 *Mục tiêu: Tạo ấn tượng mạnh với người xem ngay từ cái nhìn đầu tiên.*

---

## 🔥 Tính Năng Nổi Bật

| Loại | Tên Tính Năng | Mô Tả |
|------|---------------|-------|
| **✨ Hiệu ứng nền** | Sao động + Tinh vân | Hàng trăm ngôi sao rơi và tinh vân chuyển động mềm mại. |
| | Cổng xoáy vũ trụ | Hai lớp xoáy conic gradient xoay ngược chiều tạo chiều sâu. |
| | Spark theo chuột | Hạt sáng bay theo con trỏ (chỉ trên PC). |
| **🃏 Card chính** | 3D Tilt | Card nghiêng theo chuyển động chuột (hiệu ứng parallax). |
| | Viền RGB chạy | Hai lớp viền neon chạy liên tục. |
| | Hiệu ứng "thở" | Card phồng lên/xẹp xuống nhẹ nhàng. |
| **🖼️ Avatar** | Xoay vòng 4 ảnh | Tự động chuyển ảnh mỗi 2 giây. |
| | Click bắn tim | Khi click, tim bay khắp màn hình + ảnh ngẫu nhiên trong 2 giây. |
| | Hào quang xoay | Hai vòng sáng xoay quanh avatar. |
| **📜 Badge & Text** | Typewriter động | Hiển thị luân phiên các vai trò: Python Coder, Roblox Gamer, Waifu Collector, Lofi Chill. |
| | Gradient glitch | Chữ tên biến đổi màu sắc liên tục. |
| **⏳ Countdown** | Flip số | Đếm ngược tới sự kiện (03/04/2026) với hiệu ứng lật số và glow mạnh. |
| **💖 Waifu List** | 4 nhân vật | Shiina Mahiru, Kaguya, Kagari Fuyukawa, Hiura Mihate, mỗi người một icon hiệu ứng riêng (vương miện, mặt trăng, tim, sao). |
| **🎵 Music Player** | 3 bài nhạc | Playlist ngắn nhưng chất, hiển thị tên bài chạy marquee. |
| | Visualizer cột tần số | Cột sáng nhảy theo nhạc, gradient xanh – hồng. |
| | Card pulse | Card nhấp nháy theo nhịp nhạc. |
| | Seek bar | Thanh tua có tooltip hiện thời gian, kéo được trên mobile. |
| **🔗 Social** | 3 nút | Facebook, TikTok, Discord – mở tab mới khi click, hoạt động trên mobile. |
| **📱 Responsive** | Tối ưu mọi thiết bị | Card tự động chuyển thành dạng cột trên điện thoại, giảm kích thước phù hợp. |

---

## 🎵 Danh Sách Nhạc

| # | Tên Bài Hát | File |
|:-:|-------------|------|
| 1 | **Chiisana Koi no Uta** (The Angel Next Door Spoils Me Rotten) | `song1.mp3` |
| 2 | **Remember** (Cosmic Princess Kaguya!) | `song2.mp3` |
| 3 | **ハッピーシンセサイザ** (Cosmic Princess Kaguya!) | `song3.mp3` |

> ⚠️ **Lưu ý:** Trên môi trường triển khai (Vercel), bạn cần đảm bảo các file nhạc được import chính xác. Nếu gặp lỗi "KHÔNG TÌM THẤY FILE NHẠC", hãy kiểm tra đường dẫn file trong `script.js` hoặc thử sử dụng đường dẫn tuyệt đối.

---

## 🛠️ Công Nghệ Sử Dụng

- **HTML5** – Cấu trúc semantic, canvas, audio.
- **CSS3** – Flexbox, Grid, animations, keyframes, backdrop-filter, mask.
- **JavaScript ES6** – Xử lý sự kiện, canvas animations, Web Audio API, localStorage.
- **Vercel** – Nền tảng triển khai và hosting.
- **Thư viện hỗ trợ**: Font Awesome 6, Google Fonts (Nunito).
- **Code thuần** – Không framework, tối ưu hiệu năng.

---

## 📂 Cấu Trúc Thư Mục
