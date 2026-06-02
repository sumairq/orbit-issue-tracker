import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from 'shared/utils/api';
import toast from 'shared/utils/toast';
import { storeAuthToken } from 'shared/utils/authToken';
import Logo from 'shared/components/Logo';

import {
  Page,
  Card,
  LogoRow,
  AppName,
  Heading,
  Subheading,
  FieldGroup,
  Label,
  Input,
  FieldError,
  SubmitButton,
  Divider,
  GuestButton,
  Footer,
  FooterLink,
} from './Styles';

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
    <Page>
      <Card>
        <LogoRow>
          <Logo size={32} />
          <AppName>Orbit</AppName>
        </LogoRow>

        <Heading>Welcome back</Heading>
        <Subheading>Sign in to your account to continue.</Subheading>

        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
            {errors.email && <FieldError>{errors.email}</FieldError>}
          </FieldGroup>

          <FieldGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            {errors.password && <FieldError>{errors.password}</FieldError>}
          </FieldGroup>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in…' : 'Sign In'}
          </SubmitButton>
        </form>

        <Divider>or</Divider>

        <GuestButton type="button" onClick={handleGuest} disabled={isSubmitting}>
          Continue as Guest
        </GuestButton>

        <Footer>
          Don&apos;t have an account? <FooterLink to="/register">Sign up</FooterLink>
        </Footer>
      </Card>
    </Page>
  );
};

export default Login;
