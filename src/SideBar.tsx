import React from 'react'
import { iconDashboard, aiecLogo } from './images'

const SideBar = (props: any) => {
    const activeMenu = ['configuration', 'slides']

    return (
        <aside id="asideId" className="side-menu">
            <div className="logo">
                <h1>
                    <img src={aiecLogo} alt="AIEC" />
                </h1>
            </div>
            <ul>
                <li>
                    <div className="menu-item">
                        <div className="icon">
                            <img src={iconDashboard} alt="dashboard" />
                        </div>
                        <span>dashboard</span>
                    </div>
                </li>
            </ul>

            <p className="operated-by">
                operated By <span>UniNE</span>
            </p>
        </aside>
    )
}

export default SideBar
