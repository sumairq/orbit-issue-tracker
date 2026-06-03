import React from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';

import useApi from 'shared/hooks/api';
import toast from 'shared/utils/toast';
import { updateArrayItemById } from 'shared/utils/javascript';
import { createQueryParamModalHelpers } from 'shared/utils/queryParamModal';
import { PageLoader, PageError, Modal } from 'shared/components';

import NavbarLeft from './NavbarLeft';
import Sidebar from './Sidebar';
import Board from './Board';
import Analytics from './Analytics';
import IssueSearch from './IssueSearch';
import IssueCreate from './IssueCreate';
import ProjectSettings from './ProjectSettings';
import UserProfile from './UserProfile';
import Onboarding from './Onboarding';
import BoardCreate from './BoardCreate';
import { ProjectPage } from './Styles';

const Project = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const issueSearchModalHelpers = createQueryParamModalHelpers('issue-search');
  const issueCreateModalHelpers = createQueryParamModalHelpers('issue-create');
  const boardCreateModalHelpers = createQueryParamModalHelpers('board-create');

  const [{ data, error, setLocalData }, fetchProject] = useApi.get('/project');
  const [{ data: boardsData }, fetchBoards] = useApi.get('/projects');
  const [, switchBoardApi] = useApi.post('/project/switch');

  if (!data) return <PageLoader />;
  if (error) return <PageError />;

  const { project } = data;
  const boards = boardsData ? boardsData.projects : [];

  const updateLocalProjectIssues = (issueId, updatedFields) => {
    setLocalData(currentData => ({
      project: {
        ...currentData.project,
        issues: updateArrayItemById(currentData.project.issues, issueId, updatedFields),
      },
    }));
  };

  const handleSwitchBoard = async projectId => {
    try {
      await switchBoardApi({ projectId });
      await fetchProject();
      navigate('/project/board');
    } catch (switchError) {
      toast.error(switchError);
    }
  };

  // Board-create modal is reachable both from the onboarding empty state and
  // from the sidebar switcher, so render it regardless of whether a board
  // is currently active.
  const boardCreateModal = boardCreateModalHelpers.isOpen() && (
    <Modal
      isOpen
      testid="modal:board-create"
      width={600}
      withCloseIcon={false}
      onClose={boardCreateModalHelpers.close}
      renderContent={modal => (
        <BoardCreate
          fetchProject={fetchProject}
          fetchBoards={fetchBoards}
          onCreate={() => {
            modal.close();
            navigate('/project/board');
          }}
          modalClose={modal.close}
        />
      )}
    />
  );

  // Brand-new account with no active board → onboarding empty state.
  if (!project) {
    return (
      <>
        <Onboarding onCreateBoard={boardCreateModalHelpers.open} />
        {boardCreateModal}
      </>
    );
  }

  const isAtProjectRoot = location.pathname === '/project' || location.pathname === '/project/';

  return (
    <ProjectPage>
      <NavbarLeft
        issueSearchModalOpen={issueSearchModalHelpers.open}
        issueCreateModalOpen={issueCreateModalHelpers.open}
      />

      <Sidebar
        project={project}
        boards={boards}
        onSwitchBoard={handleSwitchBoard}
        onCreateBoard={boardCreateModalHelpers.open}
      />

      {issueSearchModalHelpers.isOpen() && (
        <Modal
          isOpen
          testid="modal:issue-search"
          variant="aside"
          width={600}
          onClose={issueSearchModalHelpers.close}
          renderContent={() => <IssueSearch project={project} />}
        />
      )}

      {issueCreateModalHelpers.isOpen() && (
        <Modal
          isOpen
          testid="modal:issue-create"
          width={800}
          withCloseIcon={false}
          onClose={issueCreateModalHelpers.close}
          renderContent={modal => (
            <IssueCreate
              project={project}
              fetchProject={fetchProject}
              onCreate={() => navigate('/project/board')}
              modalClose={modal.close}
            />
          )}
        />
      )}

      {boardCreateModal}

      <Routes>
        <Route
          path="board/*"
          element={
            <Board
              project={project}
              fetchProject={fetchProject}
              updateLocalProjectIssues={updateLocalProjectIssues}
            />
          }
        />
        <Route path="analytics" element={<Analytics />} />
        <Route
          path="settings"
          element={<ProjectSettings project={project} fetchProject={fetchProject} />}
        />
        <Route path="profile" element={<UserProfile />} />
      </Routes>

      {isAtProjectRoot && <Navigate to="/project/board" replace />}
    </ProjectPage>
  );
};

export default Project;
