/* ========================================================
   TYPEWRITER ROLE ANIMATION (GUNS.LOL STYLE)
======================================================== */
(function() {
    const badge = document.getElementById('typing-badge');
    if (!badge || !CONFIG.roles || CONFIG.roles.length === 0) return;

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
        const currentRole = CONFIG.roles[roleIndex];
        let delay = CONFIG.intervals.typewriterSpeed || 75;

        if (isDeleting) {
            charIndex--;
            delay = Math.floor(delay / 2);
        } else {
            charIndex++;
        }

        badge.innerHTML = currentRole.substring(0, charIndex) || '&nbsp;';

        if (!isDeleting && charIndex === currentRole.length) {
            delay = CONFIG.intervals.typewriterPause || 1800;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % CONFIG.roles.length;
            delay = (CONFIG.intervals.typewriterSpeed || 75) * 2;
        }

        setTimeout(typeLoop, delay);
    }

    typeLoop();
})();