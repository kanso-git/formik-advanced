import React from 'react'
import TextField from '@material-ui/core/TextField'
import { getIn } from 'formik'

const MyInputField = (props: any) => {
    const { name, label, value, form, onBlur, onChange } = props
    const error = getIn(form.errors, name)
    const touched = getIn(form.touched, name)
    return (
        <TextField
            className={props.className}
            error={!!error && touched}
            id="standard-error-helper-text"
            autoComplete="off"
            value={value}
            type={props.type}
            name={name}
            label={label}
            margin="normal"
            onBlur={onBlur}
            onChange={(e) => {
                form.setFieldValue(name, e.target.value)
            }}
            helperText={error && touched && error}
        />
    )
}

export default MyInputField
