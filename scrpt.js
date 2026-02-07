// global variables
let productsbox = document.getElementById("products");
let searchInput = document.getElementById("serch");
let cartContainer = document.getElementById("cartlistCon");
let favsContainer = document.getElementById("favoritListCon");

let products = [];
let categories=[];
let cart = [];
let favs = [];
let data = null;

// arry cart
let savedCart = localStorage.getItem("cart");
if (savedCart) {
  cart = JSON.parse(savedCart);
};

// arry favs
let savedFavs = localStorage.getItem("favs");
if (savedFavs) {
  favs = JSON.parse(savedFavs);
};

// fetch data 
fetch("data.json")
  .then((res) => res.json())
  .then((response) => {
    data = response; 
    Products(data.products); 
    Categories(data.categories);
    createCartItems(cart);
    createFavirits(favs);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

// display categories
 function Categories(categoryList) {
  let categoriesDiv = document.getElementById("categories");
  categoriesDiv.innerHTML = "";
  categoryList.forEach((category) => {
    const catItem = document.createElement("div");
    catItem.className =
      "flex flex-col items-center ";
    catItem.innerHTML = `
    <img src="${category.image}" alt="${category.name}" class="inline-block border border-gray-200 shadow-xl shadow-black/50 rounded-full md:w-30 md:h-30 h-25 w-25"/>
    <a class="align-middle bg-lime-600 mt-5 rounded-lg  px-4 py-1 text-white shadow-md shadow-black/20">${category.name}</a>
    `;
    categoriesDiv.appendChild(catItem);
  });

};
 

// display products
function Products(productList) {
  productsbox.innerHTML = "";
  productList.forEach((product) => {
    let inCart = cart.find((p) => p.id == product.id) ? true : false;
    let inFav = favs.find((p) => p.id == product.id) ? true : false;
    const item = document.createElement("div");
    item.id = `pro-${product.id}`;
    item.className =
      "mx-auto w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-md";
    item.innerHTML = `
    <div>
    <img class="w-full h-40 object-cover rounded-t-2xl" src="${product.images[0]}" alt="product image" />
    <h5 class="mt-2 ms-3 text-md font-semibold tracking-tight text-gray-900">${product.name}</h5>
    <div class="flex items-center justify-between mx-4 pe-1 mt-1 mb-1">  
     <p class="text-lg font-bold text-gray-900 ">$${product.price}</p>
      <div class="flex items-center">
         <span class="text-sm text-gray-500">
          +${product.rating}
        </span>
        <i class="fa-solid fa-star text-yellow-400 ms-1"></i>
      </div>
    </div>
      <div class="flex items-center justify-between mx-4 pe-1  mb-2">
      <div>
      <button data-id="${product.id}" 
        class="add-fav ${inFav ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition bg-white rounded-lg py-1 px-1 ">
        <i data-id="${product.id}" class="fa-regular fa-heart text-lg"></i>
      </button>
      <button data-id="${product.id}" 
        class="add-cart ${inCart ? 'text-lime-500' : 'text-gray-400'} hover:text-lime-500 transition bg-white rounded-lg py-1 px-2 ">
        <i data-id="${product.id}" class="fa-solid fa-cart-shopping text-lg"></i>
      </button>
      </div>
          <button data-id="${product.id}" class="show-more text-lime-500 hover:text-lime-800 focus:ring-white font-medium text-sm ">
            <i class="fa-solid fa-angles-left" ></i>Show More<i class="fa-solid fa-eye ms-2 text-lime-500"></i>
          </button>
      </div>
    </div>
    `;
    productsbox.appendChild(item);
  });
  createCartItems(cart);
};



// serch
searchInput.addEventListener("input", function () {
  let word = this.value.toLowerCase();
  let filtere = data.products.filter((product) =>
    product.name.toLowerCase().includes(word)
  );
  Products(filtere);
});



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



// cart or favorite


// add to cart or favs
productsbox.addEventListener("click",function(e){
  const productid = e.target.dataset.id;
  if(e.target.closest(".add-cart")){
    if(cart.find(p => p.id == productid)){
      cart = cart.filter(p => p.id !== productid);
    } else {
      cart.push({id: productid, q : 1});
    };
    createCartItems(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  if(e.target.closest(".add-fav")){
    if(favs.find(p => p.id == productid)){
      favs = favs.filter(p => p.id !== productid);
    } else {
      favs.push({id: productid});
    };
    createFavirits(favs);
    localStorage.setItem("favs", JSON.stringify(favs));
  };

  if(e.target.closest(".show-more")){
    showMore(productid);
  };
  Products(data.products);
});

// ======================================



// create cart items
function createCartItems(proCartlist) {
  cartContainer.innerHTML = "";
  proCartlist.forEach((procort) => {
    const productcart = data.products.find(p => p.id == procort.id);
    const cartListdiv = document.createElement("div");
    cartListdiv.className = "flex items-center justify-between mb-4 bg-white px-3 py-2 rounded-xl";
    cartListdiv.innerHTML = `
     <div class="flex items-center gap-2">
           <img src="${productcart.images[0]}" alt="product image" class="max-w-24 h-16 object-cover rounded-xl" >
           <div class="flex flex-col">
               <h3 class="text-md font-semibold line-clamp-1 pe-2">${productcart.name}</h3>
               <p class="text-gray-600">$${productcart.price}</p>
           </div>
       </div>
       <div class="flex items-center gap-2">
           <button data-id="${procort.id}" class="btn-plus text-gray-500 hover:text-lime-600 hover:cursor-pointer">
               <i class="fa-solid fa-plus"></i>
           </button>
           <p class="border rounded-md py-0.5 px-2">${procort.q}</p>
           <button data-id="${procort.id}" class="btn-minus text-gray-500 hover:text-lime-600 hover:cursor-pointer">
               <i class="fa-solid fa-minus"></i>
           </button>
       </div>
       <div>
           <button data-id="${procort.id}" class="px-3 btn-delete text-red-500 hover:text-red-700 hover:cursor-pointer">
               <i class="fa-solid fa-trash"></i>
           </button>
     </div>
     `;
     cartContainer.appendChild(cartListdiv);
     calculateTotalPrice();
      cartCount();
      favCount()
  });
  
};


// create favirits items
function createFavirits(proFavlist) {
favsContainer.innerHTML = "";
proFavlist.forEach((proFav) => {
  const productFav = data.products.find(p => p.id == proFav.id);
  const favListdiv = document.createElement("div");
  favListdiv.className = "flex items-center justify-between mb-4 bg-white p-3 px-7 rounded-lg";
  favListdiv.innerHTML = `
   <div class="flex items-center gap-4">
      <img src="${productFav.images[0]}" alt="" class="h-16 max-w-22 object-cover">
      <div>
          <h3 class="font-semibold line-clamp-1">${productFav.name}</h3>
          <p class="text-gray-600">$${productFav.price}</p>
      </div>
  </div>
  <i data-id="${productFav.id}" class="fa-solid fa-trash-can cursor-pointer"></i>
`;
  favsContainer.appendChild(favListdiv);
});
};

// ======================================


// plus, minus, delete cart items
cartContainer.addEventListener("click", function(e) {
  const productid = e.target.closest("button")?.dataset.id;
  if(e.target.closest(".btn-plus")){
    cart = cart.map(p => p.id == productid ? {...p, q: p.q + 1} : p) ;
  };
  if(e.target.closest(".btn-minus")){
    cart = cart.map(p => p.id == productid ? {...p, q: p.q - 1} : p) ;
    cart = cart.filter(p => p.q > 0);
  };
  if(e.target.closest(".btn-delete")){
    cart = cart.filter(p => p.id !== productid);
    Products(data.products);
  };
  createCartItems(cart);
  cartCount();
  localStorage.setItem("cart", JSON.stringify(cart));
});

// delete favirits items
favsContainer.addEventListener("click", function(e) {
  const productid = e.target.closest("i")?.dataset.id;
  favs = favs.filter(p => p.id !== productid);
  createFavirits(favs);
  favCount()
  localStorage.setItem("favs", JSON.stringify(favs));
});

// cart total price
function calculateTotalPrice() {
  let totalcart = document.getElementById("totalcart");
  let total = 0;
  cart.forEach((cartItem) => {
    const productInfo = data.products.find(p => p.id == cartItem.id);
    if(productInfo){
      total += productInfo.price * cartItem.q;
      totalcart.innerText = total;
    };
  });
};



// update cart count
function cartCount() {
  let cartCount = document.getElementById("cart-count");

  let existingCount = cartCount.querySelector("span");
  if (existingCount) {
    existingCount.remove();
  };

  if(cart.length > 0){
    let totalCount = document.createElement("span");
    totalCount.className= "absolute -top-2 -right-2 bg-lime-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center";
    totalCount.innerText = cart.length;
    cartCount.appendChild(totalCount);
  }; 
};

// update favirat count
function favCount() {
  let favCount = document.getElementById("fav-count");

  let existingCount = favCount.querySelector("span");
  if (existingCount) {
    existingCount.remove();
  };

  if(favs.length > 0){
    let totalCount = document.createElement("span");
    totalCount.className= "absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center";
    totalCount.innerText = favs.length;
    favCount.appendChild(totalCount);
  }; 
};

// ======================================

// show more details
let modlProduct = document.getElementById("modlProduct");
function showMore(productid){
  modlProduct.classList.remove("hidden");
  const product = data.products.find(p => p.id == productid);
  document.getElementById("modaltitle").innerText = product.name;
  document.getElementById("modalprice").innerText = `$${product.price}`;
  document.getElementById("modaldesc").innerText = product.description;
  document.getElementById("modalcategory").innerText = product.category;
  document.getElementById("modalrating").innerText = `${product.rating} (${product.reviews} reviews)`;
  document.getElementById("modalmaterial").innerText = product.material;
  document.getElementById("modalcolors").innerText = product.colors.join(", ");
  let minimg = document.getElementById("modalimg");
  let imagesBox = document.getElementById("imgbox");

  imagesBox.innerHTML = "";
  minimg.src = product.images[0];

  product.images.forEach((img, index) => {
    const thumb = document.createElement("img");
    thumb.src = img;
    thumb.className =
      "w-20 h-20 object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-lime-500 transition";

    thumb.addEventListener("click", () => {
      minimg.src = img;
      document.querySelectorAll("#thumbImages img")
        .forEach(i => i.classList.remove("border-lime-500"));
      thumb.classList.add("border-lime-500");
    });

    if (index === 0) {
      thumb.classList.add("border-lime-500");
    }

    imagesBox.appendChild(thumb);
  });
 
 document.getElementById("addtocartbtn").addEventListener("click", () => {
  if (!cart.find(p => p.id === productid)) {
    cart.push({ id: productid, q: 1 });
    createCartItems(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
});
};

// close modal
document.getElementById("closemodalbtn").addEventListener("click", function() {
  modlProduct.classList.add("hidden");
});


// add to cart from modl