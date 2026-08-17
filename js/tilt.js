/* ========================================================
   3D CARD TILT ON MOUSE MOVE
======================================================== */
(function() {
    if (!CONFIG.ui.enableTilt) return;
    const wrapper = document.getElementById('card-tilt');
    const cardMain = document.getElementById('main-card');
    
    if (wrapper && cardMain && window.matchMedia("(min-width: 860px)").matches) {
        let isHovered = false;
        
        wrapper.addEventListener('mouseenter', () => {
            isHovered = true;
        });

        wrapper.addEventListener('mousemove', (e) => {
            if (!isHovered) return;
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const rotX = ((y - cy) / cy) * -6;
            const rotY = ((x - cx) / cx) * 6;
            cardMain.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
        });

        wrapper.addEventListener('mouseleave', () => {
            isHovered = false;
            cardMain.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    }
})();