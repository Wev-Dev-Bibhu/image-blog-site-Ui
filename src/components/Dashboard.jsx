import { ArrowBack, Delete, Edit, Upload } from '@mui/icons-material'
import { Button, CircularProgress, Dialog, FormControl, IconButton, Slide, TextField, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import React, { forwardRef, useEffect, useState } from 'react'
import axios from 'axios'
import selfieImg from '../Images/selfie.svg'
import ImageUpload from './ImageUpload'
import { BASE_URL } from '../Helper/Common'
import { useSnackbar } from 'notistack'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
const Dashboard = (props) => {
    const { setProgress } = props
    const theme = useTheme()
    const { enqueueSnackbar } = useSnackbar()
    const cookie = new Cookies()
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'))
    const navigate = useNavigate()
    const [loadPage, setLoadPage] = useState(false)
    const [profileData, setProfileData] = useState({
        username: "",
        email: "",
        phone: "",
        gender: "",
        fullname: "",
        profileurl: ""
    })
    const [openProfileModal, setProfileModal] = useState(false)
    const [openChangeModal, setOpenChangeModal] = useState(false)
    const [httpRequest, setHttpRequest] = useState(false);
    const [image, setImage] = useState(null)
    const handleImagetoBeUploaded = (file) => {
        setImage(file)
    }
    const handleImageUpload = async () => {
        setHttpRequest(true)
        const formData = new FormData()
        formData.append('files', image)
        formData.append('userID', cookie.get('userID'))
        const res = await axios.post(`${BASE_URL}/upload`, formData)
        if (res) {
            cookie.set('imgUrl', res.data.imgUrl, { path: '/' })
            setProfileData({ ...profileData, profileurl: res.data.imgUrl })
            setOpenChangeModal(false)
            setProfileModal(false)
            setHttpRequest(false)
            setImage(null)
            let variant = res.data.status
            enqueueSnackbar(res.data.message, { variant })
        }
    }

    // const deleteIcon = async (userName) => {
    //     const res = await axios.delete("https://www.googleapis.com/drive/v2/files/1eJAj7oKvRKz5e_mXDRuVMlLW3CMnQw7j")
    // }

    const loadAboutPage = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/dashboard?token=${cookie.get('token')}`, {
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
            setProfileData({ ...profileData, username: data.username, email: data.email, phone: data.phone, gender: data.gender, profileurl: data.profileurl, fullname: data.fullname });
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
    return (
        <>
            {loadPage && <Box sx={{ paddingX: matchDownSM ? 2 : 28, pt: 7 }}>
                <Box>
                    <Typography variant={matchDownSM ? "h6" : "h4"}> WelCome Back <b> {profileData.fullname.split(" ")[0]} </b></Typography>
                    <Typography variant='body2' sx={{ color: '#788192' }}> Full Stack Developer</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: matchDownSM && "column" }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, flexDirection: matchDownSM ? "column" : "row" }}>
                        <div style={{ position: 'relative' }}>
                            <img height={200} width={200} style={{ borderRadius: '50%' }} src={profileData.profileurl} alt="" />
                            <IconButton
                                onClick={() => setProfileModal(true)}
                                sx={{
                                    position: 'absolute', right: 25, background: '#000', color: '#fff', "&:hover": {
                                        backgroundColor: "#282828"
                                    }
                                }}>
                                <Edit sx={{ fontSize: 13 }} />
                            </IconButton>
                            <Dialog
                                open={openProfileModal}
                                onClose={() => setProfileModal(false)}
                                TransitionComponent={Transition}
                                keepMounted
                            >
                                <Box sx={{ position: 'relative', display: 'flex', width: 300, height: 340, overflow: 'hidden' }}>
                                    <Box sx={{
                                        width: '100%', p: 3, bgcolor: '#F5F5F5', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden', transition: '0.9s',
                                        position: 'absolute', left: -20
                                    }}>
                                        <Typography sx={{ mb: 1 }} variant='body2'>A picture helps people recognize you.&#128516; </Typography>
                                        <img height={200} width={200} style={{ borderRadius: '50%' }} src={profileData.profileurl} alt="" />
                                        <Box sx={{ mt: 3 }} >
                                            <Button variant='outlined' onClick={() => { setOpenChangeModal(true) }} sx={{ textTransform: 'capitalize', mr: 1 }}>Change <Edit sx={{ fontSize: 20 }} /> </Button>
                                            <Button variant='outlined' color='error' sx={{ textTransform: 'capitalize', ml: 1 }}>Remove <Delete sx={{ fontSize: 20 }} /></Button>
                                        </Box>
                                    </Box>
                                    <Box sx={{ width: '100%', p: 3, bgcolor: '#F5F5F5', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden', position: 'relative', left: !openChangeModal ? -500 : 0, transition: '0.9s' }}>
                                        <Box sx={{ width: '100%', mb: 1 }}>
                                            <IconButton onClick={() => setOpenChangeModal(false)}>
                                                <ArrowBack />
                                            </IconButton>
                                        </Box>
                                        <ImageUpload handleImagetoBeUploaded={handleImagetoBeUploaded} />
                                        <Button variant='outlined' color='secondary' disabled={httpRequest} sx={{ textTransform: 'capitalize', mt: 3 }} onClick={handleImageUpload}>Upload Profile {httpRequest ? <CircularProgress sx={{ ml: 1, width: '20px !important', height: '20px !important' }} /> : <Upload />} </Button>
                                    </Box>
                                </Box>
                            </Dialog>
                        </div>
                    </Box>
                    <Box sx={{ height: matchDownSM ? 150 : 200, width: matchDownSM ? "100%" : 500, bgcolor: '#d4d6de', borderRadius: 0.8, display: 'flex', mt: matchDownSM && 5 }}>
                        <Typography sx={{ p: 1.5, width: matchDownSM ? "100%" : "50%" }}>
                            Write something about you
                        </Typography>
                        {!matchDownSM && <div style={{ position: 'relative', width: "50%" }}>
                            <img style={{ position: 'absolute', right: matchDownSM ? -10 : - 90, top: -50 }} height={matchDownSM ? 200 : 300} src={selfieImg} alt="selfie-img" />
                        </div>}
                    </Box>
                </Box>
                <Box sx={{ width: matchDownSM ? "auto" : 500, py: 3 }}>
                    <FormControl className='dashboard' fullWidth>
                        <label htmlFor="email">Name</label>
                        <TextField size='small' sx={{ color: '#fff' }} id="name" name="fullname" margin="dense" color="primary" variant="outlined" value={profileData.fullname} disabled autoComplete='off' />
                    </FormControl>
                    <FormControl className='dashboard' fullWidth>
                        <label htmlFor="email">Email</label>
                        <TextField size='small' sx={{ color: '#fff' }} id="email" name="email" margin="dense" color="primary" variant="outlined" value={profileData.email} disabled autoComplete='off' />
                    </FormControl>
                    <FormControl className='dashboard' fullWidth>
                        <label htmlFor="email">Phone</label>
                        <TextField size='small' sx={{ color: '#fff' }} id="phone" name="phone" margin="dense" color="primary" variant="outlined" value={profileData.phone} disabled autoComplete='off' />
                    </FormControl>
                </Box>
            </Box >
            }
        </>
    )
}

export default Dashboard
