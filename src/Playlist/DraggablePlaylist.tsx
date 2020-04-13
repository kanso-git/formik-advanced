import React from 'react'
import { SortableContainer } from 'react-sortable-hoc'
import { generate } from 'shortid'
import Slide from './Slide/Slide'

const DraggablePlaylist = SortableContainer((props: any) => {
    const { slides, push } = props
    return (
        <div className="cards-container user-cards">
            {slides.map((sl: any, index: number) => {
                //form.setFieldValue()
                const name = `slides[${index}].name`
                return <Slide name={name} key={sl.id} index={index} />
            })}

            <div className="card-container">
                <div className="card">
                    <button
                        type="button"
                        style={{
                            height: '100%',
                            border: 'none',
                        }}
                        onClick={(e) => {
                            //if you don't preventDefault  the form will submit
                            e.preventDefault()
                            push({
                                id: generate(),
                                name: '',
                            })
                        }}
                    >
                        <div className="icon">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="17.992"
                                height="17.992"
                                viewBox="0 0 17.992 17.992"
                            >
                                <g
                                    id="plus-yellow-small"
                                    transform="translate(17.992) rotate(90)"
                                >
                                    <g id="Group_40872" data-name="Group 40872">
                                        <path
                                            id="Path_115006"
                                            data-name="Path 115006"
                                            d="M17.289,8.293H9.7V.7A.7.7,0,1,0,8.293.7v7.59H.7A.7.7,0,1,0,.7,9.7h7.59v7.59a.7.7,0,0,0,1.406,0V9.7h7.59a.7.7,0,0,0,0-1.406Z"
                                            fill="#fca311"
                                        />
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <h4>Ajouter un autre module</h4>
                    </button>
                </div>
            </div>
        </div>
    )
})

export default DraggablePlaylist
