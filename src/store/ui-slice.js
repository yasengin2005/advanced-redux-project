import { createSlice } from "@reduxjs/toolkit";
import { fetchCartData, sendCartData } from "./cart-actions"; 


const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false, notification: null },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.pending, (state) => {
        state.notification = {
          status: "",
          title: "Pending ...",
          message: "Fetching Books ...",
        };
      })
      .addCase(fetchCartData.fulfilled, (state) => {
        state.notification = {
          status: "success",
          title: "Success!",
          message: "Cart data fetched successfully!",
        };
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.notification = {
          status: "error",
          title: "Error!",
          message: action.error.message || "Fetch failed",
        };
      })
      .addCase(sendCartData.pending, (state) => {
        state.notification = {
          status: "",
          title: "Pending ...",
          message: "Sending Books ...",
        };
      })
      .addCase(sendCartData.fulfilled, (state) => {
        state.notification = {
          status: "success",
          title: "Success!",
          message: "Cart data sent successfully!",
        };
      })
      .addCase(sendCartData.rejected, (state, action) => {
        state.notification = {
          status: "error",
          title: "Error!",
          message: action.error.message || "Failed to send cart data!",
        };
      });
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
