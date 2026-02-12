/* --- CẤU HÌNH --- */
const CONFIG = {
    avatarDefault: "avatar.png", 
    avatarChange: "avatar2.png", 
    targetDate: "2026-04-03T18:30:00+07:00", 
    roles: ["</> PYTHON CODER", "🎮 ROBLOX GAMER", "💖 WAIFU COLLECTOR", "🎵 LOFI CHILL"]
};

// --- MAGIC CURSOR ---
if (window.matchMedia("(min-width: 850px)").matches) {
    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = e.pageX + 'px';
        trail.style.top = e.pageY + 'px';
        document.body.appendChild(trail);
        setTimeout(() => { trail.style.opacity = '0'; trail.style.transform = 'scale(0.5)'; }, 10);
        setTimeout(() => trail.remove(), 300);
    });
}

// --- SMART GREETING ---
function setGreeting() {
    const greetBox = document.getElementById('greeting-box');
    const vnTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Ho_Chi_Minh"});
    const hour = new Date(vnTime).getHours();
    let msg = ""; let icon = "";
    if (hour >= 5 && hour < 12) { msg = "OHAYO! NGÀY MỚI TỐT LÀNH"; icon = "⛅"; }
    else if (hour >= 12 && hour < 18) { msg = "KONNICHIWA! CỐ GẮNG NHÉ"; icon = "🍵"; }
    else { msg = "OYASUMI! THƯ GIÃN THÔI"; icon = "🌙"; }
    greetBox.innerHTML = `${icon} ${msg}`;
}
setGreeting();
setInterval(setGreeting, 60000); 

// --- AVATAR INTERACTION (FIX CHIỀU CAO) ---
const avatarImg = document.getElementById('char-avatar');
let isAvatarAnimating = false;

function handleAvatarInteract(e) {
    if (isAvatarAnimating) return;
    isAvatarAnimating = true;

    // Đổi ảnh + Thêm class chỉnh độ cao
    avatarImg.src = CONFIG.avatarChange;
    avatarImg.classList.add('active-touch');
    avatarImg.classList.add('fix-height'); // <--- KÍCH HOẠT FIX CSS

    let x = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    let y = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    
    for(let i=0; i<8; i++) createHeart(x, y);

    setTimeout(() => {
        avatarImg.src = CONFIG.avatarDefault;
        avatarImg.classList.remove('active-touch');
        avatarImg.classList.remove('fix-height'); // <--- TẮT FIX CSS
        isAvatarAnimating = false;
    }, 2000);
}

avatarImg.addEventListener('touchstart', (e) => { e.preventDefault(); handleAvatarInteract(e); }, {passive: false});
avatarImg.addEventListener('click', handleAvatarInteract);

// Hover trên PC
avatarImg.addEventListener('mouseenter', () => { 
    if(!isAvatarAnimating) {
        avatarImg.src = CONFIG.avatarChange; 
        avatarImg.classList.add('fix-height'); // Thêm khi hover
    }
});
avatarImg.addEventListener('mouseleave', () => { 
    if(!isAvatarAnimating) {
        avatarImg.src = CONFIG.avatarDefault; 
        avatarImg.classList.remove('fix-height'); // Xóa khi hết hover
    }
});

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

// --- TYPEWRITER (FIX MẤT CHỮ CUỐI) ---
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typeTarget = document.getElementById('typing-text');
function typeEffect() {
    const currentRole = CONFIG.roles[roleIndex];
    let typeSpeed = 100;
    if (isDeleting) { charIndex--; typeSpeed = 50; } else { charIndex++; }
    let textToShow = currentRole.substring(0, charIndex);
    typeTarget.innerHTML = textToShow.length === 0 ? "&nbsp;" : textToShow;

    if (!isDeleting && charIndex === currentRole.length) { typeSpeed = 2000; isDeleting = true; }
    else if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % CONFIG.roles.length; typeSpeed = 500; }
    setTimeout(typeEffect, typeSpeed);
}
typeEffect();

// --- COUNTDOWN ---
const targetTime = new Date(CONFIG.targetDate).getTime();
setInterval(() => {
    const now = new Date().getTime();
    const distance = targetTime - now;
    if (distance < 0) return;
    document.getElementById('days').innerText = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
    document.getElementById('hours').innerText = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
    document.getElementById('minutes').innerText = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    document.getElementById('seconds').innerText = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');
}, 1000);

// --- MUSIC PLAYER ---
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

function loadSong(song) { songName.innerText = song.name; audio.src = song.file; localStorage.setItem('songIndex', songIndex); }
function playSong() { isPlaying = true; audio.play().catch(e => console.log(e)); playBtn.innerHTML = '<i class="fas fa-pause"></i>'; eqBars.forEach(b => b.style.animationPlayState = 'running'); }
function pauseSong() { isPlaying = false; audio.pause(); playBtn.innerHTML = '<i class="fas fa-play"></i>'; eqBars.forEach(b => b.style.animationPlayState = 'paused'); }

playBtn.addEventListener('click', () => isPlaying ? pauseSong() : playSong());
prevBtn.addEventListener('click', () => { songIndex = (songIndex - 1 + playlist.length) % playlist.length; loadSong(playlist[songIndex]); playSong(); });
nextBtn.addEventListener('click', () => { songIndex = (songIndex + 1) % playlist.length; loadSong(playlist[songIndex]); playSong(); });
audio.addEventListener('timeupdate', (e) => { if(e.srcElement.duration) progress.style.width = `${(e.srcElement.currentTime / e.srcElement.duration) * 100}%`; });
audio.addEventListener('ended', () => nextBtn.click());
progressContainer.addEventListener('click', (e) => { audio.currentTime = (e.offsetX / progressContainer.clientWidth) * audio.duration; });
volumeSlider.addEventListener('input', (e) => audio.volume = e.target.value / 100);
