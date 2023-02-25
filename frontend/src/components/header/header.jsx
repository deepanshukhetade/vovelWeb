import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../store/cart-context";

const Header = () => {
  const ctxCart = useContext(CartContext);
  return (
    <div className="h-16 w-full bg-rose-50 flex flex-row items-center justify-between px-10 shadow-md mb-4">
      <Link to="/" className="text-xl text-gray-700 font-bold">
        Fake Shop
      </Link>
      <Link to="/cart" className="cursor-pointer relative">
        {ctxCart.items.length !== 0 && (
          <div className="absolute bg-red-600 rounded-full p-1.5 -right-1"></div>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      </Link>
    </div>
  );
};

export default Header;
