// Parallax nhẹ cho background
const bgLayers = document.querySelectorAll('.nebula, .cosmic-whirl');
if (bgLayers.length > 0) {
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 768) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        bgLayers.forEach((layer, index) => {
            const speed = index === 0 ? 1 : 0.5;
            layer.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
}