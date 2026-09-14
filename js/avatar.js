/* ========================================================
   MAHIKARI · PERSONA & VISUAL IDENTITY ENGINE
   Seamless Crossfade, Theme Harmonization & Asset Preload
======================================================== */
(function() {
    'use strict';

    const avatarImg = document.getElementById('char-avatar');
    const heroBanner = document.getElementById('hero-banner-img');
    const personaContainer = document.getElementById('persona-selector');
    const personaRoleEl = document.getElementById('persona-role-text');

    function safeStorageGet(key) {
        try { return localStorage.getItem(key); } catch (_) { return null; }
    }

    function safeStorageSet(key, value) {
        try { localStorage.setItem(key, value); } catch (_) { /* private mode */ }
    }

    let currentIndex = parseInt(safeStorageGet('mahikari_persona_index') || '0', 10);
    if (isNaN(currentIndex) || currentIndex < 0 || currentIndex >= CONFIG.personas.length) {
        currentIndex = 0;
    }

    // Preload persona assets for immediate zero-latency switching
    function preloadAssets() {
        CONFIG.personas.forEach(p => {
            const av = new Image();
            av.decoding = 'async';
            av.src = p.avatar;

            const bn = new Image();
            bn.decoding = 'async';
            bn.src = p.banner;

            if (p.bannerPhone) {
                const bnp = new Image();
                bnp.decoding = 'async';
                bnp.src = p.bannerPhone;
            }
        });
    }

    // Apply color tokens based on active persona
    function applyPersonaTokens(persona) {
        const root = document.documentElement;
        root.style.setProperty('--color-accent', persona.accent);
        root.style.setProperty('--color-accent-secondary', persona.accentSecondary);
        root.style.setProperty('--color-accent-glow', persona.accentGlow);
    }

    // Render persona selector buttons
    function renderPersonaSelector() {
        if (!personaContainer) return;
        personaContainer.innerHTML = '';

        CONFIG.personas.forEach((persona, idx) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `persona-chip ${idx === currentIndex ? 'active' : ''}`;
            btn.setAttribute('aria-label', `Select visual persona: ${persona.name}`);
            btn.setAttribute('title', `${persona.name} · ${persona.role}`);
            btn.dataset.index = idx;

            btn.innerHTML = `
                <span class="persona-avatar-preview">
                    <img src="${persona.avatar}" alt="${persona.name}" loading="lazy" decoding="async">
                </span>
                <span class="persona-meta">
                    <span class="persona-name">${persona.name}</span>
                    <span class="persona-tag">${persona.role}</span>
                </span>
            `;

            btn.addEventListener('click', () => {
                setPersona(idx, true);
            });

            personaContainer.appendChild(btn);
        });
    }

    function updatePersonaText(persona) {
        if (personaRoleEl) personaRoleEl.textContent = `${persona.role} · ${persona.title}`;
    }

    function updateBannerLayers(persona) {
        const isMobile = window.innerWidth <= 768;
        const bannerSrc = (isMobile && persona.bannerPhone) ? persona.bannerPhone : persona.banner;

        // Update full-bleed background layers if present
        const bannerLayers = document.querySelectorAll('.banner-stage .banner-layer');
        bannerLayers.forEach((layer, idx) => {
            layer.classList.toggle('active', idx === currentIndex);
            if (idx === currentIndex) {
                const p = CONFIG.personas[idx];
                const src = (isMobile && p.bannerPhone) ? p.bannerPhone : p.banner;
                layer.style.backgroundImage = `url('${src}')`;
            }
        });

        // Update hero banner img
        if (heroBanner && heroBanner.src !== bannerSrc) {
            heroBanner.style.opacity = '0.4';
            const img = new Image();
            img.onload = () => {
                heroBanner.src = bannerSrc;
                heroBanner.style.opacity = '1';
            };
            img.src = bannerSrc;
        }
    }

    let isSwitching = false;
    function setPersona(index, persist) {
        if (index < 0 || index >= CONFIG.personas.length) return;
        currentIndex = index;
        const persona = CONFIG.personas[index];
        if (!persona) return;

        if (persist) {
            safeStorageSet('mahikari_persona_index', index.toString());
        }

        applyPersonaTokens(persona);
        updatePersonaText(persona);
        updateBannerLayers(persona);

        // Update active chip state
        if (personaContainer) {
            const chips = personaContainer.querySelectorAll('.persona-chip');
            chips.forEach((chip, idx) => {
                chip.classList.toggle('active', idx === index);
            });
        }

        // Smooth avatar crossfade
        if (avatarImg && !isSwitching) {
            isSwitching = true;
            avatarImg.style.opacity = '0.3';
            avatarImg.style.transform = 'translateX(-50%) scale(0.96)';

            setTimeout(() => {
                avatarImg.src = persona.avatar;
                avatarImg.onload = () => {
                    avatarImg.style.opacity = '1';
                    avatarImg.style.transform = 'translateX(-50%) scale(1)';
                    isSwitching = false;
                };
            }, 120);
        }

        // Sync player album art if no custom song art
        const playerArt = document.getElementById('player-album-art');
        if (playerArt) {
            playerArt.src = persona.avatar;
        }
    }

    // Global hook for keyboard shortcuts or other modules
    window.setPersona = setPersona;
    window.getCurrentPersonaIndex = () => currentIndex;

    // Handle responsive banner resize
    let resizeTimer = null;
    window.addEventListener('resize', () => {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const persona = CONFIG.personas[currentIndex];
            if (persona) updateBannerLayers(persona);
        }, 200);
    }, { passive: true });

    // Initialization
    renderPersonaSelector();
    setPersona(currentIndex, false);
    window.requestAnimationFrame(() => preloadAssets());
})();
