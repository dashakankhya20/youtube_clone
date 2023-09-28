import React from 'react'
import { useState, useEffect } from 'react';
import { fetchFromAPI } from '../constants/fetchFromAPI';
import { Avatar } from '@mui/material';


const ChannelCard = ({ channelId, avatarHeight, avatarWidth }) => {
    const [ channelDetail, setChannelDetail ] = useState({});

    useEffect(() => {
        fetchFromAPI(`channel/home?id=${channelId}`)
        .then((response) => {
            setChannelDetail(response.meta)
        }).catch((error) => {
            console.log(`Error fetching data: ${error}`)
        })
    }, [channelId])

    const defaultAvatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYVx6CB56pxO8gwlzLLOkV8fPN0jfF3T_98w&usqp=CAU";
  
    return (
        channelDetail?.title && channelDetail?.avatar && (
        <Avatar 
        alt={channelDetail?.title || "Channel Title"}
        src={channelDetail?.avatar[2]?.url || defaultAvatar} 
        sx={{
          width:avatarWidth,
          height:avatarHeight,
        }}
        />
        )
  )
}

export default ChannelCard