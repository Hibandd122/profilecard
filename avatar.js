/* ===== AVATAR ===== */
const avatar = document.getElementById('char-avatar');
let currentAvatarIndex = 0;
let rotationInterval;
let isForced = false;
let avatarAnim = false;

function startAvatarRotation() {
    if (!avatar) return;
    if (rotationInterval) clearInterval(rotationInterval);
    rotationInterval = setInterval(() => {
        if (!isForced) {
            currentAvatarIndex = (currentAvatarIndex + 1) % CONFIG.avatars.length;
            avatar.src = CONFIG.avatars[currentAvatarIndex];
        }
    }, CONFIG.intervals.avatarRotation);
}
startAvatarRotation();

function handleAvatar(e) {
    if (!avatar || avatarAnim) return;
    avatarAnim = true;
    isForced = true;

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * CONFIG.avatars.length);
    } while (randomIndex === currentAvatarIndex && CONFIG.avatars.length > 1);
    avatar.src = CONFIG.avatars[randomIndex];
    avatar.classList.add('active-touch');

    let x, y;
    if (e.type === 'touchstart') {
        e.preventDefault();
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
    } else {
        x = e.clientX;
        y = e.clientY;
    }
    for (let i = 0; i < 18; i++) {
        heartBurst(x + (Math.random()*60-30), y + (Math.random()*60-30));
    }

    setTimeout(() => {
        avatar.src = CONFIG.avatars[currentAvatarIndex];
        avatar.classList.remove('active-touch');
        isForced = false;
        avatarAnim = false;
    }, 2000); // Giữ nguyên 2 giây cho hiệu ứng active, có thể config sau nếu muốn
}
if (avatar) {
    avatar.addEventListener('touchstart', handleAvatar, { passive: false });
    avatar.addEventListener('click', handleAvatar);
}

function heartBurst(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = ['❤️','💖','💘','💗','💕'][Math.floor(Math.random()*5)];
    heart.className = 'heart-pop';
    const rx = (Math.random() * 180 - 90);
    const ry = (Math.random() * 180 - 90);
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.setProperty('--x', rx + 'px');
    heart.style.setProperty('--y', ry + 'px');
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1200);
}

/* ===== FAVICON ĐỘNG ===== */
if (CONFIG.favicon.enabled) {
    function updateFavicon(src) {
        let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/png';
        link.rel = 'icon';
        link.href = src;
        if (!link.parentNode) document.head.appendChild(link);
    }

    /* ===== TIÊU ĐỀ TRANG ĐỘNG ===== */
    function updateTitle(src) {
        // Lấy tên file từ src, ví dụ "avatar.png" -> "avatar"
        const fileName = src.split('/').pop().split('.')[0];
        // Chuyển đổi tên file thành dạng hiển thị: avatar -> Avatar, avatar2 -> Avatar 2
        let displayName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
        // Thêm khoảng trắng trước số (nếu có)
        displayName = displayName.replace(/(\d+)/g, ' $1');
        document.title = `${CONFIG.pageName} · ${displayName}`;
    }

    // Theo dõi sự thay đổi của avatar
    const avatarElement = document.getElementById('char-avatar');
    if (avatarElement) {
        // Cập nhật favicon và title lần đầu
        updateFavicon(avatarElement.src);
        updateTitle(avatarElement.src);

        // Tạo observer
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
                    updateFavicon(avatarElement.src);
                    updateTitle(avatarElement.src);
                }
            });
        });
        observer.observe(avatarElement, { attributes: true, attributeFilter: ['src'] });
    }
} else {
    // Nếu tắt favicon động, dùng ảnh fallback
    let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/png';
    link.rel = 'icon';
    link.href = CONFIG.favicon.fallback;
    if (!link.parentNode) document.head.appendChild(link);
}