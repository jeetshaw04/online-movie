// =========================
// MOVIE LIST PAGE
// =========================

async function displayMovies() {
    const movieList = document.getElementById('movie-list');
    if (!movieList) return;

    try {
        const response = await fetch("http://localhost:5000/api/movies");
        const movies = await response.json();

        movieList.innerHTML = '';

        movies.forEach(movie => {
            movieList.innerHTML += `
                <div class="movie-card">
                    <h3>${movie.name}</h3>
                    <p>Price: $${movie.price}</p>
                    <button onclick="addToCart('${movie._id}', '${movie.name}', ${movie.price})">
                        Add to Cart
                    </button>
                </div>
            `;
        });

    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

function addToCart(id, name, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ id, name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart!`);
}

// =========================
// CART PAGE
// =========================

function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-list');
    if (!cartList) return;

    cartList.innerHTML = '';

    cart.forEach((item, index) => {
        cartList.innerHTML += `
            <li>
                ${item.name} - $${item.price}
                <button onclick="removeFromCart(${index})">Remove</button>
            </li>
        `;
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const totalElement = document.getElementById('total');
    if (totalElement) {
        totalElement.innerText = `Total: $${total}`;
    }
}

function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function checkout() {
    window.location.href = 'order-confirmation.html';
}

// =========================
// ORDER CONFIRMATION PAGE
// =========================

function displayOrderDetails() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderDetails = document.getElementById('order-details');
    if (!orderDetails) return;

    orderDetails.innerHTML = '';

    cart.forEach(item => {
        orderDetails.innerHTML += `
            <li>${item.name} - $${item.price}</li>
        `;
    });
}

function confirmOrder() {
    const orderId = Math.floor(Math.random() * 1000000);
    localStorage.setItem('orderId', orderId);
    window.location.href = 'payment.html';
}

// =========================
// PAYMENT PAGE
// =========================

function processPayment() {
    setTimeout(() => {
        window.location.href = 'order-success.html';
    }, 2000);
}

// =========================
// ORDER SUCCESS PAGE
// =========================

function displayOrderSuccess() {
    const orderId = localStorage.getItem('orderId');
    const orderIdElement = document.getElementById('order-id');

    if (orderIdElement) {
        orderIdElement.innerText = `Order ID: ${orderId}`;
    }

    localStorage.clear();
}

// =========================
// REGISTER (BACKEND CONNECTED)
// =========================

async function register() {
    const username = document.getElementById("reg-username")?.value.trim();
    const password = document.getElementById("reg-password")?.value.trim();
    const confirmPassword = document.getElementById("reg-confirm-password")?.value.trim();

    if (!username || !password || !confirmPassword) {
        alert("Please fill out all fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: username,
                email: username + "@test.com",
                password: password
            })
        });

        const data = await response.json();

        alert(data.message);

        if (response.ok) {
            window.location.href = "index.html";
        }

    } catch (error) {
        console.error(error);
        alert("Server error. Make sure backend is running.");
    }
}
document.addEventListener("DOMContentLoaded", function () {
    displayMovies();
});