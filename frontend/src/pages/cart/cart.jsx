import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../../components/card/cartItem";
import CartContext from "../../store/cart-context";

const Cart = () => {
  const ctxCart = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="w-full p-5">
      <div className="text-3xl text-center text-gray-700 font-bold">
        Cart Items
      </div>
      <div className="flex flex-col justify-center items-center ">
        {ctxCart.items.length === 0 ? (
          <div className="p-10 text-2xl font-bold w-[600px] shadow-md text-center mt-6 rounded-lg">
            No items in cart.
          </div>
        ) : (
          <div>
            {ctxCart.items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
            <div className="my-5 h-16 w-[600px] shadow-md rounded-md flex items-center">
              <div className="text-2xl text-gray-700 font-semibold px-4">
                Total Amount: <span className="">${ctxCart.totalAmount}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full text-center text-lg text-white bg-blue-500 hover:bg-blue-400 rounded-md py-2 px-5"
            >
              Go To Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
