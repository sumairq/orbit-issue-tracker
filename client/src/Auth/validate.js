/**
 * Lightweight, presentation-only client validation for the auth forms.
 *
 * This runs BEFORE the API call purely to give instant inline feedback. It does
 * not change what gets sent or the success path — if it passes, the exact same
 * request fires as before, and the server's own field errors (e.g. "email already
 * exists", "Incorrect password.") still flow through and render inline.
 *
 * Each validator returns a `{ field: message }` map of only the fields that
 * failed, so `Object.keys(errors).length === 0` means "ok to submit".
 */

// Pragmatic email shape check — intentionally permissive (real validation is the
// server's job); this only catches obviously malformed input.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateLogin = ({ email, password }) => {
  const errors = {};
  if (!email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_RE.test(email.trim())) {
    errors.email = 'Enter a valid email address.';
  }
  if (!password) {
    errors.password = 'Password is required.';
  }
  return errors;
};

export const validateRegister = ({ name, email, password }) => {
  const errors = {};
  if (!name.trim()) {
    errors.name = 'Full name is required.';
  }
  if (!email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_RE.test(email.trim())) {
    errors.email = 'Enter a valid email address.';
  }
  if (!password) {
    errors.password = 'Password is required.';
  } else if (password.length < 8) {
    errors.password = 'Use at least 8 characters.';
  }
  return errors;
};
