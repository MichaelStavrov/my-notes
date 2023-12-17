import React from 'react';
import { Route, Routes } from 'react-router';
import { RoutesMap } from './routesMap';
import PrivateRoutes from '@/components/PrivateRoutes';
import Notes from '@/pages/Notes';
import SignIn from '@/pages/SignIn';

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
      <Route path={RoutesMap.signIn} element={<SignIn />} />
    </Routes>
  );
};

export default RootRoutes;
