/* Affichage de la fenetre modale d'un film */

import { movieId } from './api.js';

// declaration variables
const modal = document.querySelector('.modal');
const modalContainer = document.querySelector('.modal-container');
const modalTriggers = document.querySelectorAll('.modal-trigger');

let movie;
const movieTitle = document.querySelector('.movie-title');
const movieImage = document.querySelector('.movie-image');
const movieDescription = document.querySelector('.movie-description');
const movieGenres = document.querySelector('.movie-genres');
const movieRealisation = document.querySelector('.movie-realisation');
const movieRating = document.querySelector('.movie-rating');

modalTriggers.forEach((trigger) =>
    trigger.addEventListener('click', toggleModal)
);

export function modalDisplay(id) {
    movieId(id)
        .then((result) => {
            movie = result;
            toggleModal();
        })
        .catch((error) => {
            console.error('Erreur :', error);
        });
}

// ouvre ou ferme la modale
function toggleModal() {
    modalContainer.classList.toggle('active');
    if (modalContainer.classList.contains('active')) {
        modal.setAttribute('aria-hidden', 'false');
        modal.setAttribute('aria-modal', 'true');
        document.body.style.overflow = 'hidden';
        modalContent1(movie);
    } else {
        modal.setAttribute('aria-hidden', 'true');
        modal.setAttribute('aria-modal', 'false');
        document.body.style.overflow = null;
    }
}

// creation du contenu de la modale
function modalContent1(movie) {
    // creation du contenu de la modale
    movieTitle.innerText = movie.title;

    // verification de l url de l'image
    fetch(movie.image_url)
        .then((response) => {
            if (!response.ok) {
                movieImage.src = '../../assets/images/image-not-found.jpg';
            } else {
                movieImage.src = movie.image_url;
            }
        })
        .catch(() => {
            movieImage.src = '../../assets/images/image-not-found.jpg';
        });

    movieImage.src = movie.image_url;
    movieDescription.innerText = movie.description;

    // genres
    movieGenres.innerHTML = '';
    for (const genre of movie.genres) {
        const genreSpan = document.createElement('span');
        genreSpan.innerText = genre;
        genreSpan.className = 'movie-genre';
        movieGenres.appendChild(genreSpan);
    }

    // realisation
    movieRealisation.innerHTML = `
    <p><strong>Réalisateur :</strong> ${movie.directors}</p>
    <p>Pays :   ${movie.countries}</p>
    <p>Année :  ${movie.year}</p>
    <p>Durée :  ${movie.duration} Minutes</p>
    <p>Acteurs : ${movie.actors}</p>
    `;
    // rating
    movieRating.innerHTML = `
    <p>IMDB : ${movie.imdb_score}</p>
    <p>Rated : ${movie.rated}</p>
    <p>Box-Office : ${movie.votes}</p>
    `;
}
