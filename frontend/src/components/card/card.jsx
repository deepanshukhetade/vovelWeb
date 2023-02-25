import React, { useContext } from "react";
import CartContext from "../../store/cart-context";

const Card = ({ item }) => {
  const ctxCart = useContext(CartContext);

  const handleAddtoCart = () => {
    ctxCart.addToCart({
      id: item._id,
      name: item.title,
      image: item.image,
      amount: 1,
      price: item.price,
    });
  };

  return (
    <div className="w-full bg-white shadow-md rounded-md p-4">
      <div className="flex justify-center items-center cursor-pointer">
        <img src={item.image} alt={item.title} width="200px" className="p-3" />
      </div>
      <div className="mt-3">
        <div className="text-lg text-gray-700 font-semibold">{item.title}</div>
        <div className="mt-1 flex flex-row justify-between items-center">
          <div className="text-gray-400 font-medium">
            Price: <span className="text-gray-600 text-lg ">${item.price}</span>
          </div>
          <button
            className="bg-rose-600 text-md text-white rounded-lg px-2 hover:bg-rose-400"
            onClick={handleAddtoCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
