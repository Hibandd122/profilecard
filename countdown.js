/* ===== COUNTDOWN ===== */
const target = new Date(CONFIG.targetDate).getTime();
setInterval(() => {
    const now = new Date().getTime();
    const dist = target - now;
    if (dist < 0) return;
    flipNumber('days', Math.floor(dist / (1000*60*60*24)));
    flipNumber('hours', Math.floor((dist % (1000*60*60*24)) / (1000*60*60)));
    flipNumber('minutes', Math.floor((dist % (1000*60*60)) / (1000*60)));
    flipNumber('seconds', Math.floor((dist % (1000*60)) / 1000));
}, 1000);

function flipNumber(id, val) {
    const el = document.getElementById(id);
    if (!el) return;
    const newVal = String(val).padStart(2,'0');
    if (el.innerText !== newVal) {
        el.innerText = newVal;
        el.style.transform = 'scale(1.25)';
        el.style.textShadow = '0 0 30px #00f2ff,0 0 60px #ff0099';
        setTimeout(() => {
            el.style.transform = 'scale(1)';
            el.style.textShadow = '0 0 20px #00f2ff';
        }, 160);
    }
}