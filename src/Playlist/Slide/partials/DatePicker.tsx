import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import DatePicker, { registerLocale } from 'react-datepicker'
import { fr } from 'date-fns/locale'
import { getIn } from 'formik'

import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import VolumeDown from '@material-ui/icons/VolumeDown'
import VolumeUp from '@material-ui/icons/VolumeUp'
import VolumeMute from '@material-ui/icons/VolumeMute'
import DateRangeIcon from '@material-ui/icons/DateRange'

const useStyles = makeStyles({
    root: {
        width: '100%',
        margin: '15px 0',
    },
    pickerContainer: {
        display: 'flex',
        alignItems: 'flex-end',
    },
    picker: {
        margin: '0 5px',
        width: 'calc( 100% - 30px)',
        border: 'none',
        borderBottom: '1px solid',
        textAlign: 'center',
        zIndex: 100,
        fontSize: '1rem',
    },
})

export default function DatePickers(props: any) {
    const classes = useStyles()

    const { name, label, value, form, onBlur } = props
    const error = getIn(form.errors, name)
    const touched = getIn(form.touched, name)
    console.log(`error:${error}`)
    console.log(`touched:${touched}`)
    console.log(props)
    return (
        <div className={classes.root}>
            <div className={classes.pickerContainer}>
                <DateRangeIcon />
                <DatePicker
                    selected={value}
                    onChange={(d) => {
                        form.setFieldValue(name, d || undefined)
                    }}
                    className={classes.picker}
                    name={name}
                    locale={fr}
                    dateFormat="dd.MM.yyyy"
                    placeholderText={label}
                    autoComplete="off"
                    onBlur={onBlur}
                />
                {error && touched && <span>{error}</span>}
            </div>
        </div>
    )
}
