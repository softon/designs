let circle = document.querySelector(".circle");
let timeHour = document.querySelector(".clock-time span:nth-child(1)");
let minuteHour = document.querySelector(".clock-time span:nth-child(3)");
let time;



setInterval(()=>{
  time = new Date();
  timeHour.innerHTML = get12HoursTime(time.getHours());
  minuteHour.innerHTML = time.getMinutes();
  setAmPm(time.getHours());
  //circle.style.setProperty('--dash', `calc( calc( calc(30vw * 2 * 3.14) / 60 ) * ${time}) calc( calc( calc(30vw * 2 * 3.14) / 60 ) * ${60 - time})`);
  circle.style.setProperty('stroke-dasharray', `calc( calc( calc(45% * 2 * 3.14) / 60 ) * ${time.getSeconds()}) calc( calc( calc(30vw * 2 * 3.14) / 60 ) * ${60 - time.getSeconds()})`);
},1000);


function get12HoursTime(hours) {
    hours = hours % 12;
    hours = hours ? hours : 12; 
    return hours;
}

function setAmPm(hours) { 
    let pm = document.querySelector(".clock_pm");
    let am = document.querySelector(".clock_am");
    if(hours >= 12){
        am.classList.remove('active');
        pm.classList.add('active');
    }else{
        am.classList.add('active');
        pm.classList.remove('active');
    }
}