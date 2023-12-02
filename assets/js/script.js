class Carousel {
    constructor(categorySelector) {
        this.nb_images = 10;
        this.left_button = document.querySelector(`${categorySelector} .button-left`);
        this.right_button = document.querySelector(`${categorySelector} .button-right`);
        this.container = document.querySelector(`${categorySelector} .container`);
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
        this.left_button.style.visibility = this.position <= -this.nb_images + 1 ? "hidden" : "visible";
        this.right_button.style.visibility = this.position === 0 ? "hidden" : "visible";
    }

    updatePosition(newPosition) {
        this.position = newPosition;
        this.container.style.transform = `translateX(${this.position * 195}px)`;
        this.container.style.transition = "all 1s ease";
        this.afficherMasquer();
    }

    setupImages() {
        this.container.style.width = `${40 * this.nb_images}%`;
        for (let i = 1; i <= this.nb_images; i++) {
            const div = document.createElement("div");
            div.className = "photo";
            div.style.backgroundImage = `url('./assets/images/movie${i}.jpg')`;
            div.dataset.index = i;
            div.addEventListener("click", this.handleImageClick.bind(this));
            this.container.appendChild(div);
        }
    }

    handleImageClick(event) {
        // Accéder à l'index de l'image à partir de l'attribut data
        const imageIndex = event.currentTarget.dataset.index;
        console.log(`Image cliquée : ${imageIndex}`);
    }
}



// Instances des catégories
const categoryBestCarousel = new Carousel("#category-best");
const category1Carousel = new Carousel("#category-1");
const category2Carousel = new Carousel("#category-2");
const category3Carousel = new Carousel("#category-3");
