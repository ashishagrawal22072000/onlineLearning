import React, { useEffect } from "react";
import { Form, Formik } from "formik";
import FormInput from "../../../components/form-input/index.js";
import { registerValidation } from "../../../validation/authValidation.js";

import Toast from "../../../components/toast.js";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../api/auth.js";
const Index = () => {
  const initialState = {
    username: null,
    email: null,
    password: null,
  };
  const navigate = useNavigate();
  const handleRegister = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const res = await auth.registerAccount(values);
      Toast(res?.data?.message, "success");
      setSubmitting(false);
      navigate("/");
    } catch (e) {
      console.log(e, "error");
      setSubmitting(false);
      Toast(e?.message || "Something went wrong", "error");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) navigate("/");
  }, []);
  return (
    <>
      <div className="container py-5 ">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-body">
                <h3 className="mb-4 text-center">Register</h3>
                <Formik
                  initialValues={initialState}
                  validationSchema={registerValidation}
                  onSubmit={handleRegister}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <Form>
                      <div>
                        <FormInput
                          name="username"
                          onChange={handleChange}
                          error={touched?.username && errors?.username}
                          value={values?.username}
                          placeholder={"Enter Username"}
                          type={"text"}
                          onBlur={handleBlur}
                        />
                      </div>

                      <div>
                        <FormInput
                          name="email"
                          onChange={handleChange}
                          error={touched?.email && errors?.email}
                          value={values?.email}
                          placeholder={"Enter Email"}
                          type={"email"}
                          onBlur={handleBlur}
                        />
                      </div>

                      <div>
                        <FormInput
                          name="password"
                          onChange={handleChange}
                          error={touched?.password && errors?.password}
                          value={values?.password}
                          placeholder={"Enter password"}
                          type={"password"}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="d-flex align-items-center justify-content-center">
                        <p>
                          alread have an account.
                          <Link to="/login">login</Link>
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-center">
                        <button
                          className="bg-dark text-light p-2"
                          disabled={isSubmitting}
                          type="submit"
                        >
                          Register
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
