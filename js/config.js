/* ===== CẤU HÌNH MAIKARI PROFILE CARD (GUNS.LOL STYLE) ===== */
const CONFIG = {
    // Thông tin định danh chính
    name: "Mahikari",
    handle: "@mahikari",
    tagline: "Cosmic Voyager · Developer · Anime Enthusiast",
    bio: "Exploring the endless cosmos with waifus & lo-fi beats ✨",

    // Danh sách avatar 6 nhân vật theo đúng thứ tự 1 -> 6
    avatars: [
        "assets/avatar1.png", // #1 Shiina Mahiru
        "assets/avatar2.png", // #2 Kaguya
        "assets/avatar3.png", // #3 Yachiyo Runami
        "assets/avatar4.png", // #4 Elfaria Albis Serfort
        "assets/avatar5.png", // #5 Kagari Fuyukawa
        "assets/avatar6.png"  // #6 Hiura Mihate
    ],

    // Banner mặc định và các banner theo waifu
    banners: {
        default: "assets/bannertop1.jpg",
        mahiru: "assets/bannertop1.jpg",
        kaguya: "assets/bannertop2.png",
        yachiyo: "assets/bannertop3.png",
        elfaria: "assets/bannertop4.jpg",
        kagari: "assets/bannertop5.jpg",
        mihate: "assets/bannertop6.jpg"
    },

    // Các vai trò / danh hiệu chạy hiệu ứng typewriter
    roles: [
        "Developer 💻",
        "Music Lover 🎵",
    ],

    // Danh ngôn ngẫu nhiên
    quotes: [
        "Ara ara~ ✨",
        "Oni-chan baka! (⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄)",
        "Kyou mo ganbatte ne! 🌸",
        "Nyan nyan~ 🐾",
        "Let's explore the cosmos together~ 🌌"
    ],

    favicon: {
        enabled: true,
        fallback: "assets/avatar1.png"
    },

    // Danh sách nhạc với 5 bài
    music: {
        playlist: [
            { name: "Chiisana Koi no Uta", artist: "MONGOL800 / Cover", file: "assets/song1.mp3" },
            { name: "うれしい！たのしい！大好き！", artist: "DREAMS COME TRUE", file: "assets/song2.mp3" },
            { name: "Remember", artist: "Anime OST", file: "assets/song3.mp3" },
            { name: "ハッピーシンセサイザ", artist: "EasyPop / Megurine Luka & GUMI", file: "assets/song4.mp3" },
            { name: "World is Mine CPK!", artist: "supercell feat. Hatsune Miku", file: "assets/song5.mp3" }
        ],
        defaultVolume: 45,
        enablePulse: true,
        autoPlayOnEnter: true
    },

    // Hiệu ứng hạt và nền
    effects: {
        stars: true,
        sparks: true,
        nebula: true,
        cosmicWhirl: true,
        cursorTrail: true,
        tilt3D: false // Tắt tilt theo yêu cầu
    },

    // Thời gian tính toán & chuyển đổi
    intervals: {
        avatarRotation: 3500,
        typewriterSpeed: 75,
        typewriterPause: 1800,
        countdownUpdate: 1000
    },

    ui: {
        enableTilt: false, // Tắt tilt theo yêu cầu
        enableGlow: true,
        enableRgbBorder: true
    },

    // Mạng xã hội / Bio links
    social: {
        facebook: "https://www.facebook.com/profile.php?id=61582336522985",
        tiktok: "https://www.tiktok.com/@mahikari_hola",
        discord: "https://discord.gg/NkbMV48zY6",
        github: "https://github.com/Hibandd122"
    },

    // Discord Rich Presence Widget mô phỏng phong cách guns.lol
    discordPresence: {
        username: "Mahikari",
        customStatus: "Vibing in the Cosmos ✨",
        gameName: "Genshin Impact",
        gameDetails: "Exploring Teyvat · AR 60",
        gameState: "In Party (4 of 4)",
        onlineStatus: "dnd" // 'online' | 'idle' | 'dnd'
    },

    // Bộ sưu tập Waifu (Xếp hạng với 6 nhân vật, avatar 1-6 và 6 banner tương ứng)
    waifu: {
        list: [
            { id: 0, name: "Shiina Mahiru", title: "The Angel Next Door", icon: "fa-feather-alt", color: "#fbbf24", rank: 1, affection: 100, image: "assets/avatar1.png", banner: "assets/bannertop1.jpg" },
            { id: 1, name: "Kaguya", title: "Love is War", icon: "fa-moon", color: "#f0e68c", rank: 2, affection: 96, image: "assets/avatar2.png", banner: "assets/bannertop2.png" },
            { id: 2, name: "Yachiyo Runami", title: "Cosmic Maiden", icon: "fa-star", color: "#60a5fa", rank: 3, affection: 93, image: "assets/avatar3.png", banner: "assets/bannertop3.png" },
            { id: 3, name: "Elfaria Albis Serfort", title: "Ice Magia Vende", icon: "fa-snowflake", color: "#38bdf8", rank: 4, affection: 90, image: "assets/avatar4.png", banner: "assets/bannertop4.jpg" },
            { id: 4, name: "Kagari Fuyukawa", title: "Neko Champion", icon: "fa-cat", color: "#f97316", rank: 5, affection: 87, image: "assets/avatar5.png", banner: "assets/bannertop5.jpg" },
            { id: 5, name: "Hiura Mihate", title: "Sweet Heart", icon: "fa-heart", color: "#ec4899", rank: 6, affection: 84, image: "assets/avatar6.png", banner: "assets/bannertop6.jpg" }
        ]
    }
};

// Fallback an toàn
if (!CONFIG.music.playlist || CONFIG.music.playlist.length === 0) {
    CONFIG.music.playlist = [
        { name: "Chiisana Koi no Uta", artist: "Cover", file: "assets/song1.mp3" },
        { name: "うれしい！たのしい！大好き！", artist: "DREAMS COME TRUE", file: "assets/song2.mp3" },
        { name: "Remember", artist: "Anime OST", file: "assets/song3.mp3" },
        { name: "ハッピーシンセサイザ", artist: "EasyPop", file: "assets/song4.mp3" },
        { name: "World is Mine CPK!", artist: "supercell", file: "assets/song5.mp3" }
    ];
}

if (!CONFIG.avatars || CONFIG.avatars.length === 0) {
    CONFIG.avatars = ["assets/avatar1.png"];
}