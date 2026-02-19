/* ===== NỀN SAO ===== */
const starCanvas = document.getElementById('starry-canvas');
const starCtx = starCanvas?.getContext('2d');
let starWidth, starHeight;
let stars = [];

function initStars() {
    if (!starCanvas) return;
    starWidth = window.innerWidth;
    starHeight = window.innerHeight;
    starCanvas.width = starWidth;
    starCanvas.height = starHeight;
    stars = [];
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * starWidth,
            y: Math.random() * starHeight,
            radius: Math.random() * 1.8 + 0.8,
            speed: 0.1 + Math.random() * 0.5,
            angle: Math.random() * 360,
            glow: Math.random() * 0.7 + 0.3
        });
    }
}

function drawStars() {
    if (!starCtx) return;
    starCtx.clearRect(0, 0, starWidth, starHeight);
    stars.forEach(s => {
        starCtx.beginPath();
        starCtx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        starCtx.fillStyle = `rgba(255, 255, 255, ${s.glow})`;
        starCtx.shadowBlur = 8;
        starCtx.shadowColor = '#00f2ff';
        starCtx.fill();
        s.y += s.speed;
        s.x += Math.sin(s.angle * Math.PI / 180) * 0.1;
        s.angle += 0.2;
        if (s.y > starHeight) { s.y = 0; s.x = Math.random() * starWidth; }
        if (s.x > starWidth) s.x = 0;
        if (s.x < 0) s.x = starWidth;
    });
    requestAnimationFrame(drawStars);
}
window.addEventListener('resize', initStars);
if (starCanvas) {
    initStars();
    drawStars();
}