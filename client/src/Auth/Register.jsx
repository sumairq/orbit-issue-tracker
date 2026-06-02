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
  Footer,
  FooterLink,
} from './Styles';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
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
      const { authToken } = await api.post('/authentication/register', form);
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

  return (
    <Page>
      <Card>
        <LogoRow>
          <Logo size={32} />
          <AppName>Orbit</AppName>
        </LogoRow>

        <Heading>Create your account</Heading>
        <Subheading>Start managing your projects with Orbit.</Subheading>

        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Jane Smith"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
            />
            {errors.name && <FieldError>{errors.name}</FieldError>}
          </FieldGroup>

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
              placeholder="At least 8 characters"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
            {errors.password && <FieldError>{errors.password}</FieldError>}
          </FieldGroup>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account…' : 'Create Account'}
          </SubmitButton>
        </form>

        <Footer>
          Already have an account? <FooterLink to="/">Sign in</FooterLink>
        </Footer>
      </Card>
    </Page>
  );
};

export default Register;
