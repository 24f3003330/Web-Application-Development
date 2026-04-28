function register() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    let user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration successful! Please login.");
    window.location.href = "index.html";
}

function login() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
        alert("No user found. Please register.");
        return;
    }

    if (email === storedUser.email && password === storedUser.password) {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "catalog.html"; // Redirect to Catalog
    } else {
        alert("Invalid credentials");
    }
}

function loadDashboard() {
    let loggedIn = localStorage.getItem("loggedIn");
    let user = JSON.parse(localStorage.getItem("user"));

    if (!loggedIn) {
        window.location.href = "index.html";
        return;
    }

    if (document.getElementById("welcomeMsg") && user) {
        document.getElementById("welcomeMsg").innerText = `Hi, ${user.name}`;
    }
}

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);
    updateCartCount();
}

function updateCartCount() {
    let countSpan = document.getElementById("cartCount");
    if (countSpan) {
        countSpan.innerText = cart.length;
    }
}

function loadCart() {
    let cartItemsContainer = document.getElementById("cartItems");
    let totalElement = document.getElementById("total");
    let total = 0;

    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = "";
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalElement.innerText = "Total: ₹0";
        return;
    }

    cart.forEach((item, index) => {
        let div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <span>${item.name}</span>
            <span>₹${item.price} <button onclick="removeFromCart(${index})" style="color:red; margin-left:10px; border:none; background:none; cursor:pointer;" title="Remove">x</button></span>
        `;
        cartItemsContainer.appendChild(div);
        total += item.price;
    });

    totalElement.innerText = `Total: ₹${total}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart(); 
    updateCartCount(); 
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert(`Thank you for your purchase! Total amount: ₹${document.getElementById("total").innerText.split('₹')[1]}`);
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    window.location.href = "catalog.html";
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
});
