/* Section Meilleur Film */

import { bestMovieId, movieId } from './api.js';
import { modalDisplay } from './modal.js';

const bestMovieTitle = document.querySelector('.best-movie-title');
const bestMovieImage = document.querySelector('.best-movie-image');
const bestMovieDescription = document.querySelector('.best-movie-description');

bestMovieImage.addEventListener('click', () => {
    modalDisplay(bestMovieImage.dataset.index);
});

// recuperation de l'id du meilleur film
bestMovieId()
    .then((id) => {
        // recuperation des donnees avec l id du film
        movieId(id)
            .then((bestMovie) => {
                bestMovieTitle.textContent = bestMovie.title;
                bestMovieDescription.textContent = bestMovie.long_description;
                bestMovieImage.alt = bestMovie.title;
                bestMovieImage.dataset.index = bestMovie.id;

                // verification de l url de l'image
                fetch(bestMovie.image_url)
                    .then((response) => {
                        if (!response.ok) {
                            bestMovieImage.src =
                                '../../assets/images/image-not-found.jpg';
                        } else {
                            bestMovieImage.src = bestMovie.image_url;
                        }
                    })
                    .catch(() => {
                        bestMovieImage.src =
                            '../../assets/images/image-not-found.jpg';
                    });
            })
            .catch((error) => {
                console.error('Erreur :', error);
            });
    })
    .catch((error) => {
        console.error('Erreur :', error);
    });
