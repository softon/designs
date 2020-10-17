let menuBtn = document.querySelector(".menu-btn");

menuBtn.addEventListener('click', function(e){
    let navMenu = document.querySelector('nav ul');
    navMenu.classList.toggle("show-menu");
});

let mainContent = document.querySelector("main");

mainContent.addEventListener('click', function(e){
    let navMenu = document.querySelector('nav ul');
    navMenu.classList.remove("show-menu");
});