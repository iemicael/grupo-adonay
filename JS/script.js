// script.js

document.addEventListener('DOMContentLoaded', () => {
    const controls = document.querySelectorAll('.audio-control');
    const videoBackground = document.querySelector('.video-background');

    controls.forEach(control => {
        control.addEventListener('click', () => {
            const audioId = control.getAttribute('data-audio');
            const audioElement = document.getElementById(audioId);

            // Detener cualquier otro audio que esté reproduciéndose
            document.querySelectorAll('audio').forEach(audio => {
                if (audio !== audioElement) {
                    audio.pause();
                    audio.currentTime = 0;
                }
            });

            // Reproducir el audio seleccionado
            if (audioElement.paused) {
                audioElement.play();
                control.textContent = 'II'; // Cambia el texto del botón a "Pausa"
            } else {
                audioElement.pause();
                control.textContent = '▶'; // Cambia el texto del botón a "Reproducir"
            }
        });
    });

    // Asegúrate de que el video se reproduzca automáticamente
    function playVideo() {
        if (videoBackground) {
            videoBackground.play().catch(error => {
                // La reproducción automática ha fallado
                console.log('No se pudo reproducir el video automáticamente:', error);
            });
        }
    }

    playVideo();
});

document.addEventListener('DOMContentLoaded', () => {
    let currentAudio = null;
    let isPlaying = false;
    let isPaused = false;
    const buttons = document.querySelectorAll('.audio-control');

    function toggleAudio(audioId) {
        const audio = document.getElementById(audioId);
        if (currentAudio && currentAudio !== audio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            document.querySelector(`[data-audio="${currentAudio.id}"]`).textContent = '▶'; // Cambia el ícono de reproducción a play
        }

        if (!isPlaying || currentAudio !== audio) {
            audio.play();
            document.querySelector(`[data-audio="${audio.id}"]`).textContent = 'II'; // Cambia a pausa
            currentAudio = audio;
            isPlaying = true;
            isPaused = false;
        } else if (isPlaying && !isPaused) {
            audio.pause();
            document.querySelector(`[data-audio="${audio.id}"]`).textContent = '▶'; // Cambia a reproducir
            isPlaying = false;
            isPaused = true;
        } else if (isPaused) {
            audio.currentTime = 0;
            audio.play();
            document.querySelector(`[data-audio="${audio.id}"]`).textContent = 'II'; // Cambia a pausa
            isPlaying = true;
            isPaused = false;
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const audioId = button.getAttribute('data-audio');
            toggleAudio(audioId);
        });
    });

    document.querySelectorAll('audio').forEach(audio => {
        audio.addEventListener('ended', () => {
            const button = document.querySelector(`[data-audio="${audio.id}"]`);
            button.textContent = '▶️'; // Cambia a reproducir cuando el audio termine
            isPlaying = false;
            isPaused = false;
        });
    });
});
