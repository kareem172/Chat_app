export class Validator {
  static createErrorElement = () => {
    const error = document.createElement("span");
    error.className = "error-message hidden";
    return error;
  };
  static validateName = (value) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(value) ? "" : "Name should contain only letters";
  };

  static validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? "" : "Please enter a valid email address";
  };

  static validatePhone = (value) => {
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return phoneRegex.test(value) ? "" : "Please enter a valid phone number";
  };

  static validateAddress = (value) => {
    return value.trim().length >= 5
      ? ""
      : "Address should be at least 5 characters long";
  };

  static validatePassword = (value) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(value)
      ? ""
      : "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number";
  };

  static validateConfirmPassword = (value, password) => {
    return value === password ? "" : "Passwords do not match";
  };

  static setupValidation = (input, validateFn) => {
    const errorElement = Validator.createErrorElement();
    input.parentNode.insertBefore(errorElement, input.nextSibling);

    input.addEventListener("input", () => {
      const error = validateFn(input.value);
      errorElement.textContent = error;
      errorElement.classList.toggle("hidden", !error);
      input.style.borderColor = error ? "#ff4444" : "#5cbb60";
    });

    return () => validateFn(input.value);
  };
}
