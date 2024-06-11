import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import TelegramLogin from './TelegramAuth';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const handleAuth = (user) => {
    setCurrentUser(user);
  };

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Log in</h1>
      <TelegramLogin onAuth={handleAuth} />
    </div>
  );
};

export default Login;
