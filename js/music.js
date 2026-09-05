/* ========================================================
   COSMIC MUSIC PLAYER ENGINE V11.0 (STUDIO EDITION)
   - Live Song Search in Playlist
   - Shuffle & Repeat (All / One / None)
   - 32-Band Reactive Spectrum Analyzer
   - MediaSession API & Keyboard Shortcuts
   - Web Audio Gain & Bass Halo
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
    const visualizerCanvas = document.getElementById('frequency-vis');
    const vCtx = visualizerCanvas?.getContext('2d');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    const audioAlert = document.getElementById('audio-alert');
    const playlistToggleBtn = document.getElementById('playlist-toggle-btn');
    const playlistMenu = document.getElementById('playlist-menu');
    const musicPanel = document.querySelector('.music-panel');
    const categoryTabs = document.querySelectorAll('.cat-tab');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const repeatBtn = document.getElementById('repeat-btn');
    const vinylDiscWrap = document.getElementById('vinyl-disc');

    const fullPlaylist = CONFIG.music.playlist || [];
    let currentCategory = localStorage.getItem('saved_player_category') || 'all';

    function getFilteredPlaylist() {
        if (currentCategory === 'all') {
            return fullPlaylist;
        }
        return fullPlaylist.filter(song => song.category === currentCategory);
    }

    let activePlaylist = getFilteredPlaylist();
    let currentFilteredIndex = 0;
    let searchQuery = '';

    // Khởi tạo Shuffle & Repeat từ LocalStorage
    let isShuffle = localStorage.getItem('mahikari_player_shuffle') === 'true';
    let repeatMode = localStorage.getItem('mahikari_player_repeat') || 'all'; // 'all', 'one', 'none'
    let playedShuffleIndices = [];

    // Tìm bài hát đã lưu trước đó nếu có
    const savedSongFile = localStorage.getItem('saved_song_file');
    if (savedSongFile) {
        const foundIdx = activePlaylist.findIndex(s => s.file === savedSongFile);
        if (foundIdx !== -1) {
            currentFilteredIndex = foundIdx;
        }
    }

    let isAudioPlaying = false;
    let isMuted = false;
    let previousVolume = CONFIG.music.defaultVolume || 45;
    let audioCtx = null;
    let analyser = null;
    let audioSource = null;
    let gainNode = null;

    // Khởi tạo Playlist Menu có Thanh Tìm Kiếm Trực Tiếp (Live Search)
    function initPlaylistMenu() {
        if (!playlistMenu) return;
        playlistMenu.innerHTML = '';

        // 1. Search Bar Header inside Playlist
        const searchBox = document.createElement('div');
        searchBox.className = 'playlist-search-box';
        searchBox.innerHTML = `
            <i class="fas fa-search playlist-search-icon"></i>
            <input type="text" id="playlist-search-input" class="playlist-search-input" placeholder="Tìm bài hát, ca sĩ..." value="${searchQuery}" autocomplete="off" spellcheck="false">
            ${searchQuery ? '<button type="button" id="playlist-search-clear" class="playlist-search-clear"><i class="fas fa-xmark"></i></button>' : ''}
        `;
        playlistMenu.appendChild(searchBox);

        const searchInput = searchBox.querySelector('#playlist-search-input');
        const clearBtn = searchBox.querySelector('#playlist-search-clear');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value.toLowerCase().trim();
                renderPlaylistItems();
            });
            searchInput.addEventListener('click', (e) => e.stopPropagation());
            searchInput.addEventListener('keydown', (e) => e.stopPropagation());
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                searchQuery = '';
                if (searchInput) searchInput.value = '';
                renderPlaylistItems();
            });
        }

        // 2. Container danh sách bài hát
        const listContainer = document.createElement('div');
        listContainer.className = 'playlist-items-container';
        listContainer.id = 'playlist-items-container';
        playlistMenu.appendChild(listContainer);

        renderPlaylistItems();
    }

    function renderPlaylistItems() {
        const listContainer = document.getElementById('playlist-items-container');
        if (!listContainer) return;
        listContainer.innerHTML = '';

        const filteredBySearch = activePlaylist.map((song, originalIdx) => ({ song, originalIdx }))
            .filter(item => {
                if (!searchQuery) return true;
                const name = item.song.name.toLowerCase();
                const artist = (item.song.artist || '').toLowerCase();
                return name.includes(searchQuery) || artist.includes(searchQuery);
            });

        if (filteredBySearch.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'playlist-empty-state';
            empty.innerHTML = `<i class="fas fa-compact-disc"></i><span>Không tìm thấy bài hát</span>`;
            listContainer.appendChild(empty);
            return;
        }

        filteredBySearch.forEach(({ song, originalIdx }) => {
            const item = document.createElement('div');
            const isActive = originalIdx === currentFilteredIndex;
            item.className = `playlist-item ${isActive ? 'active' : ''}`;
            item.setAttribute('role', 'button');
            item.setAttribute('tabindex', '0');

            const catClass = song.category === 'angel' ? 'angel' : 'cpk';
            const catLabel = song.categoryLabel || (song.category === 'angel' ? 'Thiên Sứ' : 'CPK');

            item.innerHTML = `
                <div class="playlist-item-left">
                    <i class="fas fa-${isActive ? (isAudioPlaying ? 'volume-high' : 'pause') : 'music'}"></i>
                    <span class="playlist-item-name" title="${song.name}">${originalIdx + 1}. ${song.name}</span>
                </div>
                <div class="playlist-item-right">
                    <span class="playlist-item-cat ${catClass}">${catLabel}</span>
                </div>
            `;

            item.addEventListener('click', (e) => {
                e.stopPropagation();
                loadAndPlaySong(originalIdx);
                playlistMenu.classList.remove('show');
            });

            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.click();
                }
            });

            listContainer.appendChild(item);
        });
    }

    function updatePlaylistActiveItem() {
        if (!playlistMenu) return;
        const items = playlistMenu.querySelectorAll('.playlist-item');
        items.forEach((item, idx) => {
            const isActive = idx === currentFilteredIndex;
            item.classList.toggle('active', isActive);
            const icon = item.querySelector('.playlist-item-left i');
            if (icon) {
                icon.className = `fas fa-${isActive ? (isAudioPlaying ? 'volume-high' : 'pause') : 'music'}`;
            }
        });
    }

    function updateCategoryTabsUI() {
        categoryTabs.forEach(tab => {
            const cat = tab.getAttribute('data-cat');
            tab.classList.toggle('active', cat === currentCategory);
        });
    }

    function updateControlsStateUI() {
        if (shuffleBtn) {
            shuffleBtn.classList.toggle('active', isShuffle);
            shuffleBtn.setAttribute('title', isShuffle ? 'Shuffle: Đang BẬT' : 'Shuffle: Đang TẮT');
            shuffleBtn.setAttribute('aria-pressed', isShuffle ? 'true' : 'false');
        }

        if (repeatBtn) {
            repeatBtn.classList.toggle('active', repeatMode !== 'none');
            let icon = '<i class="fas fa-repeat"></i>';
            let title = 'Lặp toàn bộ danh sách';
            if (repeatMode === 'one') {
                icon = '<i class="fas fa-repeat-1"></i>';
                title = 'Lặp 1 bài';
            } else if (repeatMode === 'none') {
                title = 'Không lặp lại';
            }
            repeatBtn.innerHTML = icon;
            repeatBtn.setAttribute('title', title);
        }
    }

    function setCategory(category, autoPlay = true) {
        currentCategory = category;
        localStorage.setItem('saved_player_category', currentCategory);
        updateCategoryTabsUI();

        const previousSong = activePlaylist[currentFilteredIndex];
        activePlaylist = getFilteredPlaylist();
        playedShuffleIndices = [];

        let newIdx = 0;
        if (previousSong) {
            const found = activePlaylist.findIndex(s => s.file === previousSong.file);
            if (found !== -1) {
                newIdx = found;
            }
        }

        initPlaylistMenu();
        if (autoPlay && isAudioPlaying) {
            loadAndPlaySong(newIdx);
        } else {
            loadSong(newIdx);
        }
    }

    function updateMediaSession(song) {
        if ('mediaSession' in navigator && song) {
            const waifu = CONFIG.waifu && CONFIG.waifu.list ? CONFIG.waifu.list[0] : null;
            const artworkSrc = (waifu && waifu.image) ? waifu.image : 'assets/avatar1.png';

            navigator.mediaSession.metadata = new MediaMetadata({
                title: song.name,
                artist: song.artist || 'Mahikari Collection',
                album: 'Cosmic Waifu Beats',
                artwork: [
                    { src: artworkSrc, sizes: '96x96', type: 'image/png' },
                    { src: artworkSrc, sizes: '128x128', type: 'image/png' },
                    { src: artworkSrc, sizes: '256x256', type: 'image/png' },
                    { src: artworkSrc, sizes: '512x512', type: 'image/png' }
                ]
            });

            navigator.mediaSession.setActionHandler('play', playAudio);
            navigator.mediaSession.setActionHandler('pause', pauseAudio);
            navigator.mediaSession.setActionHandler('previoustrack', playPrevTrack);
            navigator.mediaSession.setActionHandler('nexttrack', playNextTrack);
            navigator.mediaSession.setActionHandler('seekto', (details) => {
                if (details.seekTime && audio) audio.currentTime = details.seekTime;
            });
            navigator.mediaSession.setActionHandler('seekbackward', () => {
                if (audio) audio.currentTime = Math.max(0, audio.currentTime - 5);
            });
            navigator.mediaSession.setActionHandler('seekforward', () => {
                if (audio && audio.duration) audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
            });
        }
    }

    function loadSong(index) {
        if (!activePlaylist || activePlaylist.length === 0) return;
        currentFilteredIndex = ((index % activePlaylist.length) + activePlaylist.length) % activePlaylist.length;
        const song = activePlaylist[currentFilteredIndex];

        if (trackNameEl) trackNameEl.innerText = song.name;
        if (trackArtistEl) trackArtistEl.innerText = song.artist || 'Anime OST';
        if (currentTrackNumEl) currentTrackNumEl.innerText = currentFilteredIndex + 1;
        if (totalTracksNumEl) totalTracksNumEl.innerText = activePlaylist.length;
        
        if (audio) {
            audio.src = song.file;
            audio.load();
        }
        if (audioAlert) audioAlert.classList.add('hidden');
        
        localStorage.setItem('saved_song_file', song.file);
        updatePlaylistActiveItem();
        updateMediaSession(song);
    }

    function initAudioContext() {
        if (audioCtx || !audio) return;
        try {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (!AudioContextClass) return;
            audioCtx = new AudioContextClass();
            analyser = audioCtx.createAnalyser();
            analyser.fftSize = 64; // 32 frequency bins
            analyser.smoothingTimeConstant = 0.82;

            gainNode = audioCtx.createGain();
            audioSource = audioCtx.createMediaElementSource(audio);
            audioSource.connect(gainNode);
            gainNode.connect(analyser);
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
            updatePlaylistActiveItem();
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
        updatePlaylistActiveItem();
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

    function getNextShuffleIndex() {
        if (activePlaylist.length <= 1) return 0;
        if (playedShuffleIndices.length >= activePlaylist.length) {
            playedShuffleIndices = [currentFilteredIndex];
        }

        const candidates = [];
        for (let i = 0; i < activePlaylist.length; i++) {
            if (i !== currentFilteredIndex && !playedShuffleIndices.includes(i)) {
                candidates.push(i);
            }
        }

        if (candidates.length === 0) {
            playedShuffleIndices = [currentFilteredIndex];
            for (let i = 0; i < activePlaylist.length; i++) {
                if (i !== currentFilteredIndex) candidates.push(i);
            }
        }

        const next = candidates[Math.floor(Math.random() * candidates.length)];
        playedShuffleIndices.push(next);
        return next;
    }

    function playNextTrack() {
        if (isShuffle) {
            loadAndPlaySong(getNextShuffleIndex());
        } else {
            if (currentFilteredIndex >= activePlaylist.length - 1 && repeatMode === 'none') {
                pauseAudio();
                return;
            }
            loadAndPlaySong(currentFilteredIndex + 1);
        }
    }

    function playPrevTrack() {
        if (audio && audio.currentTime > 3) {
            audio.currentTime = 0;
            return;
        }
        loadAndPlaySong(currentFilteredIndex - 1);
    }

    function formatTime(seconds) {
        if (isNaN(seconds) || seconds < 0) return '0:00';
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    }

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

    // 32-Band Cosmic Reactive Visualizer
    function renderMusicVisualizer() {
        requestAnimationFrame(renderMusicVisualizer);
        if (document.hidden || !visualizerCanvas || !vCtx) return;
        
        vCtx.clearRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);

        const waifuColor = getComputedStyle(document.documentElement).getPropertyValue('--waifu-color').trim() || '#00f2fe';
        const waifuSecondary = getComputedStyle(document.documentElement).getPropertyValue('--waifu-secondary').trim() || '#ec4899';

        const barCount = 28;
        const totalWidth = visualizerCanvas.width;
        const totalHeight = visualizerCanvas.height;
        const barWidth = (totalWidth / barCount) - 1.5;

        if (!analyser || !isAudioPlaying) {
            // Idle ambient wave
            const t = Date.now() * 0.003;
            vCtx.fillStyle = 'rgba(255, 255, 255, 0.18)';
            for (let i = 0; i < barCount; i++) {
                const idleH = Math.max(2, (Math.sin(t + i * 0.35) * 0.5 + 0.5) * 4);
                const x = i * (barWidth + 1.5);
                vCtx.fillRect(x, totalHeight - idleH, barWidth, idleH);
            }
            return;
        }

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);

        let x = 0;
        let sumBass = 0;

        for (let i = 0; i < barCount; i++) {
            const dataIndex = Math.min(bufferLength - 1, Math.floor((i / barCount) * (bufferLength * 0.85)));
            const val = dataArray[dataIndex] || 0;
            if (i < 6) sumBass += val;

            const barHeight = Math.max(2, (val / 255) * totalHeight);

            const gradient = vCtx.createLinearGradient(0, totalHeight, 0, totalHeight - barHeight);
            gradient.addColorStop(0, waifuColor);
            gradient.addColorStop(1, waifuSecondary);

            vCtx.fillStyle = gradient;
            vCtx.fillRect(x, totalHeight - barHeight, barWidth, barHeight);

            // Glowing bar cap
            vCtx.fillStyle = '#ffffff';
            vCtx.fillRect(x, Math.max(0, totalHeight - barHeight - 1), barWidth, 1.2);

            x += barWidth + 1.5;
        }

        // Bass pulse on vinyl disc
        if (vinylDiscWrap && CONFIG.music.enablePulse) {
            const bassRatio = sumBass / (6 * 255);
            if (bassRatio > 0.45) {
                vinylDiscWrap.style.transform = `scale(${1 + bassRatio * 0.09})`;
                vinylDiscWrap.style.boxShadow = `0 0 ${15 + bassRatio * 20}px ${waifuColor}`;
            } else {
                vinylDiscWrap.style.transform = 'scale(1)';
                vinylDiscWrap.style.boxShadow = '';
            }
        }
    }

    // Lắng nghe sự kiện Category Tabs
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.stopPropagation();
            const cat = tab.getAttribute('data-cat');
            if (cat) {
                setCategory(cat, true);
            }
        });
    });

    // Shuffle & Repeat buttons
    if (shuffleBtn) {
        shuffleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            isShuffle = !isShuffle;
            localStorage.setItem('mahikari_player_shuffle', isShuffle ? 'true' : 'false');
            updateControlsStateUI();
            if (window.showPremiumToast) {
                window.showPremiumToast(isShuffle ? 'Đã bật phát ngẫu nhiên (Shuffle)' : 'Đã tắt phát ngẫu nhiên', 'fa-shuffle');
            }
        });
    }

    if (repeatBtn) {
        repeatBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (repeatMode === 'all') repeatMode = 'one';
            else if (repeatMode === 'one') repeatMode = 'none';
            else repeatMode = 'all';

            localStorage.setItem('mahikari_player_repeat', repeatMode);
            updateControlsStateUI();

            const msgs = {
                all: 'Lặp lại toàn bộ danh sách',
                one: 'Lặp lại 1 bài hiện tại',
                none: 'Không lặp lại'
            };
            if (window.showPremiumToast) {
                window.showPremiumToast(msgs[repeatMode], 'fa-repeat');
            }
        });
    }

    // Keyboard Hotkeys
    document.addEventListener('keydown', (e) => {
        if (['input', 'textarea'].includes(document.activeElement?.tagName?.toLowerCase())) return;

        if (e.code === 'Space') {
            e.preventDefault();
            toggleAudio();
        } else if (e.code === 'KeyM') {
            e.preventDefault();
            muteBtn?.click();
        } else if (e.code === 'KeyK') {
            e.preventDefault();
            playNextTrack();
        } else if (e.code === 'KeyJ') {
            e.preventDefault();
            playPrevTrack();
        } else if (e.code === 'ArrowRight' && audio && audio.duration) {
            e.preventDefault();
            audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
        } else if (e.code === 'ArrowLeft' && audio) {
            e.preventDefault();
            audio.currentTime = Math.max(0, audio.currentTime - 5);
        }
    });

    // Event Listeners
    if (playBtn) playBtn.addEventListener('click', toggleAudio);
    if (prevBtn) prevBtn.addEventListener('click', playPrevTrack);
    if (nextBtn) nextBtn.addEventListener('click', playNextTrack);

    if (playlistToggleBtn && playlistMenu) {
        playlistToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const willShow = !playlistMenu.classList.contains('show');
            playlistMenu.classList.toggle('show', willShow);
            if (willShow) {
                const searchInput = playlistMenu.querySelector('#playlist-search-input');
                if (searchInput) setTimeout(() => searchInput.focus(), 80);
            }
        });

        document.addEventListener('click', (e) => {
            if (!playlistMenu.contains(e.target) && e.target !== playlistToggleBtn) {
                playlistMenu.classList.remove('show');
            }
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
            if (repeatMode === 'one') {
                audio.currentTime = 0;
                playAudio();
            } else {
                playNextTrack();
            }
        });

        audio.addEventListener('error', () => {
            if (audioAlert) audioAlert.classList.remove('hidden');
            isAudioPlaying = false;
            if (playBtn) playBtn.innerHTML = '<i class="fas fa-play"></i>';
            if (musicPanel) musicPanel.classList.remove('playing');
        });
    }

    // Seek Bar Interaction
    if (seekContainer) {
        let isSeeking = false;
        seekContainer.addEventListener('mousedown', () => { isSeeking = true; });
        document.addEventListener('mouseup', () => { isSeeking = false; });

        seekContainer.addEventListener('click', (e) => {
            if (!audio || !audio.duration) return;
            const rect = seekContainer.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            audio.currentTime = (clickX / rect.width) * audio.duration;
        });

        seekContainer.addEventListener('mousemove', (e) => {
            if (!audio || !audio.duration || !seekTip) return;
            const rect = seekContainer.getBoundingClientRect();
            const moveX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
            const previewTime = (moveX / rect.width) * audio.duration;
            seekTip.style.left = `${moveX}px`;
            seekTip.innerText = formatTime(previewTime);
            seekTip.style.opacity = '1';

            if (isSeeking) {
                audio.currentTime = previewTime;
            }
        });

        seekContainer.addEventListener('mouseleave', () => {
            if (seekTip) seekTip.style.opacity = '0';
        });
    }

    // Khởi chạy Player
    updateCategoryTabsUI();
    updateControlsStateUI();
    initPlaylistMenu();
    loadSong(currentFilteredIndex);
    const savedVol = localStorage.getItem('saved_player_volume');
    setVolume(savedVol !== null ? parseInt(savedVol, 10) : (CONFIG.music.defaultVolume || 45));
    renderMusicVisualizer();

    window.playMusicFromStart = function() {
        playAudio();
    };
})();