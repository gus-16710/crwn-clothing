import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import Button from "../button/button";
import "./product-card.scss";

const ProductCard = (props) => {
  const { product } = props;
  const { addItemToCart } = useContext(CartContext);

  const handleAddProduct = () => addItemToCart(product);

  return (
    <div className="product-card-container">
      <img src={product.imageUrl} alt={product.name} />
      <div className="footer">
        <span className="name">{product.name}</span>
        <span className="price">{product.price}</span>
      </div>
      <Button buttonType="inverted" buttonProps={{ onClick: handleAddProduct }}>
        Add to card
      </Button>
    </div>
  );
};

export default ProductCard;
