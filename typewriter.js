/* ===== TYPEWRITER ===== */
let rI = 0, cI = 0, del = false;
const badge = document.getElementById('typing-badge');
function type() {
    if (!badge) return;
    const role = CONFIG.roles[rI];
    let sp = CONFIG.intervals.typewriterSpeed;
    if (del) { cI--; sp = Math.floor(sp / 2); } else cI++;
    badge.innerHTML = role.substring(0, cI) || '&nbsp;';
    if (!del && cI === role.length) { sp = CONFIG.intervals.typewriterPause; del = true; }
    else if (del && cI === 0) { del = false; rI = (rI + 1) % CONFIG.roles.length; sp = CONFIG.intervals.typewriterSpeed * 2; } // Tăng nhẹ thời gian chờ trước khi gõ role mới
    setTimeout(type, sp);
}
type();