import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { productActions } from "../../store/Store";

let i = 30;

const NoviProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [discount, setDiscount] = useState("");

  const addProductHandler = () => {
    if (
      title.trim() === "" ||
      description.trim() === "" ||
      price.trim() === "" ||
      category.trim() === "" ||
      stock.trim() === "" ||
      discount.trim() === ""
    ) {
      alert("Molimo unesite sve podatke");
      return;
    }

    i++;
    const addedProduct = {
      id: i,
      title: title,
      description: description,
      price: parseFloat(price),
      category: category,
      stock: parseInt(stock),
      discountPercentage: parseInt(discount),
    };

    fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addedProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(addedProduct);
        dispatch(productActions.addProduct(addedProduct));
        navigate("/");
      })
      .catch((error) => {
        console.log("Došlo je do greške:", error);
      });
  };

  return (
    <Fragment>
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
          name="discount"
          placeholder="Popust"
          className="inputi"
          min="0"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
      </div>
      <button onClick={addProductHandler}>Add Product</button>
    </Fragment>
  );
};

export default NoviProduct;
