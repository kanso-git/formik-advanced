import React, { memo } from 'react'
import { Field, getIn } from 'formik'
import { SortableElement } from 'react-sortable-hoc'

import MyField from '../../fields/MyField'
import { penBlue2, bin } from '../../images'

const Slide = SortableElement((props: any) => {
    const { name } = props
    console.log(' render slide')
    return (
        <div className="card-container">
            <div className="card">
                <div className="card-content">
                    <img
                        style={{ width: 240, height: 135 }}
                        src="https://via.placeholder.com/300.png/09f/fff

C/O https://placeholder.com/"
                    />
                    <h3>
                        <Field name={name} as={MyField}></Field>
                    </h3>
                    <p></p>
                    <p></p>
                    <br />
                    <span className="info-label"></span>
                </div>
                <div className="card-actions">
                    <button
                        type="button"
                        className="btn-action"
                        onClick={() => alert('mod')}
                    >
                        <img src={penBlue2} alt="edit" /> modify
                    </button>
                    <div className="seprator"></div>
                    <button
                        type="button"
                        className="btn-action"
                        onClick={() => alert('del')}
                    >
                        <img src={bin} alt="bin" /> delete
                    </button>
                </div>
            </div>
        </div>
    )
})

export default memo(Slide)
