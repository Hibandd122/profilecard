/* ===== CẤU HÌNH NÂNG CẤP ===== */
const CONFIG = {
    // ===== CẤU HÌNH CƠ BẢN (GIỮ NGUYÊN) =====
    avatars: ["avatar.png", "avatar2.png", "avatar3.png", "avatar4.png"],
    targetDate: "2026-04-03T18:30:00+07:00",
    roles: ["</> PYTHON CODER", "🎮 ROBLOX GAMER", "💖 WAIFU COLLECTOR", "🎵 LOFI CHILL"],

    // ===== CẤU HÌNH TRANG =====
    pageName: "Mikagu_Hola",                // Tên trang (dùng cho title động)

    // ===== CẤU HÌNH FAVICON =====
    favicon: {
        enabled: true,                      // true: favicon động theo avatar, false: dùng ảnh cố định
        fallback: "avatar.png"               // Ảnh mặc định nếu tắt chế độ động
    },

    // ===== CẤU HÌNH NHẠC =====
    music: {
        playlist: [                          // Danh sách phát
            { name: "Chiisana Koi no Uta", file: "song1.mp3" },
            { name: "Remember", file: "song2.mp3" },
            { name: "ハッピーシンセサイザ", file: "song3.mp3" },
            { name: "World is Mine CPK!", file: "song4.mp3" }
        ],
        defaultVolume: 45,                   // Âm lượng mặc định (0-100)
        enablePulse: true                     // Hiệu ứng rung theo nhạc
    },

    // ===== CẤU HÌNH HIỆU ỨNG NỀN =====
    effects: {
        stars: true,                          // Bật/tắt nền sao
        sparks: true,                         // Bật/tắt hiệu ứng tia lửa (chỉ máy tính)
        nebula: true,                          // Bật/tắt tinh vân
        cosmicWhirl: true                      // Bật/tắt xoáy vũ trụ
    },

    // ===== CẤU HÌNH THỜI GIAN (ms) =====
    intervals: {
        avatarRotation: 2000,                  // Thời gian xoay avatar
        typewriterSpeed: 80,                    // Tốc độ gõ chữ
        typewriterPause: 2000,                  // Thời gian dừng khi gõ xong
        countdownUpdate: 1000                    // Tần suất cập nhật đếm ngược
    },

    // ===== CẤU HÌNH GIAO DIỆN =====
    ui: {
        enableTilt: true,                       // Hiệu ứng nghiêng 3D (máy tính)
        enableGlow: true,                        // Hiệu ứng phát sáng khi hover
        enableRgbBorder: true                     // Viền RGB chạy
    },

    // ===== CẤU HÌNH MẠNG XÃ HỘI =====
    social: {
        facebook: "https://www.facebook.com/profile.php?id=61582336522985",
        tiktok: "https://www.tiktok.com/@Mikagu_hola",
        discord: "https://discord.gg/NkbMV48zY6"
    },

    // ===== CẤU HÌNH WAIFU LIST (MỞ RỘNG) =====
    waifu: {
        list: [
            { name: "Shiina Mahiru", icon: "feather-alt", color: "#f5e6d3", rank: 1, affection: 100 },
            { name: "Kaguya", icon: "moon", color: "#f0e68c", rank: 2, affection: 96 },
            { name: "Yachiyo Runami", icon: "moon", color: "#f0e68c", rank: 3, affection: 93 },
            { name: "Kagari Fuyukawa", icon: "cat", color: "#ffaa66", rank: 4, affection: 89 },
            { name: "Hiura Mihate", icon: "heart", color: "#ff0099", rank: 5, affection: 86 }
        ]
    }
};

// ===== TỰ ĐỘNG KIỂM TRA VÀ SỬA LỖI =====
// Đảm bảo playlist luôn có dữ liệu
if (!CONFIG.music.playlist || CONFIG.music.playlist.length === 0) {
    console.warn("⚠️ Playlist trống! Sử dụng playlist mặc định.");
    CONFIG.music.playlist = [
        { name: "Chiisana Koi no Uta", file: "song1.mp3" },
        { name: "Remember", file: "song2.mp3" },
        { name: "ハッピーシンセサイザ", file: "song3.mp3" },
        { name: "World is Mine CPK!", file: "song4.mp3" }
    ];
}

// Đảm bảo danh sách avatar không rỗng
if (!CONFIG.avatars || CONFIG.avatars.length === 0) {
    console.warn("⚠️ Danh sách avatar trống! Sử dụng avatar mặc định.");
    CONFIG.avatars = ["avatar.png"];
}

// (Tùy chọn) Đóng băng đối tượng để tránh sửa đổi ngoài ý muốn
// Object.freeze(CONFIG);