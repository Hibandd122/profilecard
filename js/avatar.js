/* ========================================================
   MAHIKARI AVATAR & WAIFU REACTIVE THEME ENGINE V11.0
======================================================== */
(function() {
    'use strict';

    let avatarImg = null;
    let avatarDotsContainer = null;
    let discordAvatarImg = null;
    let playerAlbumArt = null;
    let bannerMode = null;
    let avatarChangeToken = 0;
    let isAvatarAnimating = false;

    function safeStorageGet(key) {
        try { return localStorage.getItem(key); } catch (_) { return null; }
    }

    function safeStorageSet(key, value) {
        try { localStorage.setItem(key, value); } catch (_) { /* private mode */ }
    }

    let currentAvatarIndex = parseInt(safeStorageGet('saved_waifu_index') || '0', 10);
    if (isNaN(currentAvatarIndex) || currentAvatarIndex < 0 || (CONFIG.avatars && currentAvatarIndex >= CONFIG.avatars.length)) {
        currentAvatarIndex = 0;
    }

    // Preload toàn bộ Avatar và Banner vào RAM/GPU
    function preloadAllAssets() {
        if (!CONFIG.avatars || CONFIG.avatars.length === 0) return;
        const saveData = Boolean(navigator.connection && navigator.connection.saveData);
        const firstWave = CONFIG.avatars.slice(0, saveData ? 1 : 3);
        firstWave.forEach(src => {
            const img = new Image();
            img.decoding = 'async';
            img.fetchPriority = 'high';
            img.src = src;
        });

        const idle = window.requestIdleCallback || ((callback) => window.setTimeout(callback, 200));
        idle(() => {
            CONFIG.avatars.slice(firstWave.length).forEach(src => {
                const img = new Image();
                img.decoding = 'async';
                img.src = src;
            });
        });
    }

    // Khởi tạo và gán sẵn toàn bộ 6 hình nền Waifu vào 6 lớp GPU riêng biệt
    function initWaifuBanners() {
        if (!CONFIG.waifu || !CONFIG.waifu.list) return;
        const isMobile = window.innerWidth <= 768;
        const nextMode = isMobile ? 'mobile' : 'desktop';
        if (bannerMode === nextMode) return;
        bannerMode = nextMode;
        const bannerLayers = document.querySelectorAll('.banner-stage .banner-layer');

        bannerLayers.forEach((layer, idx) => {
            const waifu = CONFIG.waifu.list[idx];
            if (waifu) {
                const targetBg = (isMobile && waifu.bannerPhone) ? waifu.bannerPhone : waifu.banner;
                if (targetBg) {
                    layer.style.backgroundImage = `url('${targetBg}')`;
                    const pre = new Image();
                    pre.decoding = 'async';
                    pre.src = targetBg;
                    if (pre.decode) pre.decode().catch(() => {});
                }
            }
        });

        const active = CONFIG.waifu.list[currentAvatarIndex];
        if (active) {
            const activeSrc = (isMobile && active.bannerPhone) ? active.bannerPhone : active.banner;
            const activeLayer = document.querySelector(`.banner-layer[data-index="${currentAvatarIndex}"]`);
            if (activeLayer && activeSrc) activeLayer.style.backgroundImage = `url('${activeSrc}')`;
        }
    }

    function initAvatarDots() {
        avatarDotsContainer = document.getElementById('avatar-dots');
        if (!avatarDotsContainer || !CONFIG.avatars) return;
        avatarDotsContainer.innerHTML = '';
        CONFIG.avatars.forEach((_, idx) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = `dot ${idx === currentAvatarIndex ? 'active' : ''}`;
            dot.dataset.index = idx;
            const waifu = CONFIG.waifu && CONFIG.waifu.list ? CONFIG.waifu.list[idx] : null;
            dot.setAttribute('aria-label', `Chọn avatar ${waifu ? waifu.name : idx + 1}`);
            dot.title = waifu ? `${waifu.name} (${waifu.title})` : `Avatar ${idx + 1}`;
            dot.addEventListener('click', () => {
                setAvatar(idx, true);
            });
            avatarDotsContainer.appendChild(dot);
        });
    }

    function updateWaifuBanner(currentIdx) {
        const bannerLayers = document.querySelectorAll('.banner-stage .banner-layer');
        if (!bannerLayers || bannerLayers.length === 0) return;

        bannerLayers.forEach(layer => {
            const layerIdx = parseInt(layer.getAttribute('data-index'), 10);
            layer.classList.toggle('active', layerIdx === currentIdx);
        });
    }

    // Cập nhật Dynamic Theme màu sắc toàn hệ thống theo Waifu
    function applyWaifuTheme(waifu) {
        if (!waifu) return;
        const root = document.documentElement;
        root.style.setProperty('--waifu-color', waifu.color);
        root.style.setProperty('--waifu-secondary', waifu.secondaryColor || '#ec4899');
        root.style.setProperty('--waifu-glow', waifu.accentGlow || 'rgba(0, 242, 254, 0.4)');
        root.style.setProperty('--waifu-gradient', `linear-gradient(135deg, ${waifu.color}, ${waifu.secondaryColor || '#ec4899'})`);

        // Cập nhật thẻ handle hoặc tagline nếu cần
        const handleTag = document.querySelector('.handle-tag');
        if (handleTag) {
            handleTag.style.borderColor = `${waifu.color}44`;
            handleTag.style.color = waifu.color;
            handleTag.style.background = `${waifu.color}15`;
        }
    }

    function setAvatar(index, triggerSound = false) {
        avatarImg = document.getElementById('char-avatar');
        discordAvatarImg = document.getElementById('discord-avatar-img');
        playerAlbumArt = document.getElementById('player-album-art');
        avatarDotsContainer = document.getElementById('avatar-dots');

        if (!CONFIG.avatars || CONFIG.avatars.length === 0) return;
        
        currentAvatarIndex = ((index % CONFIG.avatars.length) + CONFIG.avatars.length) % CONFIG.avatars.length;
        const targetSrc = CONFIG.avatars[currentAvatarIndex];
        const waifu = CONFIG.waifu && CONFIG.waifu.list ? CONFIG.waifu.list[currentAvatarIndex] : null;

        safeStorageSet('saved_waifu_index', currentAvatarIndex);
        const changeToken = ++avatarChangeToken;
        
        // Hiệu ứng chuyển động Avatar Pop & Fade sắc nét
        if (avatarImg) {
            avatarImg.style.opacity = '0.35';
            avatarImg.style.transform = 'translateX(-50%) scale(0.92)';
            
            setTimeout(() => {
                if (avatarImg && changeToken === avatarChangeToken) {
                    avatarImg.src = targetSrc;
                    avatarImg.decoding = 'async';
                    avatarImg.style.opacity = '1';
                    avatarImg.style.transform = 'translateX(-50%) scale(1)';
                }
            }, 100);
        }

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
            const isEquipped = idx === currentAvatarIndex;
            item.classList.toggle('active-equipped', isEquipped);
            item.setAttribute('aria-pressed', isEquipped ? 'true' : 'false');
        });

        // Áp dụng chủ đề màu sắc Waifu
        applyWaifuTheme(waifu);
        updateFavicon(targetSrc);
        updateTitle();

        // Âm thanh tương tác khi đổi waifu
        if (triggerSound && window.playSfx) {
            window.playSfx('equip');
        }

        document.dispatchEvent(new CustomEvent('mahikari:avatar-change', {
            detail: {
                index: currentAvatarIndex,
                waifu: waifu
            }
        }));
    }

    // Gán toàn cục để các file khác gọi trực tiếp
    window.setAvatar = setAvatar;

    const PARTICLE_EMOJIS = {
        feather: ['🪶', '💛', '✨', '🕊️'],
        moon: ['🌙', '⭐', '🌸', '💖'],
        star: ['⭐', '🌌', '✨', '💫'],
        crystal: ['❄️', '💎', '🧊', '✨'],
        flame: ['🔥', '⚡', '🐾', '✨'],
        heart: ['💖', '💕', '✨', '🍬']
    };

    function handleAvatarClick(e) {
        avatarImg = document.getElementById('char-avatar');
        if (!avatarImg || isAvatarAnimating) return;
        isAvatarAnimating = true;

        const nextIndex = (currentAvatarIndex + 1) % CONFIG.avatars.length;
        setAvatar(nextIndex, true);
        avatarImg.classList.add('active-touch');

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

        const waifu = CONFIG.waifu && CONFIG.waifu.list ? CONFIG.waifu.list[currentAvatarIndex] : null;
        const particleType = waifu ? waifu.particleType : 'heart';
        const icons = PARTICLE_EMOJIS[particleType] || PARTICLE_EMOJIS.heart;

        const count = window.innerWidth <= 768 ? 8 : 14;
        for (let i = 0; i < count; i++) {
            const chosenIcon = icons[Math.floor(Math.random() * icons.length)];
            createThemedBurst(clientX + (Math.random() * 40 - 20), clientY + (Math.random() * 40 - 20), chosenIcon, waifu ? waifu.color : '#ec4899');
        }

        setTimeout(() => {
            if (avatarImg) avatarImg.classList.remove('active-touch');
            isAvatarAnimating = false;
        }, 500);
    }

    function createThemedBurst(x, y, icon, glowColor) {
        const p = document.createElement('div');
        p.className = 'floating-heart';
        p.innerHTML = icon;
        p.style.left = `${x}px`;
        p.style.top = `${y}px`;
        p.style.fontSize = `${Math.random() * 12 + 16}px`;
        p.style.filter = `drop-shadow(0 0 10px ${glowColor})`;
        p.style.setProperty('--vx', `${Math.random() * 150 - 75}px`);
        p.style.setProperty('--vy', `${Math.random() * -130 - 45}px`);
        document.body.appendChild(p);

        setTimeout(() => {
            p.remove();
        }, 1150);
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
            avatarImg.setAttribute('tabindex', '0');
            avatarImg.setAttribute('role', 'button');
            avatarImg.setAttribute('aria-label', 'Đổi avatar & waifu');
            avatarImg.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleAvatarClick(event);
                }
            });
        }

        preloadAllAssets();
        initWaifuBanners();
        initAvatarDots();
        setAvatar(currentAvatarIndex, false);
    }

    let resizeTimer = null;
    window.addEventListener('resize', () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => initWaifuBanners(), 160);
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAvatarModule);
    } else {
        initAvatarModule();
    }
})();
