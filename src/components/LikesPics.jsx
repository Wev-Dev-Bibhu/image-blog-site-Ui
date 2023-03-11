import { Avatar, Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL, handleDescription } from '../Helper/Common'

const LikesPics = () => {
    const { userID } = useParams()
    const [apiData, setApiData] = useState([])
    const getUserLikesPhotos = async () => {
        const resData = await axios.get(`${BASE_URL}/likedpics/${userID}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        setApiData(resData.data)
    }
    useEffect(() => {
        getUserLikesPhotos()
        // eslint-disable-next-line
    }, [])

    return (
        <Box sx={{
            // eslint-disable-next-line
            display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: 'center', ['@media (min-width: 1144px)']: {
                justifyContent: 'flex-start',
            }
        }}>
            {apiData && apiData.map((data) => {
                return <Box sx={{ m: 2 }} key={data.id}>
                    <Card sx={{ width: 345 }}>
                        <CardMedia
                            sx={{ height: 240 }}
                            image={data.image}
                        />
                        <CardContent sx={{ height: 45 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ width: 310 }}>
                                {data.description ? handleDescription(data.description) : handleDescription(data.alt_description)}
                            </Typography>
                            <Typography component="div" variant="body2" fontSize={14} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar alt={data.userName} src={data.userProfileImg} sx={{ mr: 1 }} />
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Typography variant='body2' color="text.secondary" sx={{ fontSize: '11px' }} >{data.userName} </Typography>
                                    <Typography variant='body2' color="text.secondary" sx={{ fontSize: '11px' }} >{new Date(data.updatedAt).toDateString()} </Typography>
                                </div>
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            })}
        </Box >)
}

export default LikesPics
