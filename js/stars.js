/* ===== HIGH-PERFORMANCE MULTI-DEPTH COSMIC STARFIELD & METEOR ENGINE ===== */
(function() {
    'use strict';

    const canvas = document.getElementById('starry-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let stars = [];
    let meteors = [];
    let animationId = null;
    let lastMeteorTime = Date.now();
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
        const starCount = isMobile ? 45 : 120;

        for (let i = 0; i < starCount; i++) {
            const depth = Math.random(); // 0 (far) to 1 (close)
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: depth * 1.6 + 0.5,
                baseAlpha: depth * 0.5 + 0.25,
                alpha: depth * 0.5 + 0.25,
                twinkleSpeed: 0.02 + Math.random() * 0.04,
                twinklePhase: Math.random() * Math.PI * 2,
                speedY: (0.08 + depth * 0.25),
                speedX: (Math.random() - 0.5) * 0.06,
                color: depth > 0.7 
                    ? (Math.random() > 0.5 ? '#7dd3fc' : '#fbcfe8') 
                    : '#ffffff'
            });
        }
    }

    function spawnMeteor() {
        const startX = Math.random() * (width * 0.8) + (width * 0.1);
        const startY = -40;
        const angle = (Math.PI / 4) + (Math.random() * 0.3 - 0.15); // ~45 deg
        const speed = 12 + Math.random() * 8;
        const length = 100 + Math.random() * 80;

        meteors.push({
            x: startX,
            y: startY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            length: length,
            alpha: 1,
            fadeSpeed: 0.022 + Math.random() * 0.015,
            width: 1.8 + Math.random() * 1.2
        });
    }

    function draw() {
        animationId = requestAnimationFrame(draw);
        if (document.hidden || document.body.classList.contains('banner-view-mode')) {
            return;
        }

        ctx.clearRect(0, 0, width, height);

        // 1. Draw and update stars
        for (let i = 0; i < stars.length; i++) {
            const s = stars[i];
            
            if (!prefersReducedMotion) {
                s.twinklePhase += s.twinkleSpeed;
                s.alpha = s.baseAlpha + Math.sin(s.twinklePhase) * 0.22;
                s.y += s.speedY;
                s.x += s.speedX;

                if (s.y > height) {
                    s.y = 0;
                    s.x = Math.random() * width;
                }
                if (s.x > width) s.x = 0;
                if (s.x < 0) s.x = width;
            }

            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            ctx.fillStyle = s.color;
            ctx.globalAlpha = Math.max(0.1, Math.min(1, s.alpha));
            ctx.fill();
        }

        // 2. Meteors (Shooting stars)
        if (!prefersReducedMotion && width >= 480) {
            const now = Date.now();
            if (now - lastMeteorTime > 5500 && Math.random() < 0.035 && meteors.length < 2) {
                spawnMeteor();
                lastMeteorTime = now;
            }

            for (let i = meteors.length - 1; i >= 0; i--) {
                const m = meteors[i];
                m.x += m.vx;
                m.y += m.vy;
                m.alpha -= m.fadeSpeed;

                if (m.alpha <= 0 || m.x > width + 100 || m.y > height + 100) {
                    meteors.splice(i, 1);
                    continue;
                }

                const tailX = m.x - (m.vx / Math.hypot(m.vx, m.vy)) * m.length;
                const tailY = m.y - (m.vy / Math.hypot(m.vx, m.vy)) * m.length;

                const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
                grad.addColorStop(0, `rgba(255, 255, 255, ${m.alpha})`);
                grad.addColorStop(0.2, `rgba(0, 242, 254, ${m.alpha * 0.8})`);
                grad.addColorStop(1, `rgba(236, 72, 153, 0)`);

                ctx.beginPath();
                ctx.moveTo(m.x, m.y);
                ctx.lineTo(tailX, tailY);
                ctx.strokeStyle = grad;
                ctx.lineWidth = m.width;
                ctx.lineCap = 'round';
                ctx.globalAlpha = 1;
                ctx.stroke();

                // Spark head
                ctx.beginPath();
                ctx.arc(m.x, m.y, m.width * 1.2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${m.alpha})`;
                ctx.fill();
            }
        }

        ctx.globalAlpha = 1;
    }

    let resizeTimer = null;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 180);
    });

    resize();
    draw();
})();