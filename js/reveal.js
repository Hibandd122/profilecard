// Scroll reveal animation
const revealElements = document.querySelectorAll('.countdown-panel, .waifu-panel, .music-panel, .social-panel');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});