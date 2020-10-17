import { products } from './products.js';

let product_div = document.querySelector(".products");

let cart_total = 0;
let discounted_amount = 0;
let tax_percent = 5;
let cart_items = [];
let coupons = [
    {
        code: '1111',
        discount: 50,
        validity: '2020-10-25'
    },
    {
        code: '0000',
        discount: 20,
        validity: '2020-08-15'
    }
];

products.forEach(function(product){
    addNewProduct(product_div, product);
});

let buttons = document.querySelectorAll(".pcard button");

buttons.forEach(function(button){
    button.addEventListener('click', function(e){
        let product = products.find(function(x){
            return x.id == e.target.dataset.id;
        });
        let cart_prod = cart_items.findIndex(function(x){
            return x.id == e.target.dataset.id;
        })
        console.log(cart_items, cart_prod);
        if(cart_prod<0){
            let cart_prod = {
                id: product.id,
                title: product.title,
                amount: product.amount,
                quantity: 1,
            };
            cart_items.push(cart_prod);
        }else{
            cart_items[cart_prod].quantity++;
        }
        
        
        populateCart();
    });
});

function populateCart(){
    let tbody = document.querySelector(".cart tbody");
    tbody.innerHTML = '';
    if(cart_items.length <=0){
        tbody.innerHTML = "<tr><td colspan=\"5\">No items in the Cart</td></tr>";
    }
    cart_total = 0;
    cart_items.forEach(function(item){
        cart_total += item.amount * item.quantity;
        tbody.innerHTML += `<tr>
                                <td>${item.id}</td>
                                <td>${item.title}</td>
                                <td>${item.amount}</td>
                                <td>${item.quantity}</td>
                                <td>${item.amount * item.quantity}</td>
                            </tr>`;

        
    });

    let total = document.querySelector(".cart tfoot tr th:nth-child(2)");
    total.innerHTML = cart_total;

    let discount = document.getElementById("discount");
    discount.innerText = discounted_amount;

    let tax = document.getElementById("tax");
    tax.innerText = ((cart_total - discounted_amount) * tax_percent)/100;

    let grand_total = document.getElementById("grand-total");
    grand_total.innerText = cart_total - discounted_amount + parseInt(tax.innerText);
}

populateCart();

function addNewProduct(product_div, product){
    let pcard = document.createElement("div");
    pcard.classList.add("pcard");

    let img = document.createElement("img");
    img.setAttribute('src',"https://via.placeholder.com/100");
    pcard.appendChild(img);

    let h2 = document.createElement("h2");
    h2.innerHTML = product.title;
    pcard.appendChild(h2);

    let h3 = document.createElement("h3");
    h3.innerHTML = "Rs. " + product.amount;
    pcard.appendChild(h3);

    let p = document.createElement("p");
    p.innerHTML = product.weight;
    pcard.appendChild(p);

    let button = document.createElement("button");
    button.innerHTML = "+ Add to Cart";
    button.setAttribute('data-id',product.id);
    pcard.appendChild(button);

    product_div.appendChild(pcard);
}


let discount_form = document.getElementById("discount-form");

discount_form.addEventListener('submit', function(e){
    e.preventDefault();
    let coupon = e.target.discount.value;

    let found_coupon = coupons.find(function(x) {
        return x.code == coupon;
    });
    
    if(found_coupon == undefined){
        alert("Error! Invalid Coupon");
    }else if(new Date() > new Date(found_coupon.validity)){
        alert("Error! Coupon Expired");
    }else{
        alert("Congratulations!!! A discount coupon of "+found_coupon.discount+"% is applied.");
        discounted_amount = (cart_total * found_coupon.discount)/100;
        populateCart();
    }
});