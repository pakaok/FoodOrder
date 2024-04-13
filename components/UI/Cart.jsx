import { useContext } from "react";
import Modal from "./Modal";
import { CartContext } from "../../store/CartContext";
import { currencyFormatter } from "../../utils/currencyFormatter";
import Button from "./Button";
import { UserProgressContext } from "../../store/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const cartTotalPrice = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );
  function handleCloseCart() {
    userProgressCtx.hideCart();
  }
  function handleSubmit(){
    userProgressCtx.showCheckout()
  }
  return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"} onClose={userProgressCtx.progress==='cart' ? handleCloseCart : null}>
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={()=>cartCtx.addItem(item)}
            onDecrease={()=>cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total"> {currencyFormatter.format(cartTotalPrice)} </p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartCtx.items.length > 0 && <Button onClick={handleSubmit} >Go to checkout</Button>}
      </p>
    </Modal>
  );
}
