import React from 'react'
import Playlist from './Playlist/Playlist'
import Landing from './Landing'
import MediaCard from './Playlist/Slide/Card'
import { Route, Switch, RouteComponentProps } from 'react-router-dom'
import Landing2 from './Landing2'

function App() {
    return (
        <Switch>
            <Route path="/" exact render={() => <Landing />} />
            <Route path="/playlists/:id" exact render={() => <Landing2 />} />
        </Switch>
    )
}

export default App
