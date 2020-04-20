import React from 'react'
import { SortableContainer } from 'react-sortable-hoc'
import { generate } from 'shortid'
import Slide from './Slide/Slide'
import DraggableCard from './Slide/DraggableCard'
import { ISlide, IPlaylist } from './IPlaylist'
import { FormikProps } from 'formik'
interface DraggablePlaylistProps {
    helperClass: string
    slides: ISlide[]
    form: FormikProps<IPlaylist>
    push: (obj: any) => void
    onSortEnd: (obj: any) => void
    axis: string
    distance: number
}
const DraggablePlaylist = SortableContainer((props: DraggablePlaylistProps) => {
    const { slides, push, form } = props
    return (
        <div className="cards-container user-cards">
            {slides.map((slide: ISlide, index: number) => {
                //form.setFieldValue()
                /*
                const name = `slides[${index}].name`
                const volume = `slides[${index}].volume`
                const duration = `slides[${index}].duration`
                const startDate = `slides[${index}].startDate`
                const endDate = `slides[${index}].endDate`
                */
                // <Slide name={name} key={sl.id} index={index} />
                return (
                    <DraggableCard
                        slideIndex={index}
                        form={form}
                        key={slide.id}
                        index={index}
                    />
                )
            })}

            <div
                className="add-new-slide"
                onClick={(e) => {
                    //if you don't preventDefault  the form will submit
                    e.preventDefault()
                    push({
                        id: generate(),
                        name: '',
                        duration: 5,
                        volume: 30,
                        startDate: new Date(),
                        endDate: undefined,
                        media: null,
                        mediaDeleted: false,
                    })
                }}
            >
                <div className="icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36.712"
                        height="36.712"
                        viewBox="0 0 36.712 36.712"
                    >
                        <g
                            id="plus-yellow"
                            transform="translate(36.712) rotate(90)"
                        >
                            <g id="Group_40872" data-name="Group 40872">
                                <path
                                    id="Path_115006"
                                    data-name="Path 115006"
                                    d="M35.278,16.922H19.79V1.434a1.434,1.434,0,1,0-2.868,0V16.922H1.434a1.434,1.434,0,1,0,0,2.868H16.922V35.278a1.434,1.434,0,0,0,2.868,0V19.79H35.278a1.434,1.434,0,0,0,0-2.868Z"
                                    fill="#fca311"
                                />
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    )
})

export default DraggablePlaylist
