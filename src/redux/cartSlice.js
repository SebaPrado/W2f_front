import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],

  reducers: {
    addProduct(state, action) {
      const productInCart = state.find(
        (product) => product.id === action.payload.id
      );
      if (productInCart) {
        return state.map((product) =>
          product.id === action.payload.id
            ? { ...product, amount: product.amount + action.payload.amount }
            : product
        );
      } else {
        state.push(action.payload);
      }
    },
    removeProduct(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
    emptyCart(state, action) {
      return [];
    },
    updateQuantity(state, action) {
      const { id, amount } = action.payload;
      const itemToUpdate = state.find((item) => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.amount = amount;
      }
    },
  },
});

const { reducer, actions } = cartSlice;
export const { addProduct, removeProduct, emptyCart, updateQuantity } = actions;
export default reducer;
