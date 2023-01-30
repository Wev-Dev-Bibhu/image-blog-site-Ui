import { Favorite, FavoriteBorder } from '@mui/icons-material'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Cookies from 'universal-cookie'
import { BASE_URL } from '../Helper/Common'

const LikeIcon = (props) => {

    const { setDisplayLike, heartClass, setHeartClass, value, color, photoData } = props
    const cookie = new Cookies()
    // eslint-disable-next-line
    const [likedPhotos, setLikedPhotos] = useState({
        id: photoData.id,
        updatedAt: photoData.updated_at,
        description: photoData.description,
        altDescription: photoData.alt_description,
        userName: photoData.user.name,
        firstName: photoData.user.first_name,
        userProfileImg: photoData.user.profile_image.medium,
        image: photoData.urls.regular,
        username: cookie.get('userID')
    })

    const likePhotosAxiosCall = async () => {
        const json = JSON.stringify(likedPhotos)
        const response = await axios.post(`${BASE_URL}/like`, json, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        response.status === 200 ? console.log("Success" + response.data) : console.warn("Fail");
    }
    const disLikePhotosAxiosCall = async () => {
        // const json = JSON.stringify(likedPhotos)
        // console.log(json);
        // const response = await axios.post(`${BASE_URL}/like`, json, {
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // })
        // response.status === 200 ? console.log("Success" + response.data) : console.warn("Fail");
    }

    useEffect(() => {
        value ? likePhotosAxiosCall() : disLikePhotosAxiosCall()
        // eslint-disable-next-line
    }, [value])
    const handleDislike = () => {
        setHeartClass("insta-heart-dislike")
        setTimeout(() => {
            setHeartClass("")
        }, 300);
        setDisplayLike(false)
    }
    const handleLike = async () => {
        setHeartClass("insta-heart-like")
        setTimeout(() => {
            setHeartClass("")
        }, 1000);
        setDisplayLike(true)
        // console.log(url);
    }
    return (
        <>
            {value ?
                <Favorite className={heartClass} sx={{ color: color, cursor: 'pointer', mr: 1, ml: 1, fontSize: "29px" }} onClick={(e) => handleDislike()} size="small" />
                :
                <FavoriteBorder className={heartClass} sx={{ color: color, cursor: 'pointer', mr: 1, ml: 1, fontSize: "29px" }} onClick={(e) => handleLike()} size="small" />}
        </>
    )
}

export default LikeIcon
