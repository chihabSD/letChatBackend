const Joi = require("@hapi/joi");
const validateLogin = async (fileds) => {
  const schema = Joi.object()
    .keys({
      password: Joi.string()
        .required()
        .empty()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.code) {
              case "string.empty":
                err.message = "Password is required";
                break;
              case "string.required":
                err.message = "Password is required";
                break;
            
            }
          });
          return errors;
        }),
      email: Joi.string().min(6).required().email(),
    })
    .options({ allowUnknown: true });

  const Validation = schema.validate(fileds);

  return Validation;
};
module.exports = validateLogin