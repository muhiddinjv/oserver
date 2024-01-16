import { parsePhoneNumberFromString } from 'libphonenumber-js';

const validatePhoneNumber = (phone_number: string): boolean => {
  try {
    const parsedPhoneNumber = parsePhoneNumberFromString(phone_number);
    return parsedPhoneNumber?.isValid() || false;
  } catch (error) {
    return false; // Handle parsing errors (invalid format, etc.)
  }
};

export default validatePhoneNumber;
