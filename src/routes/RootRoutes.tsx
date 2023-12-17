import React from 'react';
import { Route, Routes } from 'react-router';
import { RoutesMap } from './routesMap';
import Notes from '@/pages/Notes';
import SignIn from '@/pages/SignIn';

const RootRoutes = () => {
  return (
    <Routes>
      <Route path={RoutesMap.notes} element={<Notes />} />
      <Route path={RoutesMap.signIn} element={<SignIn />} />
    </Routes>
  );
};

export default RootRoutes;
