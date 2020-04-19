import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import AddIcon from '@material-ui/icons/Add'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            position: 'absolute',
            top: 5,
            right: 5,
            zIndex: 1,
            color: 'white',
            backgroundColor: 'rgba(0,0,0,.15)',
            border: '1px solid rgba(0,0,0,.15)',
            borderRadius: '50%',
            '&:hover': {
                backgroundColor: 'rgba(0,0,0,.35)',
            },
        },
    })
)
const options = ['None', 'Atria']

const ITEM_HEIGHT = 48

export default function MenuSlider() {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        //event.stopPropagation()
        //event.preventDefault()
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div className={classes.container}>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
            >
                <MoreVertIcon color="inherit" />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                <MenuItem onClick={handleClose}>
                    <ListItemAvatar>
                        <Avatar
                            style={{
                                backgroundColor: red[100],
                                color: red[600],
                            }}
                        >
                            <DeleteForeverIcon />
                        </Avatar>
                    </ListItemAvatar>

                    <ListItemText>Delete</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemAvatar>
                        <Avatar
                            style={{
                                backgroundColor: blue[100],
                                color: blue[600],
                            }}
                        >
                            <CloseIcon />
                        </Avatar>
                    </ListItemAvatar>

                    <ListItemText>Close</ListItemText>
                </MenuItem>
            </Menu>
        </div>
    )
}
