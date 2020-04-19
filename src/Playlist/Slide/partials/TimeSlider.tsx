import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'

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
interface IMark {
    value: number
    label: string
}
const getMarks = (from: number, to: number): IMark[] => {
    let marks: IMark[] = []
    for (let i = from; i < to; i++) {
        marks.push({
            value: i,
            label:
                i === from || i === to - 1 || i === 10 || i === 15
                    ? `${i}`
                    : '',
        })
    }
    return marks
}

export default function TimeSlider(props: any) {
    const classes = useStyles()
    const { name, label, value, form } = props
    const marks = getMarks(5, 21)
    function valuetext(value: number) {
        return `${value} Sec.`
    }

    function valueLabelFormat(value: number) {
        return marks.findIndex((mark) => mark.value === value) + 1
    }
    return (
        <div className={classes.root}>
            <Typography id="continuous-slider" gutterBottom>
                {label}: {value}
            </Typography>
            <div className={classes.sliderContainer}>
                <Slider
                    id={name}
                    name={name}
                    className={classes.slider}
                    value={value}
                    valueLabelFormat={valueLabelFormat}
                    getAriaValueText={valuetext}
                    min={5}
                    max={20}
                    onChange={(event: any, newValue: number | number[]) => {
                        const durationValue = newValue as number
                        form.setFieldValue(name, durationValue)
                    }}
                    aria-labelledby="discrete-slider-restrict"
                    step={null}
                    marks={marks}
                />
            </div>
        </div>
    )
}
