import { createContext, useEffect, useReducer } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase";

export const CATEGORIES_ACTION_TYPES = {
  SET_CATEGORIES_MAP: "SET_CATEGORIES_MAP",
};

const categoriesReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP:
      return {
        ...state,
        categoriesMap: payload,
      };

    default:
      throw new Error(`Unhandled type ${type} in categoriesReducer`);
  }
};

export const CategoriesContext = createContext({
  products: {},
});

const INITIAL_STATE = {
  categoriesMap: {},
};

export const CategoriesProvider = (props) => {
  const [{ categoriesMap }, dispatch] = useReducer(
    categoriesReducer,
    INITIAL_STATE
  );

  const value = { categoriesMap };

  useEffect(() => {
    (async () => {
      const categoryMap = await getCategoriesAndDocuments();

      dispatch({
        type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP,
        payload: categoryMap,
      });
    })();
  }, []);

  return (
    <CategoriesContext.Provider value={value}>
      {props.children}
    </CategoriesContext.Provider>
  );
};
