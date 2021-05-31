import { useDispatch } from "react-redux";
import { cartStateActions } from "../store";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const { title, quantity, total, price, id } = props.item;

  const dispatch = useDispatch();
  const addToCardHandler = () => {
    dispatch(cartStateActions.addToCart({ id, price, title }));
  };
  const removefromCartHandler = () => {
    dispatch(cartStateActions.removeItemFromCart(id));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removefromCartHandler}>-</button>
          <button onClick={addToCardHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
