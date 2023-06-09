import { createAsyncThunk } from "@reduxjs/toolkit";

const url = "https://react-firebase-api-21ab1-default-rtdb.firebaseio.com";

export const fetchCartData = createAsyncThunk("cart/fetchData", async () => {
  const response = await fetch(`${url}/cart.json`);
  if (!response.ok) throw new Error();
  const data = await response.json();
  return {
    items: data?.items || [],
    totalQuantity: data?.totalQuantity || 0,
  };
});

export const sendCartData = createAsyncThunk("cart/sendData", async (cart) => {
  const config = {
    method: "PUT",
    body: JSON.stringify({
      items: cart.items,
      totalQuantity: cart.totalQuantity,
    }),
  };
  const response = await fetch(`${url}/cart.json`, config);
  if (!response.ok) throw new Error();
});
