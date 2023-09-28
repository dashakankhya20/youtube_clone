import React, { useEffect, useState } from "react";
import { Box, Stack } from '@mui/material';
import { VideoCard } from './';
import { fetchFromAPI } from "../constants/fetchFromAPI";

const Video = ({ category }) => {
    const [videos, setVideos] = useState([]);
    const isHomePage = true;

    useEffect(() => {
        fetchFromAPI(`search?query=${category}`)
            .then((response) => {
                setVideos(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, [category]);

    return (
        <Stack direction="column">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "flexStart",
                    justifyContent: "center",
                }}
            >
                {videos.map((video, index) => (
                    <VideoCard video={video} idx={index} key={index} isHomePage={isHomePage} />
                ))}
            </Box>
        </Stack>
    )
}

export default Video;
