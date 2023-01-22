import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, CircularProgress, Divider, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { memo, useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack';
import Cookies from 'universal-cookie'
import axios from 'axios'
import { formStyle } from '../Helper/Styles'
import { BASE_URL } from '../Helper/Common'

// import ImageUpload from './ImageUpload'


const SignIn = () => {
    const navigate = useNavigate()
    const cookie = new Cookies();
    const { enqueueSnackbar } = useSnackbar();
    const [showPassword, setShowPassword] = useState(false);
    const [httpRequest, setHttpRequest] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    useEffect(() => {
        if (cookie.get('token')) {
            navigate("/")
        }
    }, [])

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        setHttpRequest(true)
        console.log(formData);
        const { email, password } = formData
        const json = JSON.stringify({ email, password });
        await axios.post(`${BASE_URL}/signin`, json, {
            headers: {
                // 'Authorization': `bearer jwtoken`,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (res.status === 200 || !res) {
                    const obj = res.data
                    cookie.set('token', res.data.token, { path: '/' });
                    let variant = obj.status
                    setFormData({
                        email: "",
                        password: ""
                        // imagepath: ""
                    })
                    enqueueSnackbar(obj.message, { variant })
                    setTimeout(() => {
                        setHttpRequest(false)
                    }, 2000)
                    navigate("/")
                }
            })
            .catch(err => {
                const obj = err.response.data
                let variant = obj.status
                enqueueSnackbar(obj.message, { variant })
                setTimeout(() => {
                    setHttpRequest(false)
                }, 2000)
            })
    }
    let name, value //, imagepath = "imagepath"
    const handleInputChange = (e) => {
        name = e.target.name
        value = e.target.value
        setFormData({ ...formData, [name]: value })
    }
    // const handleImageUpload = (data) => {
    //     setFormData({ ...formData, [imagepath]: data })
    // }
    return (
        <>
            <Box sx={{ display: 'grid', placeItems: 'center', mt: 18, width: '100%' }}>
                <Box sx={formStyle}>
                    <Typography fontSize={22} sx={{ display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 500, letterSpacing: 2 }}>Sign In</Typography>
                    <Divider color='#fff' sx={{ width: '60%', m: 'auto' }} />
                    <form method="POST" encType="multipart/form-data" style={{ marginTop: 30 }}>
                        {/* <FormControl variant='standard' sx={{ display: 'grid', placeItems: 'center', mt: 2 }} margin="dense">
                            <ImageUpload
                                inputRef={inputRef}
                                handleImageUpload={handleImageUpload}
                            />
                        </FormControl> */}

                        <TextField id="email" name="email" fullWidth margin="dense" required color="warning" label="Email" variant="standard" autoComplete='off' value={formData.email} onChange={handleInputChange} />
                        <FormControl required variant="standard" margin="dense" fullWidth >
                            <InputLabel htmlFor="standard-adornment-password" color='warning'>Password</InputLabel>
                            <Input
                                color='warning'
                                id="standard-adornment-password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            color='warning'
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <Button variant="outlined" color='warning' disabled={httpRequest} sx={{ float: 'right', mt: 2 }} onClick={handleSubmitForm} >Sign In {httpRequest ? <CircularProgress sx={{ ml: 1, width: '20px !important', height: '20px !important' }} /> : ""} </Button>
                    </form>
                    <Typography variant='body1' fontSize={12}>New User ? <NavLink to="/signup" style={{ color: 'inherit' }}>SignUp here</NavLink> </Typography>
                </Box>
            </Box>
        </>
    )
}

export default memo(SignIn)