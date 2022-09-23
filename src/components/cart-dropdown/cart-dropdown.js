import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import Button from "../button/button";
import CartItem from "../cart-item/cart-item";
import { useNavigate } from "react-router-dom";
import "./cart-dropdown.scss";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const onClickCheckout = () => {    
    navigate("/checkout");
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {!cartItems.length && <p>No products</p>}
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <Button buttonProps={{ type: "button", onClick: onClickCheckout }}>
        GO TO CHECKOUT
      </Button>
    </div>
  );
};

export default CartDropdown;
