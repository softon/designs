let circle = document.querySelector(".circle");
let timeHour = document.querySelector(".clock-time span:nth-child(1)");
let minuteHour = document.querySelector(".clock-time span:nth-child(3)");
let time;

var alarmSound = new Audio();
alarmSound.src = "sound/alarm.mp3";
alarmSound.loop = true;
let alarmMute = false;

let alarmTimeInput = document.getElementById("alarm-time");




const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];



setInterval(()=>{
  time = new Date();
  timeHour.innerHTML = get12HoursTime(time.getHours());
  minuteHour.innerHTML = (time.getMinutes()<10?'0':'') + time.getMinutes();
  setAmPm(time.getHours());

  let day = time.getDay();
  document.querySelector(".clock-days span").classList.remove("active");
  document.querySelector(".clock-days span:nth-child("+(day+1)+")").classList.add("active");
  //circle.style.setProperty('--dash', `calc( calc( calc(30vw * 2 * 3.14) / 60 ) * ${time}) calc( calc( calc(30vw * 2 * 3.14) / 60 ) * ${60 - time})`);
  circle.style.setProperty('stroke-dasharray', `calc( calc( calc(45% * 2 * 3.14) / 60 ) * ${time.getSeconds()}) calc( calc( calc(30vw * 2 * 3.14) / 60 ) * ${60 - time.getSeconds()})`);

  /* Clock Date */
  document.querySelector(".clock-date").innerHTML = time.getDate();
  document.querySelector(".clock-rem div:first-child").innerHTML = monthNames[time.getMonth()];
  document.querySelector(".clock-rem div:last-child").innerHTML = time.getFullYear();

  /* Alarm */
  
  if(alarmTimeInput.value){
    let alarmTime = new Date( new Date().toDateString() +" "+alarmTimeInput.value);
    let alarmTill = new Date(alarmTime.getTime());
    alarmTill.setMinutes(alarmTime.getMinutes()+1);
    if(time > alarmTime && time < alarmTill && !alarmMute){
        alarmSound.play();
        document.querySelector(".clock-time-holder").classList.add('ringing');
    }else{
        alarmSound.pause();
        document.querySelector(".clock-time-holder").classList.remove('ringing');
    }
  }
  
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

document.querySelector(".clock-sound-off").addEventListener('click', function(e){
    alarmMute = true;
    changeAlarmButtonState();
});

document.querySelector(".clock-sound-on").addEventListener('click', function(e){
    alarmMute = false;
    changeAlarmButtonState();
});

alarmTimeInput.addEventListener('change',function(e){
    alarmMute = false;
    changeAlarmButtonState();
});


function changeAlarmButtonState(){
    if(alarmMute){
        document.querySelector(".clock-sound-off").classList.add('active');
        document.querySelector(".clock-sound-on").classList.remove('active');

    }else{
        document.querySelector(".clock-sound-off").classList.remove('active');
        document.querySelector(".clock-sound-on").classList.add('active');

    }
}
