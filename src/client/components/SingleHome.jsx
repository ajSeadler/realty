// SingleHome.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, Card, CardContent, Grid, Button } from '@mui/material';

const SingleHome = () => {
  const { id } = useParams();
  const [home, setHome] = useState(null);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const response = await fetch(`/api/homes/${id}`);
        const data = await response.json();
        console.log('Image URL:', data.image_url); // Log the image URL
        setHome(data);
      } catch (error) {
        console.error('Error fetching home:', error);
      }
    };
  
    fetchHome();
  }, [id]);
  
  

  if (!home) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', marginTop:'15%' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
        <Card elevation={3} style={{ height: '100%' }}>
                <img
                  src={home.image_url}
                  alt={`House at ${home.address}`}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card elevation={3} style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardContent>
              <Typography variant="h4">{home.address}</Typography>
              <Typography variant="h6">Price: ${home.price}</Typography>
              <Typography variant="body2">Bedrooms: {home.bedrooms}</Typography>
              <Typography variant="body2">Bathrooms: {home.bathrooms}</Typography>
              <Typography variant="body2">Square Feet: {home.square_feet}</Typography>
              <Typography variant="body2">Year Built: {home.year_built}</Typography>
              {/* Add more details as needed */}
            </CardContent>
            <Button component={Link} to="/" variant="contained" color="primary" style={{ margin: '10px' }}>
              Back to Home
            </Button>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default SingleHome;
