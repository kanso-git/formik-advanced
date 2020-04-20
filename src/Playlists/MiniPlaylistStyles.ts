import { makeStyles } from '@material-ui/styles'
import { IPlaylist } from '../Playlist/IPlaylist'

export default makeStyles({
    rootMiniPlaylist: {
        backgroundColor: 'white',
        border: '1px solid grey',
        borderRadius: '5px',
        padding: '0.5rem',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        '&:hover svg': {
            opacity: 1,
            fontSize: '3rem !important',
        },
    },
    controls: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: '5px',
        paddingBottom: '5px',
    },
    backDetail: {
        zIndex: 1,
        padding: 10,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    playlist: {
        backgroundColor: '#dae1e4',
        height: '140px',
        width: '100%',
        borderRadius: '5px',
        overflow: 'hidden',
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0',
        color: 'black',
        paddingTop: '0.5rem',
        fontSize: '1rem',
        position: 'relative',
        '& span': {
            marginLeft: '0.5rem',
            fontSize: '1.5rem',
        },
    },
    miniSlide: {
        height: '14%',
        width: '25%',
        display: 'inline-block',
        position: 'relative',

        '& img': {
            backgroundSize: 'cover',
            marginBottom: '-4px',
        },
    },
    deleteIcon: {
        color: 'white',
        backgroundColor: '#eb3d3d',

        position: 'absolute',
        right: '0px',
        top: '0px',
        padding: '10px',
        zIndex: 10,
        opacity: 0,
    },
})
