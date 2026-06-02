import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { Logo, Icon } from 'shared/components';
import { removeStoredAuthToken } from 'shared/utils/authToken';

import {
  Page,
  TopBar,
  Brand,
  BrandName,
  LogoutLink,
  Center,
  Card,
  IconBadge,
  Title,
  Description,
  CreateButton,
} from './Styles';

const propTypes = {
  onCreateBoard: PropTypes.func.isRequired,
};

const Onboarding = ({ onCreateBoard }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeStoredAuthToken();
    navigate('/');
  };

  return (
    <Page>
      <TopBar>
        <Brand>
          <Logo size={30} />
          <BrandName>Orbit</BrandName>
        </Brand>
        <LogoutLink type="button" onClick={handleLogout}>
          Log out
        </LogoutLink>
      </TopBar>

      <Center>
        <Card>
          <IconBadge>
            <Icon type="board" size={40} />
          </IconBadge>
          <Title>Plan your first board</Title>
          <Description>
            Orbit helps you track issues across a simple Kanban board — Backlog, Selected, In
            Progress and Done. Create a board for whatever you&apos;re working on to get started.
          </Description>
          <CreateButton variant="primary" icon="plus" onClick={onCreateBoard}>
            Create your first board
          </CreateButton>
        </Card>
      </Center>
    </Page>
  );
};

Onboarding.propTypes = propTypes;

export default Onboarding;
