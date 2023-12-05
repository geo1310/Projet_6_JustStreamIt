import { fetchData } from './api.js';
import { modalDisplay } from './modal.js';

class Carousel {
    constructor(categorySelector, url) {
        this.nb_images = 7;
        this.left_button = document.querySelector(
            `${categorySelector} .button-left`
        );
        this.right_button = document.querySelector(
            `${categorySelector} .button-right`
        );
        this.container = document.querySelector(
            `${categorySelector} .container`
        );
        this.url = url;
        this.position = 0;

        this.init();
    }

    init() {
        this.addEventListeners();
        this.afficherMasquer();
        this.setupImages();
    }

    addEventListeners() {
        this.left_button.onclick = () => {
            if (this.position > -this.nb_images + 1) {
                this.updatePosition(this.position - 1);
            }
        };

        this.right_button.onclick = () => {
            if (this.position < 0) {
                this.updatePosition(this.position + 1);
            }
        };
    }

    afficherMasquer() {
        this.left_button.style.visibility =
            this.position <= -this.nb_images + 4 ? 'hidden' : 'visible';
        this.right_button.style.visibility =
            this.position === 0 ? 'hidden' : 'visible';
    }

    updatePosition(newPosition) {
        this.position = newPosition;
        this.container.style.transform = `translateX(${this.position * 250}px)`;
        this.container.style.transition = 'all 1s ease';
        this.afficherMasquer();
    }

    async setupImages() {
        let imagesData = [];

        try {
            const dataApi = await fetchData(this.url);
            imagesData = imagesData.concat(dataApi.results);

            // charge le nombre de films predefini
            let next_page = dataApi.next;
            while (imagesData.length <= this.nb_images && next_page) {
                const nextData = await fetchData(next_page);
                imagesData = imagesData.concat(nextData.results);
                next_page = nextData.next;
            }

            // affichage des donnees
            this.container.style.width = `${40 * imagesData.length}%`;
            for (const movie of imagesData) {
                const img = document.createElement('img');
                img.className = 'photo modal-trigger';

                // verification de l url de l'image
                fetch(movie.image_url)
                    .then((response) => {
                        if (!response.ok) {
                            img.src = '';
                        } else {
                            img.src = movie.image_url;
                        }
                    })
                    .catch(() => {
                        img.src = '';
                    });
                img.alt = movie.title;
                img.dataset.index = movie.id;
                img.addEventListener('click', this.handleImageClick.bind(this));
                this.container.appendChild(img);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des données :', error);
            throw error; // Pour propager l'erreur à l'appelant
        }
    }

    handleImageClick(event) {
        const movieId = event.currentTarget.dataset.index;
        modalDisplay(movieId);
    }
}

// Instances des catégories

const categoryBestCarousel = new Carousel(
    '#category-best',
    'http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score'
);
const category1Carousel = new Carousel(
    '#category-1',
    'http://127.0.0.1:8000/api/v1/titles/?genre_contains=Adventure&sort_by=-imdb_score'
);
const category2Carousel = new Carousel(
    '#category-2',
    'http://127.0.0.1:8000/api/v1/titles/?genre_contains=Animation&sort_by=-imdb_score'
);
const category3Carousel = new Carousel(
    '#category-3',
    'http://127.0.0.1:8000/api/v1/titles/?genre_contains=Action&sort_by=-imdb_score'
);
