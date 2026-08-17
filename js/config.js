/* ===== CẤU HÌNH MAIKARI PROFILE CARD ===== */
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

    // Banner mặc định và các banner chuẩn 16:9 1920x1080 theo từng waifu
    banners: {
        default: "assets/bannertop1.jpg",
        mahiru: "assets/bannertop1.jpg",
        kaguya: "assets/bannertop2.jpg",
        yachiyo: "assets/bannertop3.jpg",
        elfaria: "assets/bannertop4.jpg",
        kagari: "assets/bannertop5.jpg",
        mihate: "assets/bannertop6.jpg"
    },

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

    // Danh sách bài hát (Đã chuyển toàn bộ sang MP3 trong folder music/)
    music: {
        playlist: [
            // --- MỤC 1: THIÊN SỨ NHÀ BÊN (IWAMI MANAKA) ---
            { name: "Chiisana Koi no Uta", artist: "Iwami Manaka (Thiên sứ nhà bên)", file: "music/angel_01_Chiisana_Koi_no_Uta.mp3" },
            { name: "Ai Uta", artist: "Iwami Manaka (Thiên sứ nhà bên)", file: "music/angel_02_Ai_Uta.mp3" },
            { name: "Chiisana Koi no Uta (Inst.)", artist: "Iwami Manaka (Thiên sứ nhà bên)", file: "music/angel_03_Chiisana_Koi_no_Uta_Inst.mp3" },
            { name: "Ai Uta (Inst.)", artist: "Iwami Manaka (Thiên sứ nhà bên)", file: "music/angel_04_Ai_Uta_Inst.mp3" },
            { name: "Kimi ni Todoke (Inst.)", artist: "Iwami Manaka (Thiên sứ nhà bên)", file: "music/angel_05_Kimi_ni_Todoke_Inst.mp3" },
            { name: "Valentine Kiss (Inst.)", artist: "Iwami Manaka (Thiên sứ nhà bên)", file: "music/angel_06_Valentine_Kiss_Inst.mp3" },
            { name: "Gift (Inst.)", artist: "Iwami Manaka (Thiên sứ nhà bên)", file: "music/angel_07_Gift_Inst.mp3" },
            
            // --- MỤC 2: CPK COLLECTION ---
            { name: "ワールドイズマイン (World is Mine)", artist: "supercell feat. 初音ミク (CPK)", file: "music/ワールドイズマイン.mp3" },
            { name: "melt (メルト)", artist: "supercell feat. 初音ミク (CPK)", file: "music/melt.mp3" },
            { name: "Tell Your World", artist: "kz (livetune) feat. 初音ミク (CPK)", file: "music/Tell Your World.mp3" },
            { name: "ray", artist: "BUMP OF CHICKEN feat. HATSUNE MIKU (CPK)", file: "music/ray.mp3" },
            { name: "ハッピーシンセサイザ", artist: "EasyPop (CPK)", file: "music/ハッピーシンセサイザ.mp3" },
            { name: "Remember", artist: "Anime OST (CPK)", file: "music/Remember.mp3" },
            { name: "トリノコシティ", artist: "40mP (CPK)", file: "music/トリノコシティ.mp3" },
            { name: "竹取オーバーナイトセンセーション", artist: "HoneyWorks (CPK)", file: "music/竹取オーバーナイトセンセーション.mp3" },
            { name: "Ex-Otogibanashi", artist: "CPK Original", file: "music/Ex-Otogibanashi.mp3" },
            { name: "Full Moon Serenade", artist: "CPK Original", file: "music/Full Moon Serenade.mp3" },
            { name: "FUSHI", artist: "CPK Original", file: "music/FUSHI.mp3" },
            { name: "IROHA meets KAGUyA", artist: "CPK Original", file: "music/IROHA meets KAGUyA.mp3" },
            { name: "IROHA'S Dancing All Night", artist: "CPK Original", file: "music/IROHA'S Dancing All Night.mp3" },
            { name: "OnyXXX", artist: "CPK Original", file: "music/OnyXXX.mp3" },
            { name: "Reply", artist: "CPK Original", file: "music/Reply.mp3" },
            { name: "TSUKUYOMI", artist: "CPK Original", file: "music/TSUKUYOMI.mp3" },
            { name: "うつし世の姫", artist: "CPK Original", file: "music/うつし世の姫.mp3" },
            { name: "ヤチヨカップ優勝！", artist: "CPK Original", file: "music/ヤチヨカップ優勝！.mp3" },
            { name: "ヤチヨ絵巻", artist: "CPK Original", file: "music/ヤチヨ絵巻.mp3" },
            { name: "ロンリーユニバース", artist: "CPK Original", file: "music/ロンリーユニバース.mp3" },
            { name: "夢をみる島", artist: "CPK Original", file: "music/夢をみる島.mp3" },
            { name: "星降る海", artist: "CPK Original", file: "music/星降る海.mp3" },
            { name: "瞬間、シンフォニー", artist: "CPK Original", file: "music/瞬間、シンフォニー.mp3" },
            { name: "私は、わたしの事が好き", artist: "CPK Original", file: "music/私は、わたしの事が好き.mp3" },
            { name: "超かぐや姫！", artist: "CPK Original", file: "music/超かぐや姫！.mp3" },
            { name: "零ゆる光彩", artist: "CPK Original", file: "music/零ゆる光彩.mp3" }
        ],
        defaultVolume: 45,
        enablePulse: true,
        autoPlayOnEnter: true
    },

    // Hiệu ứng hạt và nền
    effects: {
        stars: true,
        sparks: false,
        nebula: true,
        cosmicWhirl: false,
        cursorTrail: false,
        tilt3D: false
    },

    // Thời gian tính toán & chuyển đổi
    intervals: {
        avatarRotation: 3500
    },

    ui: {
        enableTilt: false,
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

    // Discord Rich Presence Widget
    discordPresence: {
        username: "Mahikari",
        customStatus: "Vibing in the Cosmos ✨",
        onlineStatus: "online"
    },

    // Bộ sưu tập Waifu (Chuẩn hóa 6 nhân vật, avatar 1-6, 6 banner 16:9 + 6 banner phone dọc)
    waifu: {
        list: [
            { id: 0, name: "Shiina Mahiru", title: "The Angel Next Door", icon: "fa-feather-alt", color: "#fbbf24", rank: 1, affection: 100, image: "assets/avatar1.png", banner: "assets/bannertop1.jpg", bannerPhone: "assets/bannertop1_phone.jpg" },
            { id: 1, name: "Kaguya", title: "Love is War", icon: "fa-moon", color: "#f0e68c", rank: 2, affection: 96, image: "assets/avatar2.png", banner: "assets/bannertop2.jpg", bannerPhone: "assets/bannertop2_phone.jpg" },
            { id: 2, name: "Yachiyo Runami", title: "Cosmic Maiden", icon: "fa-star", color: "#60a5fa", rank: 3, affection: 93, image: "assets/avatar3.png", banner: "assets/bannertop3.jpg", bannerPhone: "assets/bannertop3_phone.jpg" },
            { id: 3, name: "Elfaria Albis Serfort", title: "Ice Magia Vende", icon: "fa-snowflake", color: "#38bdf8", rank: 4, affection: 90, image: "assets/avatar4.png", banner: "assets/bannertop4.jpg", bannerPhone: "assets/bannertop4_phone.jpg" },
            { id: 4, name: "Kagari Fuyukawa", title: "Neko Champion", icon: "fa-cat", color: "#f97316", rank: 5, affection: 87, image: "assets/avatar5.png", banner: "assets/bannertop5.jpg", bannerPhone: "assets/bannertop5_phone.jpg" },
            { id: 5, name: "Hiura Mihate", title: "Sweet Heart", icon: "fa-heart", color: "#ec4899", rank: 6, affection: 84, image: "assets/avatar6.png", banner: "assets/bannertop6.jpg", bannerPhone: "assets/bannertop6_phone.jpg" }
        ]
    }
};

if (!CONFIG.avatars || CONFIG.avatars.length === 0) {
    CONFIG.avatars = ["assets/avatar1.png"];
}