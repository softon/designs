let display = document.querySelector(".display-ele");

display.innerHTML = 0;

let buttons = document.querySelectorAll(".btn");

buttons.forEach(function(button){
    button.addEventListener('click', function(e){
        if(e.target.innerHTML=='C'){
            display.innerHTML = 0;
        }else if(e.target.innerHTML=='='){
            display.innerHTML = eval(display.innerHTML);
        }else{
            if(display.innerHTML=='0'){
                display.innerHTML = '';
            }
            display.innerHTML += e.target.innerHTML;
        }
    });
});