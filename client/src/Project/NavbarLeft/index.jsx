import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { Icon, AboutTooltip } from 'shared/components';
import { useDarkMode } from 'shared/context/DarkMode';
import { removeStoredAuthToken } from 'shared/utils/authToken';

import { NavLeft, LogoLink, StyledLogo, Bottom, Item, ItemText } from './Styles';

const propTypes = {
  issueSearchModalOpen: PropTypes.func.isRequired,
  issueCreateModalOpen: PropTypes.func.isRequired,
};

const ProjectNavbarLeft = ({ issueSearchModalOpen, issueCreateModalOpen }) => {
  const { isDark, toggle } = useDarkMode();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeStoredAuthToken();
    navigate('/');
  };

  return (
    <NavLeft>
      <LogoLink to="/project">
        <StyledLogo color="#fff" />
      </LogoLink>

      <Item onClick={issueSearchModalOpen}>
        <Icon type="search" size={22} top={1} left={3} />
        <ItemText>Search issues</ItemText>
      </Item>

      <Item onClick={issueCreateModalOpen}>
        <Icon type="plus" size={27} />
        <ItemText>Create Issue</ItemText>
      </Item>

      <Bottom>
        <Item onClick={toggle}>
          <Icon type="stopwatch" size={20} top={1} left={2} />
          <ItemText>{isDark ? 'Light Mode' : 'Dark Mode'}</ItemText>
        </Item>
        <Item onClick={handleLogout}>
          <Icon type="arrow-left-circle" size={22} top={1} left={2} />
          <ItemText>Log Out</ItemText>
        </Item>
        <AboutTooltip
          placement="right"
          offset={{ top: -218 }}
          renderLink={linkProps => (
            <Item {...linkProps}>
              <Icon type="help" size={25} />
              <ItemText>About</ItemText>
            </Item>
          )}
        />
      </Bottom>
    </NavLeft>
  );
};

ProjectNavbarLeft.propTypes = propTypes;

export default ProjectNavbarLeft;
