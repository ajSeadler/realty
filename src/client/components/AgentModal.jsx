// AgentModal.jsx
import React from 'react';
import { Modal, Typography, Button, Box, Card, CardContent, Avatar } from '@mui/material';
import { Email, Phone } from '@mui/icons-material';

const AgentModal = ({ agentInfo, onClose }) => {
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    backgroundColor: '#fff',
    padding: '20px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
  };

  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  };

  const avatarStyle = {
    width: '100px',
    height: '100px',
    marginBottom: '10px',
  };

  return (
    <Modal open={true} onClose={onClose}>
      {/* Modal Content */}
      <Box sx={modalStyle}>
        <Card sx={cardStyle}>
          <Avatar alt={agentInfo.name} src={agentInfo.image_url} sx={avatarStyle} />
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {agentInfo.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <Email /> {agentInfo.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <Phone /> {agentInfo.phone_number}
            </Typography>
          </CardContent>
        </Card>
        <Button onClick={onClose} variant="outlined" color="primary" style={{ marginTop: '20px' }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default AgentModal;
