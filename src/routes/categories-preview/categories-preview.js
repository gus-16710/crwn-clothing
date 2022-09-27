import { useContext } from "react";
import CategoryPreview from "../../components/category-preview/category-preview";
import { CategoriesContext } from "../../context/categoriesContext";

import "./categories-preview.scss";

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  return (
    <>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </>
  );
};

export default CategoriesPreview;
