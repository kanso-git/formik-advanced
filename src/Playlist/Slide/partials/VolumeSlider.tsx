import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import VolumeDown from '@material-ui/icons/VolumeDown'
import VolumeUp from '@material-ui/icons/VolumeUp'
import VolumeMute from '@material-ui/icons/VolumeMute'
import { AppLogger } from '../../../AppLogger'
import { getIn } from 'formik'

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

const logger = AppLogger.getInstance()
export default function VolumeSlider(props: any) {
    const classes = useStyles()
    const { name, label, value, form, slideIndex, duration } = props
    const durationValue = getIn(form.values, duration)
    const playerId = `myVideo_${slideIndex}`

    const updateVolume = (newVolume: number) => {
        if (newVolume !== value) {
            form.setFieldValue(name, newVolume)
        }
    }

    const updateDuration = (newDuration: number) => {
        if (newDuration !== durationValue) {
            form.setFieldValue(duration, newDuration)
        }
    }

    useEffect(() => {
        const ref = document.getElementById(playerId) as any
        if (ref) {
            ref.muted = false
            ref.volume = value ? value / 100 : 0
        }
    }, [playerId, value])

    useEffect(() => {
        const ref = document.getElementById(playerId) as any
        const syncVolume = (v: any) => {
            const newVolume = Math.trunc(ref.volume * 100)
            if (ref.muted) {
                updateVolume(0)
            } else {
                updateVolume(newVolume)
            }
        }
        if (ref) {
            logger.log(`addEventListener volumechange for:${playerId}`)
            ref.addEventListener('volumechange', syncVolume)
        }
        return () => {
            logger.log(`removeEventListener volumechange for:${playerId}`)
            ref.removeEventListener('volumechange', syncVolume)
        }
    }, [playerId, updateVolume])

    useEffect(() => {
        const ref = document.getElementById(playerId) as any
        const syncDuration = () => {
            updateDuration(ref.duration)
        }
        if (ref) {
            logger.log(`addEventListener ondurationchange for:${playerId}`)
            ref.ondurationchange = syncDuration
        }
    }, [playerId, updateDuration])

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
