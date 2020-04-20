import React from 'react'
import TopHeader from '../TopHeader'
import SubHeader from './SubHeader'
import PlaylistsFilter from './PlaylistsFilter'
import PlaylitsPaginationBar from './PlaylitsPaginationBar'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { getPlaylits } from '../Playlist/IPlaylist'
import MiniPlaylist from './MiniPlaylist'

const useStyles = makeStyles({
    playlists: {
        boxSizing: 'border-box',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3,25%)',
        gridGap: '5%',
    },
})
const Playlists = () => {
    const classes = useStyles()
    const playlists = getPlaylits()
    const miniPlaylists = playlists.map((p) => (
        <MiniPlaylist key={p.id} playlist={p} />
    ))
    return (
        <div className="dashboard-content-wrapper user-management">
            <header className="dashboard-header">
                <TopHeader />
                <SubHeader />
            </header>
            <div
                className="dashboard-content"
                style={{ maxHeight: ' calc(100vh - 115px)' }}
            >
                <main className="main-content select">
                    <div className="notification-page-wrapper">
                        <div className="notification-page-card first-card">
                            <div className="notifications-menu">
                                <div
                                    className="notifications-list "
                                    style={{ height: 'calc( 100vh - 215px)' }}
                                >
                                    <div className={classes.playlists}>
                                        {miniPlaylists}
                                    </div>
                                </div>
                            </div>
                            <PlaylitsPaginationBar />
                        </div>
                        <div className="notification-page-card last-card">
                            <PlaylistsFilter />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Playlists
