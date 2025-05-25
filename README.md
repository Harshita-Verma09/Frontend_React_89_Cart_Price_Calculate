# Shopping Cart Application

This is a simple React-based shopping cart application that allows users to add products with names and prices, view the list of items in the cart, and see the calculated total price.

---

## Features

* **Add Products:** Easily add new products to the cart by entering a product name and price.
* **Dynamic Total Price:** The total price of all items in the cart is automatically calculated and updated as items are added.
* **Responsive Design:** The interface is designed to be user-friendly on various screen sizes.

---

## Technologies Used

* **React:** A JavaScript library for building user interfaces.
* **Tailwind CSS:** A utility-first CSS framework for rapid UI development.

---

## Installation and Setup

To get this project up and running on your local machine, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the development server:**

    ```bash
    npm start
    # or
    yarn start
    ```

    This will open the application in your browser at `http://localhost:3000`.

---

## Usage

1.  **Enter Product Name:** Type the name of the product into the "Product Name" input field.
2.  **Enter Product Price:** Enter the price of the product into the "Product Price" input field.
3.  **Add Product:** Click the "➕ Add Product" button to add the item to your cart.
4.  **View Cart:** The added items will appear in the "Cart Items" section.
5.  **Total Price:** The "Total" section will display the sum of all items in your cart.

---

## Code Overview

### `Cart.js`

This is the main component of the application.

* **`useState` Hook:** Used to manage the state of `cartItems`, `productName`, and `productPrice`.
* **`addItem` Function:** Handles the logic for adding a new item to the `cartItems` array. It creates a new item object with a unique ID, name, price, and quantity.
* **`useMemo` Hook:** Used to memoize the `totalPrice` calculation. This prevents unnecessary re-renders of the total price when other state variables (that don't affect `cartItems`) change, optimizing performance. The `totalPrice` is recalculated only when `cartItems` changes.
* **JSX Structure:** Defines the layout and appearance of the shopping cart, including input fields, the "Add Product" button, the list of cart items, and the total price display.
* **Styling:** Utilizes Tailwind CSS classes for a clean and modern look.

```javascript
import React, { useState, useMemo } from "react";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");

    const addItem = () => {
        if (!productName || !productPrice) return;

        const newItem = {
            id: Date.now(),
            name: productName,
            price: parseFloat(productPrice),
            quantity: 1,
        };

        setCartItems([...cartItems, newItem]);
        setProductName("");
        setProductPrice("");
    };

    const totalPrice = useMemo(() => {
        return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }, [cartItems]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
            <div className="w-full max-w-md bg-gray-900 text-white rounded-2xl shadow-lg p-6 space-y-6">
                <h1 className="text-2xl font-bold text-center">🛍️ Shopping Cart</h1>

                {/* Input Fields */}
                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full p-3 bg-gray-800 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="number"
                        placeholder="Product Price"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        className="w-full p-3 bg-gray-800 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={addItem}
                        className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold transition"
                    >
                        ➕ Add Product
                    </button>
                </div>

                {/* Cart Items */}
                <div className="border-t border-gray-700 pt-4 space-y-2 max-h-60 overflow-y-auto">
                    {cartItems.length === 0 ? (
                        <p className="text-gray-400 text-sm text-center">No items in cart</p>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm border-b border-gray-800 pb-1">
                                <span>{item.name}</span>
                                <span>₹{item.price.toFixed(2)}</span>
                            </div>
                        ))
                    )}
                </div>

                {/* Total Price */}
                <div className="border-t border-gray-700 pt-4 text-right">
                    <h2 className="text-lg font-semibold">
                        Total: <span className="text-green-400">₹{totalPrice.toFixed(2)}</span>
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default Cart;
