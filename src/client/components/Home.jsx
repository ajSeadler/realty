// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import HomeList from './HomeList';
import SearchBar from './SearchBar';
import { Button, Container, Typography, AppBar, Toolbar, InputBase } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import Footer from './Footer';

const StyledContainer = styled(Container)({
  margin: 'auto',
  paddingTop: '40px',
  color: 'white',
});

const HeroSection = styled('div')({
  position: 'relative',
  overflow: 'hidden',
  height: '60vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const HeroImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const HeroText = styled(motion.div)({
  textAlign: 'center',
  backgroundColor: 'rgba(119, 119, 119, 0.5)',
  backdropFilter: 'blur(5px)',
  color: '#fff',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1,
  padding: '20px',
  borderRadius: '8px',
  width: '70%',
  maxWidth: 'auto',
});

const Navbar = styled(AppBar)({
  position: 'static',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: '10px 0',
});

const NavItem = styled(Link)(({ theme }) => ({
  margin: '0 20px',
  color: '#fff',
  cursor: 'pointer',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const SearchContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '20px',
});

const CtaButton = styled(motion(Button))({
  marginTop: '20px',
  backgroundColor: '#FF5733',
});

const ViewAllHomesButton = styled(Link)({
  textDecoration: 'none',
});

const Home = () => {
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      <div className='home-land'>
        <HeroSection>
          <HeroImage src="/images/newhero.jpg" alt="Hero" />
          <HeroText
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 1 }}
          >
            <Typography variant="h2" component="div" gutterBottom>
              Welcome to Stunning Realty
            </Typography>

            <Navbar>
              <NavItem to="/all-homes">Buy</NavItem>
              <NavItem to="/rent">Rent</NavItem>
              <NavItem to="/sell">Sell</NavItem>
              <NavItem to="/agents">Agents</NavItem>
            </Navbar>

            <SearchContainer>
              <SearchBar />
            </SearchContainer>

            <Link to="/login" style={{ textDecoration: 'none' }}>
              <CtaButton
                component={Button}
                variant="contained"
              >
                Get Started
              </CtaButton>
            </Link>
          </HeroText>
        </HeroSection>

        <StyledContainer>
          <Typography variant="h3" component="div" gutterBottom>
            Find Your Dream Home
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            Explore our wide range of properties and find the perfect home for
            you.
          </Typography>

          <ViewAllHomesButton to="/all-homes">
            <CtaButton
              component={Button}
              variant="contained"
              style={{ color: '#FF5733', backgroundColor: 'white' }}
            >
              View All Homes
            </CtaButton>
          </ViewAllHomesButton>
          <HomeList />
        </StyledContainer>
      </div>
      <Footer />
    </>
  );
};

export default Home;
