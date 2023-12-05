import { movieId } from './api.js';

// declaration variables
const modal = document.querySelector('.modal')
const titleModalText =document.getElementById('title-modal')
const modalBody = document.querySelector(".modal-body");
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");
let movie;

// ouverture et fermeture de la fenetre modale 
modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

export function modalDisplay(id){

    movieId(id).then((result) => {
        movie = result
        toggleModal()
    
    }).catch(error =>{
        console.error("Erreur :", error)
    })
    
}

// ouvre ou ferme la modale
function toggleModal(){
    modalContainer.classList.toggle("active")
if (modalContainer.classList.contains('active')){
    modal.setAttribute('aria-hidden', 'false')
    modal.setAttribute('aria-modal', 'true')
    document.body.style.overflow='hidden'
    modalContent1(movie)
}
else{
    modal.setAttribute('aria-hidden', 'true')
    modal.setAttribute('aria-modal', 'false')
    document.body.style.overflow=null
}
}

// creation du contenu de la modale
function modalContent1(movie){
        
    // creation de la modale
    modalBody.innerHTML="";
    titleModalText.innerText=movie.title
}

