import React, { Fragment, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../../store/Store";

import "./IzmjeniProduct.css";

const IzmjeniProduct = () => {
  const dispatch = useDispatch();
  let params = useParams();
  const id = params.id;

  const navigate = useNavigate();

  const products = useSelector((state) => state.products);
  const product = products.find((product) => product.id === parseInt(id));
  const pic = product ? product.thumbnail : null;

  const [title, setTitle] = useState(product ? product.title : "");
  const [description, setDescription] = useState(
    product ? product.description : ""
  );
  const [price, setPrice] = useState(product ? product.price : "");
  const [category, setCategory] = useState(product ? product.category : "");
  const [stock, setStock] = useState(product ? product.stock : "");
  const [discountPercentage, setDiscountPercentage] = useState(
    product ? product.discountPercentage : ""
  );

  const updateHandler = () => {
    const updatedProduct = {
      ...product,
      title: title,
      description: description,
      price: price,
      category: category,
      stock: stock,
      discountPercentage: discountPercentage,
    };

    fetch(`https://dummyjson.com/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(productActions.updateProduct(updatedProduct));
        navigate("/");
      })
      .catch((error) => {
        console.error("Greška prilikom ažuriranja proizvoda:", error);
      });
  };

  return (
    <Fragment>
      {pic && <img className="slika2" src={pic} alt="slika" />}
      <form>
        <div className="container">
          <input
            type="text"
            name="title"
            placeholder="Naslov"
            className="inputi"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            name="description"
            placeholder="Opis"
            className="inputi"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            name="price"
            placeholder="Cijena"
            className="inputi"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="text"
            name="category"
            placeholder="Kategorija"
            className="inputi"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="number"
            name="stock"
            placeholder="Preostalo"
            className="inputi"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          <input
            type="number"
            name="discountPercentage"
            placeholder="Popust"
            className="inputi"
            min="0"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
          />
        </div>
        <button type="button" onClick={updateHandler}>
          Edit product
        </button>
      </form>
    </Fragment>
  );
};

export default IzmjeniProduct;
