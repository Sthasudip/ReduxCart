import { useDispatch, useSelector } from "react-redux";
import { showCartActions } from "../store/index";
import classes from "./CartButton.module.css";

const CartButton = (props) => {
  const totalQuantity = useSelector((state) => state.cartstate.totalquantity);
  const dispatch = useDispatch();
  const showCartHandler = () => {
    dispatch(showCartActions.toggle());
  };
  return (
    <button className={classes.button} onClick={showCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
