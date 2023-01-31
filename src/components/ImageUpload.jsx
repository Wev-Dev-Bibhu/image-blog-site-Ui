import { CancelRounded, CloudUpload } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { memo, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const ImageUpload = ({ handleImagetoBeUploaded, image }) => {
    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.map((file) => {
            if (file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png') {
                handleImagetoBeUploaded(file)
                return true
            } else {
                alert("File format no supported")
                return false
            }
        })
    }, [handleImagetoBeUploaded]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop, accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg'],
            'image/jpeg': ['.jpeg']
        }
    });
    return (
        <>
            <div {...getRootProps()}>
                <input  {...getInputProps()} />
                {!image ? <Box sx={{ height: 100, width: 200, border: '1px dashed #000', borderRadius: 1, display: 'flex', alignItems: 'center', cursor: 'pointer', background: isDragActive ? "#e8e9e9" : "none" }}>
                    <CloudUpload sx={{ fontSize: 60, pl: 2, pr: 1 }} />
                    <Typography fontSize={13} >Drop Image Here</Typography>
                </Box> : <div></div>}
            </div >
            {image ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                    <img src={URL.createObjectURL(image)} height={180} width={180} alt="thumbnail" style={{ borderRadius: 3 }} /><CancelRounded sx={{ position: 'absolute', right: -10, top: -10, cursor: 'pointer', bgcolor: '#000', borderRadius: '50%', color: '#fff' }} onClick={() => handleImagetoBeUploaded(null)} />
                </Box>
            ) : <div></div>}
        </>
    )
}

export default memo(ImageUpload)
