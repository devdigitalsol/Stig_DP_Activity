import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context';

const PrivateRoute = ({ element: Element }) => {
  const { isAuthenticated } = useContext(AppContext);


  return isAuthenticated ? <Element /> : <Navigate to="/" />;
};

export default PrivateRoute;