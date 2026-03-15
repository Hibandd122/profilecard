/* ===== 3D TILT ===== */
if (CONFIG.ui.enableTilt) {
    const wrapper = document.getElementById('card-tilt');
    const cardMain = document.querySelector('.card-container');
    if (wrapper && cardMain && window.matchMedia("(min-width: 850px)").matches) {
        wrapper.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const rotX = ((y - cy) / cy) * 5;
            const rotY = ((x - cx) / cx) * 5;
            cardMain.style.transform = `rotateX(${-rotX}deg) rotateY(${rotY}deg)`;
        });
        wrapper.addEventListener('mouseleave', () => {
            cardMain.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    }
}