"use strict";
class Validator {
  empty(data) {
    let keys = Object.keys(data);
    let errors = {};
    keys.forEach(property => {
      if (data[property] === undefined || data[property].length === 0) {
        errors[property] = `${property} is required`;
      }
    });
    return errors;
  }
  minLength(input, length) {
    let keys = Object.keys(data);
    keys.forEach(property => {
      if (data[property] === undefined || data[property].length === 0) {
        errors[property] = `${property} Must be greater than ${length} chars`;
      }
    });
    return errors;
  }
  phoneNumber(phone) {
    const pattern = /^[0-9\-\+]{9,15}$/;
    return pattern.test(phone);
  }
}
module.exports = new Validator();
