import React, { useContext, useEffect, useState } from "react";
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
    const payload = {
      items: ctxCart.items,
      totalAmount: parseInt(ctxCart.totalAmount * 81),
      name: data.name,
      address: data.address,
      contact: data.phone,
    };
    displayRazorpay(payload);
    ctxCart.emptyCard();
    reset({
      name: "",
      address: "",
      phone: "",
    });
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (data) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("RazerPay SDK Fail to Load");
      return;
    }

    var options = {
      key: "rzp_test_a5X6TOAcia6N1e",
      amount: parseInt(data.totalAmount * 100),
      currency: "INR",
      name: "Fake Shop",
      description: "Thank you for choosing us.",
      handler: function (response) {
        handlePaymentVerification(response, data);
      },
      prefill: {
        name: data.name,
        contact: data.contact,
      },
      theme: {
        color: "#3399cc",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handlePaymentVerification = async (response, data) => {
    try {
      const payload = {
        ...data,
        payment_id: response.razorpay_payment_id,
      };
      await axios.post(`${url}/api/order/createOrder`, payload);
      swal({
        title: "Payment Success",
        text: "Thank you for Payment",
        icon: "success",
        button: "OK",
      });
    } catch (error) {
      swal({
        title: "Payment Failed",
        icon: "danger",
        button: "OK",
      });
    }
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
