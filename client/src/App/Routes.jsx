import React from 'react';
import { unstable_HistoryRouter as HistoryRouter, Routes, Route, Navigate } from 'react-router-dom';

import history from 'browserHistory';
import Project from 'Project';
import Authenticate from 'Auth/Authenticate';
import PageError from 'shared/components/PageError';

const AppRoutes = () => (
  <HistoryRouter history={history}>
    <Routes>
      <Route path="/" element={<Navigate to="/project" replace />} />
      <Route path="/authenticate" element={<Authenticate />} />
      <Route path="/project/*" element={<Project />} />
      <Route path="*" element={<PageError />} />
    </Routes>
  </HistoryRouter>
);

export default AppRoutes;
