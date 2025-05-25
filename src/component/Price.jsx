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
