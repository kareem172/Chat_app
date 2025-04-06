import { Validator } from "./utils/validator.js";

const signupForm = document.getElementById("signup-form");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const cpasswordInput = document.getElementById("cpassword");

const validators = [
  Validator.setupValidation(usernameInput, Validator.validateName),
  Validator.setupValidation(emailInput, Validator.validateEmail),
  Validator.setupValidation(passwordInput, Validator.validatePassword),
  Validator.setupValidation(cpasswordInput, Validator.validateConfirmPassword, {
    passwordInput,
  }),
];

Validator.validateForm(signupForm, validators);
