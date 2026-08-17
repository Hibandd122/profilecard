/* ===== LIGHTWEIGHT 60FPS BACKGROUND STARS ===== */
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
    
    // Giảm số hạt trên điện thoại để đạt 60fps mượt mà
    const isMobile = starWidth < 800;
    const numStars = isMobile ? 35 : 120;
    
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * starWidth,
            y: Math.random() * starHeight,
            radius: Math.random() * 1.5 + 0.6,
            speed: 0.15 + Math.random() * 0.4,
            angle: Math.random() * 360,
            opacity: Math.random() * 0.6 + 0.3
        });
    }
}

function drawStars() {
    if (!starCtx) return;
    requestAnimationFrame(drawStars);
    if (document.hidden) return;
    
    starCtx.clearRect(0, 0, starWidth, starHeight);
    
    const isMobile = starWidth < 800;
    if (!isMobile) {
        starCtx.shadowBlur = 4;
        starCtx.shadowColor = 'rgba(0, 242, 254, 0.6)';
    }

    stars.forEach(s => {
        starCtx.beginPath();
        starCtx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        starCtx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        starCtx.fill();
        
        s.y += s.speed;
        s.x += Math.sin(s.angle * Math.PI / 180) * 0.08;
        s.angle += 0.15;
        
        if (s.y > starHeight) { 
            s.y = 0; 
            s.x = Math.random() * starWidth; 
        }
        if (s.x > starWidth) s.x = 0;
        if (s.x < 0) s.x = starWidth;
    });
}

window.addEventListener('resize', initStars);

if (starCanvas) {
    initStars();
    drawStars();
}