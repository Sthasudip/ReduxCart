import { configureStore, createSlice } from "@reduxjs/toolkit";

const initalShowCartState = { showCart: false, notification: null };

const showCartSlice = createSlice({
  name: "showCart",
  initialState: initalShowCartState,

  reducers: {
    toggle(state) {
      state.showCart = !state.showCart;
    },

    showNotification(state, action) {
      debugger;
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

const initialCartState = { totalquantity: 0, item: [], changed: false };

const cartStateSlice = createSlice({
  name: "cartstate",
  initialState: initialCartState,
  reducers: {
    replaceCart(state, action) {
      state.totalquantity = action.payload.totalquantity;
      state.item = action.payload.item;
    },
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.item.find((item) => item.id === newItem.id);
      state.changed = true;
      state.totalquantity++;
      if (!existingItem) {
        state.item.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalprice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity = existingItem.quantity + 1;
        existingItem.totalprice = existingItem.totalprice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const delItem = action.payload;
      const existingItem = state.item.find((item) => item.id === delItem);
      existingItem.totalprice = existingItem.totalprice - existingItem.price;
      state.totalquantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.item = state.item.filter((item) => item.id !== delItem);
        existingItem.quantity--;
      } else {
        existingItem.quantity--;
      }
    },
  },
});

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://bookorder-ee34f-default-rtdb.asia-southeast1.firebasedatabase.app/bookorder.json"
      );
      if (!response.ok) {
        throw new Error("Couldnt fetch data!");
      }
      const responseData = response.json();
      return responseData;
    };
    try {
      const cartData = await fetchData();
      dispatch(
        cartStateActions.replaceCart({
          item: cartData.item || [],
          totalquantity: cartData.totalquantity,
        })
      );
    } catch (error) {
      dispatch(
        showCartActions.showNotification({
          status: "error",
          title: "ERROR",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};
export const sendCartData = (cart) => {
  return (dispatch) => {
    dispatch(
      showCartActions.showNotification({
        status: "pending",
        title: "sending",
        message: "sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://bookorder-ee34f-default-rtdb.asia-southeast1.firebasedatabase.app/bookorder.json",
        {
          method: "PUT",
          body: JSON.stringify({
            item: cart.item,
            totalquantity: cart.totalquantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("sending data to cart failed");
      }
    };

    try {
      sendRequest();
      dispatch(
        showCartActions.showNotification({
          status: "success",
          title: "success!",
          message: "send cart data successfully",
        })
      );
    } catch (error) {
      dispatch(
        showCartActions.showNotification({
          status: "error",
          title: "ERROR!",
          message: "sending cart data failed",
        })
      );
    }
  };
};
const store = configureStore({
  reducer: {
    showCart: showCartSlice.reducer,
    cartstate: cartStateSlice.reducer,
  },
});

export const showCartActions = showCartSlice.actions;

export const cartStateActions = cartStateSlice.actions;

export default store;
