/* ========================================================
   MAHIKARI · BESPOKE DIGITAL IDENTITY & STUDIO CONFIG
   Luxury Creator Profile & Cosmic Audio Architecture
======================================================== */
const CONFIG = {
    // Brand & Identity Information
    brand: {
        monogram: "M",
        logoText: "MAHIKARI",
        subtitle: "CREATIVE TECHNOLOGIST & ARCHITECT",
        status: "Available for Projects",
        location: "Vietnam · GMT+7"
    },
    name: "Mahikari",
    handle: "@mahikari",
    title: "Creative Technologist · UI/UX Architect · Visual Explorer",
    bio: "Crafting bespoke digital artifacts, cinematic web aesthetics, and ambient sonic environments across the digital cosmos.",
    
    // 6 Persona Visual Themes (Avatars 1-6 with 16:9 Ultra HD Banners & Mobile Banners)
    personas: [
        {
            id: 0,
            key: "mahiru",
            name: "Shiina Mahiru",
            role: "Angel of Light",
            title: "The Angel Next Door",
            avatar: "assets/avatar1.png",
            banner: "assets/banner1.png",
            bannerPhone: "assets/bannertop1_phone.jpg",
            accent: "#fbbf24",
            accentSecondary: "#f59e0b",
            accentGlow: "rgba(251, 191, 36, 0.28)",
            quote: "Gentle warmth and melody beneath the quiet stars."
        },
        {
            id: 1,
            key: "kaguya",
            name: "Kaguya",
            role: "Moonlight Empress",
            title: "Love is War",
            avatar: "assets/avatar2.png",
            banner: "assets/bannertop2.jpg",
            bannerPhone: "assets/bannertop2_phone.jpg",
            accent: "#fde047",
            accentSecondary: "#f43f5e",
            accentGlow: "rgba(253, 224, 71, 0.28)",
            quote: "Pride and elegance etched into the midnight sky."
        },
        {
            id: 2,
            key: "yachiyo",
            name: "Yachiyo Runami",
            role: "Astral Navigator",
            title: "Cosmic Maiden",
            avatar: "assets/avatar3.png",
            banner: "assets/bannertop3.jpg",
            bannerPhone: "assets/bannertop3_phone.jpg",
            accent: "#60a5fa",
            accentSecondary: "#818cf8",
            accentGlow: "rgba(96, 165, 250, 0.28)",
            quote: "Galaxy coordinates locked. Let sound guide the voyage."
        },
        {
            id: 3,
            key: "elfaria",
            name: "Elfaria Albis Serfort",
            role: "Glacial Archmage",
            title: "Ice Magia Vende",
            avatar: "assets/avatar4.png",
            banner: "assets/banner4.png",
            bannerPhone: "assets/bannertop4_phone.jpg",
            accent: "#38bdf8",
            accentSecondary: "#a5f3fc",
            accentGlow: "rgba(56, 189, 248, 0.28)",
            quote: "Eternal frost crystalline harmony preserved in silence."
        },
        {
            id: 4,
            key: "kagari",
            name: "Kagari Fuyukawa",
            role: "Solar Vanguard",
            title: "Neko Champion",
            avatar: "assets/avatar5.png",
            banner: "assets/banner5.png",
            bannerPhone: "assets/bannertop5_phone.jpg",
            accent: "#f97316",
            accentSecondary: "#ef4444",
            accentGlow: "rgba(249, 115, 22, 0.28)",
            quote: "Ignite the cadence with radiant cosmic fire."
        },
        {
            id: 5,
            key: "mihate",
            name: "Hiura Mihate",
            role: "Cyber Sweetheart",
            title: "Sweet Heart",
            avatar: "assets/avatar6.png",
            banner: "assets/banner6.png",
            bannerPhone: "assets/bannertop6_phone.jpg",
            accent: "#ec4899",
            accentSecondary: "#d946ef",
            accentGlow: "rgba(236, 72, 153, 0.28)",
            quote: "Pure frequency resonance for modern dreamers."
        }
    ],

    // Backward compatibility references for existing scripts
    get avatars() {
        return this.personas.map(p => p.avatar);
    },
    get waifu() {
        return { list: this.personas };
    },

    // Curated 33-Track Cosmic Audio Collection
    music: {
        categories: [
            { id: "all", name: "All Tracks", icon: "fa-layer-group" },
            { id: "angel", name: "The Angel Next Door", icon: "fa-feather-alt" },
            { id: "cpk", name: "CPK Collection", icon: "fa-bolt" }
        ],
        playlist: [
            // --- SECTION 1: THE ANGEL NEXT DOOR (IWAMI MANAKA) ---
            { id: 1, name: "Chiisana Koi no Uta", artist: "Iwami Manaka", category: "angel", categoryLabel: "Thiên Sứ", file: "music/angel_01_Chiisana_Koi_no_Uta.mp3", duration: "3:38" },
            { id: 2, name: "Ai Uta", artist: "Iwami Manaka", category: "angel", categoryLabel: "Thiên Sứ", file: "music/angel_02_Ai_Uta.mp3", duration: "4:02" },
            { id: 3, name: "Chiisana Koi no Uta (Inst.)", artist: "Iwami Manaka", category: "angel", categoryLabel: "Thiên Sứ", file: "music/angel_03_Chiisana_Koi_no_Uta_Inst.mp3", duration: "3:38" },
            { id: 4, name: "Ai Uta (Inst.)", artist: "Iwami Manaka", category: "angel", categoryLabel: "Thiên Sứ", file: "music/angel_04_Ai_Uta_Inst.mp3", duration: "4:02" },
            { id: 5, name: "Kimi ni Todoke (Inst.)", artist: "Iwami Manaka", category: "angel", categoryLabel: "Thiên Sứ", file: "music/angel_05_Kimi_ni_Todoke_Inst.mp3", duration: "4:15" },
            { id: 6, name: "Valentine Kiss (Inst.)", artist: "Iwami Manaka", category: "angel", categoryLabel: "Thiên Sứ", file: "music/angel_06_Valentine_Kiss_Inst.mp3", duration: "3:40" },
            { id: 7, name: "Gift (Inst.)", artist: "Iwami Manaka", category: "angel", categoryLabel: "Thiên Sứ", file: "music/angel_07_Gift_Inst.mp3", duration: "4:28" },
            
            // --- SECTION 2: CPK COLLECTION ---
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
        defaultVolume: 45
    },

    // Audio Equalizer Presets
    audioFx: {
        presets: [
            { id: "hifi", name: "Studio Reference", icon: "fa-headphones", desc: "Transparent, linear studio response" },
            { id: "bass", name: "Low-End Warmth", icon: "fa-bolt", desc: "Enhanced analog sub-bass (+6dB)" },
            { id: "lofi", name: "Lo-Fi Tape", icon: "fa-record-vinyl", desc: "Vintage warmth & rolled-off highs" },
            { id: "vocal", name: "Acoustic Presence", icon: "fa-microphone", desc: "Forward vocal clarity & articulation" }
        ]
    },

    // Social Links
    social: [
        { key: "facebook", name: "Facebook", handle: "Mahikari", url: "https://www.facebook.com/profile.php?id=61582336522985", icon: "fab fa-facebook-f" },
        { key: "tiktok", name: "TikTok", handle: "@mahikari_hola", url: "https://www.tiktok.com/@mahikari_hola", icon: "fab fa-tiktok" },
        { key: "discord", name: "Discord", handle: "mahikari#0", url: "https://discord.gg/NkbMV48zY6", icon: "fab fa-discord" },
        { key: "github", name: "GitHub", handle: "Hibandd122", url: "https://github.com/Hibandd122", icon: "fab fa-github" }
    ]
};