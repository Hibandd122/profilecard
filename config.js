/* ===== CẤU HÌNH NÂNG CẤP ===== */
const CONFIG = {
    avatars: ["assets/avatar.png", "assets/avatar2.png", "assets/avatar3.png", "assets/avatar4.png","assets/avatar5.png"],
    targetDate: "2026-04-03T18:30:00+07:00",
    roles: [
        "</> PYTHON DEVELOPER", 
        "🎮 ROBLOX PRO PLAYER", 
        "💖 WAIFU COLLECTOR", 
        "🎵 LOFI & CHILL",
        "✨ DREAMER & CREATOR",
        "🌙 LOST IN THE STARS"
    ],

    pageName: "Mahikari_Hola",

    favicon: {
        enabled: true,
        fallback: "assets/avatar.png"
    },

    music: {
        playlist: [
            { name: "Chiisana Koi no Uta", file: "assets/song1.mp3" },
            { name: "Remember", file: "assets/song2.mp3" },
            { name: "ハッピーシンセサイザ", file: "assets/song3.mp3" },
            { name: "World is Mine CPK!", file: "assets/song4.mp3" }
        ],
        defaultVolume: 45,
        enablePulse: true
    },

    effects: {
        stars: true,
        sparks: true,
        nebula: true,
        cosmicWhirl: true
    },

    intervals: {
        avatarRotation: 2000,
        typewriterSpeed: 80,
        typewriterPause: 2000,
        countdownUpdate: 1000
    },

    ui: {
        enableTilt: true,
        enableGlow: true,
        enableRgbBorder: true
    },

    social: {
        facebook: "https://www.facebook.com/profile.php?id=61582336522985",
        tiktok: "https://www.tiktok.com/@Mikagu_hola",
        discord: "https://discord.gg/NkbMV48zY6"
    },

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

// Tự động kiểm tra
if (!CONFIG.music.playlist || CONFIG.music.playlist.length === 0) {
    console.warn("⚠️ Playlist trống! Sử dụng playlist mặc định.");
    CONFIG.music.playlist = [
        { name: "Chiisana Koi no Uta", file: "assets/song1.mp3" },
        { name: "Remember", file: "assets/song2.mp3" },
        { name: "ハッピーシンセサイザ", file: "assets/song3.mp3" },
        { name: "World is Mine CPK!", file: "assets/song4.mp3" }
    ];
}

if (!CONFIG.avatars || CONFIG.avatars.length === 0) {
    console.warn("⚠️ Danh sách avatar trống! Sử dụng avatar mặc định.");
    CONFIG.avatars = ["assets/avatar.png"];
}