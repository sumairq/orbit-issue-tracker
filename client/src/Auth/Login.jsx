import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from 'shared/utils/api';
import toast from 'shared/utils/toast';
import { storeAuthToken } from 'shared/utils/authToken';
import Spinner from 'shared/components/Spinner';

import AuthLayout from './AuthLayout';
import { TextField, PasswordField } from './Fields';
import { validateLogin } from './validate';
import { SubmitButton } from './Styles';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Client-side pre-check only — gives instant inline feedback. If it passes,
    // the exact same request fires as before (success path unchanged).
    const clientErrors = validateLogin(form);
    if (Object.keys(clientErrors).length) {
      setErrors(clientErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const { authToken } = await api.post('/authentication/login', form);
      storeAuthToken(authToken);
      navigate('/project');
    } catch (error) {
      if (error.data && error.data.fields) {
        setErrors(error.data.fields);
      } else {
        toast.error(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGuest = async () => {
    setIsSubmitting(true);
    try {
      const { authToken } = await api.post('/authentication/guest');
      storeAuthToken(authToken);
      navigate('/project');
    } catch (error) {
      toast.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      heading="Welcome back"
      subheading="Sign in to your Orbit workspace to continue."
      dividerLabel="or sign in with email"
      onGuest={handleGuest}
      busy={isSubmitting}
      switchPrompt="Don't have an account?"
      switchTo="/register"
      switchLabel="Sign up"
    >
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          id="email"
          name="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          disabled={isSubmitting}
        />
        <PasswordField
          id="password"
          name="password"
          label="Password"
          placeholder="••••••••"
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          disabled={isSubmitting}
        />
        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting && <Spinner size={18} color="#fff" />}
          {isSubmitting ? 'Signing in…' : 'Sign In'}
        </SubmitButton>
      </form>
    </AuthLayout>
  );
};

export default Login;
