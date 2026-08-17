/* ========================================================
   MAHIKARI AVATAR MODULE (GUNS.LOL STYLE)
======================================================== */
const avatarImg = document.getElementById('char-avatar');
const avatarDotsContainer = document.getElementById('avatar-dots');
const discordAvatarImg = document.getElementById('discord-avatar-img');
const playerAlbumArt = document.getElementById('player-album-art');

let currentAvatarIndex = 0;
let rotationTimer = null;
let isForcedAvatar = false;
let isAvatarAnimating = false;

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

    // Cập nhật banner trên & banner nền theo waifu
    const waifu = CONFIG.waifu && CONFIG.waifu.list ? CONFIG.waifu.list[currentAvatarIndex] : null;
    if (waifu && waifu.banner) {
        const cardBanner = document.getElementById('card-banner');
        const cardBgBanner = document.getElementById('card-bg-banner');
        if (cardBanner) cardBanner.style.backgroundImage = `url('${waifu.banner}')`;
        if (cardBgBanner) cardBgBanner.style.backgroundImage = `url('${waifu.banner}')`;
    }

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
    document.title = `${CONFIG.name} · guns.lol biolink`;
}

if (avatarImg) {
    avatarImg.addEventListener('click', handleAvatarClick);
    avatarImg.addEventListener('touchstart', (e) => {
        handleAvatarClick(e);
    }, { passive: true });
}

// Khởi động
initAvatarDots();
setAvatar(0);
startAvatarRotation();