import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import Button from "../button/button";
import CartItem from "../cart-item/cart-item";
import { useNavigate } from "react-router-dom";
import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const onClickCheckout = () => {
    navigate("/checkout");
  };

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} item={item} />)
        ) : (
          <EmptyMessage>Your cart is empy</EmptyMessage>
        )}
      </CartItems>
      <Button buttonProps={{ type: "button", onClick: onClickCheckout }}>
        GO TO CHECKOUT
      </Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
