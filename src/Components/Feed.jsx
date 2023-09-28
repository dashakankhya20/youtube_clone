import React, { useEffect, useState } from 'react'
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Video } from './';
import { fetchFromAPI } from '../constants/fetchFromAPI';

const Feed = () => {
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetchFromAPI('home')
      .then((response) => {
        setCategory(response.filters);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [])

  const handleClick = (categoryText) => {
    if (categoryText) {
      setSelectedCategory(categoryText);
      navigate(`/search/${categoryText}`);
    }
  }

  return (
    <Stack direction="column">
      <Stack direction="row"
        className="scrolling-wrapper"
        sx={{
          width: "100%",
          alignItems: "flexStart",
          padding: "5px",
          marginBottom: "5px"
        }}
      >
        {category && category.map((item) => (
          <button
            key={item.filter}
            variant="contained"
            className="category-button"
            onClick={() => handleClick(item.filter)}
          >
            {item.filter}
          </button>
        ))}
        <button
          variant="contained"
          className="category-button"
          onClick={(e) => handleClick("Trending")}
        >
          Trending
        </button>
        <button
          variant="contained"
          className="category-button"
          onClick={(e) => handleClick("New")}
        >
          New
        </button>
      </Stack>
      <Video category={selectedCategory} />
    </Stack>
  )
}

export default Feed
