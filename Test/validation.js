// function to validate name
export function nameValidation(name) {
  // check if input field is empty
  if (name.length === 0) {
      return false;
  }
  return true;
}

// function to validate email
export function emailValidation(email) {
  // Regular expression for validating email
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  // check if passes the regex
  if (!email.match(re)) {
      return false;
  }
  return true;
}

// function to validate password
export function passwordValidation(password) {
  // check if input field is empty
  if (password.length === 0) {
      return false;
  }
  return true;
}

// function to validate phone number
export function phoneNumberValidation(phone) {
  // Regular expression for validating phone number (8 to 15 digits)
  let re = /^\d{8,15}$/;

  // check if passes the regex
  if (!phone.match(re)) {
      return false;
  }
  return true;
}

// function to validate age
export function ageValidation(age) {
  // check if age is above 16
  if (age < 16) {
      return false;
  }
  return true;
}
