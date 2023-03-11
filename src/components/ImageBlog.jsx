import { CopyAll, Facebook, Instagram, Mail, Share, Twitter, WhatsApp } from '@mui/icons-material'
import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Slide, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleDescription } from '../Helper/Common';
import LikeIcon from './LikeIcon'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ImageBlog = (props) => {
  const { data } = props
  const [displayLike, setDisplayLike] = useState(false)
  const [openShareModal, setShareModal] = useState(false)
  const [heartClass, setHeartClass] = useState("")
  const navigate = useNavigate()
  const [shareToolTipTitle, setShareToolTipTitle] = useState({
    facebook: "Share via Facebook",
    whatsapp: "Share via WhatsApp",
    twitter: "Share via Twitter",
    instagram: "Share via Instagram",
    clipboard: "Copy to Clipboard",
    mail: "Share via Mail"
  })

  const handleCopy = (copyLink) => {
    navigator.clipboard.writeText(copyLink)
    setShareToolTipTitle({ ...shareToolTipTitle, clipboard: 'Copied' })
    setTimeout(() => {
      setShareToolTipTitle({ ...shareToolTipTitle, clipboard: "Copy to Clipboard" })
    }, 1000);
  }


  return (
    <Box sx={{ m: 2 }} key={data.id}>
      <Card sx={{ width: 345 }}>
        <CardMedia
          sx={{ height: 240 }}
          image={data.urls.regular}
          onDoubleClick={() => {
            setHeartClass("insta-heart-like")
            setTimeout(() => {
              setHeartClass("")
            }, 1000);
            setDisplayLike(true)
          }}
        />
        <CardContent sx={{ height: 35, background: '#f1f1f1' }}>
          <Typography variant="body2" color="text.secondary" sx={{ width: 310, pb: 0.5 }}>
            {data.description ? handleDescription(data.description) : handleDescription(data.alt_description)}
          </Typography>
          <Typography component="div" variant="body2" fontSize={14} sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar alt={data.user.first_name} src={data.user.profile_image.medium} sx={{ mr: 1 }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant='body2' color="text.secondary" sx={{ fontSize: '11px' }} >{data.user.name} </Typography>
              <Typography variant='body2' color="text.secondary" sx={{ fontSize: '11px' }} >{new Date(data.updated_at).toDateString()} </Typography>
            </div>
          </Typography>
        </CardContent>
        <CardActions sx={{ p: 1, pt: 2, background: '#f1f1f1' }} >
          <LikeIcon value={displayLike} setDisplayLike={setDisplayLike} heartClass={heartClass} setHeartClass={setHeartClass} photoData={data} color='#e64e63' />
          <Button size="small" variant="text" color='warning' onClick={() => navigate(`/explore/${data.user.username}/${data.user.total_photos}`)}  >Explore</Button>
          <Typography variant='body2' color="text.secondary" textAlign="right" width={160}>{displayLike ? data.likes + 1 : data.likes} Likes</Typography>
          <IconButton aria-label="share" onClick={() => setShareModal(true)} sx={{ float: 'right' }} >
            <Share sx={{ color: '#50A1E6' }} />
          </IconButton>
        </CardActions>
      </Card>
      <Dialog
        open={openShareModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setShareModal(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Share</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Typography component="span">Tap an icon below to share your content directly</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions className='share'>
          <Tooltip title={shareToolTipTitle.facebook} placement="top">
            <IconButton aria-label='facebook' color='primary'>
              <Facebook className='social-icons' />
            </IconButton>
          </Tooltip>
          <Tooltip title={shareToolTipTitle.whatsapp} placement="top">
            <IconButton aria-label='whatsapp' color='success'>
              <WhatsApp className='social-icons' />
            </IconButton>
          </Tooltip>
          <Tooltip title={shareToolTipTitle.instagram} placement="top">
            <IconButton aria-label='instagram'>
              <Instagram className='social-icons instagram' />
            </IconButton>
          </Tooltip>
          <Tooltip title={shareToolTipTitle.mail} placement="top">
            <IconButton aria-label='mail' color='warning'>
              <Mail className='social-icons' />
            </IconButton>
          </Tooltip>
          <Tooltip title={shareToolTipTitle.twitter} placement="top">
            <IconButton aria-label='twitter' color='info'>
              <Twitter className='social-icons' />
            </IconButton>
          </Tooltip>
          <Tooltip title={shareToolTipTitle.clipboard} placement="top">
            <IconButton aria-label='copy'>
              <CopyAll className='social-icons' onClick={() => handleCopy(data.links.html)} />
            </IconButton>
          </Tooltip>
        </DialogActions>
      </Dialog>
    </Box >
  )
}

export default React.memo(ImageBlog)
