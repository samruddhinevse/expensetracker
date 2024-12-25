import React, { useState } from 'react';
import styled from 'styled-components';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // For simplicity, login success is simulated. You can replace it with actual API calls.
    if (email && password) {
      onLogin();  // Simulate login success
    } else {
      alert("Please enter valid credentials");
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleLogin}>
        <h2>Login</h2>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </LoginForm>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const LoginForm = styled.form`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 300px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export default Login;
