import React, { useEffect } from 'react'
import ImageList from '@mui/material/ImageList'
import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { FormControl, MenuItem, Select, useMediaQuery, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import ExplorePhotos from './ExplorePhotos'

const Explore = () => {
    const { username, total } = useParams()
    const [orderBy, setOrderBy] = useState('latest')
    const [apiData, setApiData] = useState([])
    const theme = useTheme()
    const apiUrl = `https://api.unsplash.com/users/${username}/photos/?client_id=jZzyQgWRoFrNGAU0f6rMlcb7MnV5R-3e7sJvl4BVxgU&page=${1}&per_page=${total}&order_by=${orderBy}`
    const matchDownMd = useMediaQuery(theme.breakpoints.down('sm'))

    const makeUserProfilePhotosAxiosCall = async () => {
        const response = await axios.get(apiUrl)
        if (response.status === 200) setApiData(response.data)
    }
    useEffect(() => {
        makeUserProfilePhotosAxiosCall()
    }, [orderBy])
    const handleChange = (event) => {
        setOrderBy(event.target.value)
    }
    return (
        <>
            <Box sx={{ pt: 1, pr: matchDownMd ? 1 : 7, display: 'flex', justifyContent: 'flex-end' }}>
                <FormControl>
                    <Select
                        labelId="demo-select-small"
                        id="demo-simple-select"
                        value={orderBy}
                        onChange={handleChange}
                    >
                        <MenuItem value='latest'>Latest</MenuItem>
                        <MenuItem value='popular'>Popular</MenuItem>
                        <MenuItem value='oldest'>Oldest</MenuItem>
                        <MenuItem value='views'>Views</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box>
                <ImageList variant="masonry" cols={matchDownMd ? 1 : 3} gap={8} sx={{
                    pl: matchDownMd ? 1.5 : 7,
                    pr: matchDownMd ? 1.5 : 7
                }}>
                    {apiData.map((item) => (
                        <ExplorePhotos item={item} key={item.id} />
                    ))}
                </ImageList>
            </Box>
        </>
    )
}
export default memo(Explore)