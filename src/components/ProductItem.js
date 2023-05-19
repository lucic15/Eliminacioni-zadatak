import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { productActions } from "../store/Store";

import "./ProductItem.css";

const ProductItem = (props) => {
  let navigate = useNavigate();

  const product = props.item;
  const dispatch = useDispatch();

  const deleteHandler = () => {
    fetch(`https://dummyjson.com/products/${product.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(product.id);
        dispatch(productActions.deleteProduct(product.id));
      })
      .catch((error) => {
        console.log("Došlo je do greške:", error);
      });
  };

  return (
    <Fragment>
      <div className="block">
        <img src={product.thumbnail} alt="slika" className={"slika"} />
        <div className={"1"}>
          <p className={"mb2"}>{product.title}</p>
          <p className={"mb3"}>{product.category}</p>
          <p className={"mb4"}>${product.price}</p>
        </div>
        <section className={"col-4"}>
          <div className={"kartica"}>
            <button
              className={"detail"}
              onClick={() => {
                navigate(`/product/${product.id}`);
              }}
            >
              Pogledaj detalje
            </button>
            <button
              className={"edit"}
              onClick={() => {
                navigate(`/product/edit/${product.id}`);
              }}
            >
              Izmjeni
            </button>
            <button className={"delete"} onClick={deleteHandler}>
              Obriši
            </button>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default ProductItem;
