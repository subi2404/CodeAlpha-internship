// Product list by category
const allProducts = {
  Electronics: [
    {
      id: 1,
      name: "Wireless Earbuds",
      price: 999,
      description: "High-quality sound and long battery life.",
      image: "https://m.media-amazon.com/images/I/71nwl7hQRyL._AC_SL1500_.jpg"
    },
    {
      id: 2,
      name: "Bluetooth Speaker",
      price: 799,
      description: "Portable and waterproof design.",
      image: "https://th.bing.com/th/id/OIP.h8bKnav1JTg0sWQEoRIpsgHaFY"
    }
  ],
  Clothing: [
    {
      id: 3,
      name: "Men's Hoodie",
      price: 678,
      description: "Comfortable and stylish hoodie.",
      image: "https://th.bing.com/th/id/OIP.Qlg0K7SpX69dnNvKXQ6RVQHaJE"
    },
    {
      id: 4,
      name: "Women's Jacket",
      price: 499,
      description: "Warm and trendy winter jacket.",
      image: "https://th.bing.com/th/id/OIP.spvhBObEIGlbdESHkGvAtAHaJ4"
    }
  ],
  Books: [
    {
      id: 5,
      name: "Atomic Habits",
      price: 500,
      description: "Self-improvement book by James Clear.",
      image: "https://th.bing.com/th/id/OIP.16HFfUA65E_syj7rTaEZUwHaHa"
    }
  ]
};

// Filter and render products based on selected category
function filterByCategory() {
  const selected = document.getElementById("categoryFilter").value;
  const products = selected === "All" ? 
    Object.values(allProducts).flat() : 
    allProducts[selected];

  renderProducts(products);
}

// Display product cards
function renderProducts(products) {
  const list = document.getElementById("product-list");
  if (!list) return;

  list.innerHTML = "";
  products.forEach(product => {
    const card = createProductCard(product);
    list.appendChild(card);
  });
}

// Create product card
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>${product.description}</p>
    <p class="price">₹${product.price}</p>
    <button class="add-btn">Add to Cart</button>
  `;

  card.querySelector(".add-btn").addEventListener("click", () => addToCart(product));
  return card;
}

// Add product to cart (localStorage)
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const exists = cart.find(p => p.id === product.id);
  if (exists) {
    exists.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}

// Load cart page
function loadCart() {
  const cartContainer = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("cart-total");

  if (!cartContainer || !totalDisplay) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalDisplay.textContent = "Total Amount: ₹0";
    return;
  }

  cart.forEach(item => {
    const quantity = item.quantity || 1;
    const itemTotal = item.price * quantity;
    total += itemTotal;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="details">
        <h3>${item.name}</h3>
        <p>Price: ₹${item.price}</p>
        <p>Quantity: ${quantity}</p>
        <div class="buttons">
          <button onclick="removeFromCart(${item.id})">Remove</button>
          <button onclick="buyItem(${item.id})">Buy Now</button>
        </div>
        <div id="status-${item.id}" class="status"></div>
      </div>
    `;
    cartContainer.appendChild(div);
  });

  totalDisplay.textContent = `Total Amount: ₹${total}`;
}

// Remove product from cart
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(p => p.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// Show payment options on Buy Now
function buyItem(productId) {
  const statusBox = document.getElementById(`status-${productId}`);
  statusBox.innerHTML = `
    <strong>Select Payment Method:</strong><br>
    <label><input type="radio" name="payment-${productId}" value="COD" checked> Cash on Delivery</label><br>
    <label><input type="radio" name="payment-${productId}" value="Card"> Card Payment</label><br>
    <label><input type="radio" name="payment-${productId}" value="UPI"> UPI</label><br><br>
    <button onclick="processPayment(${productId})">Confirm Payment</button>
  `;
}

// Process selected payment method
function processPayment(productId) {
  const selectedOption = document.querySelector(`input[name="payment-${productId}"]:checked`).value;
  const statusBox = document.getElementById(`status-${productId}`);

  statusBox.innerHTML = `⏳ Processing ${selectedOption} payment...`;

  setTimeout(() => {
    statusBox.innerHTML = `✅ ${selectedOption} Payment accepted!<br>🚚 Tracking: Out for Delivery`;
  }, 2000);
}

// Page load handler for both home and cart
window.onload = () => {
  const categoryFilter = document.getElementById("categoryFilter");
  const cartContainer = document.getElementById("cart-items");

  if (categoryFilter) {
    categoryFilter.value = "All";
    filterByCategory();
  }

  if (cartContainer) {
    loadCart();
  }
};
