import React, { useState } from 'react';
import { Button, TextField, Typography, Paper, Container } from '@mui/material';
import { styled } from '@mui/system';
import Footer from './Footer';

// Relative path for the login image
import loginImage from '/public/images/loginimg.jpeg';

const GlobalStyles = styled('div')({
  body: {
    margin: 0,
    padding: 0,
  },
  '#root': {
    margin: 0,
    padding: 0,
  },
});

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  height: '100vh',
  justifyContent: 'center',
  backgroundImage: 'linear-gradient(to right, #001F3F, #FF5733)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white',
  margin: 0
});

const StyledPaper = styled(Paper)({
  padding: '30px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  width: '300px',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '15px',
});

const StyledForm = styled('form')({
  width: '100%',
  marginTop: '20px',
});

const StyledButton = styled(Button)({
  margin: '16px 0',
  backgroundColor: '#FF5733',
});

const StyledMessageContainer = styled('div')({
  margin: '5%',
  padding: '20px',
  maxWidth: '40%',
  backdropFilter: 'blur(5px)',
  backgroundColor: 'rgba( 160, 160, 160, 0.5)',
  borderRadius:'15px'
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

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

      console.log('Server Response:', result);

      if (!response.ok) {
        throw result;
      }

      if (result.token) {
        localStorage.setItem('token', result.token);
        setMessage('Login successful');
        window.location.replace('/profile');
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
      <GlobalStyles />
      <div className="login-pg">
        <StyledContainer component="main" maxWidth="100%">
          <StyledPaper elevation={3}>
            <StyledForm onSubmit={handleSubmit}>
              <Typography variant="h4" style={{ marginBottom: '20px', textAlign:'center' }}>
                Login
              </Typography>
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
            <Typography variant="body2" style={{ marginTop: '10px' }}>
              {message}
            </Typography>
          </StyledPaper>
          <StyledMessageContainer>
            <Typography variant="h4" style={{ marginBottom: '20px' }}>
              Discover Your Dream Home with Stunning Realty
            </Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fermentum
              euismod ultricies.
            </Typography>
          </StyledMessageContainer>
        </StyledContainer>
      </div>
      <Footer />
    </>
  );
};

export default Login;
