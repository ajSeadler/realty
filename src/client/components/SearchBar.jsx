// SearchBar.jsx
import React from 'react';
import { InputBase } from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';

const SearchContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '20px',
});

const SearchBarStyled = styled(InputBase)({
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '4px',
  padding: '10px 20px', // Adjust padding for a wider search bar
  width: '500px', // Adjust width to fit your design preferences
  marginTop: '10px', // Add margin to separate from the navigation items
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
});

const SearchBar = () => {
  return (
    <SearchContainer>
      <SearchBarStyled
        placeholder="Search..."
        startAdornment={<SearchIcon />}
      />
    </SearchContainer>
  );
};

export default SearchBar;
