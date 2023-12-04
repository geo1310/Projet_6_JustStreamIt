import { bestMovieId, movieId } from './api.js';

const bestMovieTitle = document.querySelector(".best-movie-title" );
const bestMovieImage = document.querySelector(".best-movie-image" );
const bestMovieDescription1 = document.querySelector(".best-movie-description-1" );
const bestMovieDescription2 = document.querySelector(".best-movie-description-2" );



bestMovieId().then((id) => {
   
    movieId(id).then((bestMovie) => {

    bestMovieTitle.textContent = bestMovie.title
    bestMovieDescription1.textContent = bestMovie.description
    if(bestMovie.description != bestMovie.long_description){
        bestMovieDescription2.textContent = bestMovie.long_description
    }
    bestMovieImage.alt = bestMovie.title

    // verification de l url de l'image
    fetch(bestMovie.image_url)
    .then(response => {
        if (!response.ok) {
            bestMovieImage.src = "../../assets/images/image-not-found.jpg"
        } else {
            bestMovieImage.src = bestMovie.image_url;
        }
    })
    .catch(() => {
    bestMovieImage.src = "../../assets/images/image-not-found.jpg";
});

    }).catch(error =>{
        console.error("Erreur :", error)
    })
        
}).catch(error =>{
    console.error("Erreur :", error)
})

