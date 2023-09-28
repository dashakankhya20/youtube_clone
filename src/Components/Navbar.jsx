import React from 'react'
import { Stack, CardMedia, Avatar } from '@mui/material';
import { SearchBar } from './';


const Navbar = () => {

  return (
    <Stack direction="row" spacing={2}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "10px",
        position: "sticky",
        flexWrap: "nowrap",
        maxWidth: "100%",
        marginLeft: "20px",
        marginRight: "20px",
      }}
    >
      <Stack direction="row"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",

        }}>


        <CardMedia
          component="img"
          alt="YouTube Logo"
          image={`${process.env.PUBLIC_URL}/youtube_logo.png`}
          sx={{
            width: "100px",
            height: "auto",
            marginLeft: "15px"
          }}
        />

      </Stack>

      <Stack direction="row"
      >
        <SearchBar />

      </Stack>
      <Stack direction="row"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",

        }}
      >
        <Avatar alt="Your Logo" src="" sx={{ marginRight: "7px" }} />
      </Stack>

    </Stack>
  )
}

export default Navbar