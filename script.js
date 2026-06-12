/* =========================
   THEME TOGGLE
========================= */

const themeToggle = document.getElementById("themeToggle");

if(themeToggle){

    themeToggle.onclick = () => {

        document.body.classList.toggle("light-mode");

        themeToggle.innerHTML =
        document.body.classList.contains("light-mode")
        ? "☀️"
        : "🌙";

    };

}


/* =========================
   MOBILE MENU
========================= */

function toggleMenu(){

    document
    .getElementById("navLinks")
    .classList.toggle("show");

}


/* =========================
   TYPING EFFECT
========================= */

const typing =
document.getElementById("typing");

const text =
"Potateyy";

let charIndex = 0;

function type(){

    if(charIndex < text.length){

        typing.innerHTML +=
        text.charAt(charIndex);

        charIndex++;

        setTimeout(type,100);

    }

}

if(typing){

    type();

}


/* =========================
   ABOUT CAROUSEL
========================= */

const aboutSlides =
document.querySelectorAll(".about-slide");

let currentAbout = 0;

function showAbout(index){

    aboutSlides.forEach(slide=>{

        slide.classList.remove("active");

    });

    aboutSlides[index].classList.add("active");

}

function nextAbout(){

    currentAbout++;

    if(currentAbout >= aboutSlides.length){

        currentAbout = 0;

    }

    showAbout(currentAbout);

}

function prevAbout(){

    currentAbout--;

    if(currentAbout < 0){

        currentAbout =
        aboutSlides.length-1;

    }

    showAbout(currentAbout);

}


/* =========================
   EXPERIENCE BUTTON
========================= */

function toggleExperience(){

    const section =
    document.getElementById("extraExperience");

    const buttonText =
    document.getElementById("buttonText");

    const arrow =
    document.getElementById("arrow");

    section.classList.toggle("show");

    if(section.classList.contains("show")){

        buttonText.innerHTML =
        "View Less Experience";

        arrow.innerHTML = "▲";

    }

    else{

        buttonText.innerHTML =
        "View More Experience";

        arrow.innerHTML = "▼";

    }

}


/* =========================
   GALLERY
========================= */

const galleryImages=[

"images/setup1.png",
"images/setup2.png",
"images/setup3.png",
"images/setup4.png",
"images/setup5.png",
"images/setup6.png",
"images/setup7.png",
"images/setup8.png",
"images/setup9.png",
"images/setup10.png",
"images/setup11.png",
"images/setup12.png",
"images/setup13.png"

];

const galleryTitles=[

"Ticket System Setup",
"Applications",
"Role Connections",
"Advanced Roles",
"Member Roles",
"Custom Messages",
"Ticket Panels",
"Staff Commands",
"Staff Hub",
"Staff Updates",
"Ticket Embed System",
"Honeypot Security",
"Welcome System"

];

const gallery =
document.getElementById("galleryImage");

const galleryTitle =
document.getElementById("galleryTitle");

const galleryDots =
document.querySelectorAll(".gallery-dot");

let currentImage = 0;

function showImage(index){

    currentImage = index;

    if(gallery){
        gallery.src = galleryImages[index];
    }

    if(galleryTitle){
        galleryTitle.innerHTML = galleryTitles[index];
    }

    if(galleryDots.length){

        galleryDots.forEach(dot=>{
            dot.classList.remove("active");
        });

        galleryDots[index].classList.add("active");

    }

}

function nextImage(){

    currentImage++;

    if(currentImage >= galleryImages.length){

        currentImage = 0;

    }

    showImage(currentImage);

}

function prevImage(){

    currentImage--;

    if(currentImage < 0){

        currentImage =
        galleryImages.length-1;

    }

    showImage(currentImage);

}

galleryDots.forEach((dot,index)=>{

    dot.onclick = ()=>{

        showImage(index);

    };

});

if(gallery){

    showImage(0);

    setInterval(nextImage,8000);

}


/* =========================
   REVIEWS
========================= */

const reviews =
document.querySelectorAll(".review");

const reviewDots =
document.querySelectorAll(".review-dot");

let currentReview = 0;

function showReview(index){

    reviews.forEach(review=>{

        review.classList.remove("active");

    });

    reviewDots.forEach(dot=>{

        dot.classList.remove("active");

    });

    reviews[index]
    .classList.add("active");

    reviewDots[index]
    .classList.add("active");

}

function nextReview(){

    currentReview++;

    if(currentReview >= reviews.length){

        currentReview = 0;

    }

    showReview(currentReview);

}

function prevReview(){

    currentReview--;

    if(currentReview < 0){

        currentReview =
        reviews.length-1;

    }

    showReview(currentReview);

}

reviewDots.forEach((dot,index)=>{

    dot.onclick = ()=>{

        currentReview = index;

        showReview(index);

    };

});

showReview(0);

setInterval(nextReview,7000);


/* =========================
   COPY POPUP
========================= */

const popup =
document.getElementById("copyPopup");

function showPopup(message){

    popup.innerHTML = message;

    popup.classList.add("show");

    setTimeout(()=>{

        popup.classList.remove("show");

    },2000);

}


/* =========================
   COPY BUTTONS
========================= */

function copyDiscord(){

    navigator.clipboard
    .writeText("potateyy")

    .then(()=>{

        showPopup(
        "✓ Discord copied!"
        );

    });

}

function copyEmail(){

    navigator.clipboard
    .writeText(
    "potateyy1@outlook.com"
    )

    .then(()=>{

        showPopup(
        "✓ Email copied!"
        );

    });

}


/* =========================
   SMOOTH SCROLL
========================= */

document
.querySelectorAll('a[href^="#"]')

.forEach(anchor=>{

    anchor.addEventListener(

    "click",

    function(e){

        e.preventDefault();

        const target =
        document.querySelector(
        this.getAttribute("href")
        );

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});