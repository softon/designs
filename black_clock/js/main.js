let clockFace = document.querySelector(".clock-face"); 
let secondsHandle = document.querySelector(".seconds"); 
let minutesHandle = document.querySelector(".minutes"); 
let hoursHandle = document.querySelector(".hours");

let timeObj = {
    hour: 0,
    minute: 0,
    second: 0
};



setInterval(function(){

    getTime();

    secondsHandle.style.transform = `translate(-50%, -50%) rotate(${((timeObj.second/60)*360)+90}deg)`;
    minutesHandle.style.transform = `translate(-50%, -50%) rotate(${((timeObj.minute/60)*360)+90}deg)`;
    hoursHandle.style.transform = `translate(-50%, -50%) rotate(${((timeObj.hour/12)*360)+90}deg)`;
    
}, 6000);










renderClock();



function renderClock(){

    let numNode = document.querySelector(".with-numbers");
    let increments = 30;
    for(let i=1; i<12 ; i++){
        let cloneNode = numNode.cloneNode(true);

        cloneNode.style.transform = `rotate(${increments}deg)`;
        cloneNode.lastElementChild.innerHTML = i;
        cloneNode.lastElementChild.style.transform = `rotate(-${increments}deg)`;

        clockFace.appendChild(cloneNode);
        increments += 30;
    }

    let woNumNode = document.querySelector(".without-numbers");
    increments = 6;
    for(let i=1; i<60 ; i++){
        let cloneNode = woNumNode.cloneNode(true);

        cloneNode.style.transform = `rotate(${increments}deg)`;
        
        clockFace.appendChild(cloneNode);
        increments += 6;
    }

    


}


function getTime(){
    let currTime = new Date();

    timeObj.second = currTime.getSeconds();
    timeObj.minute = currTime.getMinutes();
    timeObj.hour = currTime.getHours();
}


