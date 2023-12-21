// HomeList.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return <ArrowBackIcon onClick={onClick} style={{ fontSize: '3rem', color: '#333', zIndex: 1, cursor: 'pointer', position: 'absolute', top: '50%', left: '-5%' }} />;
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return <ArrowForwardIcon onClick={onClick} style={{ fontSize: '3rem', color: '#333', zIndex: 1, cursor: 'pointer', position: 'absolute', top: '50%', right: '-5%' }} />;
};

const HomeList = () => {
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    // Fetch homes data when the component mounts
    const fetchHomes = async () => {
      try {
        const response = await fetch('/api/homes');
        const data = await response.json();
        setHomes(data);
      } catch (error) {
        console.error('Error fetching homes:', error);
      }
    };

    fetchHomes();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  };

  // Custom styles for dots
  const customDotStyles = {
    fontSize: '2.5rem', // Adjust the font size of the dots
  };

  const StyledPriceTypography = styled(Typography)({
    fontWeight: 'bold',
  });

  return (
    <>
      <div style={{ marginBottom: '0%', marginTop: '4%', position: 'relative' }}>
        <Slider {...settings}>
          {homes.map((home) => (
            <div key={home.id}>
              <Link to={`/homes/${home.id}`} style={{ textDecoration: 'none' }}>
                <Card elevation={3} style={{ height: '100%' }}>
                  <img
                    src={home.image_url}
                    alt={`House at ${home.address}`}
                    style={{ width: '100%', height: '150px', objectFit: 'cover' }} // Adjusted height for mobile
                  />
                  <CardContent>
                    <Typography variant="h6">{home.address}</Typography>
                    <StyledPriceTypography variant="body1">${home.price}</StyledPriceTypography>
                    <Typography variant="body2">Bedrooms: {home.bedrooms}</Typography>
                    <Typography variant="body2">Bathrooms: {home.bathrooms}</Typography>
                    <Typography variant="body2">Square Feet: {home.square_feet}</Typography>
                    <Typography variant="body2">Year Built: {home.year_built}</Typography>
                    {/* Add more details as needed */}
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </Slider>
        {/* commented out code is for mobile only - find a better UX solution */}
        <CardContent> <Typography></Typography></CardContent>
      </div>

      {/* Custom styles for dots */}
      <style>
        {`.slick-dots li button {
          ${Object.keys(customDotStyles).map((key) => `${key}: ${customDotStyles[key]};`).join(' ')}
        }`}
      </style>
    </>
  );
};

export default HomeList;
