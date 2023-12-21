import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Modal,
  Backdrop,
  Fade,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { Email, Phone } from "@mui/icons-material";

const StyledListContainer = styled("div")({
  marginTop: "10px",
});

const StyledFavoriteCard = styled(Card)({
  width: "100%",
  marginBottom: "10px",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
});

const StyledCardMedia = styled(CardMedia)({
  width: "100%",
  height: "150px",
  borderRadius: "8px 8px 0 0",
  objectFit: "cover",
});

const StyledCardContent = styled(CardContent)({
  padding: "16px",
  textAlign: "left",
});

const StyledPriceTypography = styled(Typography)({
  fontWeight: "bold",
});

const StyledModalContent = styled(Box)({
  backgroundColor: "#fff",
  borderRadius: "8px",
  padding: "16px",
  textAlign: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

const StyledAgentImage = styled("img")({
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  objectFit: "cover",
  marginBottom: "16px",
});

const StyledRemoveButton = styled(Button)({
  border: '1px solid #2196f3',
  background: 'transparent',
  marginLeft: '10px',
  '&:hover': {
    background: '#ff0000',
    color: '#ffffff',
  },
});

const FavoritesList = ({ favorites, setFavorites }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedFavorite, setSelectedFavorite] = useState(null);
  const [agentInfo, setAgentInfo] = useState(null);

  const handleOpenModal = async (favorite) => {
    setSelectedFavorite(favorite);
    const agentResponse = await fetch(`/api/agents/${favorite.agent_id}`);
    const agentData = await agentResponse.json();
    setAgentInfo(agentData);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setAgentInfo(null);
  };

  const removeFavorite = async (homeId) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await fetch("/api/users/favorites/remove", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ homeId }),
        });

        if (response.ok) {
          window.location.reload();
          // If successful, remove the favorite from the local state
          // setFavorites((prevFavorites) =>
          //   prevFavorites.filter((favorite) => favorite.id !== homeId)
          // );
        }
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <StyledListContainer>
      <Typography variant="h5" gutterBottom>
        Favorites
      </Typography>
      {favorites.length > 0 ? (
        <Grid container spacing={2}>
          {favorites.map((favorite) => (
            <Grid item xs={12} sm={6} md={4} key={favorite.id}>
              <StyledFavoriteCard>
                <StyledCardMedia
                  component="img"
                  alt={`Image of ${favorite.address}`}
                  src={favorite.image_url}
                />
                <StyledCardContent>
                  <Typography variant="h6" gutterBottom>
                    {favorite.address}
                  </Typography>
                  <StyledPriceTypography variant="body1">
                    ${favorite.price}
                  </StyledPriceTypography>
                  <Typography variant="body1">
                    Bedrooms: {favorite.bedrooms}
                  </Typography>
                  <Typography variant="body1">
                    Bathrooms: {favorite.bathrooms}
                  </Typography>
                  <Typography variant="body1">
                    Square Feet: {favorite.square_feet}
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenModal(favorite)}
                  >
                    Contact Agent
                  </Button>

                  <StyledRemoveButton
                    color="primary"
                    onClick={() => removeFavorite(favorite.id)}
                  >
                    Remove Favorite
                  </StyledRemoveButton>
                </StyledCardContent>
              </StyledFavoriteCard>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">No favorites found.</Typography>
      )}

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <StyledModalContent>
            {agentInfo && (
              <div>
                <StyledAgentImage
                  src={agentInfo.image_url}
                  alt={`Image of ${agentInfo.name}`}
                />

                <Typography variant="h5">{agentInfo.name}</Typography>
                <Typography variant="body1">
                  <Email /> {agentInfo.email}
                </Typography>
                <Typography variant="body1">
                  <Phone /> {agentInfo.phone_number}
                </Typography>
              </div>
            )}
          </StyledModalContent>
        </Fade>
      </Modal>
    </StyledListContainer>
  );
};

export default FavoritesList;
