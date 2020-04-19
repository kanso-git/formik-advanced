import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import VolumeDown from '@material-ui/icons/VolumeDown'
import VolumeUp from '@material-ui/icons/VolumeUp'
import VolumeMute from '@material-ui/icons/VolumeMute'

const useStyles = makeStyles({
    root: {
        width: '100%',
        margin: '15px 0',
    },
    sliderContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    slider: {
        margin: '0 5px',
    },
})

export default function VolumeSlider(props: any) {
    const classes = useStyles()
    const { name, label, value, form } = props

    return (
        <div className={classes.root}>
            <Typography id="continuous-slider" gutterBottom>
                {label}: {value}
            </Typography>
            <div className={classes.sliderContainer}>
                <VolumeMute />
                <Slider
                    id={name}
                    name={name}
                    className={classes.slider}
                    value={value}
                    onChange={(event: any, newValue: number | number[]) => {
                        const volumeValue = newValue as number
                        form.setFieldValue(name, volumeValue)
                    }}
                    aria-labelledby="continuous-slider"
                />
                <VolumeUp />
            </div>
        </div>
    )
}
