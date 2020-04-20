import React from 'react'

const PlaylitsPaginationBar = () => {
    return (
        <div
            className="pagination"
            style={{
                background: '#F3F3F3',
                padding: 0,
            }}
        >
            <div className="pagination-buttons">
                <button type="button" className={`btn btn-first-page `}>
                    <i className="fas fa-angle-double-left "></i>
                </button>

                <button type="button" className={`btn btn-prev `}>
                    <i className="fas fa-angle-left"></i>
                </button>

                <button type="button" className={`btn btn-next `}>
                    <i className="fas fa-angle-right"></i>
                </button>
                <button type="button" className={`btn btn-last-page `}>
                    <i className="fas fa-angle-double-right"></i>
                </button>
            </div>
            <div className="pages-control">
                <p>
                    Page <span>1 of 30</span> | Go to page:{' '}
                </p>
                <input
                    className="form-control"
                    type="number"
                    id="currentPageInput"
                />
            </div>
            <div className="rows-control">
                <div className={`custom-select `}>
                    <div className="form-control select-input">
                        <span>show</span>
                    </div>
                    <div className="select-menu">
                        <ul>
                            <li>
                                <span>show 2</span>
                            </li>
                            <li>
                                <span>show 10</span>
                            </li>
                            <li>
                                <span>show 20</span>
                            </li>
                            <li>
                                <span>show 30</span>
                            </li>
                            <li>
                                <span>show 40</span>
                            </li>
                            <li>
                                <span>show 50</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaylitsPaginationBar
