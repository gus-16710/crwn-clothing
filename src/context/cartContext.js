import { createContext, useEffect, useReducer } from "react";

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

export const CART_ACTION_TYPES = {
  ADD_ITEM_TO_CART: "ADD_ITEM_TO_CART",
  REMOVE_ITEM_TO_CART: "REMOVE_ITEM_TO_CART",
  INCREMENT_QUANTITY_TO_CART: "INCREMENT_QUANTITY_TO_CART",
  DECREMENT_QUANTITY_TO_CART: "DECREMENT_QUANTITY_TO_CART",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
  SET_CART_COUNT: "SET_CART_COUNT",
  SET_CART_TOTAL: "SET_CART_TOTAL",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.ADD_ITEM_TO_CART:
      return {
        ...state,
        cartItems: payload,
      };

    case CART_ACTION_TYPES.REMOVE_ITEM_TO_CART:
      return {
        ...state,
        cartItems: payload,
      };

    case CART_ACTION_TYPES.INCREMENT_QUANTITY_TO_CART:
      return {
        ...state,
        cartItems: payload,
      };

    case CART_ACTION_TYPES.DECREMENT_QUANTITY_TO_CART:
      return {
        ...state,
        cartItems: payload,
      };

    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };

    case CART_ACTION_TYPES.SET_CART_COUNT:
      return {
        ...state,
        cartCount: payload,
      };

    case CART_ACTION_TYPES.SET_CART_TOTAL:
      return {
        ...state,
        cartTotal: payload,
      };

    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
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

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

export const CartProvider = (props) => {
  const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const addItemToCart = (product) => {
    dispatch({
      type: CART_ACTION_TYPES.ADD_ITEM_TO_CART,
      payload: addCartItem(product, cartItems),
    });
  };

  const removeItemToCart = (product) => {    
    dispatch({
      type: CART_ACTION_TYPES.REMOVE_ITEM_TO_CART,
      payload: removeCartItem(product, cartItems),
    });
  };

  const incrementQuantityToCart = (product) => {    
    dispatch({
      type: CART_ACTION_TYPES.INCREMENT_QUANTITY_TO_CART,
      payload: incrementCartQuantity(product, cartItems),
    });
  };

  const decrementQuantityToCart = (product) => {    
    dispatch({
      type: CART_ACTION_TYPES.DECREMENT_QUANTITY_TO_CART,
      payload: decrementCartQuantity(product, cartItems),
    });
  };

  const setIsCartOpen = () => {
    dispatch({
      type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
    });
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
    dispatch({
      type: CART_ACTION_TYPES.SET_CART_COUNT,
      payload: cartItems.reduce((acc, curr) => acc + curr.quantity, 0),
    });
  }, [cartItems]);

  useEffect(() => {    
    dispatch({
      type: CART_ACTION_TYPES.SET_CART_TOTAL,
      payload: cartItems.reduce(
        (acc, curr) => acc + curr.quantity * curr.price,
        0
      ),
    });
  }, [cartItems]);

  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
};
