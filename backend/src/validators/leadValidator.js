export const validateLeadInput = (data) => {
  const errors = {};

  const firstName = (data.firstName || '').trim();
  const lastName = (data.lastName || '').trim();
  const email = (data.email || '').trim().toLowerCase();
  const phone = (data.phone || '').trim();
  const city = (data.city || (data.address && data.address.city) || '').trim();
  const state = (data.state || (data.address && data.address.state) || '').trim();
  const postalCode = (data.postalCode || (data.address && data.address.postalCode) || '').trim();
  const street = (data.street || (data.address && data.address.street) || '').trim();
  
  // Accept both new fields and legacy form field names (studentType / areaOfInterest)
  const college = (data.college || data.studentType || '').trim();
  const course = (data.course || data.areaOfInterest || '').trim();
  
  const contactPermission =
    typeof data.contactPermission === 'boolean'
      ? data.contactPermission
      : data.contactPermission === 'Yes' || data.contactPermission === true;

  if (!firstName) {
    errors.firstName = 'First name is required';
  } else if (firstName.length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }

  if (!lastName) {
    errors.lastName = 'Last name is required';
  } else if (lastName.length < 1) {
    errors.lastName = 'Last name is required';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.email = 'Email address is required';
  } else if (!emailRegex.test(email)) {
    errors.email = 'Please provide a valid email address';
  }

  const phoneRegex = /^[+0-9\s\-()]{7,20}$/;
  if (!phone) {
    errors.phone = 'Phone number is required';
  } else if (!phoneRegex.test(phone)) {
    errors.phone = 'Please provide a valid phone number (at least 7 digits)';
  }

  if (!city) {
    errors.city = 'City is required';
  }

  if (!state) {
    errors.state = 'State is required';
  }

  if (!postalCode) {
    errors.postalCode = 'Postal code is required';
  }

  if (!college) {
    errors.college = 'College selection is required';
  }

  if (!course) {
    errors.course = 'Course selection is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      firstName,
      lastName,
      email,
      phone,
      address: {
        street,
        city,
        state,
        postalCode,
      },
      college,
      course,
      contactPermission,
    },
  };
};
