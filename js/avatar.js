/* ========================================================
   MAHIKARI AVATAR & ULTRA-SMOOTH PRE-CACHED BANNER ENGINE
======================================================== */
const avatarImg = document.getElementById('char-avatar');
const avatarDotsContainer = document.getElementById('avatar-dots');
const discordAvatarImg = document.getElementById('discord-avatar-img');
const playerAlbumArt = document.getElementById('player-album-art');

let currentAvatarIndex = 0;
let isAvatarAnimating = false;

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
                
                // Preload và decode vào GPU VRAM trước
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
    if (!avatarDotsContainer || !CONFIG.avatars) return;
    avatarDotsContainer.innerHTML = '';
    CONFIG.avatars.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.className = `dot ${idx === currentAvatarIndex ? 'active' : ''}`;
        dot.dataset.index = idx;
        dot.addEventListener('click', () => {
            setAvatar(idx);
        });
        avatarDotsContainer.appendChild(dot);
    });
}

// Chuyển đổi Banner mượt mà 60/120fps (Chỉ thay đổi opacity của lớp GPU đã tải sẵn)
function updateWaifuBanner(currentIdx) {
    const bannerLayers = document.querySelectorAll('.banner-stage .banner-layer');
    if (!bannerLayers || bannerLayers.length === 0) return;

    bannerLayers.forEach(layer => {
        const layerIdx = parseInt(layer.getAttribute('data-index'), 10);
        layer.classList.toggle('active', layerIdx === currentIdx);
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

function handleAvatarClick(e) {
    if (!avatarImg || isAvatarAnimating) return;
    isAvatarAnimating = true;

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
        avatarImg.classList.remove('active-touch');
        isAvatarAnimating = false;
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

// Lắng nghe sự kiện
if (avatarImg) {
    avatarImg.addEventListener('click', handleAvatarClick);
    avatarImg.addEventListener('touchstart', handleAvatarClick, { passive: true });
}

// Cập nhật khi xoay màn hình điện thoại
window.addEventListener('resize', () => {
    initWaifuBanners();
});

// Khởi chạy ngay lập tức
initWaifuBanners();
initAvatarDots();
setAvatar(0);