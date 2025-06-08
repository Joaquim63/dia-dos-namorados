// Configurações
const CONFIG = {
    // Data de início do namoro 
startDate: new Date('2023-03-26T17:40:00'),
    
    // Informações da música
    music: {
        title: "Chest Pain (I Love)",                             
        artist: "Malcolm Todd",                         
        albumCover: "midia/musica/ftalbum.jpg",    
        audioFile: "midia/musica/ilove.mp3"          
    },
    
    // Fotos para o slider 
    photos: [
        "midia/fotos/ft1.jpeg", 
        "midia/fotos/ft3.jpeg", 
        "midia/fotos/ft4.jpg",
        "midia/fotos/ft5.jpg",
        "midia/fotos/ft6.jpg",
        "midia/fotos/ft7.jpg",
        "midia/fotos/ft8.jpg",
        "midia/fotos/ft9.jpg",
        "midia/fotos/ft10.jpg",
        "midia/fotos/ft11.jpg",
        "midia/fotos/ft12.jpg",
        "midia/fotos/ft13.jpg",
        "midia/fotos/ft14.jpg",
        "midia/fotos/ft15.jpg",
        "midia/fotos/ft16.jpg",
        "midia/fotos/ft17.jpg",
        "midia/fotos/ft18.jpg",
        "midia/fotos/ft19.jpg",
        "midia/fotos/ft20.jpg",    
        "midia/fotos/ft21.jpg",
        "midia/fotos/ft22.jpg",
        "midia/fotos/ft23.jpg",
        "midia/fotos/ft24.jpg",
        "midia/fotos/ft25.jpg",
        "midia/fotos/ft26.jpg",
        "midia/fotos/ft27.jpg",
        "midia/fotos/ft28.jpg",
        "midia/fotos/ft29.jpg",
        "midia/fotos/ft30.jpg",
        "midia/fotos/ft31.jpg",
        "midia/fotos/ft32.jpg",
        "midia/fotos/ft33.jpg",
        "midia/fotos/ft34.jpg",
        "midia/fotos/ft35.jpg",
        "midia/fotos/ft36.jpg",
        "midia/fotos/ft37.jpg",
        "midia/fotos/ft38.jpg",
        "midia/fotos/ft39.jpg",
        "midia/fotos/ft40.jpg",
        "midia/fotos/ft41.jpg",
        "midia/fotos/ft42.jpg",
        "midia/fotos/ft43.jpg",
        "midia/fotos/ft44.jpg",
        "midia/fotos/ft45.jpg",
        "midia/fotos/ft46.jpg",
        "midia/fotos/ft47.jpeg",
        // Adicione mais fotos conforme necessário
    ]
};


// Variáveis globais
let currentSlide = 0;
let slideInterval;
let audio;
let isPlaying = false;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Mostra a tela principal após 5 segundos
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        initializeEverything();
    }, 5000);
});

function initializeEverything() {
    setupMusicPlayer();
    setupPhotoSlider();
    startLoveCounter();
}

// Configuração do Player de Música
function setupMusicPlayer() {
    // Configurar informações da música
    document.getElementById('song-title').textContent = CONFIG.music.title;
    document.getElementById('artist-name').textContent = CONFIG.music.artist;
    document.getElementById('album-image').src = CONFIG.music.albumCover;
    
    // Configurar áudio
    audio = document.getElementById('backgroundMusic');
    audio.src = CONFIG.music.audioFile;
    audio.volume = 0.7;
    
    // Botão de play/pause
    document.getElementById('playPauseBtn').addEventListener('click', toggleMusic);
    
    // Tentar autoplay após qualquer interação do usuário
    document.addEventListener('click', attemptAutoplay, { once: true });
    document.addEventListener('touchstart', attemptAutoplay, { once: true });
}

function attemptAutoplay() {
    if (!isPlaying) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isPlaying = true;
                updatePlayPauseButton();
            }).catch(() => {
                isPlaying = false;
                updatePlayPauseButton();
            });
        }
    }
}


function toggleMusic() {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
    } else {
        audio.play();
        isPlaying = true;
    }
    updatePlayPauseButton();
}

function updatePlayPauseButton() {
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');
    
    if (isPlaying) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    } else {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
}

// Configuração do Slider de Fotos
function setupPhotoSlider() {
    const sliderContainer = document.getElementById('sliderContainer');
    
    // Criar slides para cada foto
    CONFIG.photos.forEach((photo, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        if (index === 0) slide.classList.add('active');
        
        const img = document.createElement('img');
        img.src = photo;
        img.alt = `Foto ${index + 1}`;
        
        slide.appendChild(img);
        sliderContainer.appendChild(slide);
    });
    
    // Iniciar rotação automática
    slideInterval = setInterval(nextSlide, 2000);
}

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    slides[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Contador de Amor
function startLoveCounter() {
    updateLoveCounter();
    setInterval(updateLoveCounter, 1000); // Atualiza a cada segundo
}

function updateLoveCounter() {
    const now = new Date();
    const diff = now - CONFIG.startDate;
    
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    let text = "Eu te amo há ";
    
    if (years > 0) {
        text += `${years} ano${years !== 1 ? 's' : ''}`;
        if (days > 0 || hours > 0 || minutes > 0) text += ", ";
    }
    
    if (days > 0) {
        text += `${days} dia${days !== 1 ? 's' : ''}`;
        if (hours > 0 || minutes > 0) text += ", ";
    }
    
    if (hours > 0) {
        text += `${hours} hora${hours !== 1 ? 's' : ''}`;
        if (minutes > 0) text += ", ";
    }
    
    if (minutes > 0) {
        text += `${minutes} minuto${minutes !== 1 ? 's' : ''} e `;
    }
    
    text += `${seconds} segundo${seconds !== 1 ? 's' : ''}`;
    
    document.getElementById('loveCounter').textContent = text;
}


// Pausar slider quando a aba não estiver ativa
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        clearInterval(slideInterval);
    } else {
        slideInterval = setInterval(nextSlide, 2000);
    }
});
