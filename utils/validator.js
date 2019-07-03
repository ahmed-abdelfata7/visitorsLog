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
}
module.exports = new Validator();
