/* ========================================================
   EXTENDED FEATURES & INTERACTION ENGINE
======================================================== */
document.addEventListener('DOMContentLoaded', () => {

    // 1. GUNS.LOL CLICK TO ENTER SPLASH OVERLAY
    const startOverlay = document.getElementById('start-overlay');
    if (startOverlay) {
        startOverlay.addEventListener('click', () => {
            if (window.playMusicFromStart) {
                window.playMusicFromStart();
            }
            startOverlay.classList.add('fade-out');
            setTimeout(() => {
                startOverlay.remove();
            }, 600);
        });
    }

    // 2. LIVE VIETNAM CLOCK (GMT+7)
    const liveClockEl = document.getElementById('live-clock');
    function updateClock() {
        if (!liveClockEl) return;
        const now = new Date();
        const vnTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));
        const h = String(vnTime.getHours()).padStart(2, '0');
        const m = String(vnTime.getMinutes()).padStart(2, '0');
        const s = String(vnTime.getSeconds()).padStart(2, '0');
        liveClockEl.innerText = `VN ${h}:${m}:${s}`;
    }
    updateClock();
    setInterval(updateClock, 1000);

    // 3. CHẾ ĐỘ XEM TRỌN VẸN BANNER 16:9 (BANNER VIEW MODE)
    const toggleBannerBtn = document.getElementById('toggle-banner-view');
    const bannerOverlay = document.getElementById('banner-mode-overlay');

    if (toggleBannerBtn) {
        toggleBannerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            document.body.classList.add('banner-view-mode');
        });
    }

    if (bannerOverlay) {
        bannerOverlay.addEventListener('click', (e) => {
            e.stopPropagation();
            document.body.classList.remove('banner-view-mode');
        });
    }

    // Click bất kỳ đâu khi đang ở chế độ xem banner để quay lại
    document.addEventListener('click', (e) => {
        if (document.body.classList.contains('banner-view-mode')) {
            document.body.classList.remove('banner-view-mode');
        }
    });

    // 4. WAIFU COLLECTION GENERATOR & EQUIP INTERACTION
    const waifuGrid = document.getElementById('waifu-grid');

    if (waifuGrid && CONFIG.waifu && CONFIG.waifu.list) {
        waifuGrid.innerHTML = '';
        CONFIG.waifu.list.forEach((waifu, idx) => {
            const item = document.createElement('div');
            item.className = `waifu-item rank-${waifu.rank} ${idx === 0 ? 'active-equipped' : ''}`;
            item.title = `Click để trang bị avatar & banner ${waifu.name}`;
            
            item.innerHTML = `
                <img src="${waifu.image}" alt="${waifu.name}" class="waifu-thumb">
                <div class="waifu-rank">#${waifu.rank}</div>
                <div class="waifu-info">
                    <div class="waifu-name-row">
                        <span class="waifu-name">${waifu.name}</span>
                        <span class="waifu-percent">${waifu.affection}%</span>
                    </div>
                    <div class="waifu-bar">
                        <div class="waifu-fill" style="width: ${waifu.affection}%; background: ${waifu.color}; box-shadow: 0 0 10px ${waifu.color}"></div>
                    </div>
                </div>
                <i class="fas ${waifu.icon}" style="color: ${waifu.color}"></i>
            `;

            item.addEventListener('click', () => {
                if (typeof setAvatar === 'function') {
                    setAvatar(idx);
                }
            });

            waifuGrid.appendChild(item);
        });
    }

    // 5. QUOTE SHUFFLER
    const quoteText = document.getElementById('quote-text');
    const quoteRefreshBtn = document.getElementById('quote-refresh');
    let quoteIndex = 0;
    
    function nextQuote() {
        if (!quoteText || !CONFIG.quotes || CONFIG.quotes.length === 0) return;
        quoteIndex = (quoteIndex + 1) % CONFIG.quotes.length;
        quoteText.style.opacity = '0';
        setTimeout(() => {
            quoteText.innerText = CONFIG.quotes[quoteIndex];
            quoteText.style.opacity = '1';
        }, 200);
    }

    if (quoteRefreshBtn) {
        quoteRefreshBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            nextQuote();
        });
    }

    setInterval(nextQuote, 10000);

    // 6. MOUSE CURSOR TRAILS
    if (CONFIG.effects.cursorTrail && window.matchMedia("(min-width: 850px)").matches) {
        let lastTrailX = 0, lastTrailY = 0;
        document.addEventListener('mousemove', (e) => {
            if (Math.abs(e.clientX - lastTrailX) > 6 || Math.abs(e.clientY - lastTrailY) > 6) {
                const trail = document.createElement('div');
                trail.className = 'cursor-trail';
                trail.style.left = e.clientX + 'px';
                trail.style.top = e.clientY + 'px';
                document.body.appendChild(trail);
                
                setTimeout(() => {
                    trail.remove();
                }, 450);

                lastTrailX = e.clientX;
                lastTrailY = e.clientY;
            }
        });
    }

});
