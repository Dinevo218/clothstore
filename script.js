document.addEventListener('DOMContentLoaded', function () {
    const cart = {};
    const cartModal = document.getElementById('cartModal');
    const cartItemsList = document.getElementById('cartItems');
    const cartTotalElem = document.getElementById('cartTotal');
    const closeCartBtn = document.getElementById('closeCart');
    const cartButton = document.querySelector('.cart-sect a');

    // Add to Cart button handler
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productCard = this.parentElement;
            const productName = productCard.querySelector('h3').textContent;
            const priceText = productCard.querySelector('p').textContent;
            const price = parseFloat(priceText.replace('₹', ''));
            const imgSrc = productCard.querySelector('img').src;

            if (cart[productName]) {
                cart[productName].quantity += 1;
            } else {
                cart[productName] = { price: price, quantity: 1, img: imgSrc };
            }
        });
    });

    // Show cart modal on cart button click
    cartButton.addEventListener('click', function (e) {
        e.preventDefault();
        renderCart();
        cartModal.style.display = 'flex';
    });

    // Close cart modal
    closeCartBtn.addEventListener('click', function () {
        cartModal.style.display = 'none';
    });

    // Render cart items including images
    function renderCart() {
        cartItemsList.innerHTML = '';
        let total = 0;
        for (const productName in cart) {
            if (cart.hasOwnProperty(productName)) {
                const item = cart[productName];
                const itemTotal = item.price * item.quantity;
                total += itemTotal;

                const li = document.createElement('li');
                li.style.display = 'flex';
                li.style.alignItems = 'center';
                li.style.gap = '10px';

                // Image element
                const img = document.createElement('img');
                img.src = item.img;
                img.alt = productName;
                img.style.width = '50px';
                img.style.height = '50px';
                img.style.objectFit = 'cover';
                img.style.borderRadius = '5px';

                // Text element
                const text = document.createElement('span');
                text.textContent = `${productName} - ₹${item.price} x ${item.quantity} = ₹${itemTotal.toFixed(2)}`;

                li.appendChild(img);
                li.appendChild(text);
                cartItemsList.appendChild(li);
            }
        }
        cartTotalElem.textContent = total.toFixed(2);
        if (total === 0) {
            cartItemsList.innerHTML = '<li>Your cart is empty.</li>';
        }
    }

    // ... (search and contact form handlers remain unchanged)
});
