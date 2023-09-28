import React from 'react'
import { useEffect, useState } from 'react';
import { VideoCard, ChannelCard } from './';
import { useParams } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';
import { fetchFromAPI } from '../constants/fetchFromAPI';



const ChannelPage = () => {
    const [channelDetail, setChannelDetail] = useState({});
    // the naming should be same
    const { channelId } = useParams();
    const [videos, setVideos] = React.useState([]);

    useEffect(() => {
        fetchFromAPI(`channel/videos?id=${channelId}`)
            .then((response) => {
                setVideos(response.data)
                setChannelDetail(response.meta)
            }).catch((error) => {
                console.log(`Error fetching data: ${error}`);
            })
    })

    return (

        <Stack direction="column">
            <Box
                sx={{
                    height: "150px",
                    width: "100%",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: "blue",
                    backgroundImage: `url(${channelDetail?.banner && (channelDetail?.banner[4]?.url || '')})`

                }}
            />

            <Stack direction="row"
                sx={{
                    display: "flex",
                    alignItems: "flexStart",
                    justifyContent: "space-between",
                    marginTop: "30px",
                    marginLeft: "80px",
                    marginRight: "80px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around"
                    }}
                >
                    {/* <Avatar 
                src="./Sample_Banner_Image.png"
                sx={{
                    height:"150px",
                    width:"150px"
                }}
                /> */}
                    {/* <Typography>
                    {channelId}
                </Typography> */}
                    <ChannelCard
                        channelId={channelId}
                        avatarHeight="150px"
                        avatarWidth="150px"
                    />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flexStart",
                            flexDirection: "column",
                            marginLeft: "20px"
                        }}
                    >
                        <Typography variant="h5" component="h1">
                            {channelDetail?.title || "Channel Title"}
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "flexStart",
                                justifyContent: "flexStart",
                                marginTop: "8px",
                            }}
                        >
                            <Typography variant="subtitle1" component="h1"
                                sx={{
                                    color: "grey",
                                    marginRight: "7px"
                                }}
                            >
                                {channelDetail?.channelHandle || "Channel Handle"}
                            </Typography>
                            <Typography variant="subtitle1" component="h1"
                                sx={{
                                    color: "grey",
                                    marginRight: "7px"
                                }}
                            >
                                {channelDetail?.subscriberCountText || "Subscribers"} subscribers
                            </Typography>
                            <Typography variant="subtitle1" component="h1"
                                sx={{
                                    color: "grey",
                                    marginRight: "7px"
                                }}
                            >
                                {channelDetail?.videosCountText || "Video Count"} videos
                            </Typography>
                        </Box>
                        <Typography variant="subtitle1" component="h1"
                            sx={{
                                marginTop: "10px",
                                color: "grey",
                                textOverflow: "ellipsis"
                            }}
                        >
                            {channelDetail?.description ? `${channelDetail.description.slice(0, 60)}...` : ''}
                        </Typography>

                    </Box>
                </Box>
                <Box>
                    <button
                        style={{
                            color: "black",
                            backgroundColor: "white",
                            border: "2px solid grey",
                            borderRadius: "20px",
                            // marginLeft:"120px",
                            padding: "10px",
                            fontWeight: "bold",
                            width: "100px"
                        }}
                    >
                        Subscribe
                    </button>
                </Box>
            </Stack>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "flexStart",
                    justifyContent: "center",
                }}
            >
                {videos.map((item, idx) => (
                    <VideoCard video={item} key={idx}  />
                ))}
            </Box>

        </Stack>
    )
}

export default ChannelPage