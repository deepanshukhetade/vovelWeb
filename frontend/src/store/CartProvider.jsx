import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.payload.price * action.payload.amount;
    const existingCartItemIndex = state.items.findIndex(
      (value) => value.id === action.payload.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;
    // Below logic is used for if item already in cart so, we just need to increase item amount in cart.
    if (existingCartItem) {
      const updateItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.payload.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updateItem;
    }
    // Below logic is used for if item is not present in
    else {
      updatedItems = state.items.concat(action.payload);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (value) => value.id === action.payload
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedTotalAmount;
    let updatedItems;

    // Below logic is used for when item have 1 value in cart then we need to remove item, When click on "-" button.
    if (existingCartItem.amount === 1) {
      updatedTotalAmount = state.totalAmount - existingCartItem.price;
      const updatedItem = state.items.filter(
        (value) => value.id !== action.payload
      );
      updatedItems = [...updatedItem];
    }
    // Below logic is used for less quantity by 1 in cart
    else {
      updatedTotalAmount = state.totalAmount - existingCartItem.price;
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "EMPTY") {
    return defaultCartState;
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  // Below Code Help Logic for Cart With useReducer
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", payload: item });
  };

  const removeFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", payload: id });
  };

  const emptyCard = () => {
    dispatchCartAction({ type: "EMPTY" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addToCart: addToCartHandler,
    removeFromCart: removeFromCartHandler,
    emptyCard: emptyCard,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
