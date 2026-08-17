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

    // 3. PROFILE VIEWS COUNTER
    const profileViewsEl = document.getElementById('profile-views');
    if (profileViewsEl) {
        let views = parseInt(localStorage.getItem('mahikari_profile_views') || '14289', 10);
        views += 1;
        localStorage.setItem('mahikari_profile_views', views);
        profileViewsEl.innerText = views.toLocaleString('en-US');
    }

    // 4. WAIFU COLLECTION GENERATOR & EQUIP INTERACTION
    const waifuGrid = document.getElementById('waifu-grid');
    const cardBanner = document.getElementById('card-banner');

    if (waifuGrid && CONFIG.waifu && CONFIG.waifu.list) {
        waifuGrid.innerHTML = '';
        CONFIG.waifu.list.forEach((waifu, idx) => {
            const item = document.createElement('div');
            item.className = `waifu-item rank-${waifu.rank} ${idx === 0 ? 'active-equipped' : ''}`;
            item.title = `Click để trang bị avatar ${waifu.name}`;
            
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
                    const avatarIdx = CONFIG.avatars.findIndex(a => a === waifu.image);
                    if (avatarIdx !== -1) {
                        setAvatar(avatarIdx);
                    } else {
                        setAvatar(idx);
                    }
                }
                
                // Cập nhật banner nếu waifu có banner riêng
                if (cardBanner && waifu.banner) {
                    cardBanner.style.backgroundImage = `url('${waifu.banner}')`;
                }

                document.querySelectorAll('.waifu-item').forEach(w => w.classList.remove('active-equipped'));
                item.classList.add('active-equipped');
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

    // 6. DISCORD RICH PRESENCE ELAPSED TIMER
    const discordTimerEl = document.getElementById('discord-timer');
    let elapsedSeconds = 9918;
    function updateDiscordTimer() {
        if (!discordTimerEl) return;
        elapsedSeconds++;
        const hours = Math.floor(elapsedSeconds / 3600);
        const mins = Math.floor((elapsedSeconds % 3600) / 60);
        const secs = elapsedSeconds % 60;
        discordTimerEl.innerText = `Elapsed ${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    setInterval(updateDiscordTimer, 1000);

    // 7. MOUSE CURSOR TRAILS
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
