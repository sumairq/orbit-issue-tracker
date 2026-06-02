import React from 'react';
import PropTypes from 'prop-types';

import toast from 'shared/utils/toast';
import useApi from 'shared/hooks/api';
import { Form } from 'shared/components';

import { FormElement, FormHeading, FormSubHeading, Actions, ActionButton } from './Styles';

const propTypes = {
  fetchProject: PropTypes.func.isRequired,
  fetchBoards: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const BoardCreate = ({ fetchProject, fetchBoards, onCreate, modalClose }) => {
  const [{ isCreating }, createBoard] = useApi.post('/projects');

  return (
    <Form
      enableReinitialize
      initialValues={{
        name: '',
        description: '',
      }}
      validations={{
        name: [Form.is.required(), Form.is.maxLength(100)],
      }}
      onSubmit={async (values, form) => {
        try {
          await createBoard(values);
          // The new board is set active server-side; refresh both the active
          // board and the switcher list, then drop the user into it.
          await fetchProject();
          await fetchBoards();
          toast.success('Board created. Time to add your first issue!');
          onCreate();
        } catch (error) {
          Form.handleAPIError(error, form);
        }
      }}
    >
      <FormElement>
        <FormHeading>Create board</FormHeading>
        <FormSubHeading>Name the project you want to track.</FormSubHeading>

        <Form.Field.Input
          name="name"
          label="Board name"
          tip="A short name for the project, e.g. “Mobile App” or “Q3 Marketing”."
        />
        <Form.Field.Textarea
          name="description"
          label="Description"
          tip="Optionally describe what this board is for."
        />

        <Actions>
          <ActionButton type="submit" variant="primary" isWorking={isCreating}>
            Create board
          </ActionButton>
          <ActionButton type="button" variant="empty" onClick={modalClose}>
            Cancel
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};

BoardCreate.propTypes = propTypes;

export default BoardCreate;
