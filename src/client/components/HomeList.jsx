// HomeList.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

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

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        List of Homes
      </Typography>
      <Grid container spacing={2}>
        {homes.map((home) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={home.id}>
            <Link to={`/homes/${home.id}`} style={{ textDecoration: 'none' }}>
              <Card elevation={3} style={{ height: '100%' }}>
                <img
                  src={home.image_url}
                  alt={`House at ${home.address}`}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6">{home.address}</Typography>
                  <Typography variant="subtitle1">Price: ${home.price}</Typography>
                  <Typography variant="body2">Bedrooms: {home.bedrooms}</Typography>
                  <Typography variant="body2">Bathrooms: {home.bathrooms}</Typography>
                  <Typography variant="body2">Square Feet: {home.square_feet}</Typography>
                  <Typography variant="body2">Year Built: {home.year_built}</Typography>
                  {/* Add more details as needed */}
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomeList;
