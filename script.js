/* =========================================
   CẤU HÌNH HỆ THỐNG (CONFIG)
   ========================================= */
const CONFIG = {
    // Tên file ảnh (Đảm bảo file nằm cùng thư mục)
    avatarDefault: "avatar.png", 
    avatarChange: "avatar2.png", 
    
    // Ngày đếm ngược (Định dạng: YYYY-MM-DDTHH:mm:ss+07:00 để chuẩn giờ VN)
    targetDate: "2026-04-03T18:30:00+07:00", 
    
    // Danh sách chữ chạy (Typewriter)
    roles: [
        "</> PYTHON CODER", 
        "🎮 ROBLOX GAMER", 
        "💖 WAIFU COLLECTOR", 
        "🎵 LOFI CHILL"
    ]
};

/* =========================================
   1. MAGIC CURSOR (CHỈ PC > 850px)
   ========================================= */
if (window.matchMedia("(min-width: 850px)").matches) {
    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = e.pageX + 'px';
        trail.style.top = e.pageY + 'px';
        document.body.appendChild(trail);
        
        // Animation biến mất
        setTimeout(() => { 
            trail.style.opacity = '0'; 
            trail.style.transform = 'scale(0.5)'; 
        }, 10);
        setTimeout(() => trail.remove(), 300);
    });
}

/* =========================================
   2. SMART GREETING (LỜI CHÀO THEO GIỜ VN)
   ========================================= */
function setGreeting() {
    const greetBox = document.getElementById('greeting-box');
    // Lấy giờ hiện tại theo múi giờ Việt Nam
    const vnTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Ho_Chi_Minh"});
    const hour = new Date(vnTime).getHours();
    
    let msg = ""; 
    let icon = "";

    if (hour >= 5 && hour < 12) { 
        msg = "OHAYO! NGÀY MỚI TỐT LÀNH"; icon = "⛅"; 
    } else if (hour >= 12 && hour < 18) { 
        msg = "KONNICHIWA! CỐ GẮNG NHÉ"; icon = "🍵"; 
    } else { 
        msg = "OYASUMI! THƯ GIÃN THÔI"; icon = "🌙"; 
    }
    
    greetBox.innerHTML = `${icon} ${msg}`;
}
setGreeting();
setInterval(setGreeting, 60000); // Cập nhật mỗi phút

/* =========================================
   3. AVATAR INTERACTION (TOUCH & CLICK)
   ========================================= */
const avatarImg = document.getElementById('char-avatar');
let isAvatarAnimating = false;

// Hàm xử lý chung: Đổi ảnh + Bắn tim
function handleAvatarInteract(e) {
    // Ngăn chặn spam liên tục khi đang animation
    if (isAvatarAnimating) return;
    isAvatarAnimating = true;

    // 1. Đổi sang ảnh 2 & Thêm hiệu ứng rung/phóng to
    avatarImg.src = CONFIG.avatarChange;
    avatarImg.classList.add('active-touch');

    // 2. Lấy tọa độ để bắn tim (Hỗ trợ cả Touch và Click)
    let x, y;
    if (e.type === 'touchstart') {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
    } else {
        x = e.clientX;
        y = e.clientY;
    }
    
    // Tạo 8 trái tim bay ra
    for(let i=0; i<8; i++) {
        createHeart(x, y);
    }

    // 3. Sau 2 giây tự động quay về ảnh cũ
    setTimeout(() => {
        avatarImg.src = CONFIG.avatarDefault;
        avatarImg.classList.remove('active-touch');
        isAvatarAnimating = false;
    }, 2000);
}

// Hàm tạo trái tim bay
function createHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.className = 'heart-pop';
    
    // Random hướng bay
    const randomX = (Math.random() * 100 - 50); 
    const randomY = (Math.random() * 100 - 50);
    
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.setProperty('--x', randomX + 'px');
    heart.style.setProperty('--y', randomY + 'px');
    
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
}

// Sự kiện cho Mobile (Touch)
avatarImg.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Ngăn hành vi zoom mặc định
    handleAvatarInteract(e);
}, {passive: false});

// Sự kiện cho PC (Click)
avatarImg.addEventListener('click', handleAvatarInteract);

// Sự kiện Hover trên PC (Chỉ đổi ảnh, không bắn tim)
avatarImg.addEventListener('mouseenter', () => { 
    if(!isAvatarAnimating) avatarImg.src = CONFIG.avatarChange; 
});
avatarImg.addEventListener('mouseleave', () => { 
    if(!isAvatarAnimating) avatarImg.src = CONFIG.avatarDefault; 
});

/* =========================================
   4. TYPEWRITER EFFECT (FIX HOÀN TOÀN LỖI MẤT CHỮ)
   ========================================= */
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeTarget = document.getElementById('typing-text');

function typeEffect() {
    const currentRole = CONFIG.roles[roleIndex];
    let typeSpeed = 100; // Tốc độ gõ mặc định

    if (isDeleting) {
        // ĐANG XÓA
        charIndex--;
        typeSpeed = 50; // Xóa nhanh hơn gõ
    } else {
        // ĐANG VIẾT
        charIndex++;
    }

    // Hiển thị text hiện tại
    let textToShow = currentRole.substring(0, charIndex);
    
    // Giữ chiều cao dòng khi xóa hết chữ (tránh giật layout)
    if (textToShow.length === 0) {
        typeTarget.innerHTML = "&nbsp;"; 
    } else {
        typeTarget.innerText = textToShow;
    }

    // LOGIC CHUYỂN ĐỔI TRẠNG THÁI
    if (!isDeleting && charIndex === currentRole.length) {
        // Viết xong -> Dừng 2 giây để đọc
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Xóa xong -> Chuyển sang từ tiếp theo
        isDeleting = false;
        roleIndex = (roleIndex + 1) % CONFIG.roles.length;
        typeSpeed = 500; // Nghỉ một chút trước khi viết từ mới
    }

    setTimeout(typeEffect, typeSpeed);
}
// Khởi chạy
typeEffect();

/* =========================================
   5. COUNTDOWN TIMER (VN TIME)
   ========================================= */
const targetTime = new Date(CONFIG.targetDate).getTime();

setInterval(() => {
    const now = new Date().getTime();
    const distance = targetTime - now;
    
    // Nếu hết giờ thì dừng lại ở 00:00:00:00
    if (distance < 0) return;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = days < 10 ? '0' + days : days;
    document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
}, 1000);

/* =========================================
   6. MUSIC PLAYER
   ========================================= */
const playlist = [
    { name: "Ngủ sớm đi em - DucMinh", file: "song1.mp3" },
    { name: "Nhắn nhủ | Ronboogz",     file: "song2.mp3" },
    { name: "W/n - id 072019 | 3107",  file: "song3.mp3" },
    { name: "Madihu - Có em (Feat. Low G)", file: "song4.mp3" },
    { name: "TƯƠNG TƯ | CLOW X FLEPY", file: "song5.mp3" },
    { name: "Nghe kể năm 90s | Ân ngờ", file: "song6.mp3" }
];

// Khởi tạo biến
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const songName = document.getElementById('song-name');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const volumeSlider = document.getElementById('volume-slider');
const overlay = document.getElementById('start-overlay');
const eqBars = document.querySelectorAll('.bar');

let songIndex = localStorage.getItem('songIndex') || 0;
// Kiểm tra index hợp lệ
if(songIndex >= playlist.length) songIndex = 0;

let isPlaying = false;

// Load bài hát đầu tiên
loadSong(playlist[songIndex]);
audio.volume = 0.5; // Âm lượng mặc định 50%

// Click Overlay để vào web và phát nhạc (nếu trình duyệt cho phép)
overlay.addEventListener('click', () => {
    overlay.style.opacity = '0';
    setTimeout(() => overlay.style.display = 'none', 500);
    // Lưu ý: Một số trình duyệt chặn autoplay, cần user click nút play
    playSong();
});

// Hàm Load bài hát
function loadSong(song) {
    songName.innerText = song.name;
    audio.src = song.file;
    localStorage.setItem('songIndex', songIndex);
}

// Hàm Play
function playSong() {
    isPlaying = true;
    audio.play().catch(error => console.log("Chờ người dùng tương tác để phát nhạc"));
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    // Chạy animation sóng nhạc
    eqBars.forEach(b => b.style.animationPlayState = 'running');
}

// Hàm Pause
function pauseSong() {
    isPlaying = false;
    audio.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    // Dừng animation sóng nhạc
    eqBars.forEach(b => b.style.animationPlayState = 'paused');
}

// Sự kiện Click nút Play/Pause
playBtn.addEventListener('click', () => isPlaying ? pauseSong() : playSong());

// Sự kiện Next/Prev
prevBtn.addEventListener('click', () => {
    songIndex = (songIndex - 1 + playlist.length) % playlist.length;
    loadSong(playlist[songIndex]);
    playSong();
});
nextBtn.addEventListener('click', () => {
    songIndex = (songIndex + 1) % playlist.length;
    loadSong(playlist[songIndex]);
    playSong();
});

// Cập nhật thanh tiến trình
audio.addEventListener('timeupdate', (e) => {
    const { duration, currentTime } = e.srcElement;
    if (duration) {
        const percent = (currentTime / duration) * 100;
        progress.style.width = `${percent}%`;
    }
});

// Tự chuyển bài khi hết
audio.addEventListener('ended', () => nextBtn.click());

// Tua nhạc khi click thanh tiến trình
progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
});

// Chỉnh âm lượng
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value / 100;
});
