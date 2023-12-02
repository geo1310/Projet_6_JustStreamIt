/**/
const nb_images = 10
const left_button = document.querySelector(".button-left")
const right_button = document.querySelector(".button-right")
const container = document.querySelector(".container-best")
let position = 0

afficherMasquer()

left_button.onclick=function(){
    if(position>-nb_images+1){
        updatePosition(position-1)
    }
}
right_button.onclick=function(){
    if(position<0){
        updatePosition(position+1)
    }
}

function afficherMasquer(){
    left_button.style.visibility = position <= -nb_images+1 ? "hidden" : "visible"
    right_button.style.visibility = position == 0 ? "hidden" : "visible"
}

function updatePosition(newPosition){
    position = newPosition
    container.style.transform = "translateX("+ position*195 + "px)"
    container.style.transition = "all 1s ease"
    afficherMasquer()
}

document.addEventListener("DOMContentLoaded", function(){
    container.style.width=(40*nb_images)+"%"
    for(let i=1; i<=nb_images; i++){
        let div = document.createElement("div")
        div.className = "photo"
        div.style.backgroundImage="url('./assets/images/image" + i + ".jpg')"
        container.appendChild(div)
    }
})