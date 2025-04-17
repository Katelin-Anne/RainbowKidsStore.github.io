const products = [
    {
      id: 1,
      name: "Tee",
      price: 59.99,
      description: "Comfy green tee.",
      image: "img/Appel-T.jpg",
    },
    {
      id: 2,
      name: "Tee",
      price: 139.99,
      description: "Lightweight tee for summer outings.",
      image: "img/ari beige-T.jpg",
    },
    {
      id: 3,
      name: "Pants",
      price: 179.99,
      description: "Comfortable and stylish everyday pants.",
      image: "img/pink pants.jpg",
    },
    {
        id: 4,
        name: "Pants",
        price: 179.99,
        description: "Comfortable and stylish everyday pants.",
        image: "img/wool-pants.jpg",
      },
      {
        id: 5,
        name: "Hoodie",
        price: 279.99,
        description: "Comfortable and stylish everyday Hoodie.",
        image: "img/Nascar hoodie.jpg",
      },
      {
        id: 6,
        name: "Hoodie",
        price: 379.99,
        description: "Comfortable and stylish everyday Hoodie.",
        image: "img/blue hoodie.jpg",
      },
    // Add other products as needed...
  ];
  
 
  
  let cart = [];
  const cartCount = document.getElementById("cart-count");
  const productList = document.getElementById("product-list");
  const cartModal = document.getElementById("cart-modal");
  const cartItems = document.getElementById("cart-items");
  const checkoutModal = document.getElementById("checkout-modal");
  const orderPopup = document.getElementById("order-popup");
  const searchInput = document.getElementById("search-input");
  
  // Display products
  function displayProducts(productsToShow) {
    productList.innerHTML = "";
    productsToShow.forEach(product => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="price">$${product.price.toFixed(2)}</p>
        <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productList.appendChild(productCard);
    });
  }
  
  // Add to cart
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    updateCartCount();
    updateCartModal();
  }
  
  // Update cart count
  function updateCartCount() {
    cartCount.innerText = cart.reduce((total, item) => total + item.quantity, 0);
  }
  
  // Update cart modal
  function updateCartModal() {
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
      const itemElement = document.createElement("div");
      itemElement.classList.add("cart-item");
      itemElement.innerHTML = `
        <p>${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</p>
        <button class="remove-item" onclick="removeFromCart(${item.id})">🗑️</button>
      `;
      cartItems.appendChild(itemElement);
    });
  
    const closeBtn = document.createElement("button");
    closeBtn.innerText = "Close Cart";
    closeBtn.classList.add("checkout-btn");
    closeBtn.onclick = () => (cartModal.style.display = "none");
    cartItems.appendChild(closeBtn);
  }
  
  // Remove from cart
  function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
      cart[itemIndex].quantity--;
      if (cart[itemIndex].quantity === 0) {
        cart.splice(itemIndex, 1);
      }
    }
    updateCartCount();
    updateCartModal();
  }
  
  // Toggle cart modal
  function toggleCart() {
    cartModal.style.display = cartModal.style.display === "flex" ? "none" : "flex";
    updateCartModal();
  }
  
  // Open Checkout
  function openCheckout() {
    cartModal.style.display = "none";
    checkoutModal.style.display = "flex";
  }
  
  // Confirm order
  function confirmOrder() {
    cart = [];
    updateCartCount();
    checkoutModal.style.display = "none";
    orderPopup.style.display = "flex";
    setTimeout(() => {
      orderPopup.style.display = "none";
    }, 3000);
  }
  
  // Sort products
  document.getElementById("sort-select").addEventListener("change", function () {
    const value = this.value;
    let sortedProducts = [...products];
    if (value === "lowToHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (value === "highToLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    displayProducts(sortedProducts);
  });
  
  // Search filter
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
    displayProducts(filtered);
  });
  
  // Initialize
  displayProducts(products);
  