import React from 'react'
import { CardContent, CardMedia, Typography, Stack, Box } from '@mui/material';
import { Link } from "react-router-dom";
import { ChannelCard } from "./";
const formatViewCount = (viewCount) => {
    if (viewCount >= 1000000) {
        return (viewCount / 1000000).toFixed(1) + "M";
    } else if (viewCount >= 1000) {
        return (viewCount / 1000).toFixed(1) + "K";
    } else {
        return viewCount.toString();
    }
}

const truncateTitle = (title) => {
    let newTitle = "";
    if (title.length > 60) {
        newTitle = title.slice(0, 50).concat("...");
    } else {
        newTitle = title;
    }
    return newTitle;
}

const VideoCard = ({ video, idx, isHomePage }) => {
    const isVideoType = video.type === "video";
    const homePageChannelTitle = video.channelTitle ? video.channelTitle.normalize() : "";
    if (isVideoType) {

        return (

            <Box key={idx}
                sx={{
                    height: isHomePage ? "300px" : "auto",
                    width: isHomePage ? "300px" : "100%",
                    margin: "10px",
                    background: "transparent",
                    // border: "1px solid rgb(42, 42, 42)"
                }}
            >
                <Stack direction={isHomePage ? "column" : "row"}>
                    <Link to={`/video/info/${video.videoId}`}>
                        <Box
                        sx={{
                            height: isHomePage ? "auto" : "200px",
                            width: isHomePage ? "100%" : "360px"
                        }}
                        >
                            <CardMedia
                                component="img"
                                alt={video.title || "Sample Video Title"}
                                image={(video.thumbnail && video.thumbnail[0] && (video.thumbnail[0].url)) || "./Sample_Thumbnail.png"}
                                sx={{
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    borderRadius: "20px",
                                    // border: "2px solid red",
                                    height:"100%",
                                    width:"100%"
                                }}
                            />
                        </Box>
                    </Link>
                    <CardContent sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flexStart",
                        justifyContent: "flexStart",
                        // flexWrap:"wrap",
                        color: "white"
                    }}>

                        {video.channelThumbnail && video.channelThumbnail[0] && isHomePage && (
                            <Link to={`/channel/home/${video.channelId}`}>

                                {/* <Avatar alt={video.channelTitle} src={video.channelThumbnail[0].url} 
                           sx={{
                               width:50,
                               height:50
                           }}
                       /> */}
                                <ChannelCard
                                    channelId={video?.channelId}
                                    avatarHeight="50px"
                                    avatarWidth="50px"
                                />
                            </Link>
                        )}

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flexStart",
                                justifyContent: "center",
                                flexWrap: "wrap"
                            }}
                        >
                            <Typography variant="subtitle2" component="h1" ml={2}
                                sx={{
                                    textOverflow: "ellipsis",
                                    color: "white"
                                }}
                            >
                                {(video.title && (truncateTitle(video.title))) || "Sample Title"}
                            </Typography>
                            <Typography variant="subtitle2" component="h6" color="grey" ml={2}>
                                {/* {(video.channelTitle || channelTitle) ? (video.channelTitle.normalize() && channelTitle.normalize()) : "Sample Title"} */}
                                {homePageChannelTitle || "Channel Title"}
                            </Typography>
                            <Typography variant="subtitle2" component="h6" color="grey" ml={2}>
                                {formatViewCount(video?.viewCount) + " views" || "View Count"}
                            </Typography>
                        </Box>

                    </CardContent>
                </Stack>

            </Box>
        )
    }
}
export default VideoCard;