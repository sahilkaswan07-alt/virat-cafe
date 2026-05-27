let cart = [];

function addtocart(name, price){

    cart.push({
        name: name,
        price: price
    });

    updatecart();
}

function updatecart(){

    let cartitems = document.getElementById("cart-items");

    let cartcount = document.getElementById("cart-count");

    let totalprice = document.getElementById("total");

    cartitems.innerHTML = "";

    let total = 0;

    cart.forEach((item) => {

        total += item.price;

        cartitems.innerHTML += `
            <p>${item.name} - ₹${item.price}</p>
        `;

    });

    cartcount.innerText = cart.length;

    totalprice.innerText = total;
}

 


function showcart(){

    let cartbox = document.getElementById("cart-box");

    if(cartbox.style.display === "block"){

        cartbox.style.display = "none";

    }else{

        cartbox.style.display = "block";
    }
}

function whatsapporder(){

    let total = 0;

     // Full Name
    let fullname = document.getElementById("fullname").value.trim();

    if(fullname.length < 2){
        alert("Please enter valid full name");
        return;
    }

    let tablenumber = prompt("Enter your table number");

    let message = "Hello, I want to order:%0A%0A";

    message += "Full Name : " + fullname + "%0A";

    message += "Table Number : " + tablenumber + "%0A%0A";

    cart.forEach((item) => {

        total += item.price;

        message += `${item.name} - ₹${item.price}%0A`;

    });

    message += `%0ATotal = ₹${total}`;

    let phone = "917300479727";

    let url = `https://wa.me/${phone}?text=${message}`;

    window.open(url, "_blank");
}



 