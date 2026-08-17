# 🌌 MAHIKARI · GUNS.LOL COSMIC BIOLINK CARD

Một trang cá nhân (Biolink / Profile Card) hiện đại mang phong cách **guns.lol** kết hợp giao diện vũ trụ (Cosmic Theme) với Glassmorphism siêu mượt, tương tác đỉnh cao dành cho **Mahikari**.

🔗 **Live Deployment (Vercel):** [https://profilecard-azure.vercel.app/](https://profilecard-azure.vercel.app/)

---

## 🌟 Chức năng nổi bật

*   **Giao diện guns.lol Signature:** 
    *   Màn hình chờ ấn tượng `[ CLICK ANYWHERE TO ENTER ]` tự động kích hoạt âm nhạc và hiệu ứng.
    *   Card kính mờ (Frosted Glassmorphism) với viền RGB động và đổ bóng ánh sáng Neon.
    *   Header banner theo từng waifu (#1 Shiina Mahiru, #2 Kaguya, #3 Yachiyo Runami, #4 Elfaria Albis Serfort).
*   **Hồ sơ & Danh hiệu Mahikari:**
    *   Tên hiển thị Gradient Glitch + Huy hiệu Verified & Vương miện VIP.
    *   Huy hiệu vai trò Typewriter luân phiên: `Wibu Chúa 👑`, `Developer 💻`, `Gacha Player 🎲`, `Music Lover 🎵`, `Cosmic Voyager ✨`.
    *   Khung trích dẫn anime tương tác với nút đổi quote ngẫu nhiên.
*   **Discord Rich Presence Widget (Đặc trưng guns.lol):**
    *   Hiển thị trạng thái Discord hoạt động: Avatar, Tag, Trạng thái hoạt động (*Playing Genshin Impact · Exploring Teyvat · AR 60*) và thời gian chơi (Elapsed time) trực tiếp.
*   **Trình phát nhạc tích hợp (Embedded Music Player):**
    *   Đĩa than Vinyl xoay theo điệu nhạc, Marquee cuộn tên bài hát & nghệ sĩ.
    *   Live Audio Visualizer đa tầng (Web Audio API) vẽ trực tiếp trên Canvas.
    *   Thanh tiến trình kéo/thả tương tác (Seek bar) có hiển thị mốc thời gian xem trước (Tooltip).
    *   Trình chọn danh sách phát (Playlist Selector) nhanh với 5 bài hát chất lượng cao.
    *   Thanh chỉnh âm lượng (Volume Slider) kèm nút tắt/mở tiếng nhanh.
*   **Bộ sưu tập Waifu (Waifu Collection):**
    *   Bảng xếp hạng:
        *   **#1 Shiina Mahiru** (100%)
        *   **#2 Kaguya** (96%)
        *   **#3 Yachiyo Runami** (93%)
        *   **#4 Elfaria Albis Serfort** (90%)
        *   **#5 Kagari Fuyukawa** (87%)
        *   **#6 Hiura Mihate** (84%)
    *   **Tương tác Click-to-Equip:** Click vào bất kỳ nhân vật nào để lập tức trang bị avatar và banner tương ứng lên Profile!
*   **Đồng hồ & Thống kê thời gian thực:**
    *   Đồng hồ số trực tiếp theo múi giờ Việt Nam (GMT+7).
    *   Bộ đếm lượt xem hồ sơ (Profile Views counter).
    *   Đồng hồ đếm ngược (Flip clock) tập phim Anime mới vào 22:00 Thứ Sáu hàng tuần.
*   **Hiệu ứng Tương tác & Nền:**
    *   Nền vũ trụ sao băng và tinh vân đa tầng chuyển động liên tục.
    *   Hiệu ứng vệt trỏ chuột (Mouse Cursor Trails) và chùm tim nổ tung (Heart Burst) khi tương tác với Avatar.
    *   Card nghiêng 3D (Tilt) mượt mà theo chuyển động chuột trên Desktop.
    *   Tối ưu hóa 60FPS cho thiết bị di động (iPhone / Android).

---

## 🚀 Cấu trúc dự án

```text
├── assets/                  # Hình ảnh avatar, banner waifu, file nhạc MP3...
│   ├── avatar.png ... avatar6.png
│   ├── bannertop1.jpg ... bannertop4.jpg
│   ├── e148d7f5abc12c955643ad28e49680f2.jpg (Elfaria)
│   └── song1.mp3 ... song5.mp3
├── css/
│   ├── style-base.css       # Biến màu, guns.lol overlay, typography
│   ├── style-backgrounds.css# Nền sao canvas, tinh vân nebula
│   ├── style-card.css       # Khung card kính mờ, top bar, RGB viền
│   ├── style-left.css       # Cột trái: Avatar, Tên, Typewriter, Bio, Social
│   ├── style-right.css      # Cột phải: Discord widget, Music player, Waifu, Countdown
│   └── style-responsive.css # Responsive hoàn hảo cho Mobile & Tablet
├── js/
│   ├── config.js            # Cấu hình toàn bộ thông tin Mahikari, waifus, playlist
│   ├── avatar.js            # Logic đổi avatar, nổ tim, favicon động
│   ├── countdown.js         # Logic đếm ngược Thứ Sáu 22:00
│   ├── darkmode.js          # Chuyển đổi Dark/Light mode
│   ├── features.js          # Overlay enter, Discord timer, VN clock, views, waifu equip
│   ├── music.js             # Trình phát nhạc Web Audio API & Visualizer
│   ├── spark.js             # Hiệu ứng nổ tia sáng
│   ├── stars.js             # Nền sao động
│   ├── tilt.js              # Nghiêng 3D
│   ├── typewriter.js        # Chữ chạy máy đánh chữ
│   ├── reveal.js            # Hiệu ứng xuất hiện
│   ├── ripple.js            # Sóng lan tỏa
│   ├── parallax.js          # Parallax nền
│   └── social.js            # Điều hướng link mạng xã hội
├── vercel.json              # Cấu hình cache và bảo mật cho Vercel
├── README.md
└── index.html
```

---

## 🛠️ Công nghệ sử dụng
*   HTML5 & CSS3 (Modern Glassmorphism, CSS Grid, Flexbox, Keyframes)
*   Vanilla JavaScript (Web Audio API, Canvas 2D, LocalStorage, IntersectionObserver)
*   Font Awesome 6.5.1
*   Google Fonts (Inter, Outfit, Fira Code)

---
*Created with ❤️ for Mahikari* 🌌
