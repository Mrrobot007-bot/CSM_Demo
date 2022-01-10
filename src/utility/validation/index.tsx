const isValidCoordinates = require('is-valid-coordinates');

/** method used for email validation */
export const isValidEmail = (email: string, isRequired: boolean = false) => {
  if (!isRequired && (!email || email === '' || email === null)) {
    return true;
  } else {
    const reg = /^[A-Za-z0-9+_.-]+@(.+)$/;
    return reg.test(email);
  }
};

/** method returns whether the name is valid or not */
export const isValidName = (userText: string, isRequired: boolean = false) => {
  const text = userText ? userText.trim() : null;
  if (!isRequired && (!text || text === '' || text === null)) {
    return true;
  } else {
    const reg = /^[a-zA-Z0-9\s]+$/;
    if (
      text !== null &&
      text.length <= 50 &&
      text.length >= 3 &&
      reg.test(text)
    ) {
      return true;
    } else {
      return false;
    }
  }
};

/** method returns whether the Password is valid or not */
export const isValidPassword = (
  password: string,
  isRequired: boolean = false,
) => {
  const text = password ? password.trim() : null;

  if (!isRequired && (!text || text === '' || text === null)) {
    return true;
  } else {
    const reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (
      text !== null &&
      text.length <= 50 &&
      text.length >= 6 &&
      reg.test(text)
    ) {
      return true;
    } else {
      return false;
    }
  }
};

/** method returns whether the Password is valid or not */
export const isValidText = (
  textString: string,
  isRequired: boolean = false,
) => {
  const text = textString ? textString.trim() : null;

  if (!isRequired && (!text || text === '' || text === null)) {
    return true;
  } else {
    if (!text || text === '' || text === null) {
      return false;
    } else {
      return true;
    }
  }
};

/** method returns whether the Phone number is valid or not */
export const isValidPhone = (
  phoneNumber: string,
  isRequired: boolean = false,
) => {
  const text = phoneNumber ? phoneNumber.trim() : null;
  if (!isRequired && (!text || text === '' || text === null)) {
    return true;
  } else {
    if (text !== null && text.length === 10) {
      return true;
    } else {
      return false;
    }
  }
};

/** method returns whether the Date is valid or not */
export const isValidDate = (date: string, isRequired: boolean = false) => {
  const text = date ? date.trim() : null;
  if (!isRequired && (!text || text === '' || text === null)) {
    return true;
  } else {
    if (text !== null) {
      return true;
    } else {
      return false;
    }
  }
};

/** method returns whether the dob is valid or not */
export const isValidDob = (date: string, isRequired: boolean = false) => {
  const text = date ? date.trim() : null;
  if (!isRequired && (!text || text === '' || text === null)) {
    return true;
  } else {
    if (text !== null) {
      return true;
    } else {
      return false;
    }
  }
};

/** method returns whether the description text is valid or not */
export const isValidDescription = (
  description: string,
  isRequired: boolean = false,
) => {
  const text = description ? description.trim() : null;
  if (!isRequired && (!text || text === '' || text === null)) {
    return true;
  } else {
    if (text !== null && text.length > 10 && text.length < 500) {
      return true;
    } else {
      return false;
    }
  }
};

/** method returns whether the coordinates is valid or not */
export const isValidCoordinate = (lat: number, lng: number) => {
  if (lat === 0 || lng === 0) return false;
  return isValidCoordinates(lng, lat);
};
