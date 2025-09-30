document.addEventListener('DOMContentLoaded', () => {

    // --- EFECTO DE SCROLL ---
    const hiddenElements = document.querySelectorAll('.hidden');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });
    hiddenElements.forEach(el => observer.observe(el));

    // --- CONTADOR REGRESIVO ---
    const countdownDate = new Date("November 15, 2025 16:00:00").getTime();
    const countdownFunction = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        if (distance > 0) {
            document.getElementById('days').innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
            document.getElementById('hours').innerText = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
            document.getElementById('minutes').innerText = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            document.getElementById('seconds').innerText = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');
        } else {
            clearInterval(countdownFunction);
            document.getElementById('countdown').innerHTML = "<h3 class='cursive-title' style='color:white; font-size: 2rem; margin:0;'>¡El gran día llegó!</h3>";
        }
    }, 1000);

    // --- CONTROL DE MÚSICA CON INTENTO DE AUTOPLAY ---
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');

    const playMusic = () => {
        bgMusic.muted = false;
        bgMusic.play().then(() => {
            musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
        }).catch(error => {
            // El navegador bloqueó el autoplay con sonido, el usuario debe interactuar
            console.log("Autoplay con sonido bloqueado. Se requiere interacción del usuario.");
            musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
        });
    };

    // Intenta reproducir la música en cuanto el usuario interactúa con la página
    document.body.addEventListener('click', playMusic, { once: true });

    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            playMusic();
        } else {
            bgMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });


    // --- GALERÍA LIGHTBOX ---
    const galleryImages = document.querySelectorAll('#gallery img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.querySelector('#lightbox .close');

    galleryImages.forEach(image => {
        image.addEventListener('click', () => {
            lightbox.classList.add('active');
            lightboxImage.src = image.src;
        });
    });

    const closeLightbox = () => lightbox.classList.remove('active');
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImage) closeLightbox();
    });

    // --- FORMULARIO RSVP PARA WHATSAPP ---
    const rsvpForm = document.getElementById('rsvp-form');
    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const phoneNumber = '5211234567890'; // !! IMPORTANTE: Cambia este número !!
        const name = document.getElementById('name').value;
        const guests = document.getElementById('guests').value;
        const song = document.getElementById('song').value;

        let message = `¡Hola! 👋 Confirmo asistencia para la boda de Sofía y Alejandro.\n\n`;
        message += `*Nombre:* ${name}\n`;
        message += `*Pases confirmados:* ${guests}\n`;
        if (song) {
            message += `*Canción sugerida:* ${song}\n\n`;
        }
        message += `¡Nos vemos en la boda! 🎉`;

        const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
    });
});
