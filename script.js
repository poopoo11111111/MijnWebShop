// ---- Product data (acts as a mini "database") ----
const products = [
  { id: 1, name: "Ceramic Mug", price: 12.99, image: "https://placehold.co/220x140?text=Mug" },
  { id: 2, name: "Notebook", price: 8.50, image: "https://placehold.co/220x140?text=Notebook" },
  { id: 3, name: "Desk Lamp", price: 24.00, image: "https://placehold.co/220x140?text=Lamp" },
  { id: 4, name: "Backpack", price: 39.95, image: "https://placehold.co/220x140?text=Backpack" },
  { id: 5, name: "Headphones", price: 59.00, image: "https://placehold.co/220x140?text=Headphones" },
  { id: 6, name: "Water Bottle", price: 15.75, image: "https://placehold.co/220x140?text=Bottle" },
];

// ---- Cart state (loaded from localStorage if available) ----
let cart = JSON.parse(localStorage.getItem("cart")) || {}; // { productId: quantity }

// ---- DOM references ----
const productGrid = document.getElementById("product-grid");
const cartPanel = document.getElementById("cart-panel");
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const cartCountEl = document.getElementById("cart-count");
const cartToggleBtn = document.getElementById("cart-toggle");
const cartCloseBtn = document.getElementById("cart-close");
const checkoutBtn = document.getElementById("checkout-btn");

// ---- Render product cards ----
function renderProducts() {
  productGrid.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <div class="price">$${product.price.toFixed(2)}</div>
      <button data-id="${product.id}">Add to cart</button>
    `;
    productGrid.appendChild(card);
  });

  // Attach click handlers to all "Add to cart" buttons
  productGrid.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => addToCart(Number(btn.dataset.id)));
  });
}

// ---- Cart logic ----
function addToCart(productId) {
  cart[productId] = (cart[productId] || 0) + 1;
  saveCart();
  renderCart();
}

function removeFromCart(productId) {
  delete cart[productId];
  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
  cartItemsEl.innerHTML = "";
  let total = 0;
  let count = 0;

  Object.entries(cart).forEach(([productId, quantity]) => {
    const product = products.find(p => p.id === Number(productId));
    if (!product) return;

    total += product.price * quantity;
    count += quantity;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${product.name} x${quantity}</span>
      <span>$${(product.price * quantity).toFixed(2)}</span>
      <button data-id="${product.id}">Remove</button>
    `;
    cartItemsEl.appendChild(li);
  });

  cartItemsEl.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => removeFromCart(Number(btn.dataset.id)));
  });

  cartTotalEl.textContent = total.toFixed(2);
  cartCountEl.textContent = count;
}

// ---- Cart panel open/close ----
cartToggleBtn.addEventListener("click", () => cartPanel.classList.remove("hidden"));
cartCloseBtn.addEventListener("click", () => cartPanel.classList.add("hidden"));

// ---- Checkout (placeholder) ----
checkoutBtn.addEventListener("click", () => {
  if (Object.keys(cart).length === 0) {
    alert("Your cart is empty.");
    return;
  }
  alert("Checkout is not implemented yet — this is where you'd send the order to a server.");
});

// ---- Init ----
renderProducts();
renderCart();