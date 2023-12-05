// declaration variables
const modal = document.querySelector('.modal')
const titleModalText =document.getElementById('title-modal')
const modalBody = document.querySelector(".modal-body");
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

// ouverture et fermeture de la fenetre modale 
modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

export function toggleModal(movieId){
    
    modalContainer.classList.toggle("active")
    if (modalContainer.classList.contains('active')){
        modal.setAttribute('aria-hidden', 'false')
        modal.setAttribute('aria-modal', 'true')
        document.body.style.overflow='hidden'
        modalContent1()
    }
    else{
        modal.setAttribute('aria-hidden', 'true')
        modal.setAttribute('aria-modal', 'false')
        document.body.style.overflow=null
    }

    function modalContent1(){
        
        // creation de la modale

        modalBody.innerHTML="";
        titleModalText.innerText=movieId
    }
}

