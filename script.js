const form = document.getElementById("register-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const successMessage = document.getElementById("success-message");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  successMessage.style.display = "none";

  if (validateInputs()) {
    saveUser();
    showSuccess();
    form.reset();
    resetFields();
  }
});

function validateInputs() {
  let isValid = true;

  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value;
  const confirmPasswordValue = confirmPasswordInput.value;

  if (nameValue === "") {
    setError(nameInput, "Informe seu nome");
    isValid = false;
  } else {
    setSuccess(nameInput);
  }

  if (emailValue === "") {
    setError(emailInput, "Informe seu email");
    isValid = false;
  } else if (!isValidEmail(emailValue)) {
    setError(emailInput, "Email inválido");
    isValid = false;
  } else {
    setSuccess(emailInput);
  }

  if (passwordValue.length < 6) {
    setError(passwordInput, "Mínimo de 6 caracteres");
    isValid = false;
  } else {
    setSuccess(passwordInput);
  }

  if (confirmPasswordValue !== passwordValue || confirmPasswordValue === "") {
    setError(confirmPasswordInput, "As senhas não conferem");
    isValid = false;
  } else {
    setSuccess(confirmPasswordInput);
  }

  return isValid;
}

function setError(input, message) {
  const field = input.parentElement;
  const small = field.querySelector("small");

  input.className = "error";
  small.innerText = message;
  small.style.visibility = "visible";
}

function setSuccess(input) {
  const field = input.parentElement;
  const small = field.querySelector("small");

  input.className = "success";
  small.style.visibility = "hidden";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function saveUser() {
  const user = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
  };

  localStorage.setItem("user", JSON.stringify(user));
}

function showSuccess() {
  successMessage.style.display = "block";
}

function resetFields() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.className = "";
  });
}
