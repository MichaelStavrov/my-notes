import React from 'react';
import { Route, Routes } from 'react-router';
import { RoutesMap } from './routesMap';
import PrivateRoutes from '@/components/PrivateRoutes';
import Notes from '@/pages/Notes';
import AuthPage from '@/pages/AuthPage';

const RootRoutes = () => {
  return (
    <Routes>
      <Route
        path={RoutesMap.notes}
        element={
          <PrivateRoutes>
            <Notes />
          </PrivateRoutes>
        }
      />
      <Route path={RoutesMap.auth} element={<AuthPage />} />
    </Routes>
  );
};

export default RootRoutes;
