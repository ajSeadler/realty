// HomesList.js
import React, { useState, useEffect } from "react";
import { TextField, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { styled } from '@mui/system';
import Footer from "./Footer";

const StyledContainer = styled('div')({
  padding: '20px',
  backgroundColor: '#001F3F',
  minHeight: '100vh',
});

const StyledCardContainer = styled('div')({
  maxWidth: 'auto',
  margin: 'auto',
});

const StyledSearchContainer = styled('div')({
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  marginBottom: '20px',
});

const StyledHeading = styled(Typography)({
  color: '#1a1a1a',
});

const StyledTextField = styled(TextField)({
  backgroundColor: '#f0f0f0',
});

const StyledCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '8px',
  overflow: 'hidden',
});

const StyledCardImage = styled('img')({
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
});

const StyledCardContent = styled(CardContent)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
  backgroundColor: '#fff',
});

const StyledButton = styled(Button)({
  backgroundColor: '#FF5733',
});

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
    <>
    <StyledContainer>
      <StyledCardContainer>
        <StyledSearchContainer>
          {/* <StyledHeading variant="h4" gutterBottom>
            Find Your Dream Home
          </StyledHeading> */}
          <StyledTextField
            label="Search by address"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleSearch}
          />
        </StyledSearchContainer>

        <Grid container spacing={3}>
          {filteredHomes.map((home) => (
            <Grid item key={home.id} xs={12} sm={6} md={4} lg={3}>
              <StyledCard elevation={3}>
                <StyledCardImage
                  src={home.image_url}
                  alt={`House at ${home.address}`}
                />
                <StyledCardContent>
                  <Typography variant="h6" style={{ marginBottom: '8px', color: '#333' }}>
                    {home.address}
                  </Typography>
                  <Typography variant="body1">{home.city}, {home.state}</Typography>
                  <Typography variant="body2" style={{ marginBottom: '8px', color: '#666' }}>
                    Bedrooms: {home.bedrooms} | Bathrooms: {home.bathrooms}
                  </Typography>
                  <Typography variant="body2" style={{ marginBottom: '16px', color: '#666' }}>
                    Price: ${home.price}
                  </Typography>
                  <StyledButton variant="contained" color="primary" fullWidth>
                    View Details
                  </StyledButton>
                </StyledCardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </StyledCardContainer>
    </StyledContainer>
    <Footer /> </>
  );
};

export default AllHomes;
