import { CopyAll, Facebook, Instagram, Mail, Share, Twitter, WhatsApp } from '@mui/icons-material'
import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Slide, Typography } from '@mui/material'
import React, { useState } from 'react'
import LikeIcon from './LikeIcon'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ImageBlog = (props) => {
  const { data } = props
  const [displayLike, setDisplayLike] = useState(false)
  const [openShareModal, setShareModal] = useState(false)
  const [heartClass, setHeartClass] = useState("")

  const handleDescription = (description) => {
    if (description) {
      if (description.length > 42) {
        return description.charAt(0).toUpperCase() + description.slice(1).substring(0, 41).concat("...")
      } else {
        return description.charAt(0).toUpperCase() + description.slice(1).substring(0, 41)
      }
    } else {
      return "No Description"
    }
  }
  return (
    <Box sx={{ m: 2 }} key={data.id}>
      <Card sx={{ width: 345 }}>
        <CardMedia
          sx={{ height: 240 }}
          image={data.urls.regular}
          onDoubleClick={() => setDisplayLike(true)}
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
          <LikeIcon value={displayLike} setDisplayLike={setDisplayLike} heartClass={heartClass} setHeartClass={setHeartClass} photoId={data.id} />
          <Button size="small" variant="text" color='warning'  >Explore</Button>
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
            <Typography>Tap an icon below to share your content directly</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions className='share'>
          <IconButton aria-label='facebook' color='primary'>
            <Facebook className='social-icons' />
          </IconButton>
          <IconButton aria-label='whatsapp' color='success'>
            <WhatsApp className='social-icons' />
          </IconButton>
          <IconButton aria-label='instagram'>
            <Instagram className='social-icons instagram' />
          </IconButton>
          <IconButton aria-label='mail' color='warning'>
            <Mail className='social-icons' />
          </IconButton>
          <IconButton aria-label='twitter' color='info'>
            <Twitter className='social-icons' />
          </IconButton>
          <IconButton  aria-label='copy'>
            <CopyAll className='social-icons' />
          </IconButton>
        </DialogActions>
      </Dialog>
    </Box >
  )
}

export default React.memo(ImageBlog)
