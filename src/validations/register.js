const Joi = require("@hapi/joi");
const validateRegister = async (fileds) => {
  const schema = Joi.object()
    .keys({
      username: Joi.string()
        .required()
        .empty()
        .min(5)
        .max(20)
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.code) {
              case "string.empty":
                err.message = "Username is required";
                break;
              case "string.required":
                err.message = "Username is required";
                break;
              case "string.min":
                err.message = "Username must be at least 5 characters long";
                break;

              case "string.max":
                err.message = "Username cannot be empty";
                break;
            }
          });
          return errors;
        }),
      email: Joi.string().min(6).required().email(),

      password: Joi.string().min(3).max(15).required().label("Password"),
      confirmPassword: Joi.any()
        .equal(Joi.ref("password"))
        .required()
        .label("Confirm password")
        .options({ messages: { "any.only": "{{#label}} does not match" } }),
    })
    .options({ allowUnknown: true });

  const Validation = schema.validate(fileds);

  return Validation;
};
module.exports = validateRegister