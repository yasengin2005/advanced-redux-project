import { createSlice } from '@reduxjs/toolkit';
import { fetchCartData } from './cart-actions';
//sendCartData is not used in this file, but it is used in the cart-actions.js file
 
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          totalPrice: newItem.price,
          quantity: 1,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData, (state) => {
        state.changed = false;
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
        state.totalQuantity = action.payload.totalQuantity || 0;
      })
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;

