import React from 'react'
import MainBackground from './MainBackground'
import SideBar from './SideBar'
import useToggle from './hooks/useToggle'

const Layout = (props: any) => {
    const [expanded, toggleExpand] = useToggle()
    return (
        <div className="wrapper">
            <MainBackground {...props} />

            <div
                id="dashboardId"
                onClick={(e: any) => {
                    if (
                        e &&
                        e.target &&
                        e.target.classList &&
                        e.target.classList.toString().indexOf('side-menu') > -1
                    ) {
                        e.stopPropagation()
                        toggleExpand()
                    }
                }}
                className={`dashboard ${expanded ? 'expandSideMenu' : ''}`}
            >
                <SideBar />
                {props.children}
            </div>
        </div>
    )
}

export default Layout
