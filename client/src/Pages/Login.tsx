import React from 'react';
import LoginContainer from '../components/Login/LoginContainer';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const handleLogin = (values: { username: string; password: string; remember: boolean }) => {
    console.log('User logged in:', values);
  };

  return (
    <div>
    <Link to="/main">
    <LoginContainer onLogin={handleLogin} />
    </Link>
    </div>
  );
};

export default Login;
