import React, { useContext, useEffect } from "react";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CartContext from "../../store/cart-context";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import { url } from "../../utils";

const schema = yup.object({
  name: yup.string().required("Name is required."),
  address: yup
    .string()
    .required("Address is required.")
    .min(5, "Address must be 5 characters long.")
    .max(255, "Address not more than 255 characters."),
  phone: yup
    .string()
    .required("Contact no. is required")
    .min(10, "Please enter valid contact number")
    .max(10, "Please enter valid contact number."),
});

const Checkout = () => {
  const ctxCart = useContext(CartContext);
  const navigate = useNavigate();
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (ctxCart.items.length === 0) {
      return navigate("/");
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      const payload = {
        items: ctxCart.items,
        totalAmount: ctxCart.totalAmount,
        name: data.name,
        address: data.address,
        contact: data.phone,
      };
      const result = await axios.post(`${url}/api/order/createOrder`, payload);
      swal("Success", "Order is successfully placed.", "success");
    } catch (error) {
      swal("Warning!", "Unable to create order!", "warning");
    }
    ctxCart.emptyCard();
    reset({
      name: "",
      address: "",
      phone: "",
    });
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center py-6 px-5">
      <div className="text-3xl text-gray-700 font-bold">Checkout Page</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[400px] mt-6 border p-4 rounded-md shadow-md"
      >
        <Controller
          name="name"
          defaultValue=""
          control={control}
          render={({ field, formState }) => (
            <div className="flex flex-col mb-4">
              <label htmlFor="name" className="mb-1 text-lg text-gray-600">
                Name
              </label>
              <input
                {...field}
                className="h-10 text-lg text-gray-500 rounded-md px-4 border border-gray-400 focus:outline-none"
              />
              <div className="text-sm text-rose-500">
                {formState.errors?.name?.message}
              </div>
            </div>
          )}
        />
        <Controller
          name="address"
          defaultValue=""
          control={control}
          render={({ field, formState }) => (
            <div className="flex flex-col mb-4">
              <label htmlFor="name" className="mb-1 text-lg text-gray-600">
                Address
              </label>
              <textarea
                {...field}
                rows={4}
                className="text-lg text-gray-500 rounded-md p-2 border border-gray-400 focus:outline-none"
              />
              <div className="text-sm text-rose-500">
                {formState.errors?.address?.message}
              </div>
            </div>
          )}
        />
        <Controller
          name="phone"
          defaultValue=""
          control={control}
          render={({ field, formState }) => (
            <div className="flex flex-col mb-4">
              <label htmlFor="name" className="mb-1 text-lg text-gray-600">
                Contact No.
              </label>
              <input
                {...field}
                className="h-10 text-lg text-gray-500 rounded-md px-4 border border-gray-400 focus:outline-none"
              />
              <div className="text-sm text-rose-500">
                {formState.errors?.phone?.message}
              </div>
            </div>
          )}
        />
        <button
          type="submit"
          className="w-full text-center text-lg text-white bg-blue-500 hover:bg-blue-400 rounded-md py-2 px-5"
        >
          Checkout
        </button>
      </form>
    </div>
  );
};

export default Checkout;
