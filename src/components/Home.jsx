import { Box } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ImageBlog from './ImageBlog'
import jsonData from '../Json/JsonData.json'
import { Pagination } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'

const Home = ({ setProgress }) => {
    const cookie = new Cookies()
    const navigate = useNavigate()
    const [apiData, setApiData] = useState(jsonData)
    const [page, setPage] = useState(1)
    const apiUrl = `https://api.unsplash.com/photos/?client_id=jZzyQgWRoFrNGAU0f6rMlcb7MnV5R-3e7sJvl4BVxgU&page=${page}&per_page=12`

    async function getApiCall() {
        const response = await axios.get(apiUrl)
        if (response.status === 200) setApiData(response.data)
    }

    useEffect(() => {
        if (cookie.get('userID') && cookie.get('token')) {
            navigate(`/${cookie.get('userID')}`)
        } else {
            navigate("/")
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setProgress(70)
        setTimeout(() => {
            getApiCall()
        }, 500)
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            })
            setProgress(100)
        }, 600)
        // eslint-disable-next-line
    }, [page])

    const handlePageChange = (e, pageNo) => {
        setPage(pageNo)
    }
    return (<>
        <Box sx={{
            // eslint-disable-next-line
            display: "flex", flexDirection: "row", flexWrap: "wrap", pb: 4, justifyContent: 'center', ['@media (min-width: 1144px)']: {
                justifyContent: 'flex-start'
            }
        }}>
            {apiData && apiData.map((data) => {
                return <ImageBlog data={data} key={data.id} />
            })}
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Pagination color="warning" count={5} size="large" sx={{ mt: 2 }} onChange={handlePageChange} />
            </div>
        </Box >
    </>
    )
}

export default React.memo(Home)
