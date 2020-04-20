import React from 'react'
import {
    Theme,
    createStyles,
    makeStyles,
    useTheme,
} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import { Field, FormikTouched, FormikErrors } from 'formik'
import MediaDrop from './MediaDrop'
import { IPlaylist } from './IPlaylist'
import MaterialField from '../fields/useMaterialInput'
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo'
import List from '@material-ui/core/List'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import InboxIcon from '@material-ui/icons/Inbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import { isImage, isViedo } from '../common/utils'
import WallpaperIcon from '@material-ui/icons/Wallpaper'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder'
import { silver } from 'color-name'
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
        },
        content: {
            flex: '1 0 auto',
        },
        cover: {
            width: 345,
            marginBottom: 20,
            marginLeft: 20,
        },
        controls: {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            paddingLeft: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        playIcon: {
            height: 38,
            width: 38,
        },
        input: {
            width: '100%',
            marginTop: 0,
        },
    })
)
interface DetailProps {
    fieldChange: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) => void
    fieldTouche: (
        field: string,
        isTouched?: boolean | undefined,
        shouldValidate?: boolean | undefined
    ) => void
    setValues: (values: IPlaylist, shouldValidate?: boolean | undefined) => void
    values: IPlaylist
    touched: FormikTouched<IPlaylist>
    errors: FormikErrors<IPlaylist>
}

export default function Detail({
    fieldChange,
    fieldTouche,
    values,
    touched,
    errors,
    setValues,
}: DetailProps) {
    const classes = useStyles()
    const theme = useTheme()

    const getTotalDuration = () => {
        let duration = 0
        values.slides.forEach((s) => {
            if (s.duration) {
                duration += s.duration
            }
        })
        return duration
    }

    return (
        <Card className={classes.root}>
            <div className={classes.cover}>
                <MediaDrop
                    fieldChange={fieldChange}
                    fieldTouche={fieldTouche}
                    setValues={setValues}
                    touched={touched}
                    errors={errors}
                    values={values}
                />
            </div>

            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        <Field
                            label="Playlist name"
                            name="name"
                            as={MaterialField}
                            className={classes.input}
                        ></Field>
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        <Field
                            label="Playlist Description"
                            name="description"
                            className={classes.input}
                            as={MaterialField}
                        ></Field>
                    </Typography>
                </CardContent>
                <div className={classes.controls}>
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItem button>
                            <Typography component="h5" variant="h5">
                                {`${Math.trunc(getTotalDuration())} Sec.`}
                            </Typography>
                            <ListItemIcon>
                                <QueryBuilderIcon />
                            </ListItemIcon>
                            <Typography component="h5" variant="h5">
                                {
                                    values.slides.filter((s) => {
                                        return s.media
                                            ? isViedo(s.media)
                                            : false
                                    }).length
                                }
                                &nbsp;
                            </Typography>
                            <ListItemIcon>
                                <OndemandVideoIcon />
                            </ListItemIcon>

                            <Typography component="h5" variant="h5">
                                {
                                    values.slides.filter((s) => {
                                        return s.media
                                            ? isImage(s.media)
                                            : false
                                    }).length
                                }
                                &nbsp;
                            </Typography>
                            <ListItemIcon>
                                <WallpaperIcon />
                            </ListItemIcon>
                        </ListItem>
                    </List>

                    {/*
                    <IconButton aria-label="previous">
                        {theme.direction === 'rtl' ? (
                            <SkipNextIcon />
                        ) : (
                            <SkipPreviousIcon />
                        )}
                    </IconButton>
                    <IconButton aria-label="play/pause">
                        <PlayArrowIcon className={classes.playIcon} />
                    </IconButton>
                    <IconButton aria-label="next">
                        {theme.direction === 'rtl' ? (
                            <SkipPreviousIcon />
                        ) : (
                            <SkipNextIcon />
                        )}
                    </IconButton>
                        */}
                </div>
            </div>
        </Card>
    )
}
