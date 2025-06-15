import * as Yup from "yup";

export const loginValidation = Yup.object().shape({
  name: Yup.string().required("UserName or Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"
    )
    .required("Password is required"),
});

export const registerValidation = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9_])[a-zA-Z0-9_]{8,}$/,
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"
    )
    .required("UserName is required"),
  email: Yup.string()
    .email("Email should be valid")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"
    )
    .required("Password is required"),
});
