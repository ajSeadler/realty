// HomesList.js

import React, { useState, useEffect } from "react";
import { TextField, Grid, Card, CardContent, Typography, Button } from "@mui/material";

const AllHomes = () => {
  const [homes, setHomes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch homes from the API endpoint
    const fetchHomes = async () => {
      try {
        const response = await fetch("/api/homes");
        const data = await response.json();
        setHomes(data);
      } catch (error) {
        console.error("Error fetching homes:", error);
      }
    };

    fetchHomes();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredHomes = homes.filter((home) =>
    home.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Find Your Dream Home
        </Typography>
        <TextField
          label="Search for a home"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleSearch}
          style={{ backgroundColor: '#fff' }}
        />
      </div>
      <div style={{ padding: "20px", backgroundColor: "#2196F3", color: '#333' }}>
      <Grid container spacing={3}>
        {filteredHomes.map((home) => (
          <Grid item key={home.id} xs={12} sm={6} md={4} lg={3}>
            <Card elevation={3}>
              <img
                src={home.image_url}
                alt={`House at ${home.address}`}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6">{home.address}</Typography>
                <Typography variant="body2">
                  Bedrooms: {home.bedrooms} | Bathrooms: {home.bathrooms}
                </Typography>
                <Typography variant="body2">Price: ${home.price}</Typography>
                <Button variant="contained" color="primary" fullWidth>
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
        
      </Grid>
      
    </div>
    
    </>
  );
};

export default AllHomes;
