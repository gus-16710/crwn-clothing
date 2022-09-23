import { createContext, useEffect, useState } from "react";

const addCartItem = (product, cartItems) => {
  const existingItem = cartItems.find((item) => item.id === product.id);

  if (existingItem) {
    return cartItems.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }

  return [...cartItems, { ...product, quantity: 1 }];
};

const removeCartItem = (product, cartItems) =>
  cartItems.filter((item) => item.id !== product.id);

const incrementCartQuantity = (product, cartItems) => {
  return cartItems.map((item) =>
    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
  );
};

const decrementCartQuantity = (product, cartItems) => {
  const existingItem = cartItems.find((item) => item.id === product.id);

  if (existingItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== product.id);
  }

  return cartItems.map((item) =>
    item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
  );
};

export const CartContext = createContext({
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  setIsCartOpen: () => null,
  addItemToCart: () => null,
  removeItemToCart: () => null,
  incrementQuantityToCart: () => null,
  decrementQuantityToCart: () => null,
});

export const CartProvider = (props) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const addItemToCart = (product) => {
    setCartItems(addCartItem(product, cartItems));
  };

  const removeItemToCart = (product) => {
    setCartItems(removeCartItem(product, cartItems));
  };

  const incrementQuantityToCart = (product) => {
    setCartItems(incrementCartQuantity(product, cartItems));
  };

  const decrementQuantityToCart = (product) => {
    setCartItems(decrementCartQuantity(product, cartItems));
  };

  const value = {
    isCartOpen,
    cartItems,
    cartCount,
    cartTotal,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    incrementQuantityToCart,
    decrementQuantityToCart,
  };

  useEffect(() => {
    setCartCount(cartItems.reduce((acc, curr) => acc + curr.quantity, 0));
  }, [cartItems]);

  useEffect(() => {
    setCartTotal(
      cartItems.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
    );
  }, [cartItems]);

  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
};
