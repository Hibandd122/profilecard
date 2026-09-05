/* ===== CẤU HÌNH MAHIKARI COSMIC PROFILE CARD V11.0 ===== */
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
        "Ara ara~ Dạo bước cùng em qua triệu vì tinh tú nhé! ✨",
        "Oni-chan baka! (⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄) Cố gắng hôm nay nha!",
        "Kyou mo ganbatte ne! 🌸 Giai điệu vũ trụ luôn bên bạn.",
        "Nyan nyan~ 🐾 Âm nhạc lofi và waifu chữa lành tâm hồn.",
        "Let's explore the endless cosmos together~ 🌌",
        "Ánh sao lấp lánh phản chiếu nụ cười của em giữa màn đêm ✨",
        "Vũ trụ bao la nhưng tim em chỉ có một tọa độ dành cho người 💫"
    ],

    favicon: {
        enabled: true,
        fallback: "assets/avatar1.png"
    },

    // Danh sách bài hát phân loại theo Mục 1 (Thiên sứ nhà bên) và Mục 2 (CPK)
    music: {
        categories: [
            { id: "all", name: "Tất cả", icon: "fa-layer-group" },
            { id: "angel", name: "Mục 1: Thiên Sứ", icon: "fa-feather-alt" },
            { id: "cpk", name: "Mục 2: CPK", icon: "fa-bolt" }
        ],
        playlist: [
            // --- MỤC 1: THIÊN SỨ NHÀ BÊN (IWAMI MANAKA) ---
            { id: 1, name: "Chiisana Koi no Uta", artist: "Iwami Manaka", category: "angel", categoryLabel: "Thiên Sứ", file: "music/angel_01_Chiisana_Koi_no_Uta.mp3", duration: "3:38" },
            { id: 2, name: "Ai Uta", artist: "Iwami Manaka", category: "angel", categoryLabel: "Thiên Sứ", file: "music/angel_02_Ai_Uta.mp3", duration: "4:02" },
            { id: 3, name: "Chiisana Koi no Uta (Inst.)", artist: "Iwami Manaka", category: "angel", categoryLabel: "Thiên Sứ", file: "music/angel_03_Chiisana_Koi_no_Uta_Inst.mp3", duration: "3:38" },
            { id: 4, name: "Ai Uta (Inst.)", artist: "Iwami Manaka", category: "angel", categoryLabel: "Thiên Sứ", file: "music/angel_04_Ai_Uta_Inst.mp3", duration: "4:02" },
            { id: 5, name: "Kimi ni Todoke (Inst.)", artist: "Iwami Manaka", category: "angel", categoryLabel: "Thiên Sứ", file: "music/angel_05_Kimi_ni_Todoke_Inst.mp3", duration: "4:15" },
            { id: 6, name: "Valentine Kiss (Inst.)", artist: "Iwami Manaka", category: "angel", categoryLabel: "Thiên Sứ", file: "music/angel_06_Valentine_Kiss_Inst.mp3", duration: "3:40" },
            { id: 7, name: "Gift (Inst.)", artist: "Iwami Manaka", category: "angel", categoryLabel: "Thiên Sứ", file: "music/angel_07_Gift_Inst.mp3", duration: "4:28" },
            
            // --- MỤC 2: CPK COLLECTION ---
            { id: 8, name: "ワールドイズマイン (World is Mine)", artist: "supercell feat. 初音ミク", category: "cpk", categoryLabel: "CPK", file: "music/ワールドイズマイン.mp3", duration: "4:12" },
            { id: 9, name: "melt (メルト)", artist: "supercell feat. 初音ミク", category: "cpk", categoryLabel: "CPK", file: "music/melt.mp3", duration: "4:17" },
            { id: 10, name: "Tell Your World", artist: "kz (livetune) feat. 初音ミク", category: "cpk", categoryLabel: "CPK", file: "music/Tell Your World.mp3", duration: "4:18" },
            { id: 11, name: "ray", artist: "BUMP OF CHICKEN feat. HATSUNE MIKU", category: "cpk", categoryLabel: "CPK", file: "music/ray.mp3", duration: "4:56" },
            { id: 12, name: "ハッピーシンセサイザ (Happy Synthesizer)", artist: "EasyPop feat. Megurine Luka & GUMI", category: "cpk", categoryLabel: "CPK", file: "music/ハッピーシンセサイザ.mp3", duration: "3:58" },
            { id: 13, name: "Remember", artist: "Anime OST", category: "cpk", categoryLabel: "CPK", file: "music/Remember.mp3", duration: "3:45" },
            { id: 14, name: "トリノコシティ (Torinoko City)", artist: "40mP feat. 初音ミク", category: "cpk", categoryLabel: "CPK", file: "music/トリノコシティ.mp3", duration: "3:30" },
            { id: 15, name: "竹取オーバーナイトセンセーション", artist: "HoneyWorks", category: "cpk", categoryLabel: "CPK", file: "music/竹取オーバーナイトセンセーション.mp3", duration: "4:32" },
            { id: 16, name: "Ex-Otogibanashi", artist: "CPK Original", category: "cpk", categoryLabel: "CPK", file: "music/Ex-Otogibanashi.mp3", duration: "3:50" },
            { id: 17, name: "Full Moon Serenade", artist: "CPK Original", category: "cpk", categoryLabel: "CPK", file: "music/Full Moon Serenade.mp3", duration: "4:48" },
            { id: 18, name: "FUSHI", artist: "CPK Original", category: "cpk", categoryLabel: "CPK", file: "music/FUSHI.mp3", duration: "3:10" },
            { id: 19, name: "IROHA meets KAGUyA", artist: "CPK Original", category: "cpk", categoryLabel: "CPK", file: "music/IROHA meets KAGUyA.mp3", duration: "3:42" },
            { id: 20, name: "IROHA'S Dancing All Night", artist: "CPK Original", category: "cpk", categoryLabel: "CPK", file: "music/IROHA'S Dancing All Night.mp3", duration: "3:05" },
            { id: 21, name: "OnyXXX", artist: "CPK Original", category: "cpk", categoryLabel: "CPK", file: "music/OnyXXX.mp3", duration: "3:22" },
            { id: 22, name: "Reply", artist: "CPK Original", category: "cpk", categoryLabel: "CPK", file: "music/Reply.mp3", duration: "4:15" },
            { id: 23, name: "TSUKUYOMI", artist: "CPK Original", category: "cpk", categoryLabel: "CPK", file: "music/TSUKUYOMI.mp3", duration: "3:36" },
            { id: 24, name: "うつし世の姫 (Princess of the World)", artist: "CPK Original", category: "cpk", categoryLabel: "CPK", file: "music/うつし世の姫.mp3", duration: "3:18" },
            { id: 25, name: "ヤチヨカップ優勝！", artist: "CPK Original", category: "cpk", categoryLabel: "CPK", file: "music/ヤチヨカップ優勝！.mp3", duration: "4:20" },
            { id: 26, name: "ヤチヨ絵巻", artist: "CPK Original", category: "cpk", categoryLabel: "CPK", file: "music/ヤチヨ絵巻.mp3", duration: "3:12" },
            { id: 27, name: "ロンリーユニバース (Lonely Universe)", artist: "CPK Original", category: "cpk", categoryLabel: "CPK", file: "music/ロンリーユニバース.mp3", duration: "4:25" },
            { id: 28, name: "夢をみる島 (Dreaming Island)", artist: "CPK Original", category: "cpk", categoryLabel: "CPK", file: "music/夢をみる島.mp3", duration: "4:10" },
            { id: 29, name: "星降る海 (Sea of Falling Stars)", artist: "CPK Original", category: "cpk", categoryLabel: "CPK", file: "music/星降る海.mp3", duration: "4:08" },
            { id: 30, name: "瞬間、シンフォニー", artist: "CPK Original", category: "cpk", categoryLabel: "CPK", file: "music/瞬間、シンフォニー.mp3", duration: "4:14" },
            { id: 31, name: "私は、わたしの事が好き", artist: "CPK Original", category: "cpk", categoryLabel: "CPK", file: "music/私は、わたしの事が好き.mp3", duration: "4:05" },
            { id: 32, name: "超かぐや姫！", artist: "CPK Original", category: "cpk", categoryLabel: "CPK", file: "music/超かぐや姫！.mp3", duration: "3:20" },
            { id: 33, name: "零ゆる光彩", artist: "CPK Original", category: "cpk", categoryLabel: "CPK", file: "music/零ゆる光彩.mp3", duration: "3:52" }
        ],
        defaultVolume: 45,
        enablePulse: true,
        autoPlayOnEnter: true
    },

    // Hiệu ứng hạt và nền
    effects: {
        stars: true,
        shootingStars: true,
        nebula: true,
        sfx: true,
        tilt3D: false
    },

    // Thời gian tính toán & chuyển đổi
    intervals: {
        quoteRotation: 9000
    },

    ui: {
        enableTilt: false,
        enableGlow: true,
        enableRgbBorder: true,
        enableSfx: true
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
            {
                id: 0,
                name: "Shiina Mahiru",
                title: "The Angel Next Door",
                icon: "fa-feather-alt",
                color: "#fbbf24",
                secondaryColor: "#f59e0b",
                accentGlow: "rgba(251, 191, 36, 0.45)",
                particleType: "feather",
                rank: 1,
                affection: 100,
                role: "Angel of Light",
                image: "assets/avatar1.png",
                banner: "assets/bannertop1.jpg",
                bannerPhone: "assets/bannertop1_phone.jpg"
            },
            {
                id: 1,
                name: "Kaguya",
                title: "Love is War",
                icon: "fa-moon",
                color: "#fde047",
                secondaryColor: "#f43f5e",
                accentGlow: "rgba(253, 224, 71, 0.45)",
                particleType: "moon",
                rank: 2,
                affection: 96,
                role: "Moonlight Empress",
                image: "assets/avatar2.png",
                banner: "assets/bannertop2.jpg",
                bannerPhone: "assets/bannertop2_phone.jpg"
            },
            {
                id: 2,
                name: "Yachiyo Runami",
                title: "Cosmic Maiden",
                icon: "fa-star",
                color: "#60a5fa",
                secondaryColor: "#818cf8",
                accentGlow: "rgba(96, 165, 250, 0.45)",
                particleType: "star",
                rank: 3,
                affection: 93,
                role: "Astral Navigator",
                image: "assets/avatar3.png",
                banner: "assets/bannertop3.jpg",
                bannerPhone: "assets/bannertop3_phone.jpg"
            },
            {
                id: 3,
                name: "Elfaria Albis Serfort",
                title: "Ice Magia Vende",
                icon: "fa-snowflake",
                color: "#38bdf8",
                secondaryColor: "#a5f3fc",
                accentGlow: "rgba(56, 189, 248, 0.45)",
                particleType: "crystal",
                rank: 4,
                affection: 90,
                role: "Glacial Archmage",
                image: "assets/avatar4.png",
                banner: "assets/bannertop4.jpg",
                bannerPhone: "assets/bannertop4_phone.jpg"
            },
            {
                id: 4,
                name: "Kagari Fuyukawa",
                title: "Neko Champion",
                icon: "fa-cat",
                color: "#f97316",
                secondaryColor: "#ef4444",
                accentGlow: "rgba(249, 115, 22, 0.45)",
                particleType: "flame",
                rank: 5,
                affection: 87,
                role: "Solar Vanguard",
                image: "assets/avatar5.png",
                banner: "assets/bannertop5.jpg",
                bannerPhone: "assets/bannertop5_phone.jpg"
            },
            {
                id: 5,
                name: "Hiura Mihate",
                title: "Sweet Heart",
                icon: "fa-heart",
                color: "#ec4899",
                secondaryColor: "#d946ef",
                accentGlow: "rgba(236, 72, 153, 0.45)",
                particleType: "heart",
                rank: 6,
                affection: 84,
                role: "Cyber Sweetheart",
                image: "assets/avatar6.png",
                banner: "assets/bannertop6.jpg",
                bannerPhone: "assets/bannertop6_phone.jpg"
            }
        ]
    }
};

if (!CONFIG.avatars || CONFIG.avatars.length === 0) {
    CONFIG.avatars = ["assets/avatar1.png"];
}