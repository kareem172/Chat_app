import { Validator } from "./utils/validator.js";

const signinForm = document.querySelector("#signin-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

const validators = [
  Validator.setupValidation(emailInput, Validator.validateEmail),
  Validator.setupValidation(passwordInput, Validator.validatePassword),
];

Validator.validateForm(signinForm, validators);
