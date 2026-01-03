document.addEventListener("DOMContentLoaded", () => {

    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");

    // ================= GET CART =================
    function getCart() {
        return JSON.parse(localStorage.getItem("cart")) || [];
    }

    // ================= SAVE CART =================
    function saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // ================= RENDER CART =================
    function renderCart() {
        const cart = getCart();
        cartItemsContainer.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML =
                `<p class="empty-cart">Your cart is empty 🛒</p>`;
            cartTotalElement.innerText = "0";
            return;
        }

        cart.forEach((item, index) => {
            total += Number(item.price);

            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";

            cartItem.innerHTML = `
                <img src="${item.image}"
                     alt="${item.name}"
                     onerror="this.src='https://via.placeholder.com/120'">

                <div class="cart-details">
                    <h4>${item.name}</h4>
                    <p class="cart-price">₹${item.price}</p>
                    <button class="remove-btn" data-index="${index}">
                        Remove
                    </button>
                </div>
            `;

            cartItemsContainer.appendChild(cartItem);
        });

        cartTotalElement.innerText = total;

        // attach remove events
        document.querySelectorAll(".remove-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                removeItem(btn.dataset.index);
            });
        });
    }

    // ================= REMOVE ITEM =================
    function removeItem(index) {
        let cart = getCart();
        cart.splice(index, 1);
        saveCart(cart);
        renderCart();
    }

    // ================= INIT =================
    renderCart();
});
