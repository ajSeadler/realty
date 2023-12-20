import React, { useEffect, useState } from 'react';
import { Typography, Paper, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)({
  padding: (theme) => theme.spacing(3),
  textAlign: 'center', // Center text
  margin: '20px', // Add margin for spacing
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add a subtle box shadow
});

const StyledLoadingContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '200px',
});

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token not found.');
          return;
        }

        const response = await fetch('http://localhost:3000/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          console.error(data.message);
          return;
        }

        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []); // Run the effect only once when the component mounts

  return (
    <StyledPaper>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>

      {loading ? (
        <StyledLoadingContainer>
          <CircularProgress />
        </StyledLoadingContainer>
      ) : userData ? (
        <div>
          <Typography variant="body1">Name: {userData.name}</Typography>
          <Typography variant="body1">Email: {userData.email}</Typography>
        </div>
      ) : (
        <Typography variant="body1">Failed to fetch user data.</Typography>
      )}
    </StyledPaper>
  );
};

export default Profile;
