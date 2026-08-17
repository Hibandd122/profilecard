/* ========================================================
   THEME TOGGLE ENGINE (DARK / LIGHT MODE)
======================================================== */
const themeToggleBtn = document.getElementById('themeToggle');
const rootBody = document.body;

// Đọc theme từ localStorage (mặc định Dark cho guns.lol style)
const savedTheme = localStorage.getItem('mahikari_theme');
if (savedTheme === 'light') {
    rootBody.classList.add('light-mode');
} else {
    rootBody.classList.remove('light-mode');
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        rootBody.classList.toggle('light-mode');
        const isLight = rootBody.classList.contains('light-mode');
        localStorage.setItem('mahikari_theme', isLight ? 'light' : 'dark');
    });
}