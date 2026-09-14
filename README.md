# 🌌 MAHIKARI · BESPOKE DIGITAL IDENTITY & STUDIO SUITE

Trang định danh cá nhân cao cấp, đậm chất cinematic, tối giản và thanh lịch dành cho **Mahikari** — Creative Technologist & UI/UX Architect.

🌐 **Trang web chính thức**: [https://profilecard-ten-nu.vercel.app/](https://profilecard-ten-nu.vercel.app/)

---

## ✨ Điểm nhấn Kiến trúc & Thiết kế

*   **Bộ nhận diện Thương hiệu Độc bản (Brand Monogram):**
    *   Logo Monogram `[M]` dập nổi tinh tế, phối hợp cùng typography `Outfit` & `Inter` chuẩn editorial quốc tế.
    *   Huy hiệu xác thực (Verified Creator) và nhãn trạng thái thời gian thực (`AVAILABLE`).
*   **Phông nền Cinematic & Banner Sắc nét 100%:**
    *   6 Banner 16:9 Ultra HD phối hợp cùng 6 Banner dọc chuẩn mobile.
    *   Tối ưu GPU layer rendering: Loại bỏ hoàn toàn các lớp sương mờ (fog/nebula) để hình nền đạt độ trong trẻo và chi tiết tối đa.
    *   Hiệu ứng hạt bụi sao (Ambient Stardust) chuyển động cực kỳ êm dịu, tự động tạm dừng khi ẩn tab để tiết kiệm 100% pin.
*   **Hệ thống Persona & Visual Themes:**
    *   6 chủ đề nhân vật tuyển chọn (Shiina Mahiru, Kaguya, Yachiyo Runami, Elfaria Albis Serfort, Kagari Fuyukawa, Hiura Mihate).
    *   Chuyển đổi tức thì Avatar, Banner và hệ màu điểm nhấn (`--color-accent`, `--color-accent-glow`) thông qua thanh chọn trực quan hoặc phím tắt `1` đến `6`.
*   **Studio Audio Suite (Hi-Fi Music Player):**
    *   Tuyển tập 33 bản nhạc phân loại theo mục (Tất cả, Thiên Sứ Nhà Bên, CPK Collection).
    *   Đĩa than vinyl xoay tinh tế, đồng bộ cùng bìa album / avatar persona.
    *   Thanh tua nhạc trực quan với tooltip thời gian, hỗ trợ phát ngẫu nhiên (Shuffle), lặp lại (Repeat All / 1 / Off).
    *   Bộ lọc âm thanh **Studio Equalizer** (BiquadFilter Web Audio API: Studio Reference, Low-End Warmth, Lo-Fi Tape, Acoustic Presence).
    *   Ngăn tìm kiếm bài hát trực tiếp (Live Instant Search) và tích hợp MediaSession API điều khiển từ bàn phím / màn hình khóa.
*   **Thao tác Nhanh & Phím tắt Tiện ích:**
    *   `Space`: Phát / Tạm dừng nhạc
    *   `J` / `K`: Bài trước / Bài kế tiếp
    *   `M`: Bật / Tắt tiếng (Mute)
    *   `S`: Bật / Tắt phát ngẫu nhiên (Shuffle)
    *   `R`: Chuyển chế độ lặp lại (Repeat)
    *   `1 - 6`: Đổi nhanh chủ đề Persona 1 - 6
*   **Hệ thống Giao diện Sáng / Tối (Light & Dark Mode):**
    *   Đồng bộ màu sắc êm dịu, không chói mắt, lưu trạng thái tự động vào LocalStorage.
*   **Tối ưu Hiệu năng & Khả năng Tiếp cận (Accessibility):**
    *   100% Vanilla HTML5, CSS custom properties và JavaScript hiện đại.
    *   Không phụ thuộc thư viện nặng hay framework cồng kềnh.
    *   Responsive mượt mà từ màn hình 320px, 390px, 430px đến màn hình 4K siêu rộng, hoàn toàn không tràn ngang (zero horizontal overflow).

---

## 🛠️ Cấu trúc Mã nguồn

```
profilecard/
├── assets/                  # Avatar độ phân giải cao, banner 16:9, banner phone
├── css/
│   ├── style-base.css       # Hệ thống Design Tokens, reset & typography
│   ├── style-backgrounds.css# 6 lớp banner GPU & canvas nền
│   ├── style-card.css       # Khung obsidian glass & thanh thương hiệu
│   ├── style-left.css       # Cột định danh, avatar, bio & danh sách persona
│   ├── style-right.css      # Studio Audio Suite, đĩa than & equalizer
│   └── style-responsive.css # Breakpoint di động & tablet tối ưu
├── js/
│   ├── config.js            # Dữ liệu thương hiệu, 6 personas, 33 bài hát
│   ├── stars.js             # Canvas bụi sao nhẹ nhàng, tiết kiệm năng lượng
│   ├── avatar.js            # Bộ máy chuyển đổi persona & đồng bộ giao diện
│   ├── music.js             # Trình phát nhạc Studio, Web Audio EQ & tìm kiếm
│   └── features.js          # Chế độ Sáng/Tối, sao chép liên kết & phím tắt
├── music/                   # 33 file nhạc MP3 tuyển chọn
├── index.html               # File HTML chính
├── manifest.webmanifest     # Cấu hình PWA
└── vercel.json              # Cấu hình triển khai Vercel
```

---

© 2026 MAHIKARI STUDIO. ALL RIGHTS RESERVED.
