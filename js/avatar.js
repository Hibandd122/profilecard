/* ========================================================
   MAHIKARI AVATAR & ULTRA-SMOOTH PRE-CACHED BANNER ENGINE
======================================================== */
let avatarImg = null;
let avatarDotsContainer = null;
let discordAvatarImg = null;
let playerAlbumArt = null;

let currentAvatarIndex = 0;
let isAvatarAnimating = false;
let isForcedAvatar = false;
let rotationTimer = null;

// Preload toàn bộ Avatar và Banner vào RAM/GPU
function preloadAllAssets() {
    if (CONFIG.avatars) {
        CONFIG.avatars.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
}

// Khởi tạo và gán sẵn toàn bộ 6 hình nền Waifu vào 6 lớp GPU riêng biệt
function initWaifuBanners() {
    if (!CONFIG.waifu || !CONFIG.waifu.list) return;
    const isMobile = window.innerWidth <= 768;
    const bannerLayers = document.querySelectorAll('.banner-stage .banner-layer');

    bannerLayers.forEach((layer, idx) => {
        const waifu = CONFIG.waifu.list[idx];
        if (waifu) {
            const targetBg = (isMobile && waifu.bannerPhone) ? waifu.bannerPhone : waifu.banner;
            if (targetBg) {
                layer.style.backgroundImage = `url('${targetBg}')`;
                
                const pre = new Image();
                pre.src = targetBg;
                if (pre.decode) {
                    pre.decode().catch(() => {});
                }
            }
        }
    });
}

function initAvatarDots() {
    avatarDotsContainer = document.getElementById('avatar-dots');
    if (!avatarDotsContainer || !CONFIG.avatars) return;
    avatarDotsContainer.innerHTML = '';
    CONFIG.avatars.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.className = `dot ${idx === currentAvatarIndex ? 'active' : ''}`;
        dot.dataset.index = idx;
        dot.addEventListener('click', () => {
            setAvatar(idx);
            isForcedAvatar = true;
            setTimeout(() => { isForcedAvatar = false; }, 6000);
        });
        avatarDotsContainer.appendChild(dot);
    });
}

// Chuyển đổi Banner mượt mà 60/120fps
function updateWaifuBanner(currentIdx) {
    const bannerLayers = document.querySelectorAll('.banner-stage .banner-layer');
    if (!bannerLayers || bannerLayers.length === 0) return;

    bannerLayers.forEach(layer => {
        const layerIdx = parseInt(layer.getAttribute('data-index'), 10);
        layer.classList.toggle('active', layerIdx === currentIdx);
    });
}

function setAvatar(index) {
    avatarImg = document.getElementById('char-avatar');
    discordAvatarImg = document.getElementById('discord-avatar-img');
    playerAlbumArt = document.getElementById('player-album-art');
    avatarDotsContainer = document.getElementById('avatar-dots');

    if (!avatarImg || !CONFIG.avatars || CONFIG.avatars.length === 0) return;
    
    currentAvatarIndex = ((index % CONFIG.avatars.length) + CONFIG.avatars.length) % CONFIG.avatars.length;
    const targetSrc = CONFIG.avatars[currentAvatarIndex];
    
    // Hiệu ứng chuyển động Avatar Pop & Fade sắc nét
    avatarImg.style.opacity = '0.3';
    avatarImg.style.transform = 'translateX(-50%) scale(0.92)';
    
    setTimeout(() => {
        if (avatarImg) {
            avatarImg.src = targetSrc;
            avatarImg.style.opacity = '1';
            avatarImg.style.transform = 'translateX(-50%) scale(1)';
        }
    }, 120);

    if (discordAvatarImg) discordAvatarImg.src = targetSrc;
    if (playerAlbumArt) playerAlbumArt.src = targetSrc;

    // Cập nhật dots selector
    if (avatarDotsContainer) {
        const dots = avatarDotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentAvatarIndex);
        });
    }

    // Cập nhật banner to 16:9 / mobile phone dọc mượt mà 0ms độ trễ
    updateWaifuBanner(currentAvatarIndex);

    // Cập nhật waifu active state trong collection
    const waifuItems = document.querySelectorAll('.waifu-item');
    waifuItems.forEach((item, idx) => {
        item.classList.toggle('active-equipped', idx === currentAvatarIndex);
    });

    updateFavicon(targetSrc);
    updateTitle();
}

// Gán toàn cục để các file khác gọi trực tiếp
window.setAvatar = setAvatar;

function startAvatarRotation() {
    if (rotationTimer) clearInterval(rotationTimer);
    const intervalTime = (CONFIG.intervals && CONFIG.intervals.avatarRotation) ? CONFIG.intervals.avatarRotation : 3500;
    
    rotationTimer = setInterval(() => {
        if (!isForcedAvatar && !isAvatarAnimating) {
            setAvatar((currentAvatarIndex + 1) % CONFIG.avatars.length);
        }
    }, intervalTime);
}

function handleAvatarClick(e) {
    avatarImg = document.getElementById('char-avatar');
    if (!avatarImg || isAvatarAnimating) return;
    isAvatarAnimating = true;
    isForcedAvatar = true;

    // Chọn avatar ngẫu nhiên tiếp theo
    let nextIndex;
    do {
        nextIndex = Math.floor(Math.random() * CONFIG.avatars.length);
    } while (nextIndex === currentAvatarIndex && CONFIG.avatars.length > 1);

    setAvatar(nextIndex);
    avatarImg.classList.add('active-touch');

    // Tạo hiệu ứng tim bay nhẹ nhàng
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

    const count = window.innerWidth <= 768 ? 8 : 14;
    for (let i = 0; i < count; i++) {
        createHeartBurst(clientX + (Math.random() * 40 - 20), clientY + (Math.random() * 40 - 20));
    }

    setTimeout(() => {
        if (avatarImg) avatarImg.classList.remove('active-touch');
        isAvatarAnimating = false;
        setTimeout(() => { isForcedAvatar = false; }, 4000);
    }, 800);
}

function createHeartBurst(x, y) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '❤️';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.fontSize = `${Math.random() * 12 + 14}px`;
    heart.style.setProperty('--vx', `${Math.random() * 140 - 70}px`);
    heart.style.setProperty('--vy', `${Math.random() * -120 - 40}px`);
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 1200);
}

function updateFavicon(src) {
    if (!CONFIG.favicon || !CONFIG.favicon.enabled) return;
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }
    link.href = src || CONFIG.favicon.fallback;
}

function updateTitle() {
    const waifu = CONFIG.waifu && CONFIG.waifu.list ? CONFIG.waifu.list[currentAvatarIndex] : null;
    const prefix = waifu ? `${waifu.name} · ` : '';
    document.title = `${prefix}${CONFIG.name} · Profile Card`;
}

function initAvatarModule() {
    avatarImg = document.getElementById('char-avatar');
    if (avatarImg) {
        avatarImg.addEventListener('click', handleAvatarClick);
        avatarImg.addEventListener('touchstart', handleAvatarClick, { passive: true });
    }

    preloadAllAssets();
    initWaifuBanners();
    initAvatarDots();
    setAvatar(0);
    startAvatarRotation();
}

// Cập nhật khi xoay màn hình điện thoại
window.addEventListener('resize', () => {
    initWaifuBanners();
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAvatarModule);
} else {
    initAvatarModule();
}