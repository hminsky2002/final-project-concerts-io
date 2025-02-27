import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Logout = (props) => {
  // log the user out by setting the user to a blank object
  // we assume that a setuser function has been passed as a prop to this component
  useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  // redirect the user to the home screen
  return <Navigate to="/" />;
};

export default Logout;
