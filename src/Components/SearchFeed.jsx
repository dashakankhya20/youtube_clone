import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { fetchFromAPI } from '../constants/fetchFromAPI';
import { Box } from "@mui/material";
import { VideoCard } from './';

const SearchFeed = () => {
    const [videos, setVideos] = useState([]);
    const { searchTerm } = useParams();
    const isHomePage = false;

    useEffect(() => {
        fetchFromAPI(`search?query=${searchTerm}`)
            .then((response) => {
                setVideos(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    })

    return (

        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                margin: "20px"
            }}
        >
            {videos.map((video, index) => (
                <VideoCard video={video} idx={index} isHomePage={isHomePage} />
            ))}
        </Box>
    )
}

export default SearchFeed