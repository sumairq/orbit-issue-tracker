import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { FieldGroup, Label, InputWrap, Input, PasswordToggle, FieldError } from './Styles';

/* Shared aria wiring so every field associates its label + error consistently. */
const describedBy = (id, error) => (error ? `${id}-error` : undefined);

export const TextField = ({ id, name, label, type, value, onChange, error, disabled, ...rest }) => (
  <FieldGroup>
    <Label htmlFor={id}>{label}</Label>
    <InputWrap>
      <Input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        hasError={!!error}
        aria-invalid={!!error}
        aria-describedby={describedBy(id, error)}
        {...rest}
      />
    </InputWrap>
    {error && (
      <FieldError id={`${id}-error`} role="alert">
        {error}
      </FieldError>
    )}
  </FieldGroup>
);

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool,
};

TextField.defaultProps = {
  type: 'text',
  error: undefined,
  disabled: false,
};

export const PasswordField = ({ id, name, label, value, onChange, error, disabled, ...rest }) => {
  const [visible, setVisible] = useState(false);
  return (
    <FieldGroup>
      <Label htmlFor={id}>{label}</Label>
      <InputWrap>
        <Input
          id={id}
          name={name}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          disabled={disabled}
          hasError={!!error}
          hasToggle
          aria-invalid={!!error}
          aria-describedby={describedBy(id, error)}
          {...rest}
        />
        <PasswordToggle
          type="button"
          onClick={() => setVisible(v => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          tabIndex={disabled ? -1 : 0}
        >
          {visible ? 'Hide' : 'Show'}
        </PasswordToggle>
      </InputWrap>
      {error && (
        <FieldError id={`${id}-error`} role="alert">
          {error}
        </FieldError>
      )}
    </FieldGroup>
  );
};

PasswordField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool,
};

PasswordField.defaultProps = {
  error: undefined,
  disabled: false,
};
