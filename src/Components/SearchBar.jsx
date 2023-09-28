import React, { useState } from 'react';
import { Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const onhandleSubmit = (e) => {
    e.preventDefault();
  }

  const handleClick = () => {
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm("");
    }
  }

  return (

    <Stack
      direction="row"
      sx={{
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: "10px",
        marginTop: "10px",

      }}
    >
      <input
        type="text"
        className='search_input'
        placeholder=' Search'
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <SearchIcon
        sx={{
          color: 'white',
          height: "35px",
          width: "40px",
          backgroundColor: 'rgb(90, 90, 90)',
          padding: "3px",
          borderTopRightRadius: '20px',
          borderBottomRightRadius: '20px',
          cursor: "pointer",
        }}
        onSubmit={onhandleSubmit}
        onClick={handleClick}
      />
    </Stack>
  );
};

export default SearchBar;
