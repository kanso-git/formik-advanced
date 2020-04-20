import React, { Fragment } from 'react'
import { checkMark } from '../images'

const PlaylistsFilter = () => {
    const getCategoriesList = (i: number, j: number): JSX.Element => {
        const jsx = (
            <label className="option circle-checkbox">
                <div className="option-content">
                    <p>--</p>
                </div>
                <input type="checkbox" />
                <span className="checkmark">
                    <img src={checkMark} alt="check" />
                </span>
            </label>
        )
        return <Fragment>{jsx}</Fragment>
    }
    return (
        <div className="notification-page-filter">
            <h2>Filtrer par</h2>
            <h3>Date</h3>
            <div className="filter-page-row">
                <div className="filter-page-col">
                    <div className="options">
                        <label className="option circle-radio">
                            <div className="option-content">
                                <p>Aujourd'hui</p>
                            </div>
                            <input name="role" type="radio" />
                            <span className="checkmark"></span>
                        </label>
                        <label className="option circle-radio">
                            <div className="option-content">
                                <p>Hier</p>
                            </div>
                            <input name="role" type="radio" />
                            <span className="checkmark"></span>
                        </label>
                        <label className="option circle-radio">
                            <div className="option-content">
                                <p>Cette Semaine</p>
                            </div>
                            <input name="role" type="radio" />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
                <div className="filter-page-col">
                    <div className="options">
                        <label className="option circle-radio">
                            <div className="option-content">
                                <p>La semaine derniere</p>
                            </div>
                            <input name="role" type="radio" />
                            <span className="checkmark"></span>
                        </label>
                        <label className="option circle-radio">
                            <div className="option-content">
                                <p>Ce mois-ci</p>
                            </div>
                            <input name="role" type="radio" />
                            <span className="checkmark"></span>
                        </label>
                        <label className="option circle-radio">
                            <div className="option-content">
                                <p>Le mois dernier</p>
                            </div>
                            <input name="role" type="radio" />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
            </div>
            <br />
            <h3>Categorie</h3>
            <div className="filter-page-row">
                <div className="filter-page-col">
                    <div className="options">{getCategoriesList(0, 4)}</div>
                </div>
                <div className="filter-page-col">
                    <div className="options">{getCategoriesList(4, 8)}</div>
                </div>
            </div>
        </div>
    )
}

export default PlaylistsFilter
