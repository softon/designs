let minuteTick = document.querySelector(".minute");
let hourTick = document.querySelector(".hour");
let secondTick = document.querySelector(".second");



let minute = 0; 
let hour = 0; 
let second = 0; 

setInterval(function (){
    getTime();
    secondTick.style.transform = `translate(-50%, -50%) rotate(${((second/60)*360)+90}deg)`;
    minuteTick.style.transform = `translate(0, -50%) rotate(${((minute/60)*360)+270}deg)`;
    hourTick.style.transform = `translate(0, -50%) rotate(${((hour/12)*360)+270}deg)`;
    if(second==0){
        secondTick.style.transition = '0ms';
    }else{
        secondTick.style.transition = '500ms ease-in-out';
    }
}, 1000);


function getTime(){
    let timeNow = new Date();
    minute = timeNow.getMinutes(); 
    hour = timeNow.getHours(); 
    second = timeNow.getSeconds(); 
}