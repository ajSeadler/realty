import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Import the ExitToApp icon

const StyledNavBar = styled('nav')({
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '16px',
  backgroundColor: '#333',
  color: '#fff',
  width: '100%',
  position: 'fixed',
  top: 0,
  zIndex: 1000,
});

const StyledLink = styled(Link)({
  color: '#fff',
  textDecoration: 'none',
  margin: '0 16px',
  '&:hover': {
    color: '#ccc',
  },
  marginRight: '2%',
});

const ExitToAppButton = styled('button')({
  background: 'none',
  border: 'none',
  color: '#fff',
  marginRight:'2%',
  cursor: 'pointer',
  '&:hover': {
    color: '#ccc',
  },
});

const ContentWithPadding = styled('div')({
  paddingTop: '50px', // Adjust the padding to match the height of your navbar
  // Add any additional styling for the content area
});

const NavBar = () => {
  const handleLogoutClick = () => {
    // Remove token from local storage
    localStorage.removeItem('token');
    // Reload the window to redirect to the login page
    window.location.reload();
  };

  return (
    <>
      <StyledNavBar>
        <StyledLink to="/">Home</StyledLink>
        {localStorage.getItem('token') ? (
          <>
            <StyledLink to="/profile">Profile</StyledLink>
            <ExitToAppButton onClick={handleLogoutClick}>
              <ExitToAppIcon />
            </ExitToAppButton>
          </>
        ) : (
          <>
            <StyledLink to="/register">Register</StyledLink>
            <StyledLink to="/login">Login</StyledLink>
          </>
        )}
      </StyledNavBar>
      <ContentWithPadding>{/* Your page content goes here */}</ContentWithPadding>
    </>
  );
};

export default NavBar;
