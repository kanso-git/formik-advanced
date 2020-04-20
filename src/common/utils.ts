import { AppLogger } from '../AppLogger'
import { MediaType } from '../generated/globalTypes'
import { AxiosApiLayer } from '../axios-api_layer'

const logger = AppLogger.getInstance()

const UPLOAD_ENDPOINT = process.env.REACT_APP_UPLOAD_ENDPOINT as string
const BASE_URL =
    process.env.REACT_APP_HTTPASSETS_URI || 'http://localhost:4800/assets/'

const IMAGE_EXTENSIONS = process.env.REACT_APP_IMAGE_EXTENSIONS as string
const VIDEO_EXTENSIONS = process.env.REACT_APP_VIDEO_EXTENSIONS as string

const IMAGES = 'images'
const USERS = 'users'

const COVERS = 'covers'
const SLIDES = 'slides'
const MINISLIDES = 'mini_slides'
const THUMBNAIL_SLIDES = 'thumbnail_slides'
const AUDIOS = 'audios'
const VIDEOS = 'videos'

export const buildMediaURL = (
    mediaName: string,
    mediaType: MediaType,
    original?: boolean
): string => {
    switch (mediaType) {
        case MediaType.SLIDE_IMAGE:
            return `${BASE_URL}/${IMAGES}/${MINISLIDES}/${mediaName}`
        case MediaType.SLIDE_VIDEO:
            return `${BASE_URL}/${VIDEOS}/${mediaName}`

        default:
            return ''
    }
}
export const isImage = (fileName: string): boolean => {
    const imgRegex = /.(jpg|jpeg|png|gif|svg)$/i
    return fileName && fileName.trim().length > 0
        ? !!fileName.match(imgRegex)
        : false
}
export const isViedo = (fileName: string): boolean => {
    const videoRegex = /.(mov|avi|wmv|flv|3gp|mp4|mpg)$/i
    return fileName && fileName.trim().length > 0
        ? !!fileName.match(videoRegex)
        : false
}

export const getMediaUrl = (value: string | undefined): string | undefined => {
    if (value && value.trim().length > 0) {
        if (isImage(value)) {
            return buildMediaURL(value, MediaType.SLIDE_IMAGE)
        } else {
            return buildMediaURL(value, MediaType.SLIDE_VIDEO)
        }
    } else {
        return ''
    }
}

export const removeSessionValues = (): void => {
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('token')
}

export enum EReason {
    Deleted = 'deleted',
    Updated = 'updated',
    Created = 'created',
}
export enum ENotificationSystemLevel {
    Success = 'success',
    Error = 'error',
    Warning = 'warning',
    Info = 'info',
}

export enum ENotificationSystemPosition {
    TopRight = 'tr',
    TopLeft = 'tl',
    TopCenter = 'tc',
    BottomRight = 'br',
    BottomLeft = 'bl',
    BottomCenter = 'bc',
}
export const addNotification = (
    ref: any,
    title: string,
    message: string,
    level: ENotificationSystemLevel,
    position: ENotificationSystemPosition
) => {
    ref.addNotification({
        title,
        message,
        level,
        position,
    })
}

export interface IUser {
    id: string
    username: string
    firstName: string
    lastName: string
}

/**  Medias operations */
interface IUpload {
    data: string | ArrayBuffer
    name: string
    type: string
}
/**
 * Upload media file
 * the uploaded directory will be constrcucted based on its type
 *
 */
export const uploadMedia = async (media: IUpload): Promise<string> => {
    logger.log(`uploadImage imageName:${media.name} type:${media.type} `)
    const axiosApiLayer = AxiosApiLayer.getInstance()
    const imageResp = await axiosApiLayer.post(`${UPLOAD_ENDPOINT}`, {
        data: media.data,
        name: media.name,
        type: media.type,
    })
    return imageResp.data.fileName
}

/**
 * Delete media file
 * TODO add more types mainly for videos and audios
 */
export const deleteMedia = async (
    mediaName: string,
    type: MediaType
): Promise<any> => {
    const axiosApiLayer = AxiosApiLayer.getInstance()
    // avoid deleting something not exist
    logger.log(`deleteImage imageName:${mediaName} type:${type} `)
    if (mediaName.match(/.(jpg|jpeg|png|gif|svg|mov|wmv|flv|3gp|mp4|mpg)$/i)) {
        return await axiosApiLayer.delete(`${UPLOAD_ENDPOINT}`, {
            data: { fileName: mediaName, type },
        })
    }
}
