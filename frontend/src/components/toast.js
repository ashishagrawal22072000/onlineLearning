import React from "react";
import { toast } from "react-toastify";

const Toast = (message, type) => {
  return toast(message, {
    type,
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};
export default Toast;
