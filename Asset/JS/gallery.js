const track = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".slide");
const containergallery = document.querySelector(".slider-container");

const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let index = 0;
let slideWidth = slides[0].offsetWidth;

function updateSlide(){
track.style.transform = `translateX(${-index * slideWidth}px)`;
}

next.onclick = () =>{
if(index < slides.length - 3){
index++;
updateSlide();
}
}

prev.onclick = () =>{
if(index > 0){
index--;
updateSlide();
}
}

window.addEventListener("resize",()=>{
slideWidth = slides[0].offsetWidth;
updateSlide();
});


// DRAG SYSTEM

let isDragging = false;
let startX;
let scrollStart;

containergallery.addEventListener("mousedown",(e)=>{
isDragging = true;
startX = e.pageX;
scrollStart = index;
containergallery.style.cursor = "grabbing";
});

containergallery.addEventListener("mouseup",()=>{
isDragging = false;
containergallery.style.cursor = "grab";
});

containergallery.addEventListener("mouseleave",()=>{
isDragging = false;
});

containergallery.addEventListener("mousemove",(e)=>{

if(!isDragging) return;

let move = e.pageX - startX;

if(move > 100){
index = Math.max(index-1,0);
updateSlide();
isDragging=false;
}

if(move < -100){
index = Math.min(index+1,slides.length-3);
updateSlide();
isDragging=false;
}

});


// TOUCH SWIPE (Mobile)

containergallery.addEventListener("touchstart",(e)=>{
startX = e.touches[0].clientX;
});

containergallery.addEventListener("touchend",(e)=>{

let endX = e.changedTouches[0].clientX;
let diff = startX - endX;

if(diff > 50){
index = Math.min(index+1,slides.length-3);
}

if(diff < -50){
index = Math.max(index-1,0);
}

updateSlide();

});
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxVideo = document.getElementById("lightbox-video");
const closeBtn = document.querySelector(".close");

// IMAGE CLICK
document.querySelectorAll(".slide img").forEach(img => {
    img.addEventListener("click", () => {

        lightbox.style.display = "flex";

        lightboxImg.style.display = "block";
        lightboxVideo.style.display = "none";

        lightboxImg.src = img.src;
    });
});

// VIDEO CLICK
document.querySelectorAll(".slide video").forEach(video => {
    video.addEventListener("click", () => {

        lightbox.style.display = "flex";

        lightboxVideo.style.display = "block";
        lightboxImg.style.display = "none";

        lightboxVideo.src = video.src;
        lightboxVideo.play();
    });
});

// CLOSE
closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
    lightboxVideo.pause();
});
