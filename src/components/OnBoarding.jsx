import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'

const OnBoarding = () => {
    const navigate = useNavigate()
    const cookie = new Cookies()
    useEffect(() => {
        if (cookie.get('userID') && cookie.get('token')) {
            navigate(`/${cookie.get('userID')}`)
        }
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <Box sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh', background: 'transparent',
                // eslint-disable-next-line
                ['@media (max-width: 740px)']: {
                    flexDirection: 'column'
                }
            }}>
                <Card sx={{
                    height: 300, width: 345, mr: 2, borderRadius: 4, p: 2, border: '1px dashed #d5d5d5',
                    // eslint-disable-next-line
                    ['@media (max-width: 740px)']: {
                        mb: 3
                    }
                }}>
                    <CardMedia
                        component="img"
                        height="200"
                        image="https://images.pexels.com/photos/3589903/pexels-photo-3589903.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=360&w=712"
                        alt="Sign In"
                        sx={{ borderRadius: 4 }}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            Welcome Back, Sigin in to continue your journey.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant='contained' color='warning' onClick={() => navigate("/signin")} fullWidth>Sign In</Button>
                    </CardActions>
                </Card>
                <Card sx={{ height: 300, width: 345, borderRadius: 4, p: 2, border: '1px dashed #d5d5d5' }}>
                    <CardMedia
                        component="img"
                        height="200"
                        image="https://images.pexels.com/photos/3584930/pexels-photo-3584930.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=360&w=712"
                        alt="Sign Up"
                        sx={{ borderRadius: 4 }}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            New Here? Join us for daily & interesting photos.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant='contained' color='warning' onClick={() => navigate("/signup")} fullWidth>Sign Up</Button>
                    </CardActions>
                </Card>
            </Box>
        </>
    )
}

export default OnBoarding
