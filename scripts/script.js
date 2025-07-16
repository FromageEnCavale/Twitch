class TwitchViewer {

    constructor() {

        this.iframe = document.getElementById('twitch-player');

        this.placeholder = document.getElementById('placeholder');

        this.loading = document.getElementById('loading');

        this.channelLinks = document.querySelectorAll('.channel-link');

        this.currentChannel = null;

        this.init();

    }

    init() {

        // Ajouter les event listeners aux liens de chaînes

        this.channelLinks.forEach(link => {

            link.addEventListener('click', (e) => {

                e.preventDefault();

                const channelName = link.dataset.channel;

                this.loadChannel(channelName);

                this.setActiveChannel(link);

            });

        });

        // Gérer le redimensionnement de la fenêtre

        window.addEventListener('resize', () => {

            this.adjustIframeSize();

        });

    }

    loadChannel(channelName) {

        if (this.currentChannel === channelName) return;

        this.currentChannel = channelName;

        this.showLoading();

        // Construire l'URL embed de Twitch

        const embedUrl = `https://player.twitch.tv/?channel=${channelName}&parent=${window.location.hostname}&autoplay=true&muted=true`;

        // Simuler un délai de chargement pour une meilleure UX

        setTimeout(() => {

            this.iframe.src = embedUrl;

            this.showPlayer();

        }, 500);

        // Gérer les erreurs de chargement

        this.iframe.onerror = () => {

            this.showError(channelName);

        };

    }

    showLoading() {

        this.placeholder.style.display = 'none';

        this.iframe.style.display = 'none';

        this.loading.classList.add('show');

    }

    showPlayer() {

        this.loading.classList.remove('show');

        this.placeholder.style.display = 'none';

        this.iframe.style.display = 'block';

    }

    showError(channelName) {

        this.loading.classList.remove('show');

        this.iframe.style.display = 'none';

        this.placeholder.style.display = 'block';

        this.placeholder.innerHTML = `
                    <h3>Loading error</h3>
                    <p>Unable to load chain "${channelName}"</p>
                    <p>Check that the channel is online</p>
                `;

    }

    setActiveChannel(activeLink) {

        // Retirer la classe active de tous les liens

        this.channelLinks.forEach(link => {

            link.classList.remove('active');

        });

        // Ajouter la classe active au lien sélectionné

        activeLink.classList.add('active');

    }

    adjustIframeSize() {

        // Cette fonction peut être utilisée pour ajuster la taille de l'iframe

        // si nécessaire lors du redimensionnement

        if (this.iframe.style.display === 'block') {

            // Forcer un refresh de l'iframe si nécessaire

            // this.iframe.style.height = '100%';

        }

    }

}

// Initialiser l'application quand le DOM est chargé

document.addEventListener('DOMContentLoaded', () => {

    new TwitchViewer();

});

// Gestion des raccourcis clavier

document.addEventListener('keydown', (e) => {

    if (e.key >= '1' && e.key <= '5') {

        const index = parseInt(e.key) - 1;

        const links = document.querySelectorAll('.channel-link');

        if (links[index]) {

            links[index].click();

        }

    }

});