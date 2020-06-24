const Validator = require("validator");

const isEmpty = function(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
};

const checkForEmail = function(email, connection) {
    const dbQuery = function(resolve, reject) {
        const queryString = "SELECT * FROM users WHERE email = ?";
        connection.query(queryString, [email], function(err, result) {
            if (result.length > 0) {
                return reject(false);
            }
            return resolve(true);
        });
    };
    return new Promise(dbQuery);
}

const validateRegisterInput = async function(data, connection) {
    const errors = {};

    const email = data.email ? data.email : "";
    const password = data.password ? data.password : "";
    const password2 = data.password2 ? data.password2 : "";

    if (Validator.isEmpty(email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(email)) {
        errors.email = "Email is invalid";
    }
    try {
        await checkForEmail(email, connection);
    } catch {
        errors.email = "Email already in use";
    }
    
    if (Validator.isEmpty(password)) {
        errors.password = "Password field is required";
    }

    if (!Validator.equals(password, password2)) {
        errors.password2 = "Passwords must match";
    }

    if (Validator.isEmpty(password2)) {
        errors.password2 = "Confirm password field is required";
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = validateRegisterInput;