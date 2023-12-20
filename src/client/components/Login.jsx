import React, { useState } from 'react';
import { Button, TextField, Typography, Paper, Container } from '@mui/material';
import { styled } from '@mui/system';
import Footer from './Footer';

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100vh',
  justifyContent: 'center',
});

const StyledPaper = styled(Paper)({
  padding: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  width: '300px', // Adjust width as needed
});

const StyledForm = styled('form')({
  width: '100%',
  marginTop: 1,
});

const StyledButton = styled(Button)({
  margin: '16px 0',
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();

      console.log('Server Response:', result); // Log the entire response

      if (!response.ok) {
        throw result;
      }

      if (result.token) {
        // Set the token to local storage
        localStorage.setItem('token', result.token);
        setToken(result.token);
        setMessage('Login successful'); // Update this line
      } else {
        throw new Error('Token not present in the response');
      }

      setEmail('');
      setPassword('');
    } catch (err) {
      console.error(`${err.name}: ${err.message}`);
      setMessage('Login failed. Please check your credentials.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <>
    <StyledContainer component="main" maxWidth="xs">
      <StyledPaper elevation={3}>
        <Typography variant="h5">Login</Typography>
        <StyledForm onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <StyledButton type="submit" fullWidth variant="contained" color="primary">
            Login
          </StyledButton>
        </StyledForm>
        <Typography variant="body2">{message}</Typography>
        {/* {token && <Typography variant="body2">Token: {token}</Typography>} */}
      </StyledPaper>
    </StyledContainer>
    <Footer />
    </>
  );
};

export default Login;
