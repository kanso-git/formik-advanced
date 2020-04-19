import React, { memo } from 'react'
import { Field, getIn, FormikProps } from 'formik'
import { SortableElement } from 'react-sortable-hoc'

import MyField from '../../fields/MyField'
import { penBlue2, bin } from '../../images'
import MediaCard from './Card'
import { ISlide, IPlaylist } from '../IPlaylist'

interface DraggableCardProps {
    slideIndex: number
    form: FormikProps<IPlaylist>
    index: number
}
const DraggableCard = SortableElement((props: DraggableCardProps) => {
    return <MediaCard {...props} />
})

export default memo(DraggableCard)
