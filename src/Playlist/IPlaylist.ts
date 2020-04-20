import { generate } from 'shortid'

export interface IUser {
    id: string
    username: string
    firstName: string
    lastName: string
}

enum SlideState {
    NEW = 'NEW',
    PUBLISHED = 'PUBLISHED',
    DRAFT = 'DRAFT',
}

export interface ISlide {
    id?: string
    name: string
    startDate: Date
    state: SlideState
    endDate: undefined
    duration: number
    volume: number
    media: string
    deletedMedia?: string
    createdAt?: any
    createdUser?: IUser
    updatedAt?: any
    updatedUser?: IUser
}

export interface IPlaylist {
    id?: string
    name: string
    description?: string
    media?: string
    deletedMedia?: string
    locked?: boolean
    createdAt?: any
    createdUser?: IUser
    updatedAt?: any
    updatedUser?: IUser
    slides: ISlide[]
}

export const getDefaultFormValues = (): IPlaylist => {
    return {
        name: '',
        slides: [],
    }
}

export const getDefaultFromValuesTest = (): IPlaylist => ({
    id: generate(),
    name: 'my first playlist',
    slides: [
        {
            id: generate(),
            name: 'first Slide',
            startDate: new Date(),
            endDate: undefined,
            duration: 10,
            volume: 0,
            media: '51090.jpg',
            state: SlideState.PUBLISHED,
        },
        {
            id: generate(),
            name: 'second Slide',
            startDate: new Date(),
            endDate: undefined,
            duration: 5,
            volume: 30,
            media: 'magic_kingdom.mp4',
            state: SlideState.PUBLISHED,
        },

        {
            id: generate(),
            name: 'Panasonic_HDC_TM_700_P_50i',
            startDate: new Date(),
            endDate: undefined,
            duration: 5,
            volume: 30,
            media: 'Panasonic_HDC_TM_700_P_50i.mp4',
            state: SlideState.PUBLISHED,
        },

        {
            id: generate(),
            name: 'eugenia_loli',
            startDate: new Date(),
            endDate: undefined,
            duration: 5,
            volume: 30,
            media: 'eugenia_loli--golden_gate_bridge_timelapse.mp4',
            state: SlideState.PUBLISHED,
        },

        {
            id: generate(),
            name: 'colby_moore--one_big_picnic',
            startDate: new Date(),
            endDate: undefined,
            duration: 5,
            volume: 30,
            media: 'colby_moore--one_big_picnic.mp4',
            state: SlideState.PUBLISHED,
        },
    ],
})
