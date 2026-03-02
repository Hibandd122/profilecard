/* ===== SPARK ===== */
if (CONFIG.effects.sparks) {
    const sparkCanvas = document.getElementById('spark-field');
    const sparkCtx = sparkCanvas?.getContext('2d');
    let sparkWidth, sparkHeight;
    let sparks = [];

    function initSparkField() {
        if (!sparkCanvas) return;
        sparkWidth = window.innerWidth;
        sparkHeight = window.innerHeight;
        sparkCanvas.width = sparkWidth;
        sparkCanvas.height = sparkHeight;
    }
    function addSpark(x, y) {
        for (let i = 0; i < 3; i++) {
            sparks.push({
                x, y,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6 - 2,
                life: 0.8 + Math.random() * 0.4,
                size: Math.random() * 5 + 2,
                color: `hsl(${Math.random() * 60 + 180}, 100%, 65%)`
            });
        }
    }
    function drawSparks() {
        if (!sparkCtx) return;
        sparkCtx.clearRect(0, 0, sparkWidth, sparkHeight);
        sparks = sparks.filter(s => {
            s.x += s.vx;
            s.y += s.vy;
            s.vy += 0.15;
            s.life -= 0.008;
            if (s.life <= 0) return false;
            sparkCtx.beginPath();
            sparkCtx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
            sparkCtx.fillStyle = s.color;
            sparkCtx.shadowBlur = 12;
            sparkCtx.shadowColor = s.color;
            sparkCtx.fill();
            return true;
        });
        requestAnimationFrame(drawSparks);
    }
    if (window.matchMedia("(min-width: 850px)").matches && sparkCanvas) {
        initSparkField();
        drawSparks();
        document.addEventListener('mousemove', (e) => addSpark(e.clientX, e.clientY));
    }
} else {
    // Nếu tắt spark, ẩn canvas
    const sparkCanvas = document.getElementById('spark-field');
    if (sparkCanvas) sparkCanvas.style.display = 'none';
}