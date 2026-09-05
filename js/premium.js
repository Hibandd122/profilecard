/* ========================================================
   PREMIUM V11.0 ENGINE
   - Real GPU & Screen Refresh Rate (Hz) Detection
   - Interactive FPS Benchmark Micro-Test
   - High-Fidelity Toasts & Theme Switching
   - Zero Framework, Zero Bloat, 100% Client-Side Safe
======================================================== */
(function () {
    'use strict';

    const STORAGE_THEME = 'mahikari_theme';
    const toastRegion = document.getElementById('toast-region');

    function storageGet(key) {
        try { return window.localStorage.getItem(key); } catch (_) { return null; }
    }

    function storageSet(key, value) {
        try { window.localStorage.setItem(key, value); } catch (_) { /* private mode */ }
    }

    function showToast(message, icon) {
        if (!toastRegion) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fas ${icon || 'fa-circle-check'}" aria-hidden="true"></i><span></span>`;
        const text = toast.querySelector('span');
        if (text) text.textContent = message;
        toastRegion.appendChild(toast);
        window.setTimeout(() => {
            toast.classList.add('is-leaving');
            window.setTimeout(() => toast.remove(), 190);
        }, 2600);
    }

    window.showPremiumToast = showToast;

    function applyTheme(theme, persist) {
        const isLight = theme === 'light';
        document.body.classList.toggle('light-mode', isLight);
        document.documentElement.dataset.theme = isLight ? 'light' : 'dark';
        if (persist) storageSet(STORAGE_THEME, isLight ? 'light' : 'dark');

        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            const nextLabel = isLight ? 'Chuyển sang giao diện tối' : 'Chuyển sang giao diện sáng';
            toggle.setAttribute('aria-label', nextLabel);
            toggle.setAttribute('title', nextLabel);
        }

        const themeMeta = document.querySelector('meta[name="theme-color"]');
        if (themeMeta) themeMeta.setAttribute('content', isLight ? '#f8fafc' : '#070913');
    }

    function initTheme() {
        const saved = storageGet(STORAGE_THEME);
        const systemLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
        applyTheme(saved || (systemLight ? 'light' : 'dark'), false);

        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.addEventListener('click', function () {
                const willBeLight = !document.body.classList.contains('light-mode');
                applyTheme(willBeLight ? 'light' : 'dark', true);
                if (window.playSfx) window.playSfx('click');
                showToast(willBeLight ? 'Đã bật giao diện sáng' : 'Đã bật giao diện tối', 'fa-circle-half-stroke');
            });
        }

        if (!saved && window.matchMedia) {
            const media = window.matchMedia('(prefers-color-scheme: light)');
            const sync = (event) => applyTheme(event.matches ? 'light' : 'dark', false);
            if (media.addEventListener) media.addEventListener('change', sync);
        }
    }

    function fallbackCopy(text) {
        const area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        let copied = false;
        try { copied = document.execCommand('copy'); } catch (_) { copied = false; }
        area.remove();
        return copied;
    }

    async function copyProfile() {
        if (window.playSfx) window.playSfx('click');
        const url = window.location.href;
        let copied = false;
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(url);
                copied = true;
            } catch (_) { copied = false; }
        }
        if (!copied) copied = fallbackCopy(url);
        if (copied && window.playSfx) window.playSfx('success');
        showToast(copied ? 'Đã sao chép link profile vào clipboard! ✨' : 'Hãy copy URL trên thanh địa chỉ', copied ? 'fa-link' : 'fa-triangle-exclamation');
    }

    async function shareProfile() {
        if (window.playSfx) window.playSfx('click');
        const shareData = {
            title: document.title || 'Mahikari · Cosmic Profile Card',
            text: 'Ghé thăm vũ trụ anime và bộ sưu tập waifu của Mahikari ✨',
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
                showToast('Đã mở bảng chia sẻ', 'fa-arrow-up-from-bracket');
                return;
            } catch (error) {
                if (error && error.name === 'AbortError') return;
            }
        }
        await copyProfile();
    }

    function initActions() {
        const copyButton = document.getElementById('copy-profile');
        const shareButton = document.getElementById('share-profile');
        if (copyButton) copyButton.addEventListener('click', copyProfile);
        if (shareButton) shareButton.addEventListener('click', shareProfile);
    }

    function init() {
        initTheme();
        initActions();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
