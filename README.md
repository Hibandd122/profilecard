<div align="center">

# 🌌 Mikagu_Hola · COSMIC 3.0

*Profile card cá nhân hiện đại với hiệu ứng vũ trụ, dark mode, nhạc nền, đếm ngược và bộ sưu tập Waifu cực chất.*

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Version](https://img.shields.io/badge/Version-3.0-brightgreen?style=for-the-badge)

</div>

---

## ✨ Tính năng nổi bật

- 🌠 **Giao diện Cosmic**: Nền sao động, tinh vân, xoáy vũ trụ, hiệu ứng tia lửa theo chuột cực kỳ bắt mắt.
- 🌓 **Chế độ Dark Mode**: Hỗ trợ chuyển đổi thủ công hoặc tự động theo hệ thống, lưu trạng thái thông minh qua `localStorage`.
- 💫 **Hiệu ứng Cao cấp**:
  - `3D Tilt Card`: Nghiêng thẻ theo hướng chuột (trên PC).
  - `Smooth Animations`: Glow, hover scale mượt mà.
  - `Scroll Reveal`: Hiệu ứng xuất hiện khi cuộn trang.
  - `Ripple Effect`: Hiệu ứng gợn sóng khi click nút.
  - `Parallax`: Hiệu ứng thị sai nhẹ nhàng cho background.
- ⏳ **Countdown**: Đếm ngược thời gian tới sự kiện quan trọng.
- 🌸 **Waifu Collection**: Trưng bày danh sách Waifu yêu thích kèm thanh chỉ số tình cảm (affection) và icon động.
- 🎵 **Music Player**: Trình phát nhạc tích hợp playlist đa dạng, visualizer dạng sóng, tùy chỉnh âm lượng và thanh tiến trình.
- 💖 **Avatar Tương tác**: Click vào avatar để tạo hiệu ứng bắn tim, thay đổi ảnh ngẫu nhiên (đồng bộ với favicon và tiêu đề trang).
- ⌨️ **Typewriter Badge**: Hiển thị các vai trò (Role) với hiệu ứng gõ chữ sinh động.
- 📱 **Responsive Design**: Hoạt động hoàn hảo trên Mọi thiết bị (Mobile, Tablet, Desktop).

---

## 🛠 Công nghệ sử dụng

Dự án được xây dựng hoàn toàn nguyên bản, **không sử dụng framework**, đảm bảo độ nhẹ và khả năng tùy biến tối đa:
- **Core**: `HTML5`, `CSS3`, `JavaScript ES6+`
- **Styling**: `Flexbox`, `Grid`, `CSS Variables`, `Animations`
- **Icons**: `Font Awesome 6`
- **Graphics**: `Canvas API` (Xử lý hiệu ứng sao, tia lửa và visualizer âm thanh)

---

## 📁 Cấu trúc thư mục

```text
project/
├── index.html
├── css/
│   ├── style-base.css
│   ├── style-backgrounds.css
│   ├── style-card.css
│   ├── style-left.css
│   ├── style-right.css
│   └── style-responsive.css
├── js/
│   ├── config.js
│   ├── stars.js
│   ├── spark.js
│   ├── music.js
│   ├── avatar.js
│   ├── typewriter.js
│   ├── countdown.js
│   ├── tilt.js
│   ├── social.js
│   ├── darkmode.js
│   ├── reveal.js
│   ├── ripple.js
│   └── parallax.js
└── assets/
    ├── avatar.png ... avatar5.png
    └── song1.mp3 ... song4.mp3
