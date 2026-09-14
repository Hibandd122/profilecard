/* ========================================================
   MAHIKARI · ESSENTIAL UX & INTERACTION SUITE
   Theme Engine, Native Sharing, Toasts & Shortcuts
======================================================== */
(function() {
    'use strict';

    const STORAGE_THEME = 'mahikari_theme';
    const toastRegion = document.getElementById('toast-region');

    // 1. HIGH-FIDELITY TOAST NOTIFICATION ENGINE
    function showToast(message, icon = 'fa-circle-check') {
        if (!toastRegion) return;
        const toast = document.createElement('div');
        toast.className = 'luxury-toast';
        toast.innerHTML = `
            <i class="fas ${icon}" aria-hidden="true"></i>
            <span>${message}</span>
        `;
        toastRegion.appendChild(toast);

        // Animate entrance
        requestAnimationFrame(() => {
            toast.classList.add('visible');
        });

        setTimeout(() => {
            toast.classList.remove('visible');
            setTimeout(() => toast.remove(), 240);
        }, 2600);
    }
    window.showToast = showToast;

    // 2. THEME ENGINE (DARK / LIGHT LUXURY HARMONIZATION)
    function applyTheme(theme, persist = true) {
        const isLight = theme === 'light';
        document.body.classList.toggle('light-mode', isLight);
        document.documentElement.setAttribute('data-theme', isLight ? 'light' : 'dark');

        if (persist) {
            try { localStorage.setItem(STORAGE_THEME, isLight ? 'light' : 'dark'); } catch (_) {}
        }

        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            toggleBtn.setAttribute('title', isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode');
            toggleBtn.setAttribute('aria-label', isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode');
        }

        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) {
            metaTheme.setAttribute('content', isLight ? '#f8fafc' : '#080a14');
        }
    }

    function initTheme() {
        let saved = null;
        try { saved = localStorage.getItem(STORAGE_THEME); } catch (_) {}
        const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
        applyTheme(saved || (prefersLight ? 'light' : 'dark'), false);

        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const willBeLight = !document.body.classList.contains('light-mode');
                applyTheme(willBeLight ? 'light' : 'dark', true);
                showToast(willBeLight ? 'Light Mode Activated' : 'Dark Mode Activated', willBeLight ? 'fa-sun' : 'fa-moon');
            });
        }
    }

    // 3. COPY & SHARE ENGINE
    function copyText(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        }
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try {
            document.execCommand('copy');
            ta.remove();
            return Promise.resolve();
        } catch (err) {
            ta.remove();
            return Promise.reject(err);
        }
    }

    function initActionButtons() {
        const copyBtn = document.getElementById('copy-profile');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                copyText(window.location.href).then(() => {
                    showToast('Profile link copied to clipboard', 'fa-link');
                }).catch(() => {
                    showToast('Could not copy link', 'fa-triangle-exclamation');
                });
            });
        }

        const shareBtn = document.getElementById('share-profile');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                if (navigator.share) {
                    navigator.share({
                        title: 'Mahikari · Creative Technologist & Studio',
                        text: 'Explore Mahikari’s bespoke digital portfolio and cosmic audio suite.',
                        url: window.location.href
                    }).catch(() => {});
                } else {
                    copyText(window.location.href).then(() => {
                        showToast('Link copied for sharing', 'fa-share-nodes');
                    });
                }
            });
        }
    }

    // 4. NUMBER KEY SHORTCUTS FOR PERSONA SWITCHING (1-6)
    window.addEventListener('keydown', (e) => {
        if (['input', 'textarea'].includes(document.activeElement?.tagName.toLowerCase())) return;
        const num = parseInt(e.key, 10);
        if (num >= 1 && num <= 6) {
            if (typeof window.setPersona === 'function') {
                window.setPersona(num - 1, true);
                const p = CONFIG.personas[num - 1];
                if (p) showToast(`Visual Theme: ${p.name}`, 'fa-wand-magic-sparkles');
            }
        }
    });

    // Boot
    initTheme();
    initActionButtons();
})();
