/* ========================================================
   MAHIKARI · STUDIO AUDIO SUITE
   Hi-Fi Web Audio Player with EQ Filters & Smart Playlist
======================================================== */
(function() {
    'use strict';

    const audio = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-pause');
    const prevBtn = document.getElementById('prev-track');
    const nextBtn = document.getElementById('next-track');
    const trackNameEl = document.getElementById('track-name');
    const trackArtistEl = document.getElementById('track-artist');
    const currentTrackNumEl = document.getElementById('current-track-num');
    const totalTracksNumEl = document.getElementById('total-tracks-num');
    const seekFill = document.getElementById('seek-fill');
    const seekContainer = document.getElementById('seek-container');
    const seekTip = document.getElementById('seek-tip');
    const volumeCtrl = document.getElementById('volume-control');
    const muteBtn = document.getElementById('mute-btn');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    const audioAlert = document.getElementById('audio-alert');
    const playlistToggleBtn = document.getElementById('playlist-toggle-btn');
    const playlistMenu = document.getElementById('playlist-menu');
    const audioFxBtn = document.getElementById('audio-fx-btn');
    const audioFxMenu = document.getElementById('audio-fx-menu');
    const categoryTabs = document.querySelectorAll('.cat-tab');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const repeatBtn = document.getElementById('repeat-btn');
    const vinylDisc = document.getElementById('vinyl-disc');
    const albumArt = document.getElementById('player-album-art');

    if (!audio) return;

    const fullPlaylist = CONFIG.music.playlist || [];
    let currentCategory = localStorage.getItem('mahikari_player_category') || 'all';

    function getFilteredPlaylist() {
        if (currentCategory === 'all') return fullPlaylist;
        return fullPlaylist.filter(song => song.category === currentCategory);
    }

    let activePlaylist = getFilteredPlaylist();
    let currentTrackIndex = 0;
    let isShuffle = localStorage.getItem('mahikari_player_shuffle') === 'true';
    let repeatMode = localStorage.getItem('mahikari_player_repeat') || 'all'; // 'all', 'one', 'none'
    let currentAudioFx = localStorage.getItem('mahikari_audio_fx') || 'hifi';
    let isMuted = false;
    let lastVolume = CONFIG.music.defaultVolume || 45;
    let searchQuery = '';

    // Web Audio Architecture
    let audioCtx = null;
    let eqFilter = null;
    let audioSource = null;
    let isContextReady = false;

    function initAudioContext() {
        if (isContextReady) return;
        try {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (!AudioContextClass) return;
            audioCtx = new AudioContextClass();
            eqFilter = audioCtx.createBiquadFilter();
            audioSource = audioCtx.createMediaElementSource(audio);
            audioSource.connect(eqFilter);
            eqFilter.connect(audioCtx.destination);
            applyEqPreset(currentAudioFx);
            isContextReady = true;
        } catch (_) {}
    }

    function applyEqPreset(presetId) {
        currentAudioFx = presetId;
        localStorage.setItem('mahikari_audio_fx', presetId);
        if (!eqFilter || !audioCtx) return;

        const now = audioCtx.currentTime;
        if (presetId === 'bass') {
            eqFilter.type = 'lowshelf';
            eqFilter.frequency.setValueAtTime(180, now);
            eqFilter.gain.setValueAtTime(6.0, now);
        } else if (presetId === 'lofi') {
            eqFilter.type = 'bandpass';
            eqFilter.frequency.setValueAtTime(1500, now);
            eqFilter.Q.setValueAtTime(0.8, now);
        } else if (presetId === 'vocal') {
            eqFilter.type = 'peaking';
            eqFilter.frequency.setValueAtTime(2600, now);
            eqFilter.Q.setValueAtTime(1.0, now);
            eqFilter.gain.setValueAtTime(5.0, now);
        } else {
            // 'hifi' studio reference
            eqFilter.type = 'allpass';
        }
        renderFxMenu();
    }

    function formatTime(seconds) {
        if (isNaN(seconds) || seconds < 0) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function updateMediaSession(track) {
        if (!('mediaSession' in navigator)) return;
        navigator.mediaSession.metadata = new MediaMetadata({
            title: track.name,
            artist: track.artist,
            album: 'Mahikari Studio Collection',
            artwork: [
                { src: 'assets/avatar1.png', sizes: '512x512', type: 'image/png' }
            ]
        });

        navigator.mediaSession.setActionHandler('play', playAudio);
        navigator.mediaSession.setActionHandler('pause', pauseAudio);
        navigator.mediaSession.setActionHandler('previoustrack', prevTrack);
        navigator.mediaSession.setActionHandler('nexttrack', nextTrack);
    }

    function loadTrack(index, autoPlay = false) {
        if (activePlaylist.length === 0) return;
        if (index < 0) index = activePlaylist.length - 1;
        if (index >= activePlaylist.length) index = 0;

        currentTrackIndex = index;
        const track = activePlaylist[currentTrackIndex];
        if (!track) return;

        audio.src = track.file;
        if (trackNameEl) trackNameEl.textContent = track.name;
        if (trackArtistEl) trackArtistEl.textContent = track.artist;
        if (currentTrackNumEl) currentTrackNumEl.textContent = (currentTrackIndex + 1).toString();
        if (totalTracksNumEl) totalTracksNumEl.textContent = activePlaylist.length.toString();

        if (seekFill) seekFill.style.width = '0%';
        if (currentTimeEl) currentTimeEl.textContent = '0:00';
        if (totalTimeEl) totalTimeEl.textContent = track.duration || '0:00';

        updateMediaSession(track);
        renderPlaylist();

        if (autoPlay) {
            playAudio();
        }
    }

    function playAudio() {
        initAudioContext();
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        audio.play().then(() => {
            if (playBtn) playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            if (vinylDisc) vinylDisc.classList.add('spinning');
            if (audioAlert) audioAlert.classList.add('hidden');
        }).catch(() => {
            if (playBtn) playBtn.innerHTML = '<i class="fas fa-play"></i>';
            if (vinylDisc) vinylDisc.classList.remove('spinning');
        });
    }

    function pauseAudio() {
        audio.pause();
        if (playBtn) playBtn.innerHTML = '<i class="fas fa-play"></i>';
        if (vinylDisc) vinylDisc.classList.remove('spinning');
    }

    function togglePlay() {
        if (audio.paused) {
            playAudio();
        } else {
            pauseAudio();
        }
    }

    function nextTrack() {
        if (isShuffle && activePlaylist.length > 1) {
            let nextIdx = currentTrackIndex;
            while (nextIdx === currentTrackIndex) {
                nextIdx = Math.floor(Math.random() * activePlaylist.length);
            }
            loadTrack(nextIdx, true);
        } else {
            loadTrack(currentTrackIndex + 1, true);
        }
    }

    function prevTrack() {
        if (audio.currentTime > 3) {
            audio.currentTime = 0;
            return;
        }
        loadTrack(currentTrackIndex - 1, true);
    }

    function setVolume(val) {
        const clamped = Math.max(0, Math.min(100, val));
        audio.volume = clamped / 100;
        if (volumeCtrl) volumeCtrl.value = clamped;
        isMuted = clamped === 0;

        if (muteBtn) {
            if (clamped === 0) {
                muteBtn.innerHTML = '<i class="fas fa-volume-xmark"></i>';
            } else if (clamped < 50) {
                muteBtn.innerHTML = '<i class="fas fa-volume-low"></i>';
            } else {
                muteBtn.innerHTML = '<i class="fas fa-volume-high"></i>';
            }
        }
    }

    function toggleMute() {
        if (isMuted) {
            setVolume(lastVolume || 45);
        } else {
            lastVolume = parseInt(volumeCtrl?.value || '45', 10);
            setVolume(0);
        }
    }

    // Category Tabs Filter
    function setupCategoryTabs() {
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const cat = tab.dataset.cat;
                if (!cat || cat === currentCategory) return;

                categoryTabs.forEach(t => t.classList.toggle('active', t.dataset.cat === cat));
                currentCategory = cat;
                localStorage.setItem('mahikari_player_category', cat);

                activePlaylist = getFilteredPlaylist();
                loadTrack(0, !audio.paused);
            });
        });

        // Set initial active tab
        categoryTabs.forEach(t => t.classList.toggle('active', t.dataset.cat === currentCategory));
    }

    // Audio Progress & Seek Bar
    audio.addEventListener('timeupdate', () => {
        if (!audio.duration) return;
        const pct = (audio.currentTime / audio.duration) * 100;
        if (seekFill) seekFill.style.width = `${pct}%`;
        if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
    });

    audio.addEventListener('loadedmetadata', () => {
        if (totalTimeEl && audio.duration) {
            totalTimeEl.textContent = formatTime(audio.duration);
        }
    });

    audio.addEventListener('ended', () => {
        if (repeatMode === 'one') {
            audio.currentTime = 0;
            playAudio();
        } else if (repeatMode === 'none' && currentTrackIndex === activePlaylist.length - 1) {
            pauseAudio();
        } else {
            nextTrack();
        }
    });

    audio.addEventListener('error', () => {
        if (audioAlert) {
            audioAlert.classList.remove('hidden');
            audioAlert.textContent = 'Audio file currently unavailable';
        }
        pauseAudio();
    });

    if (seekContainer) {
        seekContainer.addEventListener('click', (e) => {
            if (!audio.duration) return;
            const rect = seekContainer.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            audio.currentTime = Math.max(0, Math.min(audio.duration, pos * audio.duration));
        });

        seekContainer.addEventListener('mousemove', (e) => {
            if (!audio.duration || !seekTip) return;
            const rect = seekContainer.getBoundingClientRect();
            const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            seekTip.style.left = `${pos * 100}%`;
            seekTip.textContent = formatTime(pos * audio.duration);
            seekTip.style.opacity = '1';
        });

        seekContainer.addEventListener('mouseleave', () => {
            if (seekTip) seekTip.style.opacity = '0';
        });
    }

    // Controls Buttons
    if (playBtn) playBtn.addEventListener('click', togglePlay);
    if (nextBtn) nextBtn.addEventListener('click', nextTrack);
    if (prevBtn) prevBtn.addEventListener('click', prevTrack);
    if (muteBtn) muteBtn.addEventListener('click', toggleMute);

    if (volumeCtrl) {
        volumeCtrl.addEventListener('input', (e) => {
            setVolume(parseInt(e.target.value, 10));
        });
    }

    if (shuffleBtn) {
        shuffleBtn.classList.toggle('active', isShuffle);
        shuffleBtn.addEventListener('click', () => {
            isShuffle = !isShuffle;
            localStorage.setItem('mahikari_player_shuffle', isShuffle.toString());
            shuffleBtn.classList.toggle('active', isShuffle);
        });
    }

    if (repeatBtn) {
        function updateRepeatUI() {
            if (repeatMode === 'all') {
                repeatBtn.className = 'ctrl repeat-ctrl active';
                repeatBtn.innerHTML = '<i class="fas fa-repeat"></i>';
                repeatBtn.title = 'Repeat: All';
            } else if (repeatMode === 'one') {
                repeatBtn.className = 'ctrl repeat-ctrl active';
                repeatBtn.innerHTML = '<i class="fas fa-repeat-1"></i>';
                repeatBtn.title = 'Repeat: One Track';
            } else {
                repeatBtn.className = 'ctrl repeat-ctrl';
                repeatBtn.innerHTML = '<i class="fas fa-repeat"></i>';
                repeatBtn.title = 'Repeat: Off';
            }
        }
        updateRepeatUI();

        repeatBtn.addEventListener('click', () => {
            if (repeatMode === 'all') repeatMode = 'one';
            else if (repeatMode === 'one') repeatMode = 'none';
            else repeatMode = 'all';
            localStorage.setItem('mahikari_player_repeat', repeatMode);
            updateRepeatUI();
        });
    }

    // Audio FX Equalizer Menu
    function renderFxMenu() {
        if (!audioFxMenu) return;
        audioFxMenu.innerHTML = `
            <div class="menu-header">
                <span>STUDIO EQUALIZER</span>
            </div>
            <div class="menu-items">
                ${CONFIG.audioFx.presets.map(p => `
                    <button class="fx-option ${p.id === currentAudioFx ? 'active' : ''}" data-fx="${p.id}" type="button">
                        <i class="fas ${p.icon}"></i>
                        <span class="fx-meta">
                            <strong>${p.name}</strong>
                            <small>${p.desc}</small>
                        </span>
                        ${p.id === currentAudioFx ? '<i class="fas fa-check fx-check"></i>' : ''}
                    </button>
                `).join('')}
            </div>
        `;

        audioFxMenu.querySelectorAll('.fx-option').forEach(btn => {
            btn.addEventListener('click', () => {
                applyEqPreset(btn.dataset.fx);
                audioFxMenu.classList.remove('open');
            });
        });
    }

    if (audioFxBtn && audioFxMenu) {
        audioFxBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (playlistMenu) playlistMenu.classList.remove('open');
            audioFxMenu.classList.toggle('open');
        });
    }

    // Playlist Search & Dropdown Menu
    function renderPlaylist() {
        if (!playlistMenu) return;
        const filtered = activePlaylist.filter(song => {
            if (!searchQuery) return true;
            const q = searchQuery.toLowerCase();
            return song.name.toLowerCase().includes(q) || song.artist.toLowerCase().includes(q);
        });

        playlistMenu.innerHTML = `
            <div class="playlist-header">
                <span>PLAYLIST · ${activePlaylist.length} TRACKS</span>
                <div class="search-wrap">
                    <i class="fas fa-search"></i>
                    <input type="text" id="playlist-search-input" placeholder="Search track or artist..." value="${searchQuery}">
                </div>
            </div>
            <div class="playlist-items-scroll">
                ${filtered.length === 0 ? '<div class="no-tracks">No matching tracks</div>' : ''}
                ${filtered.map(song => {
                    const originalIdx = activePlaylist.findIndex(s => s.id === song.id);
                    const isPlaying = originalIdx === currentTrackIndex;
                    return `
                        <button class="playlist-row ${isPlaying ? 'active' : ''}" data-idx="${originalIdx}" type="button">
                            <span class="row-num">${isPlaying ? '<i class="fas fa-volume-high"></i>' : originalIdx + 1}</span>
                            <span class="row-info">
                                <span class="row-title">${song.name}</span>
                                <span class="row-artist">${song.artist}</span>
                            </span>
                            <span class="row-duration">${song.duration}</span>
                        </button>
                    `;
                }).join('')}
            </div>
        `;

        const searchInput = document.getElementById('playlist-search-input');
        if (searchInput) {
            searchInput.focus();
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value;
                renderPlaylist();
            });
        }

        playlistMenu.querySelectorAll('.playlist-row').forEach(row => {
            row.addEventListener('click', () => {
                const idx = parseInt(row.dataset.idx, 10);
                loadTrack(idx, true);
                playlistMenu.classList.remove('open');
            });
        });
    }

    if (playlistToggleBtn && playlistMenu) {
        playlistToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (audioFxMenu) audioFxMenu.classList.remove('open');
            playlistMenu.classList.toggle('open');
            if (playlistMenu.classList.contains('open')) {
                renderPlaylist();
            }
        });
    }

    // Close open menus when clicking outside
    document.addEventListener('click', (e) => {
        if (audioFxMenu && !audioFxMenu.contains(e.target) && e.target !== audioFxBtn) {
            audioFxMenu.classList.remove('open');
        }
        if (playlistMenu && !playlistMenu.contains(e.target) && e.target !== playlistToggleBtn) {
            playlistMenu.classList.remove('open');
        }
    });

    // Global keyboard shortcuts
    window.addEventListener('keydown', (e) => {
        if (['input', 'textarea'].includes(document.activeElement?.tagName.toLowerCase())) {
            return;
        }

        if (e.code === 'Space') {
            e.preventDefault();
            togglePlay();
        } else if (e.code === 'KeyJ') {
            prevTrack();
        } else if (e.code === 'KeyK') {
            nextTrack();
        } else if (e.code === 'KeyM') {
            toggleMute();
        } else if (e.code === 'KeyS') {
            if (shuffleBtn) shuffleBtn.click();
        } else if (e.code === 'KeyR') {
            if (repeatBtn) repeatBtn.click();
        }
    });

    // Initial boot
    setupCategoryTabs();
    renderFxMenu();
    setVolume(CONFIG.music.defaultVolume || 45);
    loadTrack(0, false);
})();