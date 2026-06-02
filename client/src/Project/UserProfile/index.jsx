import React from 'react';

import useApi from 'shared/hooks/api';
import toast from 'shared/utils/toast';
import { Form, Breadcrumbs, PageLoader, PageError } from 'shared/components';

import { FormCont, FormElement, FormHeading, AvatarPreview, ActionButton } from './Styles';

const UserProfile = () => {
  const [{ data, error }, fetchCurrentUser] = useApi.get('/currentUser');
  const [{ isUpdating }, updateCurrentUser] = useApi.put('/currentUser');

  if (!data) return <PageLoader />;
  if (error) return <PageError />;

  const { currentUser } = data;

  return (
    <Form
      initialValues={Form.initialValues(currentUser, get => ({
        name: get('name'),
        email: get('email'),
        avatarUrl: get('avatarUrl'),
      }))}
      validations={{
        name: [Form.is.required(), Form.is.maxLength(100)],
        email: [Form.is.required(), Form.is.email(), Form.is.maxLength(200)],
      }}
      onSubmit={async (values, form) => {
        try {
          await updateCurrentUser(values);
          await fetchCurrentUser();
          toast.success('Profile updated successfully.');
        } catch (err) {
          Form.handleAPIError(err, form);
        }
      }}
    >
      <FormCont>
        <FormElement>
          <Breadcrumbs items={['Account', 'Profile']} />
          <FormHeading>Your Profile</FormHeading>

          <AvatarPreview
            src={currentUser.avatarUrl}
            alt={currentUser.name}
            onError={e => {
              e.target.style.display = 'none';
            }}
          />

          <Form.Field.Input name="name" label="Full Name" />
          <Form.Field.Input name="email" label="Email" />
          <Form.Field.Input name="avatarUrl" label="Avatar URL" tip="Paste a publicly accessible image URL." />

          <ActionButton type="submit" variant="primary" isWorking={isUpdating}>
            Save changes
          </ActionButton>
        </FormElement>
      </FormCont>
    </Form>
  );
};

export default UserProfile;
