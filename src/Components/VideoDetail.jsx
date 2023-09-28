import React from 'react'
import { useState, useEffect } from 'react';
import { Stack, Box, useMediaQuery, Typography } from '@mui/material';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { ChannelCard, VideoCard } from './';
import { fetchFromAPI } from "../constants/fetchFromAPI";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';



const VideoDetail = () => {
  const { videoId } = useParams();
  const isLaptopOrTablet = useMediaQuery('(min-width:900px)');
  const [videoDetail, setVideoDetail] = useState({});
  const [relatedVideos, setRelatedVideos] = useState([]);
  const isHomePage = false;

  useEffect(() => {
    fetchFromAPI(`related?id=${videoId}`)
      .then((response) => {
        setVideoDetail(response.meta)
        setRelatedVideos(response.data)
      })

  })


  const formatCount = (count) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M";
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    } else {
      return count.toString();
    }
  }

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  }

  return (
    videoDetail.channelTitle && videoDetail.title && (
      <div>
        <Stack direction={isLaptopOrTablet ? 'row' : 'column'}
          sx={{
            margin: "30px"
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flexStart",
              // justifyContent: "center",
              width: "100%",
              height: "auto",
              marginTop: "5px",
              padding: "5px",
              backgroundColor: "rgb(23, 23, 23)",
              // border:"1px solid red"
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: isLaptopOrTablet ? "460px" : "430px",
                position: "relative",
                overflow: "hidden"

              }}
            >
              <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`}
                controls={true}
                width="100%"
                height="100%"
                style={{ objectFit: "cover" }}

              />
            </Box>

            <Typography variant="h6" component="subtitle1"
              sx={{
                marginTop: "20px"
              }}
            >
              {videoDetail.title || "Demo Title"}
            </Typography>

            <Stack direction="row"
              sx={{
                marginTop: "5px",
                display: "flex",
                alignItems: "flexStart",
                justifyContent: "flexStart"
              }}
            >
              <ChannelCard channelId={videoDetail.channelId} />
              <Box
                sx={{
                  marginLeft: "10px"
                }}
              >
                {videoDetail.channelTitle || "Demo Channel Name"}

              </Box>
              <Box>
                <button
                  style={{
                    color: "black",
                    backgroundColor: "white",
                    border: "2px solid grey",
                    borderRadius: "20px",
                    marginLeft: "60px",
                    padding: "10px",
                    fontWeight: "bold",
                    width: "100px"
                  }}
                >
                  Subscribe
                </button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#272727",
                  padding: "9px",
                  marginLeft: "50px",
                  fontWeight: "bold",
                  borderRadius: "10px"
                }}
              >

                <ThumbUpIcon sx={{ color: "white", marginRight: "7px" }} />


                <Typography
                  sx={{
                    fontWeight: "bold"
                  }}
                >
                  {formatCount(videoDetail.likeCount)}
                </Typography>

              </Box>
            </Stack>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#272727",
                padding: "10px",
                borderRadius: "20px",
                marginTop: "20px",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}
              >
                {formatCount(videoDetail.viewCount) + " views" || "View Count"}
              </Typography>
              <Typography>
                {showFullDescription ? videoDetail.description : `${videoDetail.description.slice(0, 150)}...`}
              </Typography>
              {videoDetail.description.length > 150 && (
                <button
                  onClick={toggleDescription}
                  style={{
                    color: "white",
                    background: "transparent",
                    border: "none",
                    borderRadius: "5px",
                    marginTop: "10px",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  {showFullDescription ? 'Show Less' : 'Show More'}
                </button>
              )}
            </Box>
          </Box>
          {/* Related Videos Part */}
          <Stack direction="column"
            sx={{
              width: "70%",
              marginTop: "20px"
            }}
          >
            <Typography
              sx={{
                textAlign: 'center'
              }}
            >
              Related Videos
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flexStart",
              }}
            >
              {relatedVideos.map((video, index) => (
                <VideoCard video={video} idx={index} key={index} isHomePage={isHomePage} />
              ))}
            </Box>
          </Stack>
        </Stack>

      </div>
    )
  )
}

export default VideoDetail