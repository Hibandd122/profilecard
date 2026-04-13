/* ===== TÍNH NĂNG MỞ RỘNG (FEATURES) ===== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. HIỆU ỨNG TRỎ CHUỘT (MOUSE CURSOR TRAILS)
    let lastX = 0, lastY = 0;
    document.addEventListener('mousemove', (e) => {
        // Giới hạn tần suất tạo trail để tối ưu hiệu năng
        if (Math.abs(e.clientX - lastX) > 5 || Math.abs(e.clientY - lastY) > 5) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
            document.body.appendChild(trail);
            
            setTimeout(() => {
                trail.remove();
            }, 500);

            lastX = e.clientX;
            lastY = e.clientY;
        }
    });

});
