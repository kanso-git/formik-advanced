import './App.css'

import React from 'react'
import screenfull from 'screenfull'
import * as ReactPlayer from 'react-player'
import { findDOMNode } from 'react-dom'
import FullscreenIcon from '@material-ui/icons/Fullscreen'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import StopIcon from '@material-ui/icons/Stop'
import Button from '@material-ui/core/Button'

class MyPlayer extends React.Component {
    state = {
        url: this.props.src,
        pip: false,
        playing: false,
        controls: false,
        light: false,
        volume: this.props.volume,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: false,
    }

    componentDidUpdate(prevState, prevProps) {
        if (prevState.volume !== prevProps.volume) {
            if (this.state.playing) {
                this.setState({ volume: prevState.volume })
            }
            console.log(
                `volume has changed from:${prevProps.volume} to:  ${prevState.volume}`
            )
        }
    }
    handlePlayPause = () => {
        this.setState({ playing: !this.state.playing })
    }

    handleStop = () => {
        this.setState({ url: null, playing: false })
    }

    handleToggleControls = () => {
        const url = this.state.url
        this.setState(
            {
                controls: !this.state.controls,
                url: null,
            },
            () => this.load(url)
        )
    }

    handleToggleLight = () => {
        //this.setState({ light: !this.state.light })
    }

    handleToggleLoop = () => {
        //this.setState({ loop: !this.state.loop })
    }

    handleVolumeChange = (e) => {
        //this.setState({ volume: parseFloat(e.target.value) })
    }

    handleToggleMuted = () => {
        // this.setState({ muted: !this.state.muted })
    }

    handleSetPlaybackRate = (e) => {
        //this.setState({ playbackRate: parseFloat(e.target.value) })
    }

    handleTogglePIP = () => {
        //this.setState({ pip: !this.state.pip })
    }

    handlePlay = () => {
        console.log('onPlay')
        this.setState({ playing: true })
    }

    handleEnablePIP = () => {
        console.log('onEnablePIP')
        this.setState({ pip: true })
    }

    handleDisablePIP = () => {
        console.log('onDisablePIP')
        this.setState({ pip: false })
    }

    handlePause = () => {
        console.log('onPause')
        this.setState({ playing: false })
    }

    handleSeekMouseDown = (e) => {
        this.setState({ seeking: true })
    }

    handleSeekChange = (e) => {
        this.setState({ played: parseFloat(e.target.value) })
    }

    handleSeekMouseUp = (e) => {
        this.setState({ seeking: false })
        this.player.seekTo(parseFloat(e.target.value))
    }

    handleProgress = (state) => {
        //console.log('onProgress', state)
        // We only want to update time slider if we are not currently seeking
        /*
        if (!this.state.seeking) {
            this.setState(state)
        }*/
    }

    handleEnded = () => {
        console.log('onEnded')
        this.setState({ playing: this.state.loop })
    }

    handleDuration = (duration) => {
        console.log('onDuration', duration)
        this.setState({ duration })
    }

    handleClickFullscreen = () => {
        screenfull.request(findDOMNode(this.player))
    }

    renderLoadButton = (url, label) => {
        return <button onClick={() => this.load(url)}>{label}</button>
    }

    ref = (player) => {
        this.player = player
    }

    render() {
        const {
            url,
            playing,
            controls,
            light,
            volume,
            muted,
            loop,
            played,
            loaded,
            duration,
            playbackRate,
            pip,
        } = this.state
        const SEPARATOR = ' · '
        console.log(volume)
        return (
            <section className="section" style={{ marginTop: '18px' }}>
                <div className="player-wrapper">
                    <ReactPlayer.default
                        ref={this.ref}
                        className="react-player"
                        width="100%"
                        height="100%"
                        url={url}
                        pip={pip}
                        playing={playing}
                        controls={controls}
                        light={light}
                        loop={loop}
                        playbackRate={playbackRate}
                        volume={volume}
                        muted={muted}
                        onReady={() => console.log('onReady')}
                        onStart={() => console.log('onStart')}
                        onPlay={this.handlePlay}
                        onEnablePIP={this.handleEnablePIP}
                        onDisablePIP={this.handleDisablePIP}
                        onPause={this.handlePause}
                        onBuffer={() => console.log('onBuffer')}
                        onSeek={(e) => console.log('onSeek', e)}
                        onEnded={this.handleEnded}
                        onError={(e) => console.log('onError', e)}
                        onProgress={this.handleProgress}
                        onDuration={this.handleDuration}
                    />
                </div>
                <div className="video-ctrl">
                    <Button
                        onClick={this.handlePlayPause}
                        variant="text"
                        color="primary"
                        size="small"
                        style={{ margin: 5 }}
                        startIcon={playing ? <StopIcon /> : <PlayArrowIcon />}
                    >
                        {playing ? 'Pause' : 'Play'}
                    </Button>
                    <Button
                        onClick={this.handleClickFullscreen}
                        variant="text"
                        color="primary"
                        size="small"
                        startIcon={<FullscreenIcon />}
                    >
                        Fullmode
                    </Button>
                </div>
            </section>
        )
    }
}

export default MyPlayer
