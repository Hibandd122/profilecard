/* ========================================================
   MAHIKARI AVATAR & SEAMLESS BANNER MODULE
======================================================== */
const avatarImg = document.getElementById('char-avatar');
const avatarDotsContainer = document.getElementById('avatar-dots');
const discordAvatarImg = document.getElementById('discord-avatar-img');
const playerAlbumArt = document.getElementById('player-album-art');

let currentAvatarIndex = 0;
let rotationTimer = null;
let isForcedAvatar = false;
let isAvatarAnimating = false;

let activeBannerLayer = 1;
let currentLoadedBanner = '';

// Preload toàn bộ 6 banner máy tính & 6 banner điện thoại vào RAM để chuyển ảnh 0ms giật lag
function preloadAllBanners() {
    if (!CONFIG.waifu || !CONFIG.waifu.list) return;
    CONFIG.waifu.list.forEach(w => {
        if (w.banner) {
            const img1 = new Image();
            img1.src = w.banner;
        }
        if (w.bannerPhone) {
            const img2 = new Image();
            img2.src = w.bannerPhone;
        }
        if (w.image) {
            const img3 = new Image();
            img3.src = w.image;
        }
    });
}

function initAvatarDots() {
    if (!avatarDotsContainer || !CONFIG.avatars) return;
    avatarDotsContainer.innerHTML = '';
    CONFIG.avatars.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.className = `dot ${idx === currentAvatarIndex ? 'active' : ''}`;
        dot.dataset.index = idx;
        dot.addEventListener('click', () => {
            setAvatar(idx);
            isForcedAvatar = true;
            setTimeout(() => { isForcedAvatar = false; }, 4000);
        });
        avatarDotsContainer.appendChild(dot);
    });
}

// Chuyển đổi Banner 2 lớp Cross-Fade triệt tiêu 100% hiện tượng chớp nháy / không banner
function updateWaifuBanner(currentIdx) {
    const waifu = CONFIG.waifu && CONFIG.waifu.list ? CONFIG.waifu.list[currentIdx] : null;
    if (!waifu) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const targetBanner = (isMobile && waifu.bannerPhone) ? waifu.bannerPhone : waifu.banner;
    if (!targetBanner) return;

    const layer1 = document.getElementById('banner-layer-1');
    const layer2 = document.getElementById('banner-layer-2');
    if (!layer1 || !layer2) return;

    if (currentLoadedBanner === targetBanner) return;
    currentLoadedBanner = targetBanner;

    const currentLayer = activeBannerLayer === 1 ? layer1 : layer2;
    const nextLayer = activeBannerLayer === 1 ? layer2 : layer1;

    // Đảm bảo ảnh đã tải xong rồi mới Cross-Fade chuyển lớp
    const imgLoader = new Image();
    imgLoader.onload = () => {
        nextLayer.style.backgroundImage = `url('${targetBanner}')`;
        nextLayer.classList.add('active');
        currentLayer.classList.remove('active');
        activeBannerLayer = activeBannerLayer === 1 ? 2 : 1;
    };
    imgLoader.src = targetBanner;
}

function setAvatar(index) {
    if (!avatarImg || !CONFIG.avatars || CONFIG.avatars.length === 0) return;
    
    currentAvatarIndex = ((index % CONFIG.avatars.length) + CONFIG.avatars.length) % CONFIG.avatars.length;
    const targetSrc = CONFIG.avatars[currentAvatarIndex];
    
    avatarImg.src = targetSrc;
    if (discordAvatarImg) discordAvatarImg.src = targetSrc;
    if (playerAlbumArt) playerAlbumArt.src = targetSrc;

    // Cập nhật dots selector
    if (avatarDotsContainer) {
        const dots = avatarDotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentAvatarIndex);
        });
    }

    // Cập nhật banner to 16:9 / mobile phone dọc theo waifu với Cross-Fade
    updateWaifuBanner(currentAvatarIndex);

    // Cập nhật waifu active state trong collection
    const waifuItems = document.querySelectorAll('.waifu-item');
    waifuItems.forEach((item, idx) => {
        item.classList.toggle('active-equipped', idx === currentAvatarIndex);
    });

    updateFavicon(targetSrc);
    updateTitle();
}

function startAvatarRotation() {
    if (!avatarImg || !CONFIG.intervals.avatarRotation) return;
    if (rotationTimer) clearInterval(rotationTimer);
    rotationTimer = setInterval(() => {
        if (!isForcedAvatar && !isAvatarAnimating) {
            setAvatar((currentAvatarIndex + 1) % CONFIG.avatars.length);
        }
    }, CONFIG.intervals.avatarRotation);
}

function handleAvatarClick(e) {
    if (!avatarImg || isAvatarAnimating) return;
    isAvatarAnimating = true;
    isForcedAvatar = true;

    // Chọn avatar ngẫu nhiên khác avatar hiện tại
    let nextIndex;
    do {
        nextIndex = Math.floor(Math.random() * CONFIG.avatars.length);
    } while (nextIndex === currentAvatarIndex && CONFIG.avatars.length > 1);

    setAvatar(nextIndex);
    avatarImg.classList.add('active-touch');

    // Tạo hiệu ứng chùm tim bay
    let clientX = e.clientX;
    let clientY = e.clientY;
    if (e.type === 'touchstart' && e.touches && e.touches[0]) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    }

    if (!clientX || !clientY) {
        const rect = avatarImg.getBoundingClientRect();
        clientX = rect.left + rect.width / 2;
        clientY = rect.top + rect.height / 2;
    }

    for (let i = 0; i < 16; i++) {
        createHeartBurst(clientX + (Math.random() * 50 - 25), clientY + (Math.random() * 50 - 25));
    }

    setTimeout(() => {
        avatarImg.classList.remove('active-touch');
        isForcedAvatar = false;
        isAvatarAnimating = false;
    }, 2000);
}

function createHeartBurst(x, y) {
    const heart = document.createElement('div');
    const icons = ['❤️', '💖', '💘', '💗', '💕', '✨'];
    heart.innerHTML = icons[Math.floor(Math.random() * icons.length)];
    heart.className = 'heart-pop';
    const rx = (Math.random() * 160 - 80);
    const ry = (Math.random() * 160 - 80);
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.setProperty('--x', rx + 'px');
    heart.style.setProperty('--y', ry + 'px');
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1200);
}

function updateFavicon(src) {
    if (!CONFIG.favicon || !CONFIG.favicon.enabled) return;
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
        link = document.createElement('link');
        link.type = 'image/png';
        link.rel = 'icon';
        document.head.appendChild(link);
    }
    link.href = src;
}

function updateTitle() {
    document.title = `${CONFIG.name} · Profile Card`;
}

if (avatarImg) {
    avatarImg.addEventListener('click', handleAvatarClick);
    avatarImg.addEventListener('touchstart', (e) => {
        handleAvatarClick(e);
    }, { passive: true });
}

// Lắng nghe xoay màn hình hoặc đổi kích thước để cập nhật banner tương thích
window.addEventListener('resize', () => {
    currentLoadedBanner = ''; // Buộc cập nhật lại nếu đổi breakpoint
    updateWaifuBanner(currentAvatarIndex);
});

// Khởi động
preloadAllBanners();
initAvatarDots();
setAvatar(0);
startAvatarRotation();