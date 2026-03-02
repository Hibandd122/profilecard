/* ===== SOCIAL BUTTONS ===== */
const socialButtons = document.querySelectorAll('.social-icon');
socialButtons.forEach(btn => {
    const url = btn.dataset.url;
    if (!url) return;

    const openLink = (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.open(url, '_blank');
    };

    btn.addEventListener('click', openLink);
    btn.addEventListener('touchstart', openLink, { passive: false });
});