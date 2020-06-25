const Validator = require("validator");

const isEmpty = function(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
};

const validateLoginInput = async function(data) {
    let errors = {};

    const email = data.email ? data.email : "";
    const password = data.password ? data.password : "";

    if (Validator.isEmpty(email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(email)) {
        errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(password)) {
        errors.password = "Password field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = validateLoginInput;