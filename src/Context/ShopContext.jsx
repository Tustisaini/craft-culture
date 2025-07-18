import React, { createContext, useEffect, useState } from 'react';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index <= 300; index++) {
        cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const [all_product, setAll_product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        // ✅ Fetch all products
        fetch("http://localhost:4000/allproducts")
            .then((response) => response.json())
            .then((data) => setAll_product(data))
            .catch((error) => console.error("❌ Failed to fetch products:", error));

        // ✅ Fetch cart if logged in
        const token = localStorage.getItem("auth-token");
        if (token) {
            fetch("http://localhost:4000/getcart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({})
            })
                .then((response) => {
                    if (!response.ok) throw new Error("Unauthorized");
                    return response.json();
                })
                .then((data) => {
                    setCartItems(data);
                })
                .catch((error) => {
                    console.error("❌ Error fetching cart:", error.message);
                });
        }
    }, []);

    const addToCart = async (itemId) => {
        try {
            const token = localStorage.getItem("auth-token");
            const response = await fetch("http://localhost:4000/addtocart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ itemId })
            });

            const data = await response.json();
            if (response.ok) {
                setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
            } else {
                console.error("❌ Error adding to cart:", data.errors || data.message);
            }
        } catch (error) {
            console.error("❌ Error adding to cart:", error);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            const token = localStorage.getItem("auth-token");
            const response = await fetch("http://localhost:4000/removefromcart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ itemId })
            });

            const data = await response.json();
            if (response.ok) {
                setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
            } else {
                console.error("❌ Error removing from cart:", data.errors || data.message);
            }
        } catch (error) {
            console.error("❌ Error removing from cart:", error);
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = all_product.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    const contextValue = {
        getTotalCartItems,
        getTotalCartAmount,
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
