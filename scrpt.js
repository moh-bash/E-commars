let productsbox = document.getElementById("products");
let searchInput = document.getElementById("serch");
let products = [];

fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then(data => {
    products = data.products;
    Products(products); 
  });


function Products(productList) {
    productsbox.innerHTML = ""; 
    productList.forEach(product => {
    const item = document.createElement("div");
    item.className = "mx-auto w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-900 dark:border-gray-700";
    item.innerHTML = `
        <a href="#">
            <img class="p-8 rounded-t-lg h-44 mx-auto" src="${product.thumbnail}" alt="product image" />
        </a>
        <div class="px-5 pb-5">
            <a href="#">
            <h5 class="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">${product.title}</h5>
            </a>
            <div class="flex items-center mt-2.5 mb-5">
            <div class="flex items-center space-x-1 rtl:space-x-reverse">
                <i class="fa-solid fa-star w-3 h-3 text-yellow-300"></i>
                <i class="fa-solid fa-star w-3 h-3 text-yellow-300"></i>
                <i class="fa-solid fa-star w-3 h-3 text-yellow-300"></i>
                <i class="fa-solid fa-star w-3 h-3 text-yellow-300"></i>
                <i class="fa-solid fa-star w-3 h-3 text-gray-200"></i>
            </div>
            <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">${product.dimensions?.width || ''}</span>
            </div>
            <div class="flex items-center justify-between">
            <span class="text-2xl font-bold text-gray-900 dark:text-white">$ ${product.price}</span>
            <a href="#" class="text-white bg-lime-500 hover:bg-lime-500 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800">Add to cart</a>
            </div>
        </div> `
    ;
    productsbox.appendChild(item);
  });
}

// دالة البحث
searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const filtere = products.filter(product =>
    product.title.toLowerCase().includes(query)
  );
  Products(filtere);
});

// shoopp
 function shoopp() {
  let car = document.getElementById("select-modal");
  car.classList.toggle("hidden")
}
// cloos shoopp
function closss(){
    let x =document.getElementById("select-modal");
    x.classList.toggle("hidden")
}


// favorite
 function favorite() {
  let mnu = document.getElementById("select-favorite");
  mnu.classList.toggle("hidden")
}
// cloos favorite
function clossf(){
    let x =document.getElementById("select-favorite");
    x.classList.toggle("hidden")
}


// add producte
function addpro(){
    let add = document.getElementById("addprobutt");
    add.classList.toggle("hidden")
}
// cloos add producte
function closadd(){
    let x =document.getElementById("addprobutt");
    x.classList.toggle("hidden")
}