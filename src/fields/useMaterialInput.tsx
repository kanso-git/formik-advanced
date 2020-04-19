import { useField, FieldAttributes } from 'formik'
import React from 'react'
import TextField from '@material-ui/core/TextField'

type MaterialFieldProps = {
    label: string
    placeHolder: string
} & FieldAttributes<{}>

const MaterialField: React.FC<MaterialFieldProps> = ({
    label,
    placeHolder,
    className,
    disabled = false,
    type = 'text',
    ...props
}) => {
    const [field, meta] = useField<{}>(props)

    const value = type === 'text' ? field.value || '' : field.value || 5
    console.log(`value is ${value}`)
    return (
        <TextField
            {...field}
            className={className}
            error={!!meta.error && meta.touched}
            id="standard-error-helper-text"
            autoComplete="off"
            value={value}
            type={type}
            name={field.name}
            label={label}
            margin="normal"
            disabled={disabled}
            helperText={meta.error && meta.touched && meta.error}
        />
    )
}
export default MaterialField
