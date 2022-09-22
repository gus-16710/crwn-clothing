import { useContext } from "react";
import ProductCard from "../../components/product-card/product-card";
import { ProductContext } from "../../context/productContext";

import "./shop.scss";

const Shop = () => {
  const { products } = useContext(ProductContext);
  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default Shop;
