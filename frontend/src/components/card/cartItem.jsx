import React, { useContext } from "react";
import CartContext from "../../store/cart-context";

const CartItem = ({ item }) => {
  const ctxCart = useContext(CartContext);
  const handleAdd = () => {
    ctxCart.addToCart({
      id: item.id,
      name: item.title,
      image: item.image,
      amount: 1,
      price: item.price,
    });
  };

  const handleRemove = () => {
    ctxCart.removeFromCart(item._id);
  };

  return (
    <div className="w-[600px] flex flex-row rounded-md shadow-md p-4">
      <div className="flex justify-center items-center">
        <img src={item.image} alt={item.title} width="100px" />
      </div>
      <div className="px-5 py-3">
        <div className="text-lg text-gray-700 font-semibold">{item.name}</div>
        <div className="py-2 text-md text-gray-500 font-medium">
          Price : <span className="text-gray-600">${item.price}</span>
        </div>
        <div className="flex flex-row items-center">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 cursor-pointer"
              onClick={handleRemove}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="px-1 text-md ">{item.amount}</div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 cursor-pointer"
              onClick={handleAdd}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
