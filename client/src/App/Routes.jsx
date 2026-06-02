import React from 'react';
import { unstable_HistoryRouter as HistoryRouter, Routes, Route, Navigate } from 'react-router-dom';

import history from 'browserHistory';
import { getStoredAuthToken } from 'shared/utils/authToken';
import Project from 'Project';
import Login from 'Auth/Login';
import Register from 'Auth/Register';
import PageError from 'shared/components/PageError';

const PrivateRoute = ({ element }) => {
  if (!getStoredAuthToken()) {
    return <Navigate to="/" replace />;
  }
  return element;
};

const AppRoutes = () => (
  <HistoryRouter history={history}>
    <Routes>
      {/* Root is the login / signup screen */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Keep old auth paths working */}
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route path="/authenticate" element={<Navigate to="/" replace />} />
      <Route path="/project/*" element={<PrivateRoute element={<Project />} />} />
      <Route path="*" element={<PageError />} />
    </Routes>
  </HistoryRouter>
);

export default AppRoutes;
