import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, List, ListItem, ListItemText, Avatar } from '@mui/material';

const agentListStyle = {
  container: {
    display: 'flex',
    height:'85vh',
    justifyContent: 'center',
    padding: '50px',
    backgroundColor: '#f8f8f8',
  },
  innerContainer: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '1200px', // Adjust the max width as needed
    width: '100%',
  },
  leftContainer: {
    flex: 2,
    marginRight: '20px',
  },
  middleContainer: {
    flex: 4,
    margin: '0 20px',
  },
  rightContainer: {
    flex: 2,
    marginLeft: '20px',
  },
  listContainer: {
    maxHeight: '500px', // Adjust the max height as needed
    overflowY: 'auto',
  },
  header: {
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
  },
  card: {
    maxWidth: 400,
    marginBottom: '16px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.03)',
    },
  },
  avatar: {
    width: '64px',
    height: '64px',
  },
};

const AgentList = () => {
  const [agents, setAgents] = useState([]);

  // Your fetch function here...

  useEffect(() => {
    fetch('/api/agents')
      .then((response) => response.json())
      .then((data) => setAgents(data))
      .catch((error) => console.error('Error fetching agents:', error));
  }, []);

  return (
    <div style={agentListStyle.container}>
      <div style={agentListStyle.innerContainer}>
        <div style={agentListStyle.leftContainer}>
          <Card style={agentListStyle.card}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Tips for Home Buyers
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="1. Set a Budget"
                    secondary="Determine how much you can afford to spend on a home, including down payment and monthly mortgage."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="2. Research Neighborhoods"
                    secondary="Explore different neighborhoods to find the one that best fits your lifestyle and preferences."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="3. Get Pre-approved for a Mortgage"
                    secondary="Having a pre-approval letter strengthens your position when making an offer on a home."
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </div>
        <div style={agentListStyle.middleContainer}>
          <div style={agentListStyle.listContainer}>
            <List>
              {agents.map((agent) => (
                <Card key={agent.id} style={agentListStyle.card}>
                  <CardContent>
                    <ListItem>
                      <Avatar alt={agent.name} src={agent.image_url} style={agentListStyle.avatar} />
                      <ListItemText
                        primary={agent.name}
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="textSecondary">
                              {agent.email}
                            </Typography>
                            <br />
                            {agent.description}
                          </>
                        }
                      />
                    </ListItem>
                  </CardContent>
                </Card>
              ))}
            </List>
          </div>
        </div>
        <div style={agentListStyle.rightContainer}>
          <Card style={agentListStyle.card}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Choosing the Right Agent
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="1. Check Reviews and References"
                    secondary="Look for reviews and ask for references from past clients to assess an agent's reputation."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="2. Evaluate Experience"
                    secondary="Consider an agent's experience in the real estate market, especially in the specific area you are interested in."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="3. Communication is Key"
                    secondary="Choose an agent who communicates effectively, keeping you informed throughout the buying or selling process."
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AgentList;
