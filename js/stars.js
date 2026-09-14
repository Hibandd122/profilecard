/* ========================================================
   MAHIKARI · AMBIENT COSMIC PARTICLES ENGINE
   Minimalist, Ultra-Gentle Stardust with Auto-Sleep
======================================================== */
(function() {
    'use strict';

    const canvas = document.getElementById('starry-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let stars = [];
    let animationId = null;
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        ctx.scale(dpr, dpr);
        initStars();
    }

    function initStars() {
        stars = [];
        const isMobile = width < 768;
        // Restrained, elegant density (no particle spam)
        const count = isMobile ? 32 : 72;

        for (let i = 0; i < count; i++) {
            const depth = Math.random();
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: depth * 1.2 + 0.4,
                baseAlpha: depth * 0.35 + 0.15,
                alpha: depth * 0.35 + 0.15,
                twinkleSpeed: 0.012 + Math.random() * 0.02,
                twinklePhase: Math.random() * Math.PI * 2,
                speedY: -(0.06 + depth * 0.14), // Gentle upward celestial drift
                speedX: (Math.random() - 0.5) * 0.04
            });
        }
    }

    function render() {
        animationId = requestAnimationFrame(render);
        if (document.hidden) return; // Immediate battery preservation

        ctx.clearRect(0, 0, width, height);

        const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#fbbf24';

        for (let i = 0; i < stars.length; i++) {
            const s = stars[i];

            if (!prefersReducedMotion) {
                s.twinklePhase += s.twinkleSpeed;
                s.alpha = s.baseAlpha + Math.sin(s.twinklePhase) * 0.15;
                s.y += s.speedY;
                s.x += s.speedX;

                if (s.y < 0) {
                    s.y = height;
                    s.x = Math.random() * width;
                }
                if (s.x > width) s.x = 0;
                if (s.x < 0) s.x = width;
            }

            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            ctx.fillStyle = i % 5 === 0 ? accentColor : '#ffffff';
            ctx.globalAlpha = Math.max(0.08, Math.min(0.7, s.alpha));
            ctx.fill();
        }
    }

    let resizeTimer = null;
    window.addEventListener('resize', () => {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 150);
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && !animationId) {
            render();
        }
    });

    resize();
    render();
})();