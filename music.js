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
const playlist = CONFIG.music.playlist;
const defaultVolume = CONFIG.music.defaultVolume;

let songIndex = localStorage.getItem('songIndex') || 0;
if (songIndex >= playlist.length) songIndex = 0;
let isPlaying = false;
let audioCtx, analyser, source;

// ===== VOLUME =====
function saveVolume(vol) {
    localStorage.setItem('playerVolume', vol);
}

function loadVolume() {
    const saved = localStorage.getItem('playerVolume');
    if (saved !== null) {
        return Math.min(100, Math.max(0, parseInt(saved, 10)));
    }
    return 45;
}

function loadSong(song) {
    if (trackName) trackName.innerText = song.name;
    if (audio) audio.src = song.file;
    localStorage.setItem('songIndex', songIndex);
    if (audioAlert) audioAlert.classList.add('hidden');
}

if (audio && playlist[songIndex]) loadSong(playlist[songIndex]);

// Áp dụng volume đã lưu
if (audio) {
    const savedVol = loadVolume();
    audio.volume = savedVol / 100;
}
if (volumeCtrl) volumeCtrl.value = loadVolume();

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
    volumeCtrl.addEventListener('input', (e) => {
        const val = e.target.value;
        audio.volume = val / 100;
        saveVolume(val);
    });
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