// Profile.js
import React, { useEffect, useState } from 'react';
import { Typography, Paper, CircularProgress, Avatar } from '@mui/material';
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

const StyledContentContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const StyledAvatar = styled(Avatar)({
  width: 100,
  height: 100,
  margin: '20px', // Margin around the Avatar
});

const StyledWelcomeMessage = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginTop: '3%',
});

const StyledEmail = styled(Typography)({
  fontSize: '1rem',
  color: '#555', // Adjust the color to your preference
  marginBottom: '0px',
});

const StyledUserInfoContainer = styled('div')({
  backgroundColor: '#f0f0f0',
  width:'100vh',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const StyledProfileContent = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  gap: '20px',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledProfileText = styled('div')({
  textAlign: 'left',
});

const StyledProfileImage = styled(StyledAvatar)({
  justifySelf: 'center',
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
      {loading ? (
        <StyledLoadingContainer>
          <CircularProgress />
        </StyledLoadingContainer>
      ) : userData ? (
        <StyledContentContainer>
           <StyledUserInfoContainer>
              <StyledWelcomeMessage variant="h4" gutterBottom>
                Welcome, {userData.name}!
              </StyledWelcomeMessage>

              <StyledProfileContent>
                <StyledAvatar alt={userData.name} src={userData.image_url}>
                  {userData.name.charAt(0)}
                </StyledAvatar>

                <StyledProfileText>
                  <StyledEmail variant="body1">{userData.email}</StyledEmail>
                  {/* Add more profile information here if needed */}
                </StyledProfileText>
              </StyledProfileContent>
            </StyledUserInfoContainer>
          {/* Use the FavoritesList component */}
          <StyledFavoritesContainer>
            <FavoritesList favorites={favorites} />
          </StyledFavoritesContainer>
        </StyledContentContainer>
      ) : (
        <Typography variant="h4">Failed to fetch user data, try logging in again.</Typography>
      )}
    </StyledPaper>
  );
};

export default Profile;
