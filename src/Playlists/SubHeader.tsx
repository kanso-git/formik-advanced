import React from 'react'
import { plus } from '../images'
import SeacrhInput from './SearchInput'

const SubHeader = (props: any) => {
    return (
        <div className="subheader">
            <button className="btn-create" onClick={() => alert()}>
                <img src={plus} alt={'createUser'} />
                {'createUser'}
            </button>
            <SeacrhInput />
            <div className="view-control">
                <button
                    type="button"
                    className={`view-item active`}
                    onClick={() => alert()}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10.31"
                        height="10.896"
                        viewBox="0 0 10.31 10.896"
                    >
                        <g
                            id="card-view"
                            transform="translate(10.31 10.896) rotate(180)"
                        >
                            <g
                                id="Group_35096"
                                data-name="Group 35096"
                                transform="translate(0 5.97)"
                            >
                                <path
                                    id="Path_49431"
                                    data-name="Path 49431"
                                    d="M4.661,52.986A.373.373,0,0,0,4.3,52.6H.365A.373.373,0,0,0,0,52.986V57.14a.373.373,0,0,0,.365.386H4.3a.373.373,0,0,0,.365-.386Z"
                                    transform="translate(0 -52.6)"
                                    fill="#959ba5"
                                />
                            </g>
                            <g
                                id="Group_35097"
                                data-name="Group 35097"
                                transform="translate(5.649)"
                            >
                                <path
                                    id="Path_49432"
                                    data-name="Path 49432"
                                    d="M57.261.386A.373.373,0,0,0,56.9,0H52.965A.373.373,0,0,0,52.6.386V4.54a.373.373,0,0,0,.365.386H56.9a.373.373,0,0,0,.365-.386Z"
                                    transform="translate(-52.6)"
                                    fill="#959ba5"
                                />
                            </g>
                            <g
                                id="Group_35098"
                                data-name="Group 35098"
                                transform="translate(5.649 5.97)"
                            >
                                <path
                                    id="Path_49433"
                                    data-name="Path 49433"
                                    d="M57.261,52.986A.373.373,0,0,0,56.9,52.6H52.965a.373.373,0,0,0-.365.386V57.14a.373.373,0,0,0,.365.386H56.9a.373.373,0,0,0,.365-.386Z"
                                    transform="translate(-52.6 -52.6)"
                                    fill="#959ba5"
                                />
                            </g>
                            <g id="Group_35099" data-name="Group 35099">
                                <path
                                    id="Path_49434"
                                    data-name="Path 49434"
                                    d="M4.661.386A.373.373,0,0,0,4.3,0H.365A.373.373,0,0,0,0,.386V4.54a.373.373,0,0,0,.365.386H4.3a.373.373,0,0,0,.365-.386Z"
                                    transform="translate(0)"
                                    fill="#959ba5"
                                />
                            </g>
                        </g>
                    </svg>
                </button>

                <button
                    type="button"
                    className={`view-item active `}
                    onClick={() => alert()}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12.284"
                        height="12.711"
                        viewBox="0 0 12.284 12.711"
                    >
                        <g
                            id="list-view"
                            transform="translate(12.284) rotate(90)"
                        >
                            <path
                                id="Path_49574"
                                data-name="Path 49574"
                                d="M13.739,40.684h-1.9c-.363,0-.639-.424-.639-.922V29.322c0-.523.294-.922.639-.922h1.9c.363,0,.639.424.639.922v10.44C14.378,40.285,14.1,40.684,13.739,40.684Z"
                                transform="translate(-11.2 -28.4)"
                                fill="#fff"
                            />
                            <path
                                id="Path_49575"
                                data-name="Path 49575"
                                d="M41.339,22.684h-1.9a.657.657,0,0,1-.639-.675V11.075a.656.656,0,0,1,.639-.675h1.9a.657.657,0,0,1,.639.675V22.009A.656.656,0,0,1,41.339,22.684Z"
                                transform="translate(-34.033 -10.4)"
                                fill="#fff"
                            />
                            <path
                                id="Path_49576"
                                data-name="Path 49576"
                                d="M68.939,51.184h-1.9c-.363,0-.639-.538-.639-1.171V40.071c0-.665.294-1.171.639-1.171h1.9c.363,0,.639.538.639,1.171v9.941C69.578,50.677,69.284,51.184,68.939,51.184Z"
                                transform="translate(-56.867 -38.9)"
                                fill="#fff"
                            />
                        </g>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default SubHeader
