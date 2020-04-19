import React from 'react'
import { background03 } from './images'

const MainBackground = (props: any) => {
    const { backgroundColor } = props
    return (
        <div
            className="main-background"
            style={{
                background: backgroundColor ? backgroundColor : '#F5F5F7',
            }}
        >
            <img src={background03} alt="background 03" />
        </div>
    )
}

export default MainBackground
