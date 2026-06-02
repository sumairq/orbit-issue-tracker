import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { ProjectCategoryCopy } from 'shared/constants/projects';
import { Icon, ProjectAvatar } from 'shared/components';

import {
  Sidebar,
  ProjectInfo,
  ProjectTexts,
  ProjectName,
  ProjectCategory,
  Divider,
  LinkItem,
  LinkText,
  SwitcherHeading,
  BoardItem,
  BoardItemText,
  CreateBoardItem,
  NotImplemented,
} from './Styles';

const propTypes = {
  project: PropTypes.object.isRequired,
  boards: PropTypes.array,
  onSwitchBoard: PropTypes.func.isRequired,
  onCreateBoard: PropTypes.func.isRequired,
};

const defaultProps = {
  boards: [],
};

const ProjectSidebar = ({ project, boards, onSwitchBoard, onCreateBoard }) => (
  <Sidebar>
    <ProjectInfo>
      <ProjectAvatar />
      <ProjectTexts>
        <ProjectName>{project.name}</ProjectName>
        <ProjectCategory>{ProjectCategoryCopy[project.category]} project</ProjectCategory>
      </ProjectTexts>
    </ProjectInfo>

    {renderLinkItem('Kanban Board', 'board', '/board')}
    {renderLinkItem('Project settings', 'settings', '/settings')}
    {renderLinkItem('My Profile', 'issues', '/profile')}

    <Divider />
    <SwitcherHeading>Your boards</SwitcherHeading>
    {boards.map(board => (
      <BoardItem
        key={board.id}
        type="button"
        isActive={board.id === project.id}
        onClick={() => onSwitchBoard(board.id)}
      >
        <Icon type="board" />
        <BoardItemText>{board.name}</BoardItemText>
      </BoardItem>
    ))}
    <CreateBoardItem type="button" onClick={onCreateBoard}>
      <Icon type="plus" />
      <BoardItemText>Create board</BoardItemText>
    </CreateBoardItem>

    <Divider />
    {renderLinkItem('Releases', 'shipping')}
    {renderLinkItem('Issues and filters', 'issues')}
    {renderLinkItem('Pages', 'page')}
    {renderLinkItem('Reports', 'reports')}
    {renderLinkItem('Components', 'component')}
  </Sidebar>
);

const renderLinkItem = (text, iconType, path) => {
  const isImplemented = !!path;

  const linkItemProps = isImplemented
    ? { as: NavLink, end: true, to: `/project${path}` }
    : { as: 'div' };

  return (
    <LinkItem {...linkItemProps}>
      <Icon type={iconType} />
      <LinkText>{text}</LinkText>
      {!isImplemented && <NotImplemented>Not implemented</NotImplemented>}
    </LinkItem>
  );
};

ProjectSidebar.propTypes = propTypes;
ProjectSidebar.defaultProps = defaultProps;

export default ProjectSidebar;
