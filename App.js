import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { fetchCartData, sendCartData } from "./components/store/index";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const toggle = useSelector((state) => state.showCart.showCart);
  debugger;
  const cart = useSelector((state) => state.cartstate);
  const notification = useSelector((state) => state.showCart.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

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
          message={notification.messages}
        />
      )}

      <Layout>
        {toggle && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
