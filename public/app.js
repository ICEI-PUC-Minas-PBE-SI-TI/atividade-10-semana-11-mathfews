const destaques = [...catalogo]
    .sort((a, b) => b.nota - a.nota)
    .slice(0, 3);

const track = document.getElementById("carousel-track");
const nav = document.getElementById("carousel-nav");

destaques.forEach((movie, index) => {
    const slide = document.createElement("div");
    slide.classList.add("carousel-slide");
    if (index === 0) slide.classList.add("active");
    const limitedDesc = movie.descricao.length > 250 
        ? movie.descricao.substring(0, 250) + "..." 
        : movie.descricao;
        
    const genresList = movie.generos.map(g => g.charAt(0).toUpperCase() + g.slice(1)).join(", ");
    
    slide.innerHTML = `
        <div class="slide-content">
            <a class="slide-title" href="detalhes.html?id=${movie.id}">${movie.titulo}</a>
            <div class="slide-meta">
                <span class="slide-year">${movie.ano}</span>
                <span class="slide-genres">${genresList}</span>
                <span class="slide-rating">
                    <svg class="star-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                    ${movie.nota}
                </span>
            </div>
            <p class="slide-description">${limitedDesc}</p>        
        </div>
        <div class="slide-image-container">
            <div class="slide-gradient-overlay"></div>
            <img class="slide-image" src="${movie.capa}" alt="${movie.titulo}">
        </div>
    `;
    track.appendChild(slide);
    const dot = document.createElement("button");
    dot.classList.add("carousel-dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
        goToSlide(index);
    });
    nav.appendChild(dot);
});

let currentSlideIndex = 0;
const slides = document.querySelectorAll(".carousel-slide");
const dots = document.querySelectorAll(".carousel-dot");

function updateCarousel() {
    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === currentSlideIndex);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentSlideIndex);
    });
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    updateCarousel();
}

function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    updateCarousel();
}

function goToSlide(index) {
    currentSlideIndex = index;
    updateCarousel();
}

document.getElementById("next-btn").addEventListener("click", nextSlide);
document.getElementById("prev-btn").addEventListener("click", prevSlide);
const card_section = document.querySelector(".card-section");

function createCard(obj) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <img src="${obj.capa}" alt="${obj.titulo}">
        <p>${obj.titulo}</p>
    `;
    card.addEventListener("click", () => {
        window.location.href = `detalhes.html?id=${obj.id}`;
    });
    card_section.appendChild(card);
}

catalogo.forEach((filme) => {
    createCard(filme);
});