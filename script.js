/* ===== CẤU HÌNH ===== */
const CONFIG = {
    avatars: ["avatar.png", "avatar2.png", "avatar3.png", "avatar4.png"],
    targetDate: "2026-04-03T18:30:00+07:00",
    roles: ["</> PYTHON CODER", "🎮 ROBLOX GAMER", "💖 WAIFU COLLECTOR", "🎵 LOFI CHILL"]
};

/* ===== NỀN SAO ===== */
const starCanvas = document.getElementById('starry-canvas');
const starCtx = starCanvas?.getContext('2d');
let starWidth, starHeight;
let stars = [];

function initStars() {
    if (!starCanvas) return;
    starWidth = window.innerWidth;
    starHeight = window.innerHeight;
    starCanvas.width = starWidth;
    starCanvas.height = starHeight;
    stars = [];
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * starWidth,
            y: Math.random() * starHeight,
            radius: Math.random() * 1.8 + 0.8,
            speed: 0.1 + Math.random() * 0.5,
            angle: Math.random() * 360,
            glow: Math.random() * 0.7 + 0.3
        });
    }
}

function drawStars() {
    if (!starCtx) return;
    starCtx.clearRect(0, 0, starWidth, starHeight);
    stars.forEach(s => {
        starCtx.beginPath();
        starCtx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        starCtx.fillStyle = `rgba(255, 255, 255, ${s.glow})`;
        starCtx.shadowBlur = 8;
        starCtx.shadowColor = '#00f2ff';
        starCtx.fill();
        s.y += s.speed;
        s.x += Math.sin(s.angle * Math.PI / 180) * 0.1;
        s.angle += 0.2;
        if (s.y > starHeight) { s.y = 0; s.x = Math.random() * starWidth; }
        if (s.x > starWidth) s.x = 0;
        if (s.x < 0) s.x = starWidth;
    });
    requestAnimationFrame(drawStars);
}
window.addEventListener('resize', initStars);
if (starCanvas) {
    initStars();
    drawStars();
}

/* ===== SPARK ===== */
const sparkCanvas = document.getElementById('spark-field');
const sparkCtx = sparkCanvas?.getContext('2d');
let sparkWidth, sparkHeight;
let sparks = [];

function initSparkField() {
    if (!sparkCanvas) return;
    sparkWidth = window.innerWidth;
    sparkHeight = window.innerHeight;
    sparkCanvas.width = sparkWidth;
    sparkCanvas.height = sparkHeight;
}
function addSpark(x, y) {
    for (let i = 0; i < 3; i++) {
        sparks.push({
            x, y,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6 - 2,
            life: 0.8 + Math.random() * 0.4,
            size: Math.random() * 5 + 2,
            color: `hsl(${Math.random() * 60 + 180}, 100%, 65%)`
        });
    }
}
function drawSparks() {
    if (!sparkCtx) return;
    sparkCtx.clearRect(0, 0, sparkWidth, sparkHeight);
    sparks = sparks.filter(s => {
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.15;
        s.life -= 0.008;
        if (s.life <= 0) return false;
        sparkCtx.beginPath();
        sparkCtx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
        sparkCtx.fillStyle = s.color;
        sparkCtx.shadowBlur = 12;
        sparkCtx.shadowColor = s.color;
        sparkCtx.fill();
        return true;
    });
    requestAnimationFrame(drawSparks);
}
if (window.matchMedia("(min-width: 850px)").matches && sparkCanvas) {
    initSparkField();
    drawSparks();
    document.addEventListener('mousemove', (e) => addSpark(e.clientX, e.clientY));
}

/* ===== MUSIC PLAYER ===== */
const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev-track');
const nextBtn = document.getElementById('next-track');
const trackName = document.getElementById('track-name');
const seekFill = document.getElementById('seek-fill');
const seekContainer = document.getElementById('seek-container');
const seekTip = document.getElementById('seek-tip');
const volumeCtrl = document.getElementById('volume-control');
const visualizer = document.getElementById('frequency-vis');
const vCtx = visualizer?.getContext('2d');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');
const audioAlert = document.getElementById('audio-alert');

const playlist = [
    { name: "Chiisana Koi no Uta", file: "song1.mp3" },
    { name: "Remember", file: "song2.mp3" },
    { name: "ハッピーシンセサイザ", file: "song3.mp3" }
];

let songIndex = localStorage.getItem('songIndex') || 0;
if (songIndex >= playlist.length) songIndex = 0;
let isPlaying = false;
let audioCtx, analyser, source;

function loadSong(song) {
    if (trackName) trackName.innerText = song.name;
    if (audio) audio.src = song.file;
    localStorage.setItem('songIndex', songIndex);
    if (audioAlert) audioAlert.classList.add('hidden');
}
if (audio && playlist[songIndex]) loadSong(playlist[songIndex]);
if (audio) audio.volume = 0.45;
if (volumeCtrl) volumeCtrl.value = 45;

function initAudioAnalyser() {
    if (audioCtx || !audio) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 128;
    try {
        source = audioCtx.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
    } catch (e) {}
}

function playAudio() {
    if (!audio) return;
    if (!audioCtx) initAudioAnalyser();
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    isPlaying = true;
    audio.play()
        .then(() => {
            if (playBtn) playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        })
        .catch(err => {
            if (audioAlert) audioAlert.classList.remove('hidden');
            isPlaying = false;
            if (playBtn) playBtn.innerHTML = '<i class="fas fa-play"></i>';
        });
}

function pauseAudio() {
    if (!audio) return;
    isPlaying = false;
    audio.pause();
    if (playBtn) playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

if (playBtn) {
    playBtn.addEventListener('click', () => isPlaying ? pauseAudio() : playAudio());
    playBtn.addEventListener('touchstart', (e) => { e.preventDefault(); isPlaying ? pauseAudio() : playAudio(); });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        songIndex = (songIndex - 1 + playlist.length) % playlist.length;
        loadSong(playlist[songIndex]);
        if (isPlaying) playAudio(); else if (audio) audio.load();
    });
    prevBtn.addEventListener('touchstart', (e) => { e.preventDefault(); prevBtn.click(); });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        songIndex = (songIndex + 1) % playlist.length;
        loadSong(playlist[songIndex]);
        if (isPlaying) playAudio(); else if (audio) audio.load();
    });
    nextBtn.addEventListener('touchstart', (e) => { e.preventDefault(); nextBtn.click(); });
}

if (audio) {
    audio.addEventListener('timeupdate', () => {
        if (audio.duration && seekFill) {
            seekFill.style.width = (audio.currentTime / audio.duration) * 100 + '%';
        }
        if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
    });
    audio.addEventListener('loadedmetadata', () => {
        if (totalTimeEl) totalTimeEl.textContent = formatTime(audio.duration);
        if (audioAlert) audioAlert.classList.add('hidden');
    });
    audio.addEventListener('ended', () => { if (nextBtn) nextBtn.click(); });
    audio.addEventListener('error', () => {
        if (audioAlert) audioAlert.classList.remove('hidden');
        isPlaying = false;
        if (playBtn) playBtn.innerHTML = '<i class="fas fa-play"></i>';
    });
}

function formatTime(sec) {
    if (isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
}

if (seekContainer) {
    seekContainer.addEventListener('click', (e) => {
        if (!audio || !audio.duration) return;
        const rect = seekContainer.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        audio.currentTime = (offsetX / rect.width) * audio.duration;
    });
    seekContainer.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (!audio || !audio.duration) return;
        const touch = e.touches[0];
        const rect = seekContainer.getBoundingClientRect();
        const offsetX = touch.clientX - rect.left;
        audio.currentTime = (offsetX / rect.width) * audio.duration;
    });
    seekContainer.addEventListener('mousemove', (e) => {
        if (!audio || !audio.duration || !seekTip) return;
        const rect = seekContainer.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const seekTime = (offsetX / rect.width) * audio.duration;
        seekTip.style.left = offsetX + 'px';
        seekTip.textContent = formatTime(seekTime);
    });
    seekContainer.addEventListener('mouseleave', () => {
        if (seekTip) seekTip.style.opacity = '0';
    });
}

if (volumeCtrl && audio) {
    volumeCtrl.addEventListener('input', (e) => audio.volume = e.target.value / 100);
    volumeCtrl.addEventListener('touchstart', (e) => e.stopPropagation());
}

// VISUALIZER
function drawFrequencyBars() {
    requestAnimationFrame(drawFrequencyBars);
    if (!vCtx || !analyser || !isPlaying) {
        if (vCtx && visualizer) {
            vCtx.clearRect(0, 0, visualizer.width, visualizer.height);
            vCtx.fillStyle = '#0a0c14';
            vCtx.fillRect(0, 0, visualizer.width, visualizer.height);
        }
        return;
    }
    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);
    vCtx.clearRect(0, 0, visualizer.width, visualizer.height);
    const barWidth = (visualizer.width / data.length) * 2.2;
    let x = 0;
    for (let i = 0; i < data.length; i++) {
        const barHeight = (data[i] / 255) * visualizer.height;
        const gradient = vCtx.createLinearGradient(0, 0, 0, visualizer.height);
        gradient.addColorStop(0, '#00f2ff');
        gradient.addColorStop(1, '#ff0099');
        vCtx.fillStyle = gradient;
        vCtx.fillRect(x, visualizer.height - barHeight, barWidth, barHeight);
        x += barWidth + 1.5;
    }
}
if (visualizer) drawFrequencyBars();

// CARD PULSE
function musicPulse() {
    requestAnimationFrame(musicPulse);
    if (!analyser || !isPlaying) return;
    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);
    const avg = data.reduce((a,b) => a+b,0) / data.length;
    const intensity = Math.min(avg / 60, 1.8);
    const card = document.querySelector('.card-container');
    if (card) {
        card.style.boxShadow = `0 0 ${30 + intensity*30}px #00f2ff, 0 0 ${60 + intensity*60}px #ff0099`;
    }
}
musicPulse();

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
    }, 2000);
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
    }, 2000);
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

/* ===== GREETING (đã bỏ) ===== */
// (Không cần)

/* ===== TYPEWRITER (ĐÃ FIX LỖI NULL) ===== */
let rI = 0, cI = 0, del = false;
const badge = document.getElementById('typing-badge');
function type() {
    if (!badge) return; // QUAN TRỌNG: Nếu không tìm thấy badge thì thoát
    const role = CONFIG.roles[rI];
    let sp = 80;
    if (del) { cI--; sp = 35; } else cI++;
    badge.innerHTML = role.substring(0, cI) || '&nbsp;';
    if (!del && cI === role.length) { sp = 2000; del = true; }
    else if (del && cI === 0) { del = false; rI = (rI + 1) % CONFIG.roles.length; sp = 450; }
    setTimeout(type, sp);
}
type(); // Bắt đầu typewriter nếu badge tồn tại

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

/* ===== 3D TILT ===== */
const wrapper = document.getElementById('card-tilt');
const cardMain = document.querySelector('.card-container');
if (wrapper && cardMain && window.matchMedia("(min-width: 850px)").matches) {
    wrapper.addEventListener('mousemove', (e) => {
        const rect = wrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotX = ((y - cy) / cy) * 5;
        const rotY = ((x - cx) / cx) * 5;
        cardMain.style.transform = `rotateX(${-rotX}deg) rotateY(${rotY}deg)`;
    });
    wrapper.addEventListener('mouseleave', () => {
        cardMain.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
}

/* ===== SOCIAL BUTTONS ===== */
const socialButtons = document.querySelectorAll('.social-icon');
socialButtons.forEach(btn => {
    const url = btn.dataset.url;
    if (!url) return;

    const openLink = (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.open(url, '_blank');
    };

    btn.addEventListener('click', openLink);
    btn.addEventListener('touchstart', openLink, { passive: false });
});