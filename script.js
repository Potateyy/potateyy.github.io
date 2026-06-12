/* =========================
   THEME TOGGLE
========================= */

const themeToggle = document.getElementById("themeToggle");

if(themeToggle){

themeToggle.onclick = ()=>{

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

const navLinks =
document.getElementById("navLinks");

if(navLinks){
navLinks.classList.toggle("show");
}

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

if(!aboutSlides.length) return;

aboutSlides.forEach(slide=>{

slide.classList.remove("active");

});

aboutSlides[index]
.classList.add("active");

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
currentAbout = aboutSlides.length-1;
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

if(!section) return;

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
   REVIEWS
========================= */

const reviews =
document.querySelectorAll(".review");

const reviewDots =
document.querySelectorAll(".review-dot");

let currentReview = 0;

function showReview(index){

if(!reviews.length) return;

reviews.forEach(review=>{

review.classList.remove("active");

});

reviewDots.forEach(dot=>{

dot.classList.remove("active");

});

reviews[index]
.classList.add("active");

if(reviewDots[index]){
reviewDots[index]
.classList.add("active");
}

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
currentReview = reviews.length-1;
}

showReview(currentReview);

}

reviewDots.forEach((dot,index)=>{

dot.onclick = ()=>{

currentReview = index;

showReview(index);

};

});

if(reviews.length){

showReview(0);

setInterval(()=>{

nextReview();

},7000);

}

/* =========================
   COPY POPUP
========================= */

const popup =
document.getElementById("copyPopup");

function showPopup(message){

if(!popup) return;

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

})

.catch(()=>{

alert(
"Discord: potateyy"
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

})

.catch(()=>{

alert(
"Email: potateyy1@outlook.com"
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