/* ===== COUNTDOWN ===== */
function getNextFriday10PM() {
    const now = new Date();
    const target = new Date(now);
    target.setHours(22, 0, 0, 0); // 10 PM
    let diff = 5 - now.getDay();
    if (diff < 0 || (diff === 0 && now.getTime() >= target.getTime())) {
        diff += 7;
    }
    target.setDate(target.getDate() + diff);
    return target.getTime();
}

let _origClockHtml = null;

setInterval(() => {
    const d = new Date();
    const now = d.getTime();
    
    const clockEl = document.querySelector('.flip-clock');
    if (clockEl && !_origClockHtml) {
        _origClockHtml = clockEl.innerHTML;
    }

    // Nếu là thứ 6 (5) và đang từ 10h tối (22) trở đi cho đến hết ngày
    if (d.getDay() === 5 && d.getHours() >= 22) {
        if (clockEl && !clockEl.dataset.newep) {
            clockEl.innerHTML = '<div style="font-size:1.5rem; font-weight:bold; color:#00f2ff; text-align:center; width:100%; text-shadow:0 0 15px #00f2ff; padding: 10px 0;">ĐÃ RA TẬP MỚI</div>';
            clockEl.dataset.newep = 'true';
        }
        return;
    } else if (clockEl && clockEl.dataset.newep) {
        clockEl.innerHTML = _origClockHtml;
        delete clockEl.dataset.newep;
    }

    const target = getNextFriday10PM();
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