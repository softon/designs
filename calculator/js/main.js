let display = document.querySelector(".display");

let buttons = document.querySelectorAll(".buttons");

display.innerText = 0;

buttons.forEach(function(ele){
    ele.addEventListener('click', function(e){
        let t = e.target.innerText;
        if(t=='C'){
            display.innerHTML = 0;
        }else if(t=='='){
            display.innerHTML = eval(display.innerHTML);
        }else{
            if(display.innerHTML=='0'){
                display.innerHTML = '';
            }
            display.innerHTML += t;
        }
    });
});