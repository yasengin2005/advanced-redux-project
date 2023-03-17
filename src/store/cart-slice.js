import { createSlice } from '@reduxjs/toolkit';
import { fetchCartData } from './cart-actions';
 
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
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
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
      .addCase(fetchCartData.pending, (state) => {
        state.changed = false;
      })
      .addCase(fetchCartData.rejected, (state) => {
      state.changed = false;
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
      state.items = action.payload.items || [];
      state.totalQuantity = action.payload.totalQuantity || 0;
      state.changed = false});
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;

