import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Card from "./components/Card";

const AppLayOut = ({ limit }) => {
  const [products, setProducts] = useState();
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [activePage]);

  const fetchProducts = async () => {
    const data = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${
        (activePage - 1) * 10
      }`
    );
    const json = await data.json();
    setProducts(json.products);
    console.log(json.products);
  };

  const handlePageClick = (activePage) => {
    setActivePage(activePage);
  };

  const handleButtonClick = (val) => {
    if ((val === 1 && activePage !== 10) || (val === -1 && activePage !== 1)) {
      setActivePage(activePage + val);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap justify-evenly">
        {products ? (
          products.map((product) => {
            return <Card image={product.images[0]} title={product.title} />;
          })
        ) : (
          <h1>Loading.....</h1>
        )}
      </div>
      <div className="flex items-center justify-center mt-3">
        <div className="flex items-center justify-center">
          <button
            className={`text-lg bg-gray-300 text-black w-7 h-7 rounded-full text-center ${
              activePage === 1 ? "cursor-not-allowed" : ""
            }`}
            onClick={() => handleButtonClick(-1)}
          >
            {"<"}
          </button>
          {[...Array(10)].map((_, ind) => {
            return activePage === ind + 1 ? (
              <span
                className="bg-black text-white rounded-full inline-block w-7 h-7 m-2 text-center cursor-pointer"
                onClick={() => handlePageClick(ind + 1)}
              >
                {ind + 1}
              </span>
            ) : (
              <span
                className="bg-gray-300 text-black rounded-full inline-block w-7 h-7 m-2 text-center cursor-pointer"
                onClick={() => handlePageClick(ind + 1)}
              >
                {ind + 1}
              </span>
            );
          })}
          <button
            className={`text-lg bg-gray-300 text-black w-7 h-7 rounded-full text-center ${
              activePage === 10 ? "cursor-not-allowed" : ""
            }`}
            onClick={() => handleButtonClick(1)}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayOut limit={10} />);