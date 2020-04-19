import React, { useState } from 'react'
import { menu } from './images'

const TopHeader = (props: any) => {
    return (
        <div className="main-header">
            <button className="side-menu-trigger">
                <img src={menu} alt="menu" />
            </button>
            <div className="breadcrumb">
                <span>Configurations</span>
                <span> / </span>
                <span className="active">Playlist</span>
            </div>
            <div className="user-menu" style={{ height: 57 }}></div>
        </div>
    )
}
export default TopHeader
