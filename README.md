# Mikagu_Hola - Cosmic Profile Card 3.0 ✨

Đây là mã nguồn của trang profile card cá nhân mang phong cách vũ trụ (cosmic) dành cho **Mikagu_Hola**. Dự án được xây dựng bằng HTML, CSS và JavaScript thuần, tập trung vào hiệu ứng hình ảnh động, trải nghiệm tương tác và hoàn toàn responsive trên mọi thiết bị.

Bạn có thể xem bản demo trực tiếp tại đây: **[profilecard-azure.vercel.app](https://profilecard-azure.vercel.app)**

## ✨ Tính năng nổi bật

*   **Giao diện Vũ trụ Động đầy mê hoặc:**
    *   Nền sao lung linh với hiệu ứng chuyển động mượt mà.
    *   Hiệu ứng tia lửa (spark) theo chuyển động chuột (trên máy tính).
    *   Lớp phủ tinh vân (nebula) và xoáy vũ trụ (cosmic whirl) ấn tượng.
*   **Tương tác thông minh và sống động:**
    *   Avatar thay đổi luân phiên mỗi 2 giây. Nhấp hoặc chạm vào avatar để xem hiệu ứng bùng nổ trái tim và avatar ngẫu nhiên.
    *   **Favicon và tiêu đề trang** tự động đồng bộ theo avatar hiện tại.
    *   Badge "role" với hiệu ứng typewriter (gõ chữ) sinh động.
*   **Trình phát nhạc được tích hợp tinh tế:**
    *   Playlist nhạc J-Pop / VOCALOID yêu thích (Chiisana Koi no Uta, Remember, World is Mine...).
    *   Thanh seek cho phép tua bài hát dễ dàng.
    *   Visualizer dạng thanh tần số và hiệu ứng phát sáng (pulse) cho card theo nhịp nhạc.
    *   **Lưu trữ âm lượng** bạn chỉnh vào bộ nhớ trình duyệt.
*   **Thông tin được trình bày đẹp mắt:**
    *   Đồng hồ đếm ngược (countdown) với hiệu ứng "flip" mỗi giây.
    *   Danh sách "WAIFU COLLECTION" được thiết kế dạng thanh tiến trình affection, mỗi nhân vật có icon và hiệu ứng riêng (thiên thần, mặt trăng, mèo, trái tim).
    *   Các nút mạng xã hội (Facebook, TikTok, Discord) với hiệu ứng hover bắt mắt.

## 🛠️ Công nghệ sử dụng

*   **Frontend:** HTML5, CSS3 thuần
*   **Ngôn ngữ:** JavaScript (ES6+)
*   **Thư viện/Icons:** [Font Awesome 6](https://fontawesome.com/) (cho các icon đẹp), [Google Fonts](https://fonts.google.com/) (cho font chữ Nunito).
*   **Tính năng:** Canvas API (cho nền sao, spark, visualizer), Web Audio API (cho player và hiệu ứng âm thanh), LocalStorage (lưu volume).

## 🚀 Cách cài đặt và chạy dự án

1.  **Clone repository** về máy của bạn:
    ```bash
    git clone https://github.com/Hibandd122/profilecard.git
    ```

2.  **Di chuyển vào thư mục dự án:**
    ```bash
    cd profilecard
    ```

3.  **Quan trọng:** Để tránh lỗi CORS khi phát nhạc từ file cục bộ, bạn cần chạy dự án thông qua một local server. Có hai cách đơn giản:
    *   **Cách 1 (Dùng extension VS Code):** Mở dự án bằng Visual Studio Code, cài extension "Live Server", nhấp chuột phải vào file `index.html` và chọn "Open with Live Server".
    *   **Cách 2 (Dùng Python):** Mở terminal tại thư mục dự án và chạy lệnh:
        ```bash
        python -m http.server
        ```
        Sau đó truy cập `http://localhost:8000` trong trình duyệt.

4.  **Đặt các file nhạc:** Tạo/bổ sung các file MP3 (`song1.mp3`, `song2.mp3`, `song3.mp3`, `song4.mp3`) vào cùng thư mục với `index.html` để trình phát hoạt động.

## 📁 Cấu trúc thư mục

Dự án được tổ chức tách biệt để dễ dàng quản lý và bảo trì:

```
profilecard/
│
├── index.html                # File HTML chính
│
├── style-base.css            # Reset CSS, overlay khởi động, tim
├── style-backgrounds.css     # CSS cho các lớp nền (sao, tinh vân, xoáy)
├── style-card.css            # CSS cho card chính và viền RGB
├── style-left.css            # CSS cho cột trái (avatar, badge, social)
├── style-right.css           # CSS cho cột phải (countdown, waifu, player)
├── style-responsive.css      # CSS cho giao diện di động
│
├── config.js                 # File cấu hình tập trung (avatar, nhạc, thời gian, waifu...)
├── stars.js                  # Hiệu ứng nền sao động
├── spark.js                  # Hiệu ứng tia lửa theo chuột
├── music.js                  # Logic cho trình phát nhạc, visualizer, pulse
├── avatar.js                 # Logic xoay avatar, hiệu ứng tim, favicon động
├── typewriter.js             # Hiệu ứng gõ chữ cho badge
├── countdown.js              # Logic đồng hồ đếm ngược
├── tilt.js                   # Hiệu ứng nghiêng 3D cho card
├── social.js                 # Xử lý sự kiện click cho nút mạng xã hội
│
└── *.png                     # Các file ảnh avatar (avatar.png, avatar2.png...)
```

## 🎨 Tùy chỉnh

Bạn có thể dễ dàng tùy chỉnh hầu hết nội dung và hiệu ứng trong file `config.js`:

*   Danh sách avatar, thời gian đếm ngược, các role.
*   Playlist nhạc, âm lượng mặc định.
*   Bật/tắt các hiệu ứng (sao, spark, tilt...).
*   Danh sách waifu, thứ hạng, icon, % affection.

## 🔗 Liên kết

*   **Trang web trực tiếp:** [profilecard-azure.vercel.app](https://profilecard-azure.vercel.app)
*   **GitHub Repository:** [github.com/Hibandd122/profilecard](https://github.com/Hibandd122/profilecard)

---

⭐ Nếu bạn thấy dự án này thú vị, hãy để lại một ngôi sao trên GitHub nhé! Mọi đóng góp hay báo lỗi đều được chào đón.
