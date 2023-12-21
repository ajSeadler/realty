// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import HomeList from './HomeList';
import { Button, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import Footer from './Footer';

const StyledContainer = styled(Container)({
  margin: 'auto', // Set margin to auto for both left and right
  paddingTop: '40px', // Add padding at the top for better spacing
  color:'white'
});

const HeroSection = styled('div')({
  position: 'relative',
  overflow: 'hidden',
  height: '70vh',
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
  color: '#fff',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1,
});

const CtaButton = styled(motion(Button))({
  marginTop: '20px',
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
          <HeroImage src="/realtor.jpeg" alt="Hero" />
          <HeroText
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 1 }}
          >
            <Typography variant="h3" component="div" gutterBottom>
              Find Your Dream Home
            </Typography>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <CtaButton
                component={Button}
                variant="contained"
                color="primary"
              >
                Get Started
              </CtaButton>
            </Link>
          </HeroText>
        </HeroSection>

        <StyledContainer>
          <Typography variant="h2" component="div" gutterBottom>
            Welcome to Stunning Realty
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            Explore our wide range of properties and find the perfect home for
            you.
          </Typography>
          <HomeList />
        </StyledContainer>
      </div>
      <Footer />
    </>
  );
};

export default Home;
