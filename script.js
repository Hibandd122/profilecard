/* --- CẤU HÌNH --- */
const CONFIG = {
    avatarDefault: "avatar.png", 
    avatarChange: "avatar2.png", 
    targetDate: "2026-04-03T18:30:00+07:00", 
    roles: ["</> PYTHON CODER", "🎮 ROBLOX GAMER", "💖 WAIFU COLLECTOR", "🎵 LOFI CHILL"]
};

// --- 1. MAGIC CURSOR ---
document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    document.body.appendChild(trail);
    setTimeout(() => { trail.style.opacity = '0'; trail.style.transform = 'scale(0.5)'; }, 10);
    setTimeout(() => trail.remove(), 300);
});

// --- 2. SMART GREETING ---
function setGreeting() {
    const greetBox = document.getElementById('greeting-box');
    const vnTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Ho_Chi_Minh"});
    const hour = new Date(vnTime).getHours();
    let msg = ""; let icon = "";
    if (hour >= 5 && hour < 12) { msg = "Ohayo! Chào buổi sáng"; icon = "⛅"; }
    else if (hour >= 12 && hour < 18) { msg = "Konnichiwa! Buổi chiều vui vẻ"; icon = "🍵"; }
    else { msg = "Oyasumi! Đêm rồi, chill thôi"; icon = "🌙"; }
    greetBox.innerHTML = `${icon} ${msg}`;
}
setGreeting();
setInterval(setGreeting, 60000); 

// --- 3. FIX AVATAR TRÊN MOBILE + CLICK ---
const avatarImg = document.getElementById('char-avatar');

// Hàm xử lý đổi ảnh tạm thời (dùng chung cho click và touch)
function tempChangeAvatar(e) {
    // Đổi ảnh
    avatarImg.src = CONFIG.avatarChange;
    
    // Hiệu ứng bắn tim
    if (e) {
        // Lấy tọa độ click hoặc touch
        let clientX = e.clientX;
        let clientY = e.clientY;
        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }

        for(let i=0; i<10; i++) {
            createHeart(clientX, clientY);
        }
    }

    // Sau 2 giây tự trả về ảnh cũ
    setTimeout(() => {
        avatarImg.src = CONFIG.avatarDefault;
    }, 2000);
}

// PC: Hover vào đổi ảnh
avatarImg.addEventListener('mouseenter', () => {
    avatarImg.src = CONFIG.avatarChange;
});
avatarImg.addEventListener('mouseleave', () => {
    avatarImg.src = CONFIG.avatarDefault;
});

// PC & Mobile: Click/Touch để đổi ảnh + bắn tim
avatarImg.addEventListener('click', tempChangeAvatar);
avatarImg.addEventListener('touchstart', tempChangeAvatar, {passive: true});

function createHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.className = 'heart-pop';
    const randomX = (Math.random() * 100 - 50); 
    const randomY = (Math.random() * 100 - 50);
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.setProperty('--x', randomX + 'px');
    heart.style.setProperty('--y', randomY + 'px');
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
}

// --- 4. FIX LỖI GIẬT CHỮ (TYPEWRITER) ---
// Đã fix cứng min-height trong CSS, logic JS giữ nguyên
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeTarget = document.getElementById('typing-text');

function typeEffect() {
    const currentRole = CONFIG.roles[roleIndex];
    
    // Thêm ký tự không nhìn thấy để giữ dòng không bị xẹp khi xóa hết
    let textToShow = isDeleting ? currentRole.substring(0, charIndex--) : currentRole.substring(0, charIndex++);
    
    // Mẹo: Luôn giữ một ký tự tàng hình (&nbsp;) nếu chuỗi rỗng để giữ độ cao
    if (textToShow.length === 0) {
        typeTarget.innerHTML = "&nbsp;"; 
    } else {
        typeTarget.innerText = textToShow;
    }

    let typeSpeed = isDeleting ? 50 : 100;
    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false; roleIndex = (roleIndex + 1) % CONFIG.roles.length;
    }
    setTimeout(typeEffect, typeSpeed);
}
typeEffect();

// --- 5. COUNTDOWN ---
const targetTime = new Date(CONFIG.targetDate).getTime();
setInterval(() => {
    const now = new Date().getTime();
    const distance = targetTime - now;
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

// --- 6. MUSIC PLAYER ---
const playlist = [
    { name: "Ngủ sớm đi em - DucMinh", file: "song1.mp3" },
    { name: "Nhắn nhủ | Ronboogz",     file: "song2.mp3" },
    { name: "W/n - id 072019 | 3107",  file: "song3.mp3" },
    { name: "Madihu - Có em (Feat. Low G)", file: "song4.mp3" },
    { name: "TƯƠNG TƯ | CLOW X FLEPY", file: "song5.mp3" },
    { name: "Nghe kể năm 90s | Ân ngờ", file: "song6.mp3" }
];
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
if(songIndex >= playlist.length) songIndex = 0;
let isPlaying = false;
loadSong(playlist[songIndex]);
audio.volume = 0.5;

overlay.addEventListener('click', () => {
    overlay.style.opacity = '0';
    setTimeout(() => overlay.style.display = 'none', 500);
    playSong();
});

function loadSong(song) {
    songName.innerText = song.name;
    audio.src = song.file;
    localStorage.setItem('songIndex', songIndex);
}
function playSong() {
    isPlaying = true; audio.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    eqBars.forEach(b => b.style.animationPlayState = 'running');
}
function pauseSong() {
    isPlaying = false; audio.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    eqBars.forEach(b => b.style.animationPlayState = 'paused');
}

playBtn.addEventListener('click', () => isPlaying ? pauseSong() : playSong());
prevBtn.addEventListener('click', () => { songIndex = (songIndex - 1 + playlist.length) % playlist.length; loadSong(playlist[songIndex]); playSong(); });
nextBtn.addEventListener('click', () => { songIndex = (songIndex + 1) % playlist.length; loadSong(playlist[songIndex]); playSong(); });
audio.addEventListener('timeupdate', (e) => { const percent = (e.srcElement.currentTime / e.srcElement.duration) * 100; progress.style.width = `${percent}%`; });
audio.addEventListener('ended', () => nextBtn.click());
progressContainer.addEventListener('click', (e) => { const duration = audio.duration; audio.currentTime = (e.offsetX / progressContainer.clientWidth) * duration; });
volumeSlider.addEventListener('input', (e) => audio.volume = e.target.value / 100);
