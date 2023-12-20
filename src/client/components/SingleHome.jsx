// SingleHome.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Typography, Card, CardContent, Grid, Button } from "@mui/material";
import AgentModal from "./AgentModal";

const SingleHome = () => {
  const { id } = useParams();
  const [home, setHome] = useState(null);
  const [isAgentModalOpen, setAgentModalOpen] = useState(false);
  const [agentInfo, setAgentInfo] = useState({});

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const response = await fetch(`/api/homes/${id}`);
        const data = await response.json();
        setHome(data);
      } catch (error) {
        console.error("Error fetching home:", error);
      }
    };

    fetchHome();
  }, [id]);

  const handleOpenAgentModal = async () => {
    try {
      // Fetch agent details based on agent ID
      const agentResponse = await fetch(`/api/agents/${home.agent_id}`);
      const agentData = await agentResponse.json();

      // Set agent info for displaying in the modal

      setAgentInfo({
        name: agentData.name,
        email: agentData.email,
        phone_number: agentData.phone_number,
        image_url: agentData.image_url,
        // Add more details as needed
      });

      // Open the modal
      setAgentModalOpen(true);
    } catch (error) {
      console.error("Error fetching agent details:", error);
    }
  };

  const handleCloseAgentModal = () => {
    setAgentModalOpen(false);
  };

  if (!home) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  const contactAgentContent = (
    <div style={{ marginTop: "20px" }}>
      <Typography
        variant="h6"
        style={{ marginBottom: "10px", marginLeft: "1%" }}
      >
        Contact the Listing Agent
      </Typography>
      <Typography variant="body1" style={{ marginLeft: "1%" }}>
        Interested in this property? Contact our dedicated listing agent to
        schedule a viewing or get more information.
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        style={{ marginTop: "10px", marginLeft: "1%" }}
        onClick={handleOpenAgentModal}
      >
        Contact Agent
      </Button>
    </div>
  );

  const obtainHouseContent = (
    <div style={{ marginTop: "20px" }}>
      <Typography
        variant="h6"
        style={{ marginBottom: "10px", marginLeft: "1%" }}
      >
        How to Obtain This House
      </Typography>
      <Typography variant="body1" style={{ marginLeft: "1%" }}>
        Ready to make this house your home? Our team is here to assist you
        throughout the home-buying process. Contact us for financing options,
        assistance with paperwork, and to guide you every step of the way.
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        style={{ marginTop: "10px", marginLeft: "1%" }}
      >
        Get Started
      </Button>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxHeight: "100vh",
        marginTop: "15%",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card elevation={3} style={{ height: "100%", marginLeft: "2%" }}>
            <img
              src={home.image_url}
              alt={`House at ${home.address}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card
            elevation={3}
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              marginRight: "2%",
            }}
          >
            <CardContent>
              <Typography variant="h4">{home.address}</Typography>
              <Typography variant="h6">Price: ${home.price}</Typography>
              <Typography variant="body2">Bedrooms: {home.bedrooms}</Typography>
              <Typography variant="body2">
                Bathrooms: {home.bathrooms}
              </Typography>
              <Typography variant="body2">
                Square Feet: {home.square_feet}
              </Typography>
              <Typography variant="body2">
                Year Built: {home.year_built}
              </Typography>

              {/* Add more details as needed */}
            </CardContent>
            {contactAgentContent}
            {obtainHouseContent}
            <Button
              component={Link}
              to="/"
              variant="contained"
              color="primary"
              style={{ margin: "10px" }}
            >
              Back to Home
            </Button>
          </Card>
        </Grid>
      </Grid>
      {isAgentModalOpen && (
        <AgentModal agentInfo={agentInfo} onClose={handleCloseAgentModal} />
      )}
    </div>
  );
};

export default SingleHome;
