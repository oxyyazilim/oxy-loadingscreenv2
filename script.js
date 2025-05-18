// RGB dönüştürme fonksiyonu
function hexToRgb(hex) {
    // # işaretini kaldır
    hex = hex.replace('#', '');
    
    // RGB değerlerini elde et
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return [r, g, b];
}

// Renkleri güncelleme fonksiyonu
function updateColors() {
    const primaryColor = document.getElementById('primaryColor').value;
    const bgColor = document.getElementById('bgColor').value;
    const textColor = document.getElementById('textColor').value;
    const gradientIntensity = document.getElementById('gradientIntensity').value;
    
    const primaryColorRgb = hexToRgb(primaryColor).join(',');
    
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--background-color', bgColor);
    document.documentElement.style.setProperty('--text-color', textColor);
    document.documentElement.style.setProperty('--gradient-intensity', gradientIntensity);
    document.documentElement.style.setProperty('--primary-color-rgb', primaryColorRgb);
    
    // Renkleri localStorage'a kaydet
    localStorage.setItem('primaryColor', primaryColor);
    localStorage.setItem('bgColor', bgColor);
    localStorage.setItem('textColor', textColor);
    localStorage.setItem('gradientIntensity', gradientIntensity);
}

// Renkleri sıfırlama fonksiyonu
function resetColors() {
    document.getElementById('primaryColor').value = config.defaultColors.primaryColor;
    document.getElementById('bgColor').value = config.defaultColors.backgroundColor;
    document.getElementById('textColor').value = config.defaultColors.textColor;
    document.getElementById('gradientIntensity').value = config.defaultColors.gradientIntensity;
    
    updateColors();
    localStorage.removeItem('primaryColor');
    localStorage.removeItem('bgColor');
    localStorage.removeItem('textColor');
    localStorage.removeItem('gradientIntensity');
}

// Özel cursor ayarla
function setCustomCursor() {
    if (config.customCursor) {
        document.body.style.cursor = `url(${config.customCursor}), auto`;
        
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            a, button, .social-link, .key-button, .control-button, .switch-button, 
            .settings-button, .gallery-image, .color-option input, .close-panel, 
            .team-member, #bgSwitchBtn, .social-icon-btn, .keyboard-shortcuts-btn, 
            .dark-mode-toggle, .close-keyboard-panel, .keyboard-key, .key, .close-keyboard-visual {
                cursor: url(${config.customCursorPointer}), pointer !important;
            }
        `;
        document.head.appendChild(styleElement);
    }
}

// Ekip üyelerini yükleme fonksiyonu
function loadTeamMembers() {
    const teamContainer = document.getElementById('teamMembers');
    teamContainer.innerHTML = '';
    
    // Config'de Team yoksa kontrolü
    if (!config.Team || !Array.isArray(config.Team)) {
        console.error("Ekip üyeleri bulunamadı veya geçerli bir dizi değil");
        return;
    }
    
    config.Team.forEach(member => {
        // Takım üyesi elementi oluştur
        const memberDiv = document.createElement('div');
        memberDiv.className = 'team-member';
        
        // Avatar görseli için kontrol et
        let avatarUrl = member.image;
        
        // Discord avatarı yoksa varsayılan avatar kullan
        if (!avatarUrl || avatarUrl === '') {
            avatarUrl = 'assets/images/default-avatar.png';
        }
        
        // Rolün sınıfını belirle (özel efektler için)
        let roleClass = '';
        
        // Rol ismini küçük harfe çevir ve kontrol et
        const roleLC = member.role.toLowerCase();
        
        if (roleLC.includes('kurucu') || roleLC.includes('founder') || roleLC.includes('owner') || roleLC === 'ceo') {
            roleClass = 'founder';
        } else if (roleLC.includes('admin') || roleLC.includes('yönetici')) {
            roleClass = 'admin';
        } else if (roleLC.includes('mod') || roleLC.includes('yetkili') || roleLC.includes('staff')) {
            roleClass = 'mod';
        } else if (roleLC.includes('dev') || roleLC.includes('geliştirici') || roleLC.includes('developer')) {
            roleClass = 'dev';
        }
        
        // background-image yerine <img> kullanarak GIF animasyonunu koruyalım
        memberDiv.innerHTML = `
            <div class="team-avatar">
                <img src="${avatarUrl}" alt="${member.name}" />
            </div>
            <div class="team-name">${member.name}</div>
            <div class="team-role ${roleClass}">${member.role}</div>
        `;
        
        teamContainer.appendChild(memberDiv);
    });
}

// Sosyal medya iconlarını yükleme fonksiyonu - Link açma işlevselliği ile
function loadSocialIcons() {
    const socialIconsContainer = document.getElementById('socialIcons');
    
    if (!socialIconsContainer) {
        console.error("Sosyal medya ikonları için konteyner bulunamadı!");
        return;
    }
    
    socialIconsContainer.innerHTML = '';
    
    // Config'de socialIcons yoksa kontrolü
    if (!config.socialIcons || !Array.isArray(config.socialIcons)) {
        console.error("Sosyal medya ikonları bulunamadı veya geçerli bir dizi değil");
        return;
    }
    
    config.socialIcons.forEach(icon => {
        // Link elementi oluştur
        const link = document.createElement('div'); // div kullanıyoruz, a değil
        link.className = 'social-icon-btn';
        link.setAttribute('data-url', icon.url); // URL'yi veri özelliği olarak saklıyoruz
        
        // İçeriği oluştur
        link.innerHTML = `
            <i class="${icon.icon}"></i>
            <span class="social-tooltip">${icon.tooltip}</span>
        `;
        
        // Tıklama olayı ekle - URL'yi açma işlevselliği
        link.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            console.log(`Opening URL: ${url}`);
            
            // Yeni pencerede URL'yi açın
            window.open(url, '_blank');
        });
        
        // Konteyner'a ekle
        socialIconsContainer.appendChild(link);
    });
    
    console.log("Sosyal medya ikonları yüklendi ve tıklama işlevselliği eklendi.");
}

// Gerekirse bu fonksiyonu ekleyin, yoksa eklemeyebilirsiniz
function checkSocialIcons() {
    // Tüm sosyal medya ikonlarını seçin
    const socialLinks = document.querySelectorAll('.social-icon-btn');
    
    // Her birine tıklama olayı eklemek yerine sadece log kaydı
    socialLinks.forEach(link => {
        console.log(`Sosyal medya ikonu mevcut: ${link.href}`);
    });
}



// Kuralları yükleme
function loadRules() {
    const rulesListContainer = document.getElementById('rulesList');
    rulesListContainer.innerHTML = '';
    
    // Config'de serverRules yoksa kontrolü
    if (!config.serverRules || !Array.isArray(config.serverRules)) {
        console.error("Sunucu kuralları bulunamadı veya geçerli bir dizi değil");
        return;
    }
    
    config.serverRules.forEach(rule => {
        const ruleDiv = document.createElement('div');
        ruleDiv.className = 'rule';
        ruleDiv.innerHTML = `
            <div class="rule-title">${rule.title}</div>
            <div class="rule-text">${rule.text}</div>
        `;
        rulesListContainer.appendChild(ruleDiv);
    });
}

// Duyuruları yükleme
function loadAnnouncements() {
    const announcementsContainer = document.getElementById('announcementsList');
    announcementsContainer.innerHTML = '';
    
    // Config'de announcements yoksa kontrolü
    if (!config.announcements || !Array.isArray(config.announcements)) {
        console.error("Duyurular bulunamadı veya geçerli bir dizi değil");
        return;
    }
    
    config.announcements.forEach(announcement => {
        const announcementDiv = document.createElement('div');
        announcementDiv.className = 'announcement-content';
        announcementDiv.innerHTML = `
            <div class="announcement-title">${announcement.title}</div>
            <div class="announcement-text">${announcement.text}</div>
        `;
        announcementsContainer.appendChild(announcementDiv);
    });
}

// Galeri görsellerini yükleme
function loadGalleryImages() {
    const galleryContainer = document.getElementById('galleryImages');
    galleryContainer.innerHTML = '';
    
    // Config'de galleryImages yoksa kontrolü
    if (!config.galleryImages || !Array.isArray(config.galleryImages)) {
        console.error("Galeri görselleri bulunamadı veya geçerli bir dizi değil");
        return;
    }
    
    config.galleryImages.forEach(imgUrl => {
        const galleryImage = document.createElement('div');
        galleryImage.className = 'gallery-image';
        galleryImage.style.backgroundImage = `url(${imgUrl})`;
        galleryContainer.appendChild(galleryImage);
    });
}

// Arka plan görsellerini yükleme
function loadBackgroundImages() {
    const bgImagesContainer = document.getElementById('bgImages');
    bgImagesContainer.innerHTML = '';
    
    // Config'de backgroundImages yoksa kontrolü
    if (!config.backgroundImages || !Array.isArray(config.backgroundImages)) {
        console.error("Arka plan görselleri bulunamadı veya geçerli bir dizi değil");
        return;
    }
    
    config.backgroundImages.forEach((imgUrl, index) => {
        const bgImage = document.createElement('div');
        bgImage.className = 'bg-image' + (index === 0 ? ' active' : '');
        bgImage.style.backgroundImage = `url(${imgUrl})`;
        bgImagesContainer.appendChild(bgImage);
    });
}

// Arkaplan görselleri arasında geçiş yapma
function rotateBackgroundImages() {
    const bgImages = document.querySelectorAll('.bg-image');
    if (bgImages.length <= 1) return;
    
    let activeImageIndex = 0;
    
    // Aktif görseli bul
    for (let i = 0; i < bgImages.length; i++) {
        if (bgImages[i].classList.contains('active')) {
            activeImageIndex = i;
            break;
        }
    }
    
    // Aktif görseli değiştir
    bgImages[activeImageIndex].classList.remove('active');
    activeImageIndex = (activeImageIndex + 1) % bgImages.length;
    bgImages[activeImageIndex].classList.add('active');
}

// YouTube video bilgilerini al
function fetchYouTubeVideoInfo() {
    if (!config.music.youtubeVideoId || !config.youtubeApiKey) return;
    
    fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${config.music.youtubeVideoId}&key=${config.youtubeApiKey}`)
        .then(response => response.json())
        .then(data => {
            if (!data.items || data.items.length === 0) {
                console.error("Video bilgisi bulunamadı");
                return;
            }
            
            const videoInfo = data.items[0].snippet;
            
            // Müzik bilgilerini güncelle
            document.getElementById('musicTitle').textContent = videoInfo.title;
            document.getElementById('musicArtist').textContent = videoInfo.channelTitle;
            
            // Video küçük resmini al
            const thumbnail = videoInfo.thumbnails.high.url;
            document.getElementById('musicAlbum').style.backgroundImage = `url(${thumbnail})`;
            
            console.log("YouTube video bilgileri yüklendi:", videoInfo.title);
        })
        .catch(error => {
            console.error("YouTube bilgileri alınamadı:", error);
            
            // Hata durumunda varsayılan değerleri kullan
            document.getElementById('musicTitle').textContent = "Bilinmeyen Şarkı";
            document.getElementById('musicArtist').textContent = "Bilinmeyen Sanatçı";
        });
}

// YouTube Iframe API kullanarak oynatıcıyı başlat
let youtubePlayer;
function initYouTubePlayer() {
    if (!config.music.youtubeVideoId) return;
    
    // Gizli bir iframe oluştur
    const playerDiv = document.createElement('div');
    playerDiv.id = 'youtubePlayerHidden';
    playerDiv.style.display = 'none';
    document.body.appendChild(playerDiv);
    
    // YouTube player'ı başlat
    youtubePlayer = new YT.Player('youtubePlayerHidden', {
        height: '0',
        width: '0',
        videoId: config.music.youtubeVideoId,
        playerVars: {
            'autoplay': config.music.autoplay ? 1 : 0,
            'controls': 0,
            'rel': 0,
            'showinfo': 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// YouTube Player hazır olduğunda çalışacak
function onPlayerReady(event) {
    // Ses seviyesini ayarla
    event.target.setVolume(config.music.volume);
    
    // Otomatik başlatma
    if (config.music.autoplay) {
        event.target.playVideo();
    }
    
    // İlerleme çubuğunu güncelle
    updateProgressBar();
}

// Oynatıcı durumu değiştiğinde
function onPlayerStateChange(event) {
    // Oynatma durumuna göre butonları güncelle
    const playPauseBtn = document.querySelector('.control-button.play-pause i');
    
    if (event.data === YT.PlayerState.PLAYING) {
        playPauseBtn.className = 'fas fa-pause';
    } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
        playPauseBtn.className = 'fas fa-play';
    }
    
    // Video bittiğinde başa sar
    if (event.data === YT.PlayerState.ENDED) {
        event.target.seekTo(0);
        event.target.playVideo();
    }
}

// İlerleme çubuğunu güncelle
function updateProgressBar() {
    if (!youtubePlayer || typeof youtubePlayer.getCurrentTime !== 'function') return;
    
    const currentTime = youtubePlayer.getCurrentTime() || 0;
    const duration = youtubePlayer.getDuration() || 0;
    
    if (duration > 0) {
        // İlerleme çubuğunu güncelle
        const progressPercent = (currentTime / duration) * 100;
        document.querySelector('.progress').style.width = `${progressPercent}%`;
        
        // Zaman göstergesini güncelle
        const currentMinutes = Math.floor(currentTime / 60);
        const currentSeconds = Math.floor(currentTime % 60);
        const totalMinutes = Math.floor(duration / 60);
        const totalSeconds = Math.floor(duration % 60);
        
        document.querySelector('.time-stamps').innerHTML = `
            <span>${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}</span>
            <span>${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}</span>
        `;
    }
    
    // Her saniye güncelle
    setTimeout(updateProgressBar, 1000);
}

// Müzik kontrollerini başlat
function initMusicControls() {
    // Play/Pause butonu
    document.querySelector('.control-button.play-pause').addEventListener('click', function() {
        if (!youtubePlayer) return;
        
        const playerState = youtubePlayer.getPlayerState();
        if (playerState === YT.PlayerState.PLAYING) {
            youtubePlayer.pauseVideo();
        } else {
            youtubePlayer.playVideo();
        }
    });
    
    // İleri butonu
    document.querySelector('.control-button:nth-child(3)').addEventListener('click', function() {
        if (!youtubePlayer) return;
        
        const currentTime = youtubePlayer.getCurrentTime();
        youtubePlayer.seekTo(currentTime + 10, true); // 10 saniye ileri
    });
    
    // Geri butonu
    document.querySelector('.control-button:nth-child(1)').addEventListener('click', function() {
        if (!youtubePlayer) return;
        
        const currentTime = youtubePlayer.getCurrentTime();
        youtubePlayer.seekTo(Math.max(0, currentTime - 10), true); // 10 saniye geri
    });
    
    // İlerleme çubuğuna tıklama
    document.querySelector('.progress-bar').addEventListener('click', function(e) {
        if (!youtubePlayer) return;
        
        const progressBar = this;
        const clickPosition = (e.pageX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth;
        const duration = youtubePlayer.getDuration();
        
        youtubePlayer.seekTo(clickPosition * duration, true);
    });
    
    // Ses seviyesi kontrolü
    document.querySelector('.volume-slider').addEventListener('click', function(e) {
        if (!youtubePlayer) return;
        
        const volumeBar = this;
        const clickPosition = (e.pageX - volumeBar.getBoundingClientRect().left) / volumeBar.offsetWidth;
        const newVolume = Math.floor(clickPosition * 100);
        
        youtubePlayer.setVolume(newVolume);
        document.querySelector('.volume-level').style.width = `${newVolume}%`;
    });
}

// Gerçek klavye görünümünü başlat
function initKeyboardVisual() {
    // Klavye butonuna tıklama olayı
    document.getElementById('keyboardBtn').addEventListener('click', function() {
        document.getElementById('keyboardVisualPanel').classList.add('active');
        highlightShortcutKeys();
    });
    
    // Kapat butonuna tıklama olayı
    document.querySelector('.close-keyboard-visual').addEventListener('click', function() {
        document.getElementById('keyboardVisualPanel').classList.remove('active');
    });
    
    // Panel dışına tıklama ile kapatma
    document.addEventListener('click', function(e) {
        const panel = document.getElementById('keyboardVisualPanel');
        const keyboardBtn = document.getElementById('keyboardBtn');
        
        if (panel.classList.contains('active') && 
            !panel.contains(e.target) && 
            e.target !== keyboardBtn && 
            !keyboardBtn.contains(e.target)) {
            panel.classList.remove('active');
        }
    });
    
    // Tüm tuşlara tıklama olayı ekle
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
        key.addEventListener('click', function() {
            // Önceki aktif tuşu temizle
            document.querySelectorAll('.key.active').forEach(k => k.classList.remove('active'));
            
            // Bu tuşu aktif yap
            this.classList.add('active');
            
            // Tuş açıklamasını göster
            showKeyDescription(parseInt(this.getAttribute('data-key')));
        });
    });
    
    // Klavye tuşu basma olayını dinle
    document.addEventListener('keydown', function(event) {
        // Klavye paneli açıksa
        if (document.getElementById('keyboardVisualPanel').classList.contains('active')) {
            const keyCode = event.keyCode || event.which;
            
            // İlgili tuşu bul ve aktif et
            const keys = document.querySelectorAll('.key');
            keys.forEach(key => {
                if (parseInt(key.getAttribute('data-key')) === keyCode) {
                    // Önceki aktif tuşu temizle
                    document.querySelectorAll('.key.active').forEach(k => k.classList.remove('active'));
                    
                    // Bu tuşu aktif yap
                    key.classList.add('active');
                    
                    // Tuş açıklamasını göster
                    showKeyDescription(keyCode);
                }
            });
        }
    });
    
    // Kısayol tuşlarını vurgula
    highlightShortcutKeys();
}

// Kısayol tuşlarını vurgula
function highlightShortcutKeys() {
    // Vurgulamayı temizle
    document.querySelectorAll('.key.shortcut-key').forEach(key => {
        key.classList.remove('shortcut-key');
    });
    
    // Config'de klavye kısayolları varsa
    if (config.keyboardShortcuts && Array.isArray(config.keyboardShortcuts)) {
        config.keyboardShortcuts.forEach(shortcut => {
            // Tuşu bul
            const keys = document.querySelectorAll('.key');
            keys.forEach(key => {
                if (parseInt(key.getAttribute('data-key')) === shortcut.keyCode) {
                    key.classList.add('shortcut-key');
                }
            });
        });
    }
}

// Tuş açıklamasını göster
function showKeyDescription(keyCode) {
    const descriptionEl = document.getElementById('keyDescription');
    const descriptionInner = descriptionEl.querySelector('.keyboard-description-inner');
    
    // İlgili kısayol tuşunu bul
    if (config.keyboardShortcuts && Array.isArray(config.keyboardShortcuts)) {
        const shortcut = config.keyboardShortcuts.find(s => s.keyCode === keyCode);
        
        if (shortcut) {
            descriptionInner.innerHTML = `
                <span class="description-title">${shortcut.key} Tuşu</span>
                <span class="description-text">${shortcut.description}</span>
            `;
            return;
        }
    }
    
    // Eğer kısayol yoksa, varsayılan mesaj göster
    descriptionInner.innerHTML = `
        <span class="description-title">Bu tuş için atanmış bir işlev yok</span>
        <span class="description-text">Config dosyasından kısayol tuşları ekleyebilirsiniz</span>
    `;
}

// Klavye tuşu basılma olayını dinle
function listenForKeyboardShortcuts() {
    document.addEventListener('keydown', function(event) {
        // Config'de keyboardShortcuts yoksa kontrolü
        if (!config.keyboardShortcuts || !Array.isArray(config.keyboardShortcuts)) {
            return;
        }
        
        // Basılan tuş için keyCode'u al
        const keyCode = event.keyCode || event.which;
        
        // Eşleşen kısayolu bul
        const shortcut = config.keyboardShortcuts.find(s => s.keyCode === keyCode);
        
        // Eşleşen kısayol varsa, klavye panelini aç
        if (shortcut) {
            document.getElementById('keyboardVisualPanel').classList.add('active');
            
            // Kısa bir gecikme ile tuşu vurgula (panel açılışından sonra)
            setTimeout(() => {
                // Tüm tuşların vurgusunu kaldır
                document.querySelectorAll('.key.active').forEach(k => k.classList.remove('active'));
                
                // İlgili tuşu bul ve vurgula
                const keys = document.querySelectorAll('.key');
                keys.forEach(key => {
                    if (parseInt(key.getAttribute('data-key')) === keyCode) {
                        key.classList.add('active');
                        showKeyDescription(keyCode);
                    }
                });
            }, 100);
        }
    });
}

// Karanlık mod geçişi
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'true' : 'false');
    
    // Icon değiştir
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.innerHTML = isDarkMode ? 
        '<i class="fas fa-sun"></i>' : 
        '<i class="fas fa-moon"></i>';
}

// Arkaplan tipini değiştir (YouTube / Images)
function toggleBackgroundType() {
    const body = document.body;
    const bgSwitchBtn = document.getElementById('bgSwitchBtn');
    
    if (body.classList.contains('images-active')) {
        body.classList.remove('images-active');
        body.classList.add('youtube-active');
        bgSwitchBtn.querySelector('span').textContent = 'Resimlere Geç';
        bgSwitchBtn.querySelector('i').className = 'fas fa-images';
    } else {
        body.classList.remove('youtube-active');
        body.classList.add('images-active');
        bgSwitchBtn.querySelector('span').textContent = 'Videoya Geç';
        bgSwitchBtn.querySelector('i').className = 'fas fa-film';
    }
}


// Yükleme çubuğunu başlat
function initLoadingBar() {
    createArrowsLoadingBar();
    const loadingTextNew = document.getElementById('loadingTextNew');
    
    if (!loadingTextNew) {  // loadingBarNew yerine sadece loadingTextNew kontrolü
        console.error("Yükleme metni elemanı bulunamadı!");
        return;
    }
    
    // Başlangıç değerleri
    document.getElementById('progressClipRect').setAttribute('width', '0');
    loadingTextNew.textContent = 'Bağlanılıyor...';
}

// Renk sekmelerini işle
function initColorTabs() {
    const tabs = document.querySelectorAll('.color-tab');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Aktif tab'ı kaldır
            tabs.forEach(t => t.classList.remove('active'));
            
            // Bu tab'ı aktif yap
            tab.classList.add('active');
            
            // Tüm içerikleri gizle
            contents.forEach(content => content.classList.remove('active'));
            
            // İlgili içeriği göster
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(`tab-${tabId}`).classList.add('active');
        });
    });
}

// Renk paleti tıklama ve sürükleme olayını işle
function initColorPalettes() {
    const colorWheels = document.querySelectorAll('.color-wheel');
    
    colorWheels.forEach(wheel => {
        let isDragging = false;
        
        // Renk seçici işareti
        const colorPicker = document.createElement('div');
        colorPicker.className = 'color-picker-indicator';
        wheel.appendChild(colorPicker);
        
        // Renk seçme fonksiyonu
        function pickColor(e) {
            const rect = wheel.getBoundingClientRect();
            let x, y;
            
            // Dokunmatik olay mı yoksa fare olayı mı?
            if (e.type.includes('touch')) {
                x = e.touches[0].clientX - rect.left - rect.width / 2;
                y = e.touches[0].clientY - rect.top - rect.height / 2;
            } else {
                x = e.clientX - rect.left - rect.width / 2;
                y = e.clientY - rect.top - rect.height / 2;
            }
            
            // Açıyı hesapla (0-360 derece)
            const angle = Math.atan2(y, x) * (180 / Math.PI) + 180;
            
            // Mesafeyi hesapla (0-1 arası)
            const distance = Math.min(1, Math.sqrt(x*x + y*y) / (rect.width / 2));
            
            // HSL'den renk oluştur
            const hue = angle;
            const saturation = distance * 100;
            const lightness = 50;
            
            const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
            
            // İlgili renk inputunu güncelle
            const wheelId = wheel.id;
            const colorType = wheelId.replace('ColorWheel', '');
            const colorInput = document.getElementById(`${colorType}Color`);
            const colorPreview = document.getElementById(`${colorType}ColorPreview`);
            
            // HSL'den HEX'e dönüştür
            const hexColor = hslToHex(hue, saturation, lightness);
            
            // Input ve preview'ı güncelle
            colorInput.value = hexColor;
            colorPreview.style.backgroundColor = hexColor;
            
            // Renk işaretini güncelle
            const pickerX = distance * Math.cos((angle - 180) * Math.PI / 180) * (rect.width / 2) + (rect.width / 2);
            const pickerY = distance * Math.sin((angle - 180) * Math.PI / 180) * (rect.height / 2) + (rect.height / 2);
            
            colorPicker.style.left = `${pickerX}px`;
            colorPicker.style.top = `${pickerY}px`;
            colorPicker.style.display = 'block';
            
            // Rengi otomatik güncelle
            updateColorFromWheel(colorType, hexColor);
        }
        
        // Fare olayları
        wheel.addEventListener('mousedown', (e) => {
            isDragging = true;
            pickColor(e);
        });
        
        window.addEventListener('mousemove', (e) => {
            if (isDragging) {
                pickColor(e);
            }
        });
        
        window.addEventListener('mouseup', () => {
            isDragging = false;
        });
        
        // Dokunmatik olaylar
        wheel.addEventListener('touchstart', (e) => {
            isDragging = true;
            pickColor(e);
        });
        
        window.addEventListener('touchmove', (e) => {
            if (isDragging) {
                pickColor(e);
                e.preventDefault(); // Sayfanın sürüklenmesini engelle
            }
        });
        
        window.addEventListener('touchend', () => {
            isDragging = false;
        });
    });
    
    // Preset renkleri işle
    const presetColors = document.querySelectorAll('.preset-color');
    presetColors.forEach(preset => {
        preset.addEventListener('click', () => {
            const color = preset.getAttribute('data-color');
            const type = preset.getAttribute('data-type');
            
            // Renk inputunu güncelle
            const inputId = type === 'primary' ? 'primaryColor' : 
                           type === 'secondary' ? 'secondaryColor' : 
                           type === 'text' ? 'textColor' : 'bgColor';
            
            const input = document.getElementById(inputId);
            const preview = document.getElementById(`${type}ColorPreview`);
            
            input.value = color;
            preview.style.backgroundColor = color;
            
            // Renk işaretini gizle - hazır renk seçildiğinde
            const wheelId = `${type}ColorWheel`;
            const wheel = document.getElementById(wheelId);
            const colorPicker = wheel.querySelector('.color-picker-indicator');
            colorPicker.style.display = 'none';
            
            // Rengi otomatik güncelle
            updateColorFromWheel(type, color);
        });
    });
    
    // Renk inputlarını dinle
    document.getElementById('primaryColor').addEventListener('input', function() {
        document.getElementById('primaryColorPreview').style.backgroundColor = this.value;
        updateColorFromWheel('primary', this.value);
    });
    
    document.getElementById('secondaryColor').addEventListener('input', function() {
        document.getElementById('secondaryColorPreview').style.backgroundColor = this.value;
        updateColorFromWheel('secondary', this.value);
    });
    
    document.getElementById('textColor').addEventListener('input', function() {
        document.getElementById('textColorPreview').style.backgroundColor = this.value;
        updateColorFromWheel('text', this.value);
    });
    
    document.getElementById('bgColor').addEventListener('input', function() {
        document.getElementById('bgColorPreview').style.backgroundColor = this.value;
        updateColorFromWheel('bg', this.value);
    });
    
    // Gradient slider'ı dinle
    document.getElementById('gradientIntensity').addEventListener('input', function() {
        updateColors(); // Renkleri güncelle
    });
}
// Renk tekerleğinden renk güncellemesi
function updateColorFromWheel(type, color) {
    switch(type) {
        case 'primary':
            document.documentElement.style.setProperty('--primary-color', color);
            const primaryColorRgb = hexToRgb(color).join(',');
            document.documentElement.style.setProperty('--primary-color-rgb', primaryColorRgb);
            localStorage.setItem('primaryColor', color);
            break;
        case 'secondary':
            document.documentElement.style.setProperty('--secondary-color', color);
            localStorage.setItem('secondaryColor', color);
            break;
        case 'text':
            document.documentElement.style.setProperty('--text-color', color);
            localStorage.setItem('textColor', color);
            break;
        case 'bg':
            document.documentElement.style.setProperty('--background-color', color);
            localStorage.setItem('bgColor', color);
            break;
    }
    
    // Gradient intensty slider rengini güncelle
    document.getElementById('gradientIntensity').style.background = 
        `linear-gradient(to right, rgba(0, 0, 0, 0.3), ${document.documentElement.style.getPropertyValue('--primary-color')})`;
}

// HSL'den HEX'e dönüştürme
function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

// Renk paneli başlat
function initColorPanel() {
    initColorTabs();
    initSettingsButton();
    initColorPalettes();
    initResetColorsButton();
    
    // Renk preview'larını başlangıç değerleriyle güncelle
    document.getElementById('primaryColorPreview').style.backgroundColor = document.getElementById('primaryColor').value;
    document.getElementById('secondaryColorPreview').style.backgroundColor = document.getElementById('secondaryColor').value;
    document.getElementById('textColorPreview').style.backgroundColor = document.getElementById('textColor').value;
    document.getElementById('bgColorPreview').style.backgroundColor = document.getElementById('bgColor').value;
}

// FiveM NUI eventlerini dinle
window.addEventListener('message', function(event) {
    const data = event.data;
    
    // loadProgress eventini yakala
    if (data.eventName === 'loadProgress') {
        updateLoadingProgress(data);
    }
    
    // shutdownLoadingScreen eventini yakala
    if (data.eventName === 'shutdownLoadingScreen') {
        hideLoadingElements();
    }
});

// Yükleme çubuğunu güncelle
function updateLoadingProgress(data) {
    const progressClipRect = document.getElementById('progressClipRect');
    const loadingTextNew = document.getElementById('loadingTextNew');
    
    if (!progressClipRect || !loadingTextNew) {
        console.error("Yükleme çubuğu elemanları bulunamadı!");
        return;
    }
    
    // FiveM'den gelen yükleme oranı (0-1 arasında)
    const progressFraction = data.loadFraction;
    const progressPercent = progressFraction * 100;
    
    // SVG clip-path ile ilerlemeyi güncelle (width değeri)
    const svgWidth = 300;
    const progressWidth = (progressFraction * svgWidth);
    progressClipRect.setAttribute('width', progressWidth);
    
    // İlerleme yüzdesine göre özel metinler
    let customMessage = getCustomLoadingMessage(progressPercent);
    
    // Özel yükleme mesajı varsa göster
    if (data.loadingMessage && data.loadingMessage.trim() !== "") {
        loadingTextNew.textContent = `${customMessage} (${Math.round(progressPercent)}%)`;
    } else {
        loadingTextNew.textContent = `${customMessage} (${Math.round(progressPercent)}%)`;
    }
    
    // Yükleme tamamlandıysa
    if (progressFraction >= 1.0) {
        loadingTextNew.textContent = "Şehir kapılarını açıyor, roleplay dünyasına giriş yapılıyor...";
    }
    
    console.log(`FiveM yükleme: ${progressPercent.toFixed(2)}% - ${customMessage}`);
}

function createArrowsLoadingBar() {
    const arrowsBg = document.querySelector('.arrows-bg');
    const arrowsProgress = document.querySelector('.arrows-progress');
    
    if (!arrowsBg || !arrowsProgress) {
        console.error("SVG oklar için elementler bulunamadı!");
        return;
    }
    
    // SVG için ok şekilleri
    const svgWidth = 300;
    const arrowWidth = 15;
    const arrowHeight = 20;
    const arrowGap = 5;
    const numArrows = Math.floor(svgWidth / (arrowWidth + arrowGap));
    
    // Gradient renklerini ayarla
    document.querySelector('.gradient-start').setAttribute('stop-color', '#000000');
    document.querySelector('.gradient-end').setAttribute('stop-color', getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim());
    
    // Arkaplan ve ilerleme için okları oluştur
    let bgContent = '';
    let progressContent = '';
    
    for (let i = 0; i < numArrows; i++) {
        const x = i * (arrowWidth + arrowGap);
        
        // Her bir okun SVG path'i
        const arrowPath = `
            <path d="M ${x} 5 
                      L ${x + arrowWidth - 5} 15 
                      L ${x} 25 
                      L ${x + 5} 15 
                      Z" />
        `;
        
        bgContent += arrowPath;
        progressContent += arrowPath;
    }
    
    // Okları SVG'ye ekle
    arrowsBg.innerHTML = bgContent;
    arrowsProgress.innerHTML = progressContent;
}

// İlerleme yüzdesine göre özel yükleme mesajları
function getCustomLoadingMessage(progress) {
    // Yükleme esnasında gösterilecek mesajlar
    const loadingMessages = [
        { threshold: 0, message: "Sunucu ile bağlantı kuruluyor..." },
        { threshold: 5, message: "Sunucu veritabanına bağlanılıyor..." },
        { threshold: 10, message: "Karakter bilgileri alınıyor..." },
        { threshold: 15, message: "Sunucu kaynakları kontrol ediliyor..." },
        { threshold: 20, message: "Oyun dünyası hazırlanıyor..." },
        { threshold: 25, message: "Harita elementleri yükleniyor..." },
        { threshold: 30, message: "NPC'ler yerleştiriliyor..." },
        { threshold: 35, message: "Araç modelleri yükleniyor..." },
        { threshold: 40, message: "Bina içi mekanlar hazırlanıyor..." },
        { threshold: 45, message: "Oyuncu etkileşimleri ayarlanıyor..." },
        { threshold: 50, message: "Ekonomi sistemi başlatılıyor..." },
        { threshold: 55, message: "Meslek sistemleri aktifleştiriliyor..." },
        { threshold: 60, message: "Envanter sistemi hazırlanıyor..." },
        { threshold: 65, message: "Telefon uygulaması yükleniyor..." },
        { threshold: 70, message: "Araç modifikasyonları yükleniyor..." },
        { threshold: 75, message: "Kıyafet ve aksesuarlar hazırlanıyor..." },
        { threshold: 80, message: "Hava durumu sistemi ayarlanıyor..." },
        { threshold: 85, message: "Sunucu scriptleri optimize ediliyor..." },
        { threshold: 90, message: "Son hazırlıklar yapılıyor..." },
        { threshold: 95, message: "Sunucuya giriş hazır, oyun dünyası başlatılıyor..." },
        { threshold: 100, message: "Oxy Roleplay dünyasına hoş geldiniz!" }
    ];

    // İlerleme durumuna göre uygun mesajı bul
    for (let i = loadingMessages.length - 1; i >= 0; i--) {
        if (progress >= loadingMessages[i].threshold) {
            return loadingMessages[i].message;
        }
    }
    
    // Varsayılan mesaj
    return "Sunucu bağlantısı kuruluyor...";
}
// Yükleme elementlerini gizle
function hideLoadingElements() {
    const loadingContainer = document.querySelector('.loading-container');
    const loadingTextNew = document.getElementById('loadingTextNew');
    
    if (loadingContainer && loadingTextNew) {
        loadingContainer.style.opacity = '0';
        loadingTextNew.style.opacity = '0';
        
        setTimeout(() => {
            loadingContainer.style.display = 'none';
            loadingTextNew.style.display = 'none';
        }, 500);
    }
}

// FiveM eventlerini dinle - güncellenmiş versiyon
function listenToFiveMEvents() {
    window.addEventListener('message', function(event) {
        const data = event.data;
        
        if (data.eventName === 'loadProgress') {
            // Gerçek yükleme ilerlemesini göster
            const loadingBarNew = document.getElementById('loadingBarNew');
            const loadingTextNew = document.getElementById('loadingTextNew');
            
            if (!loadingBarNew || !loadingTextNew) {
                console.error("Yükleme çubuğu elemanları bulunamadı!");
                return;
            }
            
            const progress = data.loadFraction * 100;
            
            loadingBarNew.style.width = `${progress}%`;
            loadingTextNew.textContent = `Yükleniyor... ${Math.round(progress)}%`;
            
            // Eğer yükleme mesajı varsa göster
            if (data.loadingMessage) {
                loadingTextNew.textContent = data.loadingMessage;
            }
            
            // Yükleme tamamlandıysa
            if (progress >= 100) {
                // Yükleme tamamlandığında loading container'ı gizle
                setTimeout(() => {
                    document.querySelector('.loading-container').style.opacity = '0';
                    document.querySelector('.loading-text-new').style.opacity = '0';
                    setTimeout(() => {
                        document.querySelector('.loading-container').style.display = 'none';
                        document.querySelector('.loading-text-new').style.display = 'none';
                    }, 500);
                }, 1500);
            }
        }
    });
}

// İnline stil uygulama (CSS çalışmaması durumunda)
function applyInlineStyles() {
    const loadingContainer = document.querySelector('.loading-container');
    const loadingBarNew = document.getElementById('loadingBarNew');
    const loadingTextNew = document.getElementById('loadingTextNew');
    
    if (loadingContainer) {
        loadingContainer.style.position = 'fixed';
        loadingContainer.style.bottom = '77px';
        loadingContainer.style.left = '50%';
        loadingContainer.style.transform = 'translateX(-50%)';
        loadingContainer.style.width = '300px';
        loadingContainer.style.height = '8px';
        loadingContainer.style.background = 'transparent';
        loadingContainer.style.borderRadius = '20px';
        loadingContainer.style.overflow = 'hidden';
        loadingContainer.style.zIndex = '100';
        loadingContainer.style.border = `1px solid rgba(${hexToRgb(getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim()).join(',')}, 0.3)`;
        loadingContainer.style.padding = '0';
        loadingContainer.style.display = 'flex';
        loadingContainer.style.alignItems = 'center';
    }
    
    if (loadingBarNew) {
        loadingBarNew.style.height = '100%';
        loadingBarNew.style.width = '0%';
        loadingBarNew.style.borderRadius = '20px';
        loadingBarNew.style.position = 'relative';
        loadingBarNew.style.background = `linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, ${getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim()} 100%)`;
        loadingBarNew.style.transition = 'width 0.5s ease';
        loadingBarNew.style.overflow = 'hidden';
        
        // Ok işaretlerini ekleyin
        const arrowsElement = document.createElement('div');
        arrowsElement.textContent = '>>> >>> >>> >>> >>> >>> >>>';
        arrowsElement.style.position = 'absolute';
        arrowsElement.style.top = '50%';
        arrowsElement.style.left = '0';
        arrowsElement.style.width = '100%';
        arrowsElement.style.transform = 'translateY(-50%)';
        arrowsElement.style.color = 'rgba(255, 255, 255, 0.3)';
        arrowsElement.style.fontSize = '8px';
        arrowsElement.style.fontWeight = 'bold';
        arrowsElement.style.letterSpacing = '5px';
        arrowsElement.style.whiteSpace = 'nowrap';
        arrowsElement.style.animation = 'moveArrows 2s linear infinite';
        loadingBarNew.appendChild(arrowsElement);
    }
    
    if (loadingTextNew) {
        loadingTextNew.style.position = 'absolute';
        loadingTextNew.style.bottom = '92px';
        loadingTextNew.style.left = '50%';
        loadingTextNew.style.transform = 'translateX(-50%)';
        loadingTextNew.style.fontSize = '12px';
        loadingTextNew.style.color = getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim();
        loadingTextNew.style.textAlign = 'center';
        loadingTextNew.style.zIndex = '100';
        loadingTextNew.style.textShadow = '0px 0px 5px rgba(0, 0, 0, 0.8)';
        loadingTextNew.style.background = 'transparent';
        loadingTextNew.style.padding = '3px 10px';
    }
    
    // Animasyon keyframes ekle
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes moveArrows {
            0% {
                transform: translate(-30px, -50%);
            }
            100% {
                transform: translate(0, -50%);
            }
        }
    `;
    document.head.appendChild(styleSheet);
}

// Renk ayarları panelini aç/kapat
function toggleColorPanel() {
    const colorPanel = document.querySelector('.color-picker-panel');
    colorPanel.classList.toggle('active');
}

// YouTube API hazır olduğunda çalışacak
function onYouTubeIframeAPIReady() {
    initYouTubePlayer();
}

// Sayfa yüklendiğinde çalışacak ana fonksiyon
document.addEventListener("DOMContentLoaded", function() {
    // Özel cursor ayarla
    setCustomCursor();
    
    // Renk değerlerini localStorage'dan veya config'den al
    const primaryColor = localStorage.getItem('primaryColor') || config.defaultColors.primaryColor;
    const bgColor = localStorage.getItem('bgColor') || config.defaultColors.backgroundColor;
    const textColor = localStorage.getItem('textColor') || config.defaultColors.textColor;
    const gradientIntensity = localStorage.getItem('gradientIntensity') || config.defaultColors.gradientIntensity;
    
    // Input elementlerine değerleri ata
    document.getElementById('primaryColor').value = primaryColor;
    document.getElementById('bgColor').value = bgColor;
    document.getElementById('textColor').value = textColor;
    document.getElementById('gradientIntensity').value = gradientIntensity;
    
    // CSS değişkenlerini ayarla
    const primaryColorRgb = hexToRgb(primaryColor).join(',');
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--background-color', bgColor);
    document.documentElement.style.setProperty('--text-color', textColor);
    document.documentElement.style.setProperty('--gradient-intensity', gradientIntensity);
    document.documentElement.style.setProperty('--primary-color-rgb', primaryColorRgb);
    
    // Sunucu bilgilerini ayarla
    document.getElementById('serverName').textContent = config.serverName;
    document.getElementById('serverSlogan').textContent = config.serverSlogan;
    document.getElementById('serverLogo').src = config.serverLogo;
    
    // İçerik bileşenlerini yükle
    loadTeamMembers();
    loadSocialIcons();
    loadRules();
    initLoadingBar();
    fixBackgroundVideo();
    initColorPanel();
    listenToFiveMEvents();
    loadAnnouncements();
    loadGalleryImages();
    loadBackgroundImages();
    
    // YouTube API bilgilerini çek ve müzik oynatıcıyı başlat
    fetchYouTubeVideoInfo();
    
    // YouTube Iframe API'yi yükle
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    // Müzik kontrollerini başlat
    initMusicControls();
    
    
    // Gerçek klavye görünümünü başlat
    initKeyboardVisual();
    
    // Klavye tuşu basma olayını dinle
    listenForKeyboardShortcuts();
    
    // Arka plan tipini ayarla
    const body = document.body;
    if (config.backgroundType === "youtube") {
        body.classList.remove('images-active');
        body.classList.add('youtube-active');
        document.getElementById('bgSwitchBtn').querySelector('span').textContent = 'Resimlere Geç';
        document.getElementById('bgSwitchBtn').querySelector('i').className = 'fas fa-images';
        
        // YouTube arka plan video
        if (config.youtubeVideoId) {
            document.getElementById('ytPlayer').src = `https://www.youtube.com/embed/${config.youtubeVideoId}?autoplay=1&mute=1&controls=0&showinfo=0&disablekb=1&fs=0&loop=1&playlist=${config.youtubeVideoId}`;
        }
    } else {
        body.classList.remove('youtube-active');
        body.classList.add('images-active');
        document.getElementById('bgSwitchBtn').querySelector('span').textContent = 'Videoya Geç';
        document.getElementById('bgSwitchBtn').querySelector('i').className = 'fas fa-film';
    }
    
    // Karanlık mod ayarını yükle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Event dinleyicileri ekle
    
    // Arkaplan değiştirici butonu
    document.getElementById('bgSwitchBtn').addEventListener('click', toggleBackgroundType);
    
    // Karanlık mod butonu
    darkModeToggle.addEventListener('click', toggleDarkMode);
    
    // Ayarlar paneli
    document.getElementById('settingsBtn').addEventListener('click', toggleColorPanel);
    document.querySelector('.close-panel').addEventListener('click', toggleColorPanel);
    
    // Renk ayarları
    document.getElementById('primaryColor').addEventListener('input', updateColors);
    document.getElementById('bgColor').addEventListener('input', updateColors);
    document.getElementById('textColor').addEventListener('input', updateColors);
    document.getElementById('gradientIntensity').addEventListener('input', updateColors);
    
    // Renkleri sıfırlama butonu
    document.getElementById('resetColors').addEventListener('click', resetColors);
    
    // Renkleri kaydetme butonu
    document.getElementById('saveColors').addEventListener('click', function() {
        updateColors();
        toggleColorPanel();
    });
    
    // Otomatik arkaplan değişimi (her 10 saniyede bir)
    setInterval(rotateBackgroundImages, 10000);
    
    // FiveM eventlerini dinleme
    listenToFiveMEvents();
    
    // FiveM eventleri yoksa yükleme simülasyonu başlat
    if (window.nuiHandoverData === undefined) {
        simulateLoading();
    }
});

// FiveM shutdown olayını dinle
window.addEventListener('message', function(e) {
    if (e.data.eventName === 'shutdownLoadingScreen') {
        // Loading screen'i kapat - FiveM bunu otomatik yapacak
        // Bu sadece herhangi bir ek temizleme işlemi için
    }
});

// Renk panelini açma-kapama için buton işlevselliği
function initSettingsButton() {
    const settingsButton = document.getElementById('settingsBtn');
    const colorPanel = document.querySelector('.color-picker-panel');
    const closePanel = document.querySelector('.close-panel');
    
    if (settingsButton && colorPanel) {
        // Ayarlar butonuna tıklama olayı ekle
        settingsButton.addEventListener('click', function(e) {
            e.stopPropagation(); // Belge içindeki tıklama olayının yayılmasını engelle
            console.log('Settings button clicked');
            colorPanel.classList.toggle('active');
        });
        
        // Kapatma butonuna tıklama olayı ekle
        if (closePanel) {
            closePanel.addEventListener('click', function() {
                console.log('Close panel button clicked');
                colorPanel.classList.remove('active');
            });
        }
    } else {
        console.error('Renk paneli veya ayarlar butonu bulunamadı!');
    }
}

// Renkleri sıfırla butonunu aktifleştir
function initResetColorsButton() {
    const resetButton = document.getElementById('resetColors');
    
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            console.log('Renkleri sıfırlama butonu tıklandı');
            
            // Varsayılan renkleri ayarla
            const defaultColors = {
                primaryColor: '#a855f7',
                secondaryColor: '#6b21a8',
                textColor: '#ffffff',
                bgColor: '#000000',
                gradientIntensity: 0.7
            };
            
            // Renkleri DOM'da güncelle
            document.documentElement.style.setProperty('--primary-color', defaultColors.primaryColor);
            document.documentElement.style.setProperty('--secondary-color', defaultColors.secondaryColor);
            document.documentElement.style.setProperty('--text-color', defaultColors.textColor);
            document.documentElement.style.setProperty('--background-color', defaultColors.bgColor);
            document.documentElement.style.setProperty('--gradient-intensity', defaultColors.gradientIntensity);
            
            // RGB değerini güncelle
            const primaryColorRgb = hexToRgb(defaultColors.primaryColor).join(',');
            document.documentElement.style.setProperty('--primary-color-rgb', primaryColorRgb);
            
            // Input ve preview elementlerini güncelle
            document.getElementById('primaryColor').value = defaultColors.primaryColor;
            document.getElementById('secondaryColor').value = defaultColors.secondaryColor;
            document.getElementById('textColor').value = defaultColors.textColor;
            document.getElementById('bgColor').value = defaultColors.bgColor;
            document.getElementById('gradientIntensity').value = defaultColors.gradientIntensity;
            
            document.getElementById('primaryColorPreview').style.backgroundColor = defaultColors.primaryColor;
            document.getElementById('secondaryColorPreview').style.backgroundColor = defaultColors.secondaryColor;
            document.getElementById('textColorPreview').style.backgroundColor = defaultColors.textColor;
            document.getElementById('bgColorPreview').style.backgroundColor = defaultColors.bgColor;
            
            // Gradient slider rengini güncelle
            document.getElementById('gradientIntensity').style.background = 
                `linear-gradient(to right, rgba(0, 0, 0, 0.3), ${defaultColors.primaryColor})`;
            
            // LocalStorage'dan renk tercihlerini kaldır
            localStorage.removeItem('primaryColor');
            localStorage.removeItem('secondaryColor');
            localStorage.removeItem('textColor');
            localStorage.removeItem('bgColor');
            localStorage.removeItem('gradientIntensity');
            
            // Renk işaretçilerini gizle
            document.querySelectorAll('.color-picker-indicator').forEach(indicator => {
                indicator.style.display = 'none';
            });
            
            console.log('Renkler başarıyla sıfırlandı');
        });
    } else {
        console.error('Renkleri sıfırla butonu bulunamadı!');
    }
}

// Arkaplan videosunu düzeltme
function fixBackgroundVideo() {
    const ytPlayer = document.getElementById('ytPlayer');
    
    if (ytPlayer) {
        // Tam ekran video ayarı
        ytPlayer.style.position = 'fixed';
        ytPlayer.style.top = '0';
        ytPlayer.style.left = '0';
        ytPlayer.style.width = '100vw';
        ytPlayer.style.height = '100vh';
        ytPlayer.style.objectFit = 'cover';
        ytPlayer.style.zIndex = '-2';
        
        // YouTube embed parametrelerini düzelt
        if (config.youtubeVideoId) {
            const embedUrl = `https://www.youtube.com/embed/${config.youtubeVideoId}?autoplay=1&mute=1&controls=0&showinfo=0&disablekb=1&fs=0&loop=1&playlist=${config.youtubeVideoId}&modestbranding=1&iv_load_policy=3&rel=0&enablejsapi=1`;
            ytPlayer.src = embedUrl;
        }
        
        console.log('Arkaplan videosu düzeltildi');
    }
}