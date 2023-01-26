import { Create } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React, { memo } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { BASE_URL } from '../Helper/Common'
import { useState } from 'react'
import Cookies from 'universal-cookie'


const About = ({ setProgress }) => {
    const navigate = useNavigate()
    const cookie = new Cookies();
    const { enqueueSnackbar } = useSnackbar();
    const [loadPage, setLoadPage] = useState(false)
    const [profileData, setProfileData] = useState({
        username: "",
        email: "",
        phone: "",
        gender: ""
    })

    const loadAboutPage = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/about?token=${cookie.get('token')}`, {
                withCredentials: true,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                onUploadProgress: (progressEvent) => {
                    const progress = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total));
                    setProgress(progress)
                }
            })
            const data = await res.data
            setProfileData({ ...profileData, username: data.username, email: data.email, phone: data.phone, gender: data.gender });
            setLoadPage(true)

        } catch (error) {
            navigate("/signin")
        }
    }

    useEffect(() => {
        if (cookie.get('token')) {
            loadAboutPage()
        } else {
            let variant = "error"
            enqueueSnackbar("Please login first !! ", { variant })
            navigate("/signin")
        }
        // eslint-disable-next-line
    }, [])

    const profileStyle = {
        background: '#112132',
        width: '80%',
        height: 400,
        p: 3,
        borderRadius: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // eslint-disable-next-line
        ['@media (max-width: 740px)']: {
            flexDirection: 'column',
            height: "100%"
        }
    }
    const innerBoxStyling = {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 0,
        paddingTop: 3,
        // eslint-disable-next-line
        ['@media (min-width: 740px)']: {
            paddingTop: 0,
            width: '50%'
        },
        m: 1,
        color: '#f2f2f2'
    }

    return (
        <>
            {loadPage && <Box sx={{ display: 'grid', placeItems: 'center', width: '100%', mt: 4 }}>
                <Box sx={profileStyle}>
                    <Box sx={innerBoxStyling}>
                        <img style={{ borderRadius: '50%', height: 300, width: 300 }} src="https://images.unsplash.com/profile-fb-1673026464-24ffd9a383fb.jpg?dpr=1&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff" alt="profile-pic.jpg" />
                    </Box>
                    <Box sx={innerBoxStyling} >
                        <Box sx={{
                            // eslint-disable-next-line
                            display: 'flex', flexDirection: 'column', width: '90%', alignItems: 'center', ['@media (min-width: 740px)']: {
                                alignItems: 'flex-start'
                            }
                        }}>
                            <Typography variant='body2' fontSize={30} sx={{ position: 'relative', mb: 1 }} >
                                <b>{profileData.username}&nbsp;</b> <IconButton sx={{ position: 'absolute', background: '#f2f2f2 !important' }} size='small' variant='outlined' > <Create sx={{ fontSize: '14px' }} /></IconButton><br />

                                <b>EMAIL </b>: {profileData.email}<br />

                                <b>ROLE </b>
                                {profileData.gender}<br />

                                <b>PHONE </b> <br />
                                (+91) {profileData.phone}

                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>}
        </>
    )
}

export default memo(About)


