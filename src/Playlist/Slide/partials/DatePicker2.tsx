import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import DatePicker, { registerLocale } from 'react-datepicker'
import { fr } from 'date-fns/locale'

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
        width: 120,
        border: 'none',
        borderBottom: '1px solid',
        textAlign: 'center',
        zIndex: 100,
    },
})

export default function DatePicker2(props: any) {
    const classes = useStyles()
    console.log(props)
    const { name, label, value, form } = props

    return (
        <DatePicker
            selected={value}
            onChange={(d) => {
                form.setFieldValue(name, d)
            }}
            className={classes.picker}
            name={name}
            locale={fr}
            dateFormat="dd.MM.yyyy"
            placeholderText={label}
        />
    )
}
