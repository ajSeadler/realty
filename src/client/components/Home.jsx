import React from 'react';
import HomeList from './HomeList';
import { Button, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';

const HeroSection = styled('div')({
  position: 'relative',
  overflow: 'hidden',
  height: '500px',
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

const HeroText = styled('div')({
  textAlign: 'center',
  color: '#fff',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1,
});

const CtaButton = styled(Button)({
  marginTop: '20px',
});

const Home = () => {
  return (
    <div className='home-land'>
      <HeroSection>
        <HeroImage src="/realtor.jpeg" alt="Hero" />
        <HeroText>
          <Typography variant="h3" component="div" gutterBottom>
          Find Your Dream Home
          </Typography>
          <CtaButton variant="contained" color="primary">
            Get Started
          </CtaButton>
        </HeroText>
      </HeroSection>

      <Container>
        <Typography variant="h2" component="div" gutterBottom>
          Welcome to Stunning Realty
        </Typography>
        <Typography variant="body1" component="div" gutterBottom>
          Explore our wide range of properties and find the perfect home for
          you.
        </Typography>
        <HomeList />
      </Container>
    </div>
  );
};

export default Home;
