import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductItem from "./components/ProductItem";
import Loading from "./components/Loading/Loading";
import "./Home.css";

const Home = () => {
  const products = useSelector((state) => state.products);
  const length = products.length;

  const [visible, setVisible] = useState(9);
  const [showLoading, setShowLoading] = useState(true);
  const [allDataLoaded, setAllDataLoaded] = useState(false);

  const loadMore = () => {
    setVisible((prevState) => {
      if (prevState + 9 <= length) {
        return prevState + 9;
      } else {
        setAllDataLoaded(true);
        return length;
      }
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 1600);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <main>
      <header>
        {showLoading || length === 0 ? (
          <div></div>
        ) : (
          <div>
            <h1 className="naslov">Products</h1>
            <Link to="/product/add">Dodaj produkt</Link>
          </div>
        )}
      </header>
      <section>
        {showLoading || length === 0 ? (
          <Loading />
        ) : (
          products.slice(0, visible).map((product) => (
            <ProductItem key={product.id} item={product} />
          ))
        )}
      </section>
      <footer>
        {!showLoading && !allDataLoaded && length > visible && (
          <div className={"Od-do"}>
            <button onClick={loadMore}>Load more</button>
          </div>
        )}
      </footer>
    </main>
  );
};

export default Home;
