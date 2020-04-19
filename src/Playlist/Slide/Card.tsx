import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { contemplativeReptile } from '../../images'
import { Field, getIn, FormikProps } from 'formik'
import MaterialField from '../../fields/useMaterialInput'
import VolumeSlider from './partials/VolumeSlider'
import DatePicker from './partials/DatePicker'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MenuSlider from './partials/MenuSlider'
import DatePicker2 from './partials/DatePicker2'
import MediaDrop from './partials/MediaDrop'
import { getDefaultFromValuesTest, ISlide, IPlaylist } from '../IPlaylist'
import TimeSlider from './partials/TimeSlider'
import { isImage } from '../../common/utils'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: '345px',
            margin: '1rem',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(82, 82, 82, 0.12)',
            position: 'relative',
            overflow: 'visible',
        },
        media: {
            height: 194,
            borderTopRightRadius: '8px',
            borderTopLeftRadius: '8px',
        },
        cardContent: {},
        input: {
            width: '100%',
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        pickerContainer: {
            display: 'flex',
            justifyContent: 'space-between',
        },
    })
)

interface MediaCardProps {
    slideIndex: number
    form: FormikProps<IPlaylist>
    index: number
}
export default function MediaCard(props: MediaCardProps) {
    const classes = useStyles()
    const { slideIndex: index, form } = props

    const mediaValue = getIn(form.values, `slides[${index}].media`)
    const mediaUploadNameValue = getIn(
        form.values,
        `slides[${index}].mediaUploadName`
    )
    const mediaDeletedFlag = getIn(form.values, `slides[${index}].mediaDeleted`)

    const getMediaFileName = (): string | undefined => {
        let currentMediaUrl: any = ''
        if (mediaDeletedFlag) {
            currentMediaUrl = mediaUploadNameValue
        } else {
            currentMediaUrl = mediaUploadNameValue
                ? mediaUploadNameValue
                : mediaValue
        }
        return currentMediaUrl
    }
    const currentMediaFileName = getMediaFileName()

    console.log(props)
    return (
        <Card className={classes.root} onClick={(e) => e.preventDefault()}>
            {/**  <MenuSlider /> */}
            {/*
            <CardMedia
                className={classes.media}
                image={contemplativeReptile}
                title="Contemplative Reptile"
            />
            */}
            <Field
                name={`slides[${index}].media`}
                mediaDeleted={`slides[${index}].mediaDeleted`}
                mediaUploadName={`slides[${index}].mediaUploadName`}
                volume={`slides[${index}].volume`}
                form={props.form}
                slideIndex={index}
                as={MediaDrop}
            />
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                    <Field
                        label="Slide name"
                        name={`slides[${index}].name`}
                        as={MaterialField}
                        className={classes.input}
                    ></Field>
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        Validaty date range
                    </Typography>

                    <div className={classes.pickerContainer}>
                        <Field
                            name={`slides[${index}].startDate`}
                            form={props.form}
                            label="Start date"
                            as={DatePicker}
                        />

                        <Field
                            name={`slides[${index}].endDate`}
                            label="End date"
                            form={props.form}
                            as={DatePicker}
                        />
                    </div>
                </Typography>
                {currentMediaFileName && (
                    <Typography gutterBottom variant="h5" component="h2">
                        {isImage(currentMediaFileName) ? (
                            <Field
                                label="Time on screen in seconds"
                                name={`slides[${index}].duration`}
                                form={props.form}
                                as={TimeSlider}
                            ></Field>
                        ) : (
                            <Field
                                label="Sound volume"
                                name={`slides[${index}].volume`}
                                form={props.form}
                                as={VolumeSlider}
                            ></Field>
                        )}
                    </Typography>
                )}
            </CardContent>
        </Card>
    )
}
