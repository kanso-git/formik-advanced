import { useField, FieldAttributes, getIn } from 'formik'
import React from 'react'

type MaterialFieldProps = {
    label: string
} & FieldAttributes<{}>

const MyField: React.FC<MaterialFieldProps> = ({ label, ...props }) => {
    const [field, meta] = useField<{}>(props)
    //console.log(field)
    //console.log(meta)
    const value = field.value as any

    return (
        <div className="form-group col">
            <label>{label}</label>
            <input
                type="text"
                name={field.name}
                value={value ? value : ''}
                className={`form-control`}
                onChange={field.onChange}
                onBlur={field.onBlur}
            />
            {meta.touched && meta.error && (
                <div className="error-message">{meta.error}</div>
            )}
        </div>
    )
}
export default MyField
