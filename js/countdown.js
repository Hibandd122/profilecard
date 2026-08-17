/* ========================================================
   FRIDAY 10PM ANIME EPISODE COUNTDOWN
======================================================== */
function getNextFriday10PM() {
    const now = new Date();
    // Chuyển sang giờ Việt Nam (UTC+7)
    const vnTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));
    const target = new Date(vnTime);
    target.setHours(22, 0, 0, 0); // 10 PM

    let diff = 5 - vnTime.getDay(); // 5 = Thứ 6
    if (diff < 0 || (diff === 0 && vnTime.getTime() >= target.getTime())) {
        diff += 7;
    }
    target.setDate(target.getDate() + diff);
    return target.getTime() - (vnTime.getTime() - now.getTime());
}

function updateCountdown() {
    const now = Date.now();
    const target = getNextFriday10PM();
    const dist = target - now;

    if (dist <= 0) {
        flipNumber('days', 0);
        flipNumber('hours', 0);
        flipNumber('minutes', 0);
        flipNumber('seconds', 0);
        return;
    }

    const d = Math.floor(dist / (1000 * 60 * 60 * 24));
    const h = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((dist % (1000 * 60)) / 1000);

    flipNumber('days', d);
    flipNumber('hours', h);
    flipNumber('minutes', m);
    flipNumber('seconds', s);
}

function flipNumber(id, val) {
    const el = document.getElementById(id);
    if (!el) return;
    const newVal = String(val).padStart(2, '0');
    if (el.innerText !== newVal) {
        el.innerText = newVal;
        el.style.transform = 'scale(1.15)';
        setTimeout(() => {
            el.style.transform = 'scale(1)';
        }, 150);
    }
}

updateCountdown();
setInterval(updateCountdown, 1000);