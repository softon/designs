let display = document.querySelector(".display");
let keyc = document.querySelector(".key-c");
let keyper = document.querySelector(".key-per");
let keydiv = document.querySelector(".key-div");
let key7 = document.querySelector(".key-7");
let key8 = document.querySelector(".key-8");
let key9 = document.querySelector(".key-9");
let keymul = document.querySelector(".key-mul");
let key4 = document.querySelector(".key-4");
let key5 = document.querySelector(".key-5");
let key6 = document.querySelector(".key-6");
let keysub = document.querySelector(".key-sub");
let key1 = document.querySelector(".key-1");
let key2 = document.querySelector(".key-2");
let key3 = document.querySelector(".key-3");
let keyadd = document.querySelector(".key-add");
let key0 = document.querySelector(".key-0");
let keydot = document.querySelector(".key-dot");
let keyeq = document.querySelector(".key-eq");

let buttons = document.querySelectorAll(".buttons");

let accumulator = '';
let number = 0;
let operation = '';

display.innerText = 0;

buttons.forEach(function(ele){
    ele.addEventListener('click', function(e){
        let t = e.target.innerText;
        if((t>='0' && t<='9') || t=='.'){
            accumulator += t;
            display.innerText = accumulator;
        }else if(t=='C'){
            accumulator = '0';
            display.innerText = accumulator;
        }else if(t=='+'){
            number += parseFloat(accumulator);
            accumulator = '';
            display.innerText = '+';
        }else if(t=='-'){
            number -= parseFloat(accumulator);
            accumulator = '';
            display.innerText = '-';
        }else if(t=='*'){
            number *= parseFloat(accumulator);
            accumulator = '';
            display.innerText = '*';
        }else if(t=='/'){
            number /= parseFloat(accumulator);
            accumulator = '';
            display.innerText = '/';
        }else if(t=='='){
            accumulator = parseFloat(accumulator) + number;
            display.innerText = accumulator;
        }
    });
});