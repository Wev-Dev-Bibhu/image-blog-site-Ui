import React, { useState, useEffect, memo } from 'react'
import { Avatar, Button, Tooltip, MenuItem, Container, Toolbar, Menu, Typography, IconButton, Box, AppBar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AdbIcon from '@mui/icons-material/Adb'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import Cookies from 'universal-cookie'
import { useSnackbar } from 'notistack'

const pages = [{
    key: "about",
    value: "ABOUT"
}, {
    key: "contact",
    value: "CONTACT US"
}]


const settings = [{
    key: "favourites",
    value: "Liked Pics"
}, {
    key: "dashboard",
    value: "Dashboard"
}]

const Navbar = ({ progress, setProgress }) => {
    const [anchorElNav, setAnchorElNav] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null)
    const cookie = new Cookies()
    const location = useLocation()
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const userID = cookie.get('userID')
    let imgUrl = cookie.get('imgUrl')

    useEffect(() => {
        if (location.pathname === "/logout") {
            cookie.remove('token')
            cookie.remove('userID')
            cookie.remove('imgUrl')
            let variant = 'success'
            enqueueSnackbar("Logged out successfully", { variant })
            navigate('/signin')
        }
        // eslint-disable-next-line
    }, [cookie])

    useEffect(() => {
        // eslint-disable-next-line
        imgUrl = cookie.get('imgUrl')
    }, [setProgress])


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    // const 
    const handleCloseNavMenu = () => {
        setProgress(50)
        setAnchorElNav(null)
        setProgress(100)
    }
    const handleCloseUserMenu = () => {
        setProgress(50)
        setAnchorElUser(null)
        setProgress(100)
    }

    return (<>
        <AppBar position="sticky">
            <Container maxWidth="xl" sx={{ background: '#0f0f0fd1' }}>
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="span"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    // onClick={setProgress(100)}
                    >
                        <NavLink to={userID ? `/${userID}/` : "/"} onClick={() => {
                            setProgress(100)
                        }} style={{ color: '#fff', textDecoration: "none" }}>LOGO</NavLink>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem onClick={handleCloseNavMenu}>
                                <NavLink to={userID ? `/${userID}/` : "/"} style={{ textDecoration: "none", display: 'block' }}><Typography textAlign="center" style={{ color: "#000" }}>HOME</Typography></NavLink>
                            </MenuItem>
                            {pages.map((page) => (
                                <MenuItem key={page.key} onClick={handleCloseNavMenu}>
                                    <NavLink key={page.key} to={userID ? `/${userID}/` + page.key : "/" + page.key} style={{ textDecoration: "none" }}><Typography key={page.key} textAlign="center" style={{ color: "#000" }}>{page.value}</Typography></NavLink>
                                </MenuItem>
                            ))}

                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="span"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <NavLink to={userID ? `/${userID}/` : "/"} style={{ color: '#fff', textDecoration: "none" }} onClick={() => {
                            setProgress(100)
                        }}  >LOGO</NavLink>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <NavLink to={userID ? `/${userID}/` + page.key : "/" + page.key} key={page.key} style={{ textDecoration: "none" }}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, display: 'block' }}
                                >
                                    <Typography textAlign="center" style={{ color: "#fff" }}>{page.value}</Typography>
                                </Button>
                            </NavLink>
                        ))}
                    </Box>
                    {!cookie.get('token') ? <Button variant='contained' color='warning' sx={{
                        pt: 1, pb: 1,
                        // eslint-disable-next-line
                        ['@media (max-width: 740px)']: {
                            pt: 0.5,
                            pb: 0.5
                        }
                    }} onClick={() => {
                        setProgress(100)
                        navigate("/onboarding")
                    }} >
                        Join
                    </Button> :
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="See Profile">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={userID.toUpperCase()} src={imgUrl !== undefined ? imgUrl : "null"} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {
                                    settings.map((setting) => (
                                        <MenuItem key={setting.key} onClick={handleCloseUserMenu}>
                                            <NavLink to={`/${userID}/` + setting.key} style={{ textDecoration: "none", color: '#000' }}> <Typography textAlign="center" noWrap>{setting.value}&nbsp;&nbsp;&nbsp;</Typography></NavLink>
                                        </MenuItem>
                                    ))}
                                {cookie.get('token') && <MenuItem onClick={handleCloseUserMenu}>
                                    <NavLink to="/logout" style={{ textDecoration: "none", color: '#000' }}> <Typography textAlign="center" noWrap>Logout</Typography></NavLink>
                                </MenuItem>}
                            </Menu>
                        </Box>
                    }

                </Toolbar>
            </Container>
        </AppBar >
        <LoadingBar color='#0000FF' progress={progress} onLoaderFinished={() => setProgress(0)} />
    </>
    )
}
export default memo(Navbar)
