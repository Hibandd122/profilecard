/* ========================================================
   GUNS.LOL INTEGRATED MUSIC PLAYER ENGINE
======================================================== */
const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev-track');
const nextBtn = document.getElementById('next-track');
const trackNameEl = document.getElementById('track-name');
const trackArtistEl = document.getElementById('track-artist');
const currentTrackNumEl = document.getElementById('current-track-num');
const seekFill = document.getElementById('seek-fill');
const seekContainer = document.getElementById('seek-container');
const seekTip = document.getElementById('seek-tip');
const volumeCtrl = document.getElementById('volume-control');
const muteBtn = document.getElementById('mute-btn');
const visualizerCanvas = document.getElementById('frequency-vis');
const vCtx = visualizerCanvas?.getContext('2d');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');
const audioAlert = document.getElementById('audio-alert');
const playlistToggleBtn = document.getElementById('playlist-toggle-btn');
const playlistMenu = document.getElementById('playlist-menu');
const musicPanel = document.querySelector('.music-panel');

const playlist = CONFIG.music.playlist;
let currentSongIndex = parseInt(localStorage.getItem('saved_song_index') || '0', 10);
if (isNaN(currentSongIndex) || currentSongIndex < 0 || currentSongIndex >= playlist.length) {
    currentSongIndex = 0;
}

let isAudioPlaying = false;
let isMuted = false;
let previousVolume = CONFIG.music.defaultVolume || 45;
let audioCtx = null;
let analyser = null;
let audioSource = null;

// Khởi tạo Playlist Menu
function initPlaylistMenu() {
    if (!playlistMenu) return;
    playlistMenu.innerHTML = '';
    playlist.forEach((song, idx) => {
        const item = document.createElement('div');
        item.className = `playlist-item ${idx === currentSongIndex ? 'active' : ''}`;
        item.innerHTML = `<i class="fas fa-${idx === currentSongIndex ? 'volume-high' : 'music'}"></i> <span>${idx + 1}. ${song.name}</span>`;
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            loadAndPlaySong(idx);
            playlistMenu.classList.remove('show');
        });
        playlistMenu.appendChild(item);
    });
}

function updatePlaylistActiveItem() {
    if (!playlistMenu) return;
    const items = playlistMenu.querySelectorAll('.playlist-item');
    items.forEach((item, idx) => {
        const isActive = idx === currentSongIndex;
        item.classList.toggle('active', isActive);
        const icon = item.querySelector('i');
        if (icon) {
            icon.className = `fas fa-${isActive ? 'volume-high' : 'music'}`;
        }
    });
}

const totalTracksNumEl = document.getElementById('total-tracks-num');

function loadSong(index) {
    if (!playlist || playlist.length === 0) return;
    currentSongIndex = ((index % playlist.length) + playlist.length) % playlist.length;
    const song = playlist[currentSongIndex];

    if (trackNameEl) trackNameEl.innerText = song.name;
    if (trackArtistEl) trackArtistEl.innerText = song.artist || 'Anime OST';
    if (currentTrackNumEl) currentTrackNumEl.innerText = currentSongIndex + 1;
    if (totalTracksNumEl) totalTracksNumEl.innerText = playlist.length;
    if (audio) {
        audio.src = song.file;
        audio.load();
    }
    if (audioAlert) audioAlert.classList.add('hidden');
    localStorage.setItem('saved_song_index', currentSongIndex);
    updatePlaylistActiveItem();
}

function initAudioContext() {
    if (audioCtx || !audio) return;
    try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        audioCtx = new AudioContextClass();
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 128;
        audioSource = audioCtx.createMediaElementSource(audio);
        audioSource.connect(analyser);
        analyser.connect(audioCtx.destination);
    } catch (err) {
        console.warn("AudioContext setup notice:", err);
    }
}

function playAudio() {
    if (!audio) return;
    initAudioContext();
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    
    audio.play().then(() => {
        isAudioPlaying = true;
        if (playBtn) playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        if (musicPanel) musicPanel.classList.add('playing');
    }).catch(err => {
        console.warn("Autoplay notice:", err);
        isAudioPlaying = false;
        if (playBtn) playBtn.innerHTML = '<i class="fas fa-play"></i>';
        if (musicPanel) musicPanel.classList.remove('playing');
    });
}

function pauseAudio() {
    if (!audio) return;
    audio.pause();
    isAudioPlaying = false;
    if (playBtn) playBtn.innerHTML = '<i class="fas fa-play"></i>';
    if (musicPanel) musicPanel.classList.remove('playing');
}

function toggleAudio() {
    if (isAudioPlaying) {
        pauseAudio();
    } else {
        playAudio();
    }
}

function loadAndPlaySong(index) {
    loadSong(index);
    playAudio();
}

function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
}

// Thiết lập Volume
function setVolume(val) {
    const clamped = Math.max(0, Math.min(100, val));
    if (audio) audio.volume = clamped / 100;
    if (volumeCtrl) volumeCtrl.value = clamped;
    localStorage.setItem('saved_player_volume', clamped);

    if (muteBtn) {
        if (clamped === 0) {
            muteBtn.innerHTML = '<i class="fas fa-volume-xmark"></i>';
            isMuted = true;
        } else if (clamped < 40) {
            muteBtn.innerHTML = '<i class="fas fa-volume-low"></i>';
            isMuted = false;
        } else {
            muteBtn.innerHTML = '<i class="fas fa-volume-high"></i>';
            isMuted = false;
        }
    }
}

// Render Audio Visualizer & Beat Pulsing
function renderMusicVisualizer() {
    requestAnimationFrame(renderMusicVisualizer);
    if (document.hidden) return;

    if (!visualizerCanvas || !vCtx) return;
    
    vCtx.clearRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);

    if (!analyser || !isAudioPlaying) {
        // Vẽ waveform tĩnh nhẹ nhàng khi không phát
        vCtx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        for (let x = 0; x < visualizerCanvas.width; x += 4) {
            vCtx.fillRect(x, visualizerCanvas.height - 3, 2, 3);
        }
        return;
    }

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    const barCount = 20;
    const barWidth = (visualizerCanvas.width / barCount) - 2;
    let x = 0;

    for (let i = 0; i < barCount; i++) {
        const dataIndex = Math.floor(i * (bufferLength / barCount));
        const barHeight = (dataArray[dataIndex] / 255) * visualizerCanvas.height;

        const gradient = vCtx.createLinearGradient(0, visualizerCanvas.height, 0, 0);
        gradient.addColorStop(0, '#00f2fe');
        gradient.addColorStop(1, '#ec4899');

        vCtx.fillStyle = gradient;
        vCtx.fillRect(x, visualizerCanvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 2;
    }

    // Hiệu ứng nhịp đập card
    if (CONFIG.music.enablePulse) {
        const avg = dataArray.reduce((sum, v) => sum + v, 0) / bufferLength;
        const pulseRatio = Math.min(avg / 100, 1);
        const card = document.getElementById('main-card');
        if (card) {
            card.style.borderColor = pulseRatio > 0.4 ? `rgba(0, 242, 254, ${0.2 + pulseRatio * 0.3})` : '';
        }
    }
}

// Event Listeners
if (playBtn) playBtn.addEventListener('click', toggleAudio);
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        loadAndPlaySong(currentSongIndex - 1);
    });
}
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        loadAndPlaySong(currentSongIndex + 1);
    });
}

if (playlistToggleBtn && playlistMenu) {
    playlistToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        playlistMenu.classList.toggle('show');
    });
    document.addEventListener('click', () => {
        playlistMenu.classList.remove('show');
    });
}

if (volumeCtrl) {
    volumeCtrl.addEventListener('input', (e) => {
        setVolume(parseInt(e.target.value, 10));
    });
}

if (muteBtn) {
    muteBtn.addEventListener('click', () => {
        if (isMuted) {
            setVolume(previousVolume || 45);
        } else {
            previousVolume = parseInt(volumeCtrl?.value || '45', 10);
            setVolume(0);
        }
    });
}

if (audio) {
    audio.addEventListener('timeupdate', () => {
        if (audio.duration && seekFill) {
            seekFill.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
        }
        if (currentTimeEl) currentTimeEl.innerText = formatTime(audio.currentTime);
    });

    audio.addEventListener('loadedmetadata', () => {
        if (totalTimeEl) totalTimeEl.innerText = formatTime(audio.duration);
        if (audioAlert) audioAlert.classList.add('hidden');
    });

    audio.addEventListener('ended', () => {
        loadAndPlaySong(currentSongIndex + 1);
    });

    audio.addEventListener('error', () => {
        if (audioAlert) audioAlert.classList.remove('hidden');
        isAudioPlaying = false;
        if (playBtn) playBtn.innerHTML = '<i class="fas fa-play"></i>';
    });
}

// Seek Bar Interaction
if (seekContainer) {
    seekContainer.addEventListener('click', (e) => {
        if (!audio || !audio.duration) return;
        const rect = seekContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        audio.currentTime = (clickX / rect.width) * audio.duration;
    });

    seekContainer.addEventListener('mousemove', (e) => {
        if (!audio || !audio.duration || !seekTip) return;
        const rect = seekContainer.getBoundingClientRect();
        const moveX = e.clientX - rect.left;
        const previewTime = (moveX / rect.width) * audio.duration;
        seekTip.style.left = `${moveX}px`;
        seekTip.innerText = formatTime(previewTime);
        seekTip.style.opacity = '1';
    });

    seekContainer.addEventListener('mouseleave', () => {
        if (seekTip) seekTip.style.opacity = '0';
    });
}

// Khởi chạy Player
initPlaylistMenu();
loadSong(currentSongIndex);
const savedVol = localStorage.getItem('saved_player_volume');
setVolume(savedVol !== null ? parseInt(savedVol, 10) : (CONFIG.music.defaultVolume || 45));
renderMusicVisualizer();

// Hook toàn cục để phát khi click overlay
window.playMusicFromStart = function() {
    playAudio();
};