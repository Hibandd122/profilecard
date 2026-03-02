MIKAGU_HOLA · COSMIC 3.0

Profile card cá nhân hiện đại với hiệu ứng vũ trụ, dark mode, nhạc nền, countdown và bộ sưu tập waifu. Được xây dựng bằng HTML5, CSS3 thuần và JavaScript ES6+, không sử dụng framework.


TÍNH NĂNG NỔI BẬT

- Giao diện Cosmic: Nền sao động, tinh vân, xoáy vũ trụ, hiệu ứng tia lửa theo chuột.
- Dark mode: Toggle thủ công, tự động detect hệ thống, lưu trạng thái vào localStorage.
- Hiệu ứng cao cấp:
  * 3D tilt card theo chuột (máy tính)
  * Glow, hover scale mượt mà
  * Scroll reveal animation
  * Ripple khi click nút
  * Parallax nhẹ cho background
- Countdown: Đếm ngược tới một sự kiện (có thể cấu hình).
- Bộ sưu tập Waifu: Hiển thị danh sách waifu kèm thanh % affection, icon động.
- Music Player: Phát nhạc từ playlist, visualizer dạng sóng, điều chỉnh âm lượng, seek, tooltip.
- Avatar động: Click vào avatar để bắn tim và chuyển ảnh ngẫu nhiên (cùng với favicon và tiêu đề trang).
- Typewriter effect: Badge hiển thị role với hiệu ứng gõ chữ.
- Responsive: Tối ưu trên điện thoại, máy tính bảng và desktop.


CÔNG NGHỆ SỬ DỤNG

- HTML5
- CSS3 (Flexbox, Grid, CSS Variables, Animations)
- JavaScript ES6+
- Font Awesome 6 (icon)
- Canvas API (hiệu ứng sao, tia lửa, visualizer)


CẤU TRÚC THƯ MỤC

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
    ├── avatar.png
    ├── avatar2.png
    ├── avatar3.png
    ├── avatar4.png
    ├── avatar5.png
    ├── song1.mp3
    ├── song2.mp3
    ├── song3.mp3
    └── song4.mp3


CÀI ĐẶT VÀ CHẠY

1. Clone repository hoặc tải mã nguồn về.
2. Đặt các file ảnh avatar và nhạc vào thư mục assets/ (đúng tên file như trong config.js).
3. Mở file index.html bằng trình duyệt hiện đại (Chrome, Firefox, Edge, Safari).

Không cần build hay cài đặt thêm.


TÙY CHỈNH

Tất cả cấu hình đều tập trung trong file js/config.js.

1. Avatar & Favicon
avatars: ["assets/avatar.png", "assets/avatar2.png", ...],  // Danh sách ảnh
favicon: {
    enabled: true,              // true: favicon động theo avatar
    fallback: "assets/avatar.png"
}

2. Countdown
targetDate: "2026-04-03T18:30:00+07:00",   // Định dạng ISO 8601

3. Roles (typewriter)
roles: ["</> PYTHON CODER", " ROBLOX GAMER", ...],

4. Playlist nhạc
music: {
    playlist: [
        { name: "Chiisana Koi no Uta", file: "assets/song1.mp3" },
        ...
    ],
    defaultVolume: 45,
    enablePulse: true
}

5. Hiệu ứng nền
effects: {
    stars: true,
    sparks: true,
    nebula: true,
    cosmicWhirl: true
}

6. Thời gian hiệu ứng
intervals: {
    avatarRotation: 2000,        // ms
    typewriterSpeed: 80,
    typewriterPause: 2000,
    countdownUpdate: 1000
}

7. Giao diện
ui: {
    enableTilt: true,
    enableGlow: true,
    enableRgbBorder: true
}

8. Mạng xã hội
social: {
    facebook: "URL",
    tiktok: "URL",
    discord: "URL"
}

9. Danh sách Waifu
waifu: {
    list: [
        { name: "Shiina Mahiru", icon: "feather-alt", color: "#f5e6d3", rank: 1, affection: 100 },
        ...
    ]
}


ASSETS

Avatar: 5 file avatar.png đến avatar5.png (có thể thay bằng tên khác nhưng phải cập nhật trong config.js).
Nhạc: 4 file song1.mp3 đến song4.mp3 (hoặc tên tuỳ ý, sửa trong playlist).

Tất cả đều đặt trong thư mục assets/.


TRÌNH DUYỆT HỖ TRỢ

- Chrome / Edge (phiên bản mới nhất)
- Firefox
- Safari (macOS / iOS) – đã có fix cho backdrop-filter và bo góc.

Hoạt động tốt trên cả máy tính và điện thoại.


TỐI ƯU HIỆU NĂNG

- Sử dụng transform và opacity cho animation (không gây reflow).
- will-change cho các phần tử có chuyển động liên tục (card tilt).
- Intersection Observer cho scroll reveal (thay vì lắng nghe scroll).
- Canvas hiệu suất cao cho sao và tia lửa.
- Tắt hiệu ứng nặng (tilt, parallax) trên mobile để tiết kiệm pin.


GIẤY PHÉP

Mã nguồn được chia sẻ với mục đích học tập và cá nhân. Bạn có thể tự do sửa đổi và sử dụng cho profile của riêng mình.


CẢM ƠN

- Font Awesome cho bộ icon đẹp.
- Cộng đồng mạng đã gợi ý nhiều hiệu ứng thú vị.

Tác giả: Mikagu_Hola
Phiên bản: 3.0
Cập nhật cuối: 2026
