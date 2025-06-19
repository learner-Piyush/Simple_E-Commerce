document.addEventListener("DOMContentLoaded", () => {
    const products = [
        {id: 1, name: "Product 1", price: 49.99},
        {id: 2, name: "Product 2", price: 99.99},
        {id: 3, name: "Product 3", price: 199.99},
    ]

    const cart = JSON.parse(localStorage.getItem("cart")) || []

    const productList = document.getElementById("product-list")
    const cartItems = document.getElementById("cart-items")
    const emptyCartMessage = document.getElementById("empty-cart")
    const cartTotalMessage = document.getElementById("cart-total")
    const totalPriceDisplay = document.getElementById("total-price")
    const checkoutButton = document.getElementById("checkout-button")

    products.forEach(product => {
        const productDiv = document.createElement("div")
        productDiv.classList.add("product")
        productDiv.innerHTML = `<span>${product.name} - ₹${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">
        <img src="./icons8-add-to-cart-50.png" alt="">
        Add to Cart
        </button>`
        productList.appendChild(productDiv)
    });

    productList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const productID = parseInt(e.target.getAttribute("data-id"))
            const product = products.find((p) => p.id === productID)
            addToCart(product)
        }
    })

    function saveCart(){
        localStorage.setItem("cart", JSON.stringify(cart))
    }

    function addToCart(product) {
        cart.push(product),
        renderCart()
        saveCart()
    }

    function renderCart() {
        cartItems.innerText = ""

        let totalPrice = 0

        if (cart.length > 0) {
            emptyCartMessage.classList.add("hidden")
            cartTotalMessage.classList.remove("hidden")
            cart.forEach((item, index) => {
                totalPrice += item.price

                const cartItem = document.createElement("div")
                cartItem.classList.add("item")
                cartItem.innerHTML = `<span>${item.name} - ₹${item.price.toFixed(2)}</span>`
                cartItems.appendChild(cartItem)

                totalPriceDisplay.textContent = `₹${totalPrice.toFixed(2)}`
            });
        } else {
            emptyCartMessage.classList.remove("hidden")
            totalPriceDisplay.textContent = `₹0.00`
        }
    }

    checkoutButton.addEventListener("click", () => {
        cart.length = 0
        alert("Checkout Successfully!")
        renderCart()
        saveCart()
    })

    renderCart()
})
