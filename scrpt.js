let productsbox = document.getElementById("products");
let searchInput = document.getElementById("serch");
let products = [];

fetch("https://furniture-api.fly.dev/v1/products")
  .then((res) => res.json())
  .then((response) => {
    products = response.data; 
    console.log("Products:", products);
    Products(products); 
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

function Products(productList) {
  productsbox.innerHTML = "";
  productList.forEach((product) => {
    const item = document.createElement("div");
    item.id = `pro-${product.id}`;
    item.className =
      "mx-auto w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-md dark:shadow-md dark:shadow-zinc-900 dark:bg-gray-900  dark:border-gray-700";
    item.innerHTML = `
    <div>
      <div class="group  relative">
        <button id="fav-${product.id}" 
          class="absolute bottom-1 right-14 m-3 text-gray-400 hover:text-red-500 transition bg-white rounded-lg py-1 px-2 hidden group-hover:block">
          <i id="icon-${product.id}" class="fa-regular fa-heart text-xl"></i>
        </button>
        <button onclick="" id="cart-${product.id}" 
          class="absolute bottom-1 right-2 m-3 text-gray-400 hover:text-red-500 transition bg-white rounded-lg py-1 px-2 hidden group-hover:block">
          <i id="cart-icon-${product.id}" class="fa-solid fa-cart-shopping text-xl"></i>
        </button>
        <img class="w-full rounded-t-2xl" src="${product.image_path}" alt="product image" />
      </div>
      <h5 class="mt-2 ms-3 text-md font-semibold tracking-tight text-gray-900 dark:text-white">${product.name}</h5>
      <div class="flex items-center justify-between mx-4 pe-1 mt-1 mb-2">
          <p class="text-lg font-bold text-gray-900 dark:text-white">$${product.price}</p>
          <button  href="#" class="text-lime-500 hover:text-white focus:ring-white font-medium text-sm ">
            <i class="fa-solid fa-angles-left me-1" ></i>Show More<i class="fa-solid fa-eye ms-2 text-white"></i>
          </button>
      </div>
    </div>
    `;
    productsbox.appendChild(item);
  });
}

// serch
searchInput.addEventListener("input", function () {
  let word = this.value.toLowerCase();
  let filtere = products.filter((product) =>
    (product.name || product.title || "").toLowerCase().includes(word)
  );
  Products(filtere);
});

// shoopp
function shoopp() {
  let car = document.getElementById("select-modal");
  car.classList.toggle("hidden");
}
// cloos shoopp
function closss() {
  let x = document.getElementById("select-modal");
  x.classList.toggle("hidden");
}

// favorite
function favorite() {
  let mnu = document.getElementById("select-favorite");
  mnu.classList.toggle("hidden");
}
// cloos favorite
function clossf() {
  let x = document.getElementById("select-favorite");
  x.classList.toggle("hidden");
}

// bottn favorite
let favProducts = [];
function toggleFavorite(productId) {
  let favIcon = document.getElementById(`icon-${productId}`);
  favIcon.classList.toggle("text-red-500");

  if (favProducts.includes(productId)) {
    favProducts = favProducts.filter((id) => id !== productId);
  } else {
    favProducts.push(productId);
  }

  var listfav = document.getElementById("minuFavorite");
  listfav.innerHTML = "";
  favProducts.forEach((id) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      const li = document.createElement("li");
      li.className = "flex items-center justify-between p-2 border-b";
      li.innerHTML = `
        <div class="flex items-center">
          <img src="${product.image_path}" alt="${product.name}" class="w-10 h-10 rounded mr-2">
          <span>${product.name}</span>
        </div>
        <span class="text-gray-600">$${product.price}</span>
      `;
      listfav.appendChild(li);
    }
  });
}

// add producte
function addpro() {
  let add = document.getElementById("addprobutt");
  add.classList.toggle("hidden");
}
// cloos add producte
function closadd() {
  let x = document.getElementById("addprobutt");
  x.classList.toggle("hidden");
}

// addproduct
var form = document.getElementById("addProductForm");
var modal = document.getElementById("addprobutt");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  var titleval = document.getElementById("titleName").value;
  var priceval = document.getElementById("price").value;
  var imgeval = document.getElementById("nameUrl").value;

  var newpro = {
    title: titleval,
    price: priceval,
    thumbnail: imgeval,
  };

  products.push(newpro);
  modal.classList.toggle("hidden");
});

let cart = [];
function showDetails(productId) {
  const product = products.find((p) => p.id === productId);
  document.getElementById("moretitle").textContent = product.name;
  document.getElementById("moreimg").src = product.image_path;
  document.getElementById("mordis").textContent = product.description;
  document.getElementById("morprice").textContent = product.price;
  document.getElementById("productModal").classList.toggle("hidden");

  document.getElementById("btnc").addEventListener("click", function () {
    cart.push(product);
    let listcart = document.getElementById("listCart");
    listcart.innerHTML = ``;
    cart.forEach((product) => {
      const li = document.createElement("li");
      li.className = "flex items-center justify-between p-2 border-b";
      li.innerHTML = `
        <div  class="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 peer-checked:text-blue-600  hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">                           
          <div class="block">
              <button onclick="" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:bg-gray-600 dark:text-white">
                  <i class="fa-solid fa-trash"></i>
              </button>
              <div class="w-full text-lg font-semibold">${product.name}</div>
              <div class="w-full text-gray-500 dark:text-gray-400">$${product.price}</div>
              <div class="inline-flex">
                  <button onclick="plas()" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="select-modal">
                  +
                  </button>
                  <input id="nump" value="0" onclick="" type="number" class="text-center text-gray-400 bg-transparent bg-gray-200  rounded-lg text-sm h-8 w-14 p-2 ms-auto inline-flex justify-center items-center dark:bg-gray-400 dark:text-white">
                      
                  </input>
                  <button onclick="ma()" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="select-modal">
                  -
                  </button>
              </div>
          </div>
          <img class="w-36" src="${product.description}" alt="">
      </div>
    `;
      listcart.appendChild(li);
    });
  });
}

function closemorpro() {
  document.getElementById("productModal").classList.add("hidden");
}

// + -
function plas() {
  let val = document.getElementById("nump");
  val.value = +val.value + 1;
}
function ma() {
  let val = document.getElementById("nump");
  val.value = +val.value - +1;
}

function gridlisa() {
  let cartt = document.getElementById("products");
  let fli = document.getElementById("mypro");
  cartt.classList.toggle("lg:grid-cols-1");
  cartt.classList.toggle("lg:grid-cols-3");
}

function darck() {
  let nav = document.querySelectorAll(".navb");
  nav.classList.toggle("dark:bg-gray-900");

  // let ul =document.getElementById("ulnav");
  // ul.classList.toggle("dark:bg-gray-800")
  // ul.classList.toggle("dark:border-gray-700")
}
