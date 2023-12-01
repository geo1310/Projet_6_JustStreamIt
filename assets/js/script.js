/**/
let nb_images = 10
let position = 0
let left_button = document.querySelector(".button-left")
let right_button = document.querySelector(".button-right")
let container = document.querySelector(".container-best")

afficherMasquer()

document.body.onload=function(){
    container.style.width=(40*nb_images)+"%"
    for(let i=1; i<=nb_images; i++){
        let div = document.createElement("div")
        div.className = "photo"
        div.style.backgroundImage="url('./assets/images/image" + i + ".jpg')"
        container.appendChild(div)
    }
}
left_button.onclick=function(){
    if(position>-nb_images+1){
        position--
        container.style.transform = "translateX("+ position*10 + "%)"
        container.style.transition = "all 1s ease"
        afficherMasquer()
    }
}
right_button.onclick=function(){
    if(position<0){
        position++
        container.style.transform = "translateX("+ position*10 + "%)"
        container.style.transition = "all 1s ease"
        afficherMasquer()
    }
}
function afficherMasquer(){
    if(position <= -nb_images){
        left_button.style.visibility = "hidden"
    }
    else{
        left_button.style.visibility = "visible"
    }
    if(position == 0){
        right_button.style.visibility = "hidden"
    }
    else{
        right_button.style.visibility = "visible"
    }
}