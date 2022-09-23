import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import "./checkout-item.scss";

const CheckoutItem = (props) => {
  const { product } = props;

  const { removeItemToCart, incrementQuantityToCart, decrementQuantityToCart } =
    useContext(CartContext);

  const handleClickRemoveItem = () => removeItemToCart(product);
  const handleClickIncrementQuantity = () => incrementQuantityToCart(product);
  const handleClickDecrementQuantity = () => decrementQuantityToCart(product);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={product.imageUrl} alt={`${product.name}`} />
      </div>
      <span className="name">{product.name}</span>
      <span className="quantity">
        <div className="arrow" onClick={handleClickDecrementQuantity}>
          &#10094;
        </div>
        <span className="value">{product.quantity}</span>
        <div className="arrow" onClick={handleClickIncrementQuantity}>
          &#10095;
        </div>
      </span>
      <span className="price">{product.price}</span>
      <div className="remove-button" onClick={handleClickRemoveItem}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
