/* ========================================================
   EXTENDED FEATURES & INTERACTION ENGINE V11.0
   - Web Audio Interactive Sound Effects (SFX Chimes)
   - 3D Gyroscope & Cursor Card Tilt with Spring Return
   - Dynamic Profile Share & QR Code Modal
   - Enhanced Live Vietnam Clock with Date & Timezone
   - Smooth Quote Shuffler & Splash Overlay
======================================================== */
(function() {
    'use strict';

    // 1. WEB AUDIO INTERACTIVE SOUND EFFECTS (SFX)
    let sfxCtx = null;
    let isSfxEnabled = localStorage.getItem('mahikari_sfx') !== 'false';

    function initSfxContext() {
        if (sfxCtx) return;
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) sfxCtx = new AudioCtx();
        } catch (_) {}
    }

    function playSfx(type) {
        if (!isSfxEnabled) return;
        initSfxContext();
        if (!sfxCtx) return;
        if (sfxCtx.state === 'suspended') sfxCtx.resume();

        const now = sfxCtx.currentTime;

        if (type === 'equip') {
            // Celestial 3-tone arpeggio chime
            const freqs = [587.33, 880.00, 1174.66]; // D5, A5, D6
            freqs.forEach((f, i) => {
                const osc = sfxCtx.createOscillator();
                const gain = sfxCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(f, now + i * 0.05);

                gain.gain.setValueAtTime(0, now + i * 0.05);
                gain.gain.linearRampToValueAtTime(0.08, now + i * 0.05 + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.05 + 0.35);

                osc.connect(gain);
                gain.connect(sfxCtx.destination);
                osc.start(now + i * 0.05);
                osc.stop(now + i * 0.05 + 0.36);
            });
        } else if (type === 'click') {
            // Soft cyber tick
            const osc = sfxCtx.createOscillator();
            const gain = sfxCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

            osc.connect(gain);
            gain.connect(sfxCtx.destination);
            osc.start(now);
            osc.stop(now + 0.05);
        } else if (type === 'success') {
            // Soft double chime
            [523.25, 659.25].forEach((f, i) => {
                const osc = sfxCtx.createOscillator();
                const gain = sfxCtx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(f, now + i * 0.08);

                gain.gain.setValueAtTime(0, now + i * 0.08);
                gain.gain.linearRampToValueAtTime(0.07, now + i * 0.08 + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.28);

                osc.connect(gain);
                gain.connect(sfxCtx.destination);
                osc.start(now + i * 0.08);
                osc.stop(now + i * 0.08 + 0.29);
            });
        }
    }

    window.playSfx = playSfx;

    function initSfxToggle() {
        const sfxBtn = document.getElementById('sfx-toggle');
        if (!sfxBtn) return;
        
        function updateSfxUI() {
            sfxBtn.innerHTML = isSfxEnabled ? '<i class="fas fa-volume-high"></i>' : '<i class="fas fa-volume-xmark"></i>';
            sfxBtn.setAttribute('title', isSfxEnabled ? 'Hiệu ứng âm thanh: BẬT' : 'Hiệu ứng âm thanh: TẮT');
            sfxBtn.classList.toggle('active', isSfxEnabled);
        }

        updateSfxUI();
        sfxBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            isSfxEnabled = !isSfxEnabled;
            localStorage.setItem('mahikari_sfx', isSfxEnabled ? 'true' : 'false');
            updateSfxUI();
            if (isSfxEnabled) playSfx('click');
            if (window.showPremiumToast) {
                window.showPremiumToast(isSfxEnabled ? 'Đã bật hiệu ứng âm thanh (SFX)' : 'Đã tắt hiệu ứng âm thanh', isSfxEnabled ? 'fa-volume-high' : 'fa-volume-xmark');
            }
        });
    }

    // 2. CLICK TO ENTER SPLASH OVERLAY
    function initSplashOverlay() {
        const startOverlay = document.getElementById('start-overlay');
        if (!startOverlay) return;

        startOverlay.addEventListener('click', () => {
            playSfx('click');
            if (window.playMusicFromStart) {
                window.playMusicFromStart();
            }
            startOverlay.classList.add('fade-out');
            setTimeout(() => {
                startOverlay.remove();
            }, 600);
        });
    }

    // 3. LIVE VIETNAM CLOCK (GMT+7)
    function initLiveClock() {
        const liveClockEl = document.getElementById('live-clock');
        const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

        function updateClock() {
            if (!liveClockEl) return;
            const now = new Date();
            const vnTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));
            const d = days[vnTime.getDay()];
            const h = String(vnTime.getHours()).padStart(2, '0');
            const m = String(vnTime.getMinutes()).padStart(2, '0');
            const s = String(vnTime.getSeconds()).padStart(2, '0');
            liveClockEl.innerText = `${d} · ${h}:${m}:${s}`;
        }
        updateClock();
        setInterval(updateClock, 1000);
    }

    // 4. CHẾ ĐỘ XEM TRỌN VẸN BANNER 16:9
    function initBannerMode() {
        const toggleBannerBtn = document.getElementById('toggle-banner-view');
        const bannerOverlay = document.getElementById('banner-mode-overlay');

        if (toggleBannerBtn) {
            toggleBannerBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                playSfx('click');
                document.body.classList.add('banner-view-mode');
                if (window.unlockAchievement) window.unlockAchievement('stargazer');
            });
        }

        if (bannerOverlay) {
            bannerOverlay.addEventListener('click', (e) => {
                e.stopPropagation();
                playSfx('click');
                document.body.classList.remove('banner-view-mode');
            });
        }

        document.addEventListener('click', () => {
            if (document.body.classList.contains('banner-view-mode')) {
                document.body.classList.remove('banner-view-mode');
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && document.body.classList.contains('banner-view-mode')) {
                document.body.classList.remove('banner-view-mode');
            }
        });
    }

    // 5. WAIFU COLLECTION GENERATOR & EQUIP INTERACTION
    function initWaifuCollection() {
        const waifuGrid = document.getElementById('waifu-grid');
        if (!waifuGrid || !CONFIG.waifu || !CONFIG.waifu.list) return;

        const savedIdx = parseInt(localStorage.getItem('saved_waifu_index') || '0', 10);
        waifuGrid.innerHTML = '';

        CONFIG.waifu.list.forEach((waifu, idx) => {
            const item = document.createElement('div');
            item.className = `waifu-item rank-${waifu.rank} ${idx === savedIdx ? 'active-equipped' : ''}`;
            item.title = `Click để trang bị avatar & banner ${waifu.name}`;
            item.setAttribute('role', 'button');
            item.setAttribute('tabindex', '0');
            item.setAttribute('aria-label', `Trang bị ${waifu.name}`);
            item.setAttribute('aria-pressed', idx === savedIdx ? 'true' : 'false');
            
            item.innerHTML = `
                <span class="waifu-rank">#${waifu.rank}</span>
                <div class="waifu-thumb-wrap">
                    <img src="${waifu.image}" alt="${waifu.name}" class="waifu-thumb">
                    <span class="waifu-pulse-dot" style="background: ${waifu.color}"></span>
                </div>
                <div class="waifu-info">
                    <div class="waifu-name-row">
                        <div class="waifu-name-left">
                            <span class="waifu-name">${waifu.name}</span>
                            <span class="waifu-tag-equipped">EQUIPPED</span>
                        </div>
                        <span class="waifu-percent">${waifu.affection}%</span>
                    </div>
                    <div class="waifu-role-tag">${waifu.role || waifu.title}</div>
                    <div class="waifu-bar">
                        <div class="waifu-fill" style="width: ${waifu.affection}%; background: linear-gradient(90deg, ${waifu.color}, ${waifu.secondaryColor || '#ec4899'}); box-shadow: 0 0 10px ${waifu.color}"></div>
                    </div>
                </div>
                <i class="fas ${waifu.icon}" style="color: ${waifu.color}"></i>
            `;

            item.addEventListener('click', () => {
                if (window.setAvatar) {
                    window.setAvatar(idx, true);
                }
            });

            item.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    item.click();
                }
            });

            waifuGrid.appendChild(item);
        });
    }

    // 7. QUOTE SHUFFLER
    function initQuoteShuffler() {
        const quoteText = document.getElementById('quote-text');
        const quoteRefreshBtn = document.getElementById('quote-refresh');
        let quoteIndex = 0;
        
        function nextQuote(manual = false) {
            if (!quoteText || !CONFIG.quotes || CONFIG.quotes.length === 0) return;
            if (manual) playSfx('click');
            quoteIndex = (quoteIndex + 1) % CONFIG.quotes.length;
            quoteText.style.opacity = '0';
            quoteText.style.transform = 'translateY(4px)';
            
            setTimeout(() => {
                quoteText.innerText = CONFIG.quotes[quoteIndex];
                quoteText.style.opacity = '1';
                quoteText.style.transform = 'translateY(0)';
            }, 180);
        }

        if (quoteRefreshBtn) {
            quoteRefreshBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                nextQuote(true);
            });
        }

        setInterval(() => nextQuote(false), CONFIG.intervals?.quoteRotation || 9000);
    }

    // 8. PROFILE QR CODE MODAL
    function initQrModal() {
        const qrBtn = document.getElementById('qr-modal-btn');
        const qrModal = document.getElementById('qr-modal');
        const qrClose = document.getElementById('qr-modal-close');
        const qrCanvas = document.getElementById('qr-canvas');

        if (!qrModal) return;

        function openModal() {
            playSfx('click');
            qrModal.classList.add('active');
            renderQrCode();
        }

        function closeModal() {
            qrModal.classList.remove('active');
        }

        if (qrBtn) qrBtn.addEventListener('click', openModal);
        if (qrClose) qrClose.addEventListener('click', closeModal);

        qrModal.addEventListener('click', (e) => {
            if (e.target === qrModal) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && qrModal.classList.contains('active')) {
                closeModal();
            }
        });

        // Tự tạo mã QR vũ trụ trên canvas
        function renderQrCode() {
            if (!qrCanvas) return;
            const ctx = qrCanvas.getContext('2d');
            const size = 180;
            qrCanvas.width = size;
            qrCanvas.height = size;

            // Nền tối
            ctx.fillStyle = '#0a0e1c';
            ctx.fillRect(0, 0, size, size);

            // Dùng API tạo QR ảnh thực từ URL hiện tại
            const profileUrl = encodeURIComponent(window.location.href);
            const qrImg = new Image();
            qrImg.crossOrigin = 'anonymous';
            qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${profileUrl}&color=00f2fe&bgcolor=0a0e1c&margin=2`;
            qrImg.onload = () => {
                ctx.drawImage(qrImg, 0, 0, size, size);
            };
            qrImg.onerror = () => {
                // Fallback minh họa phong cách Cyber QR
                ctx.fillStyle = '#00f2fe';
                ctx.font = '12px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('MAHIKARI QR', size / 2, size / 2);
            };
        }
    }

    // 8. HỆ THỐNG THÀNH TỰU (COSMIC ACHIEVEMENTS)
    function initAchievementsSystem() {
        const modal = document.getElementById('achievements-modal');
        const openBtn = document.getElementById('achievements-modal-btn');
        const closeBtn = document.getElementById('achievements-modal-close');
        const listEl = document.getElementById('achievements-list');

        function getUnlocked() {
            try {
                const raw = localStorage.getItem('mahikari_achievements');
                return raw ? JSON.parse(raw) : [];
            } catch (_) {
                return [];
            }
        }

        function saveUnlocked(arr) {
            try {
                localStorage.setItem('mahikari_achievements', JSON.stringify(arr));
            } catch (_) {}
        }

        function renderAchievements() {
            if (!listEl || !CONFIG.achievements) return;
            listEl.innerHTML = '';
            const unlocked = getUnlocked();

            CONFIG.achievements.forEach(ach => {
                const isUnlocked = unlocked.includes(ach.id);
                const card = document.createElement('div');
                card.className = `achievement-card ${isUnlocked ? 'unlocked' : ''}`;
                card.innerHTML = `
                    <div class="achievement-icon-wrap">
                        <i class="fas ${ach.icon}"></i>
                    </div>
                    <div class="achievement-info">
                        <span class="achievement-title">${ach.title}</span>
                        <span class="achievement-desc">${ach.desc}</span>
                    </div>
                    <span class="achievement-status">${isUnlocked ? '✓ MỞ KHÓA' : 'CHƯA ĐẠT'}</span>
                `;
                listEl.appendChild(card);
            });
        }

        window.unlockAchievement = function(id) {
            const unlocked = getUnlocked();
            if (unlocked.includes(id)) return;
            unlocked.push(id);
            saveUnlocked(unlocked);

            const ach = CONFIG.achievements?.find(a => a.id === id);
            if (ach) {
                if (window.playSfx) window.playSfx('success');
                if (window.showPremiumToast) {
                    window.showPremiumToast(`Mở khóa danh hiệu: ${ach.title}!`, 'fa-award');
                }
            }
            renderAchievements();
        };

        if (openBtn) {
            openBtn.addEventListener('click', () => {
                playSfx('click');
                renderAchievements();
                modal?.classList.add('active');
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal?.classList.remove('active');
            });
        }

        modal?.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modal?.classList.remove('active');
            }
        });

        renderAchievements();
    }

    function init() {
        initSfxContext();
        initSfxToggle();
        initSplashOverlay();
        initLiveClock();
        initBannerMode();
        initWaifuCollection();
        initQuoteShuffler();
        initQrModal();
        initAchievementsSystem();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
