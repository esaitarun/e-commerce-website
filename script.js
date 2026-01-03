// ================= PRODUCT DATA =================
const products = [
    { id: 1, name: "iPhone 14", category: "Smartphone", price: 80000, image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-blue-select-202209", specs: ["6.1-inch Display", "A15 Bionic", "iOS", "128GB Storage"] },
    { id: 2, name: "Samsung Galaxy S23", category: "Smartphone", price: 70000, image: "https://m.media-amazon.com/images/I/719zApN1mhL.jpg", specs: ["AMOLED Display", "Snapdragon 8 Gen 2", "Android"] },
    { id: 3, name: "MacBook Air M2", category: "Laptop", price: 95000, image: "https://www.apple.com/newsroom/images/product/mac/standard/Apple_new-macbookair-wallpaper-screen_11102020_big.jpg.large.jpg", specs: ["Apple M2 Chip", "13-inch Display", "8GB RAM"] },
    { id: 4, name: "Dell Inspiron", category: "Laptop", price: 45000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWwPWFn3QObUmuc941tdBDRKz2lyuFw7ymbA&s", specs: ["Intel i5", "15.6-inch Display", "Windows 11"] },
    { id: 5, name: "AirPods Pro", category: "Accessories", price: 25000, image: "https://www.cnet.com/a/img/resize/b2c074af0ce088b5925e9e3bad023bac2b8701ea/hub/2023/09/26/cdecf7b6-069e-48bf-9046-133efae96eca/airpods-pro-2-usb-c-blue-background.jpg?auto=webp&fit=crop&height=362&width=644", specs: ["Active Noise Cancellation", "Wireless Charging"] },
    { id: 6, name: "Apple Watch Series 9", category: "Accessories", price: 35000, image: "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/apple-watch-series-9.png", specs: ["Heart Rate Monitor", "GPS", "watchOS"] },
    { id: 7, name: "Canon DSLR", category: "Camera", price: 50000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv7vXvi9iUqxYdeTIIhHjmJI5fzO7mIqKaXA&s", specs: ["24MP Camera", "4K Video", "WiFi"] },
    { id: 8, name: "GoPro Hero 11", category: "Camera", price: 30000, image: "https://x.imastudent.com/content/0039733_gopro-hero-11-black-action-camera_500.jpeg", specs: ["5K Video", "Waterproof", "Image Stabilization"] }
];

// ================= GLOBAL VARIABLES =================
const productsContainer = document.getElementById("products");
let selectedProduct = null;

// ================= LOAD PRODUCTS =================
function loadProducts(filteredProducts = products) {
    productsContainer.innerHTML = "";

    filteredProducts.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/200'">
            <h3>${product.name}</h3>
            <p class="price">₹${product.price}</p>
            <button onclick="showProductDetails(${product.id})">View Details</button>
        `;

        productsContainer.appendChild(card);
    });
}

// ================= PRODUCT DETAILS MODAL =================
function showProductDetails(id) {
    selectedProduct = products.find(p => p.id === id);

    document.getElementById("modal-img").src = selectedProduct.image;
    document.getElementById("modal-name").innerText = selectedProduct.name;
    document.getElementById("modal-price").innerText = "₹" + selectedProduct.price;
    document.getElementById("modal-category").innerText = "Category: " + selectedProduct.category;

    const specsList = document.getElementById("modal-specs");
    specsList.innerHTML = "";
    selectedProduct.specs.forEach(spec => {
        const li = document.createElement("li");
        li.innerText = spec;
        specsList.appendChild(li);
    });

    document.getElementById("product-modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("product-modal").style.display = "none";
}

// ================= CART FUNCTIONS =================
// Get cart from localStorage or empty array
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add product to cart and redirect to cart page
function addToCartFromModal() {
    let cart = getCart();
    cart.push(selectedProduct);
    saveCart(cart);
    updateCartCount();
    closeModal();
    alert(`${selectedProduct.name} added to cart!`);
}

// Update cart count in header
function updateCartCount() {
    const cart = getCart();
    document.getElementById("cart-count").innerText = cart.length;
}

// ================= CATEGORY FILTER =================
function filterCategory(category) {
    if (category === "All") {
        loadProducts();
    } else {
        const filtered = products.filter(p => p.category === category);
        loadProducts(filtered);
    }
}

// ================= INIT =================
loadProducts();
updateCartCount();
