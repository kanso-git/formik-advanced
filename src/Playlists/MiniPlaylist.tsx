import React, { memo, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import styles from './MiniPlaylistStyles'
import DeleteIcon from '@material-ui/icons/Delete'
import Typography from '@material-ui/core/Typography'
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
import { ISlide, IPlaylist } from '../Playlist/IPlaylist'
import { getMediaUrl } from '../common/utils'
import { videoPlaceholderViolet } from '../images'

const MiniPlaylist = (props: any) => {
    const playlist: IPlaylist = props.playlist
    const classes = styles(playlist)

    const getTotalDuration = () => {
        let duration = 0
        playlist.slides.forEach((s) => {
            if (s.duration) {
                duration += s.duration
            }
        })
        return duration
    }
    const renderMedia = (media: string): JSX.Element => {
        const mediaUrl = getMediaUrl(media) //the url to mediaValue
        if (mediaUrl) {
            if (isImage(media)) {
                return <img src={mediaUrl} alt={''} />
            } else if (isViedo(media)) {
                return <img src={videoPlaceholderViolet} alt={''} />
            }
        }
        return <div />
    }
    return (
        <div
            className="flip-card"
            onClick={() => {
                props.history.push(`/playlists/${playlist.id}`)
            }}
        >
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <div className={classes.rootMiniPlaylist}>
                        <div className={classes.playlist}>
                            {playlist.media && renderMedia(playlist.media)}
                        </div>
                        <div className={classes.controls}>
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                            >
                                {playlist.name}
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className="flip-card-back">
                    <div className={classes.rootMiniPlaylist}>
                        <div>
                            <DeleteIcon
                                className={classes.deleteIcon}
                                style={{ transition: 'all 0.3s ease-in-out' }}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    // delete
                                }}
                            />
                        </div>
                        <div className={classes.playlist}>
                            {playlist.slides.map((slide: ISlide) => (
                                <div
                                    key={slide.id}
                                    className={classes.miniSlide}
                                >
                                    {renderMedia(slide.media)}
                                </div>
                            ))}
                        </div>
                        <div className={classes.controls}>
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                            >
                                {`Time: ${Math.trunc(getTotalDuration())} Sec.`}
                            </Typography>

                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                            >
                                {`, ${
                                    playlist.slides.filter((s) => {
                                        return s.media
                                            ? isViedo(s.media)
                                            : false
                                    }).length
                                }  videos`}
                            </Typography>

                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                            >
                                {`, ${
                                    playlist.slides.filter((s) => {
                                        return s.media
                                            ? isImage(s.media)
                                            : false
                                    }).length
                                }  Images`}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(withRouter(MiniPlaylist))
