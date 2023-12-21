import React from 'react';
import { styled } from '@mui/system';

const FooterContainer = styled('footer')({
  backgroundColor: '#f8f8f8',
  color: '#333',
  padding: '40px 0',
  textAlign: 'center',
  width: '100%',
});

const FooterContent = styled('div')({
  maxWidth: '1200px',
  margin: '0 auto',
});

const FooterSection = styled('div')({
  marginBottom: '30px',
});

const FooterHeading = styled('h3')({
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0',
});

const FooterParagraph = styled('p')({
  fontSize: '16px',
  lineHeight: '1.5',
  margin: '0',
});

const FooterLinks = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '0px',
});

const FooterLink = styled('a')({
  color: '#0073bb',
  fontSize: '16px',
  margin: '0 10px',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          {/* <FooterHeading>Stunning Realty - Your Gateway to Dream Homes</FooterHeading> */}
          {/* <FooterParagraph>
            Welcome to Real Tea, where your journey to finding the perfect home begins. We strive to provide you with the most
            comprehensive and user-friendly real estate search experience.
          </FooterParagraph>
          <FooterParagraph>
            Explore a diverse range of properties, from cozy apartments to luxurious estates. Our intuitive search tools make it
            easy to discover homes that match your unique preferences and lifestyle.
          </FooterParagraph>
          <FooterParagraph>
            At Real Tea, we understand that a home is more than just a property; it's a place where memories are made. Let us
            guide you on your quest for the ideal dwelling, ensuring that every step of your real estate journey is seamless and
            enjoyable.
          </FooterParagraph>
          <FooterParagraph>
            Discover Real Tea today and embark on a delightful adventure to find the home that speaks to you. Your dream home
            awaits!
          </FooterParagraph> */}
        </FooterSection>
        <FooterSection>
          <FooterLinks>
            <FooterLink href="#">About Us</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
            <FooterLink href="#">Terms of Service</FooterLink>
            <FooterLink href="#">Privacy Policy</FooterLink>
          </FooterLinks>
        </FooterSection>
        <FooterSection>
          <FooterParagraph>&copy; 2023 Stunning Realty. All rights reserved. </FooterParagraph>
          <FooterParagraph>(This is a fake site for educational purposes) </FooterParagraph>
        </FooterSection>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
