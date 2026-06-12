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
   THEME TOGGLE
========================= */

const themeToggle =
document.getElementById("themeToggle");

if(themeToggle){

themeToggle.onclick=()=>{

document.body.classList.toggle("light-mode");

if(document.body.classList.contains("light-mode")){

themeToggle.innerHTML="☀️";

localStorage.setItem(
"theme",
"light"
);

}

else{

themeToggle.innerHTML="🌙";

localStorage.setItem(
"theme",
"dark"
);

}

};

if(localStorage.getItem("theme")==="light"){

document.body.classList.add(
"light-mode"
);

themeToggle.innerHTML="☀️";

}

}

/* =========================
   TYPING EFFECT
========================= */

const typing =
document.getElementById("typing");

if(typing){

const words=[
"Potateyy"
];

let wordIndex=0;
let charIndex=0;
let deleting=false;

function type(){

const currentWord=
words[wordIndex];

if(!deleting){

typing.innerHTML=
currentWord.substring(
0,
charIndex+1
);

charIndex++;

if(charIndex===currentWord.length){

deleting=true;

setTimeout(type,20000);

return;

}

}

else{

typing.innerHTML=
currentWord.substring(
0,
charIndex-1
);

charIndex--;

if(charIndex===0){

deleting=false;

wordIndex++;

if(wordIndex>=words.length){

wordIndex=0;

}

}

}

setTimeout(
type,
deleting?60:100
);

}

type();

}

/* =========================
   ABOUT CAROUSEL
========================= */

const aboutSlides =
document.querySelectorAll(
".about-slide"
);

let currentAbout=0;

function showAbout(index){

if(!aboutSlides.length) return;

aboutSlides.forEach(slide=>{

slide.classList.remove(
"active"
);

});

aboutSlides[index]
.classList.add("active");

}

function nextAbout(){

currentAbout++;

if(currentAbout>=aboutSlides.length){

currentAbout=0;

}

showAbout(currentAbout);

}

function prevAbout(){

currentAbout--;

if(currentAbout<0){

currentAbout=
aboutSlides.length-1;

}

showAbout(currentAbout);

}

if(aboutSlides.length){

showAbout(0);

}

/* =========================
   REVIEWS
========================= */

const reviews =
document.querySelectorAll(
".review"
);

let currentReview=0;

function showReview(index){

if(!reviews.length) return;

reviews.forEach(review=>{

review.classList.remove(
"active"
);

});

reviews[index]
.classList.add("active");

}

function nextReview(){

currentReview++;

if(currentReview>=reviews.length){

currentReview=0;

}

showReview(currentReview);

}

function prevReview(){

currentReview--;

if(currentReview<0){

currentReview=
reviews.length-1;

}

showReview(currentReview);

}

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
document.getElementById(
"copyPopup"
);

function showPopup(message){

if(!popup) return;

popup.innerHTML=message;

popup.classList.add("show");

setTimeout(()=>{

popup.classList.remove(
"show"
);

},2000);

}

/* =========================
   COPY FUNCTIONS
========================= */

function fallbackCopy(text){

const textArea =
document.createElement(
"textarea"
);

textArea.value=text;

document.body.appendChild(
textArea
);

textArea.select();

document.execCommand(
"copy"
);

document.body.removeChild(
textArea
);

}

function copyDiscord(){

const text="potateyy";

if(
navigator.clipboard &&
navigator.clipboard.writeText
){

navigator.clipboard
.writeText(text)

.then(()=>{

showPopup(
"✓ Discord copied!"
);

})

.catch(()=>{

fallbackCopy(text);

showPopup(
"✓ Discord copied!"
);

});

}

else{

fallbackCopy(text);

showPopup(
"✓ Discord copied!"
);

}

}

function copyEmail(){

const text=
"potateyy1@outlook.com";

if(
navigator.clipboard &&
navigator.clipboard.writeText
){

navigator.clipboard
.writeText(text)

.then(()=>{

showPopup(
"✓ Email copied!"
);

})

.catch(()=>{

fallbackCopy(text);

showPopup(
"✓ Email copied!"
);

});

}

else{

fallbackCopy(text);

showPopup(
"✓ Email copied!"
);

}

}

/* =========================
   SMOOTH SCROLL
========================= */

document
.querySelectorAll(
'a[href^="#"]'
)

.forEach(anchor=>{

anchor.addEventListener(
"click",

function(e){

e.preventDefault();

const target=
document.querySelector(
this.getAttribute("href")
);

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

}

);

});

function toggleExperience(){

const section =
document.getElementById(
"extraExperience"
);

const text =
document.getElementById(
"buttonText"
);

const arrow =
document.getElementById(
"arrow"
);

if(!section) return;

section.classList.toggle("show");

if(section.classList.contains("show")){

text.innerHTML =
"View Less Experience";

arrow.innerHTML =
"▲";

}
else{

text.innerHTML =
"View More Experience";

arrow.innerHTML =
"▼";

}

}