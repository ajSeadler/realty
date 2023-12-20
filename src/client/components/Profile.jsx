// Profile.js
import React, { useEffect, useState } from 'react';
import { Typography, Paper, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import FavoritesList from './FavoritesList'; // Import the new component

const StyledPaper = styled(Paper)({
  padding: (theme) => theme.spacing(3),
  textAlign: 'center',
  margin: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const StyledLoadingContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '200px',
});

const StyledFavoritesContainer = styled('div')({
  marginTop: '20px',
});

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token not found.');
          return;
        }

        // Fetch user data
        const userResponse = await fetch('http://localhost:3000/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = await userResponse.json();

        if (!userResponse.ok) {
          console.error(userData.message);
          return;
        }

        setUserData(userData);

        // Fetch user favorites
        const favoritesResponse = await fetch('http://localhost:3000/api/users/favorites', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const favoritesData = await favoritesResponse.json();

        if (!favoritesResponse.ok) {
          console.error(favoritesData.message);
          return;
        }

        setFavorites(favoritesData.favorites);
      } catch (error) {
        console.error('Error fetching user data and favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []); // Run the effect only once when the component mounts

  return (
    <StyledPaper>
      
      <Typography variant="h4" gutterBottom>
        Welcome!
      </Typography>

      {loading ? (
        <StyledLoadingContainer>
          <CircularProgress />
        </StyledLoadingContainer>
      ) : userData ? (
        <div>
          <Typography variant="body1">Hello, {userData.name}!</Typography>
          <Typography variant="body1">Email: {userData.email}</Typography>

          {/* Use the FavoritesList component */}
          <StyledFavoritesContainer>
            <FavoritesList favorites={favorites} />
          </StyledFavoritesContainer>
        </div>
      ) : (
        <Typography variant="body1">Failed to fetch user data.</Typography>
      )}
    </StyledPaper>
  );
};

export default Profile;
