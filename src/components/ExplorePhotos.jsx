import { Download } from '@mui/icons-material'
import { IconButton, ImageListItem, ImageListItemBar } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import LikeIcon from './LikeIcon'
import { saveAs } from 'file-saver'
import { handleDescription } from '../Helper/Common'

const ExplorePhotos = (props) => {
    const { item } = props
    const [displayLike, setDisplayLike] = useState(false)
    const [heartClass, setHeartClass] = useState("")
    const imgRef = useRef(null)

    const handleLoadImages = () => {
        if (imgRef && imgRef.current.complete) {
            if (imgRef.current.naturalWidth === 0) {
                alert('Success')
            } else {
                alert('Err')
            }
        }
    }
    useEffect(() => {

    }, [])
    return (
        <ImageListItem key={item.urls.regular}>
            <img
                src={item.urls.regular}
                alt={item.alt_description}
                loading="lazy"
                ref={imgRef.current}
                onLoad={handleLoadImages}
            />
            <ImageListItemBar
                sx={{
                    background: 'none',
                    mr: 1,
                    mt: 1
                }}
                position='top'
                actionIcon={
                    <LikeIcon value={displayLike} setDisplayLike={setDisplayLike} heartClass={heartClass} setHeartClass={setHeartClass} photoData={item} color="#fff" />
                }
            />
            <ImageListItemBar
                sx={{
                    background:
                        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                }}
                title={item.description ? handleDescription(item.description) : handleDescription(item.alt_description)}
                actionIcon={
                    <>
                        <IconButton
                            sx={{ color: '#fff', mr: 1 }}
                            aria-label={`info about ${item.alt_description}`}
                            onClick={() => {
                                saveAs(item.urls.regular, new Date().toDateString().replaceAll(" ", "-") + '-image-' + item.id + '.jpg')
                            }}
                        >
                            <Download />
                        </IconButton>
                    </>
                }
            />
        </ImageListItem>
    )
}

export default ExplorePhotos
