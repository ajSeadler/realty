import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

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

const ContentWithPadding = styled('div')({
  paddingTop: '50px', // Adjust the padding to match the height of your navbar
  // Add any additional styling for the content area
});

const NavBar = () => {
  return (
    <>
      <StyledNavBar>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/login">Login</StyledLink>
        <StyledLink to="/profile">Profile</StyledLink>
      </StyledNavBar>
      <ContentWithPadding>
        {/* Your page content goes here */}
      </ContentWithPadding>
    </>
  );
};

export default NavBar;
