import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

function CartProvider({ children }) {

  const [cart, setCart] = useState(() => {
    try {
      const data = localStorage.getItem("cart");      //local storgae stores data as string
      return data ? JSON.parse(data) : [];
    } 
    catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));       //save cart to local storage
  }, [cart]);


  const addToCart = (product) => {
    setCart(prev => {
      const existingItem = prev.find(p => p.id === product.id);

      if (existingItem) {
        return prev.map(p =>
          p.id === product.id  ? { ...p, quantity: p.quantity + 1 }  : p
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

 
  const increaseQty = (id) => {
    setCart(prev =>
      prev.map(p =>
        p.id === id ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };


  const decreaseQty = (id) => {
    setCart(prev =>
      prev
        .map(p =>
          p.id === id ? { ...p, quantity: p.quantity - 1 } : p
        )
        .filter(p => p.quantity > 0)         //if item doesnt exist remove it
    );
  };


  const removeItem = (id) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increaseQty, decreaseQty, removeItem,  clearCart
      }}
 >
      {children}
    </CartContext.Provider>
  );
}

const useCart = () => useContext(CartContext);  //hook to acceess cart context

export { CartProvider, useCart };

