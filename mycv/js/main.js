let hamburger = document.querySelector(".hamburger");
let closeMenu = document.querySelector(".close-modal");
let navMenu = document.querySelector("nav");

hamburger.addEventListener("click",function(e){
    navMenu.classList.add("modal-open");
});
closeMenu.addEventListener("click",function(e){
    navMenu.classList.remove("modal-open");
});