let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products =[];
let cart =[];


iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');

})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

    const addDataToHTML = () => {
    // remove datas default from HTML

        // add new datas
        if(products.length > 0) // if has data
        {
            products.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('item');
                newProduct.innerHTML = 
                `<img src="${product.img}" alt="" class="img-fluid">
                <h2 class="title">${product.name}</h2>
                <h2 class="card-text">${product.description}</h2>
                <h2>${product.category}</h2>

                <div class="price card-text">${product.price}$</div>
                <button class="btn btn-pay addCart">Add To Cart</button>`;
                listProductHTML.appendChild(newProduct);
            });
        }
    }
    listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);
        }
    })
const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if(cart.length <= 0){
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    }else if(positionThisProductInCart < 0){
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}
const addCartToMemory = () => {
    localStorage.setItem('cat-cart', JSON.stringify(cart));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    let totalCart=0;
    let totalname=" ";
    if(cart.length > 0){
        cart.forEach(item => {
            totalQuantity = totalQuantity +  item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            let total=info.price * item.quantity;
            let totalpros=info.name;
            totalCart += total;
            totalname += totalpros+" "+"&"+" ";
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
            <div class="img">
                    <img src="${info.img}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
        })
    }
    let newprice = document.createElement('div');
        listCartHTML.appendChild(newprice);
        newprice.innerHTML = `<div class="totalPrice1" id="totalp">total price is: ${totalCart}$</div> 
        <div class="totalnames1" id="totalnames"> <p>${totalname}</p> </div> `;
    iconCartSpan.innerText = totalQuantity;
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
        
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                }else{
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}

const initApp = () => {
    // get data product
    fetch('json/cat.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();

        // get data cart from memory
        if(localStorage.getItem('cat-cart')){
            cart = JSON.parse(localStorage.getItem('cat-cart'));
            addCartToHTML();
        }
    })
}
initApp();
function pay(){
    let pay=document.getElementById("pay");
    let list=document.getElementById("listsection");
    list.style.display="none";
    pay.style.display="block";
    let price = document.getElementById("pricepay");
    let pronames= document.getElementById("prosname");
    let totalnam=document.getElementById("totalnames");
    let totalp=document.getElementById("totalp");
    price.innerHTML=totalp.innerText;
    pronames.innerHTML=totalnam.innerText;
    let pricecre = document.getElementById("pricecredit");
    let pronamescr= document.getElementById("prosnamecredit");
    pricecre.innerHTML=totalp.innerText;
    pronamescr.innerHTML=totalnam.innerText;

}



