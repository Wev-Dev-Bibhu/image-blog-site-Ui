import { Favorite, FavoriteBorder } from '@mui/icons-material'
// import axios from 'axios'
import React from 'react'

const LikeIcon = (props) => {

    const { setDisplayLike, heartClass, setHeartClass, value, color } = props

    // const url = "https://api.unsplash.com/photos/" + photoId + "/like/?client_id=jZzyQgWRoFrNGAU0f6rMlcb7MnV5R-3e7sJvl4BVxgU"
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
        // const response = await axios.post(url)
        // response.status === 200 ? console.log("Success"+ response) : console.warn("Fail");
        setDisplayLike(true)
        // console.log(url);
    }
    // const handleUserPhotos = async (userId) => {
    //     console.log(url);
    // }
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
