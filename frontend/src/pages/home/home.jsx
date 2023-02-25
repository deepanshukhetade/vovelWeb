import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../../components/card/card";
import { url } from "../../utils";

const Home = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const result = await axios.get(`${url}/api/product/getAllProduct`);
      setProduct(result.data.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      {/* <Header /> */}
      <div className="grid grid-cols-4 gap-4 p-5">
        {product && product.map((item) => <Card key={item.id} item={item} />)}
      </div>
    </>
  );
};

export default Home;
