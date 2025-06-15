import Joi from "joi";

class AuthValidator {
  ObjectIdSchema = Joi.string()
    .hex()
    .length(24)
    .message("Object ID not valid")
    .required();

  registerSchema = Joi.object().keys({
    username: Joi.string().required().messages({
      "any.required": `Username is required`,
    }),
    email: Joi.string()
      .lowercase()
      .email({ minDomainSegments: 2 })
      .required()
      .messages({
        "string.empty": `Please enter your Email`,
        "any.required": `Email Address is required`,
        "string.email": `Please enter correct Email Address`,
      }),

    password: Joi.string()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
      .max(30)
      .required()
      .messages({
        "string.empty": `Password cannot be empty`,
        "any.required": `Password is required`,
        "string.pattern.base": `The password should be minimum 8 characters long and contain at least one : Upper and Lower Case Alphabet, Number, Special Character. The special characters that can be used are [!""#$%&'()*+,-./:;<=>?@[\]^_|~]`,
        "string.max": "Password can be a maximum of 30 characters",
      }),
  });

  loginSchema = Joi.object().keys({
    name: Joi.string().required().messages({
      "any.required": `Username or Email is required`,
    }),

    password: Joi.string()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
      .max(30)
      .required()
      .messages({
        "string.empty": `Password cannot be empty`,
        "any.required": `Password is required`,
        "string.pattern.base": `The password should be minimum 8 characters long and contain at least one : Upper and Lower Case Alphabet, Number, Special Character. The special characters that can be used are [!""#$%&'()*+,-./:;<=>?@[\]^_|~]`,
        "string.max": "Password can be a maximum of 30 characters",
      }),
  });
}

export const { registerSchema, loginSchema } = new AuthValidator();
