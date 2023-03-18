import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./store/cart-actions";

let isInitial = true; // this is a hack to prevent the useEffect() from running on the first render cycle

function App() {
  const dispatch = useDispatch(); 
  const showCart = useSelector((state) => state.ui.cartIsVisible); 
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => { 
    dispatch(fetchCartData());
  }, [dispatch]); // dispatch is a dependency because it is a function that is created by React and it is not guaranteed to be the same function on every render cycle

  useEffect(() => { 
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed) { 
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
