import React, { useState, Fragment, useRef, useEffect } from 'react'

import Dropzone from 'react-dropzone'
import { unisexAvatar, closeWhite, cloudComputing } from '../../../images'
import { AppLogger } from '../../../AppLogger'
import { IPlaylist } from '../../IPlaylist'
import { FormikProps, getIn } from 'formik'
//import MyPlayer from './ReactPlayer'

export enum MediaType {
    DISPLAY_COVER_IMAGE = 'DISPLAY_COVER_IMAGE',
    PLAYLIST_COVER_IMAGE = 'PLAYLIST_COVER_IMAGE',
    SLIDE_AUDIO = 'SLIDE_AUDIO',
    SLIDE_EMBEDDED_CONTENT = 'SLIDE_EMBEDDED_CONTENT',
    SLIDE_IMAGE = 'SLIDE_IMAGE',
    SLIDE_VIDEO = 'SLIDE_VIDEO',
    USER_IMAGE = 'USER_IMAGE',
}

const logger = AppLogger.getInstance()

interface MediaDropProps {
    mediaUrl?: string
    mediaType: MediaType
    mediaChange: (e: any) => void
    mediaDelete: (e: boolean) => void
}

const UPLOAD_ENDPOINT = process.env.REACT_APP_UPLOAD_ENDPOINT as string
//const BASE_URL =
//  process.env.REACT_APP_HTTPASSETS_URI || 'http://localhost:4800/assets'
const BASE_URL = 'http://localhost:4800/assets'
const SLIDES = 'slides'
const MINISLIDES = 'mini_slides'
const IMAGES = 'images'
const VIDEOS = 'videos'
const USERS = 'users'

export const isImage = (fileName: string): boolean => {
    return !!fileName.match(/.(jpg|jpeg|png|gif|svg)$/i)
}
export const isViedo = (fileName: string): boolean => {
    return !!fileName.match(/.(mov|avi|wmv|flv|3gp|mp4|mpg)$/i)
}
interface MediaDropProps {
    value: string
    form: FormikProps<IPlaylist>
    name: string //media
    mediaUpload: string
    mediaDeleted: string
    previewURL: string
    volume: string
    slideIndex: number
    mediaUploadFileName: string
}

const MediaDrop = (props: MediaDropProps) => {
    let {
        value: media,
        form,
        name,
        mediaDeleted,
        mediaUpload,
        volume,
        previewURL,
        slideIndex,
        mediaUploadFileName,
    } = props
    const player = useRef(null)
    const error = getIn(form.errors, name)

    const touched = getIn(form.touched, name)

    const mediaUploadValue = getIn(form.values, mediaUpload)
    const mediaDeletedFlag = getIn(form.values, mediaDeleted)
    const mediaPreviewURL = getIn(form.values, previewURL)
    const volumeValue = getIn(form.values, volume)
    const mediaUploadFileNameValue = getIn(form.values, mediaUploadFileName)

    console.log(`MediaDrop  media:${media}`)

    const buildMediaURL = (
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
    const getMediaUrl = (value: string | undefined): string | undefined => {
        if (value) {
            if (isImage(value)) {
                return buildMediaURL(value, MediaType.SLIDE_IMAGE)
            } else {
                return buildMediaURL(value, MediaType.SLIDE_VIDEO)
            }
        } else {
            return ''
        }
    }

    // media can be image or video

    /**
     * check if we have media content
     */
    const hasMedia = (): boolean => {
        if (mediaDeletedFlag) {
            return mediaPreviewURL ? true : false
        } else {
            // media not deleted : 2 cases new slide or saved slide
            return media || mediaPreviewURL ? true : false
        }
    }

    const getCurrentMedia = (): string | undefined => {
        let currentMediaUrl: any = ''
        if (mediaDeletedFlag) {
            currentMediaUrl = mediaPreviewURL
        } else {
            currentMediaUrl = mediaPreviewURL
                ? mediaPreviewURL
                : getMediaUrl(media)
        }
        return currentMediaUrl
    }

    const handleDeleteMedia = (): void => {
        //when we click on the x button set the filed as touched
        form.setFieldTouched(name)
        // mediaDeletedFalg is set only when deleting the saved media
        if (media && !mediaDeletedFlag) {
            form.setFieldValue(mediaDeleted, true)
        } else if (mediaPreviewURL) {
            const mySlide = form.values.slides.find((s, i) => i === slideIndex)
            if (mySlide) {
                mySlide.mediaUpload = undefined
                mySlide.previewURL = undefined
                mySlide.mediaUploadFileName = undefined
                const currentSlides = form.values.slides
                currentSlides.splice(slideIndex, 1, mySlide)

                form.setValues({
                    ...form.values,
                    slides: [...currentSlides],
                })
            }
        }
    }
    const hasMediaError = (): boolean => {
        if (mediaDeletedFlag) {
            return mediaPreviewURL ? false : true
        } else {
            return !!media && touched ? true : false
        }
    }

    const renderHtml5Video = (src: string): JSX.Element => {
        return (
            <video
                id={`myVideo_${slideIndex}`}
                ref={player}
                style={{ width: '345px' }}
                controls
            >
                <source src={src} />
                Your browser does not support HTML5 video.
            </video>
        )
    }

    const renderMediaContent = () => {
        if (getCurrentMedia()) {
            const mediaContent = mediaUploadValue
                ? mediaUploadFileNameValue
                : media
            console.log(
                `>>>>>>>>>>>>>>>> slide index ${slideIndex} mediaContent:${mediaContent} `
            )
            if (isImage(mediaContent)) {
                console.log(
                    `>>>>>>>>>>>>>>>> slide index ${slideIndex} mediaContent is image `
                )
                return <img src={getCurrentMedia()} alt={''} />
            } else if (isViedo(mediaContent)) {
                console.log(
                    `>>>>>>>>>>>>>>>> slide index ${slideIndex} mediaContent is video `
                )
                const currentMedia = getCurrentMedia()
                return currentMedia && renderHtml5Video(currentMedia)
                /*
                return (
                    <MyPlayer
                        src={getCurrentMedia()}
                        volume={volumeValue ? volumeValue / 100 : 0}
                    />
                )*/
            }
        }
    }
    const renderMedia = (): JSX.Element => {
        return (
            <div className="media-upload block-upload">
                <div className="upload-area has-uploads ">
                    <div className="uploaded-img">{renderMediaContent()}</div>
                    <button
                        className="remove-uploads"
                        onClick={handleDeleteMedia}
                    >
                        <img src={closeWhite} alt="close" />
                    </button>
                </div>
            </div>
        )
    }

    const renderDropZone = (): JSX.Element => {
        return (
            <Dropzone
                multiple={false}
                accept={['image/svg+xml', 'image/png', 'image/jpeg', 'video/*']}
                onDrop={(acceptedFiles) =>
                    handleDropzoneChange(acceptedFiles[0])
                }
            >
                {({ getRootProps, getInputProps }) => (
                    <div
                        {...getRootProps({
                            className: ` media-upload block-upload ${
                                hasMediaError() && 'media-error'
                            } `,
                        })}
                    >
                        <div className="upload-area ">
                            <div className="upload-content ">
                                <input {...getInputProps()} />
                                <div className="dragDrop">
                                    <img src={cloudComputing} alt={''} />
                                    <p>Glissez et déposez le media ici</p>
                                </div>

                                <div className="upload-button">
                                    <button type="button">Télécharger</button>
                                </div>
                            </div>
                            <ul className="upload-instructions">
                                <li>Formats PNG, SVG, JPEG, JPG</li>
                                <li>Taille maximale 100KB</li>
                                <li>Dimension 320x137px</li>
                            </ul>
                        </div>
                        {hasMediaError() && (
                            <div className="error-message">Media required!</div>
                        )}
                    </div>
                )}
            </Dropzone>
        )
    }
    const handleDropzoneChange = (file: any) => {
        logger.log(file)

        const myFileItemReader = new FileReader()
        myFileItemReader.onabort = () => logger.log('file reading was aborted')
        myFileItemReader.onerror = () => logger.log('file reading has failed')

        /**
         * in order to improve the performance we have to implement the folowing
         * 1 - upload the media to the server directly
         * 2 - make name ready only - it will be the media name
         * 3 - add delete card button
         */
        myFileItemReader.addEventListener(
            'load',
            async () => {
                const preview = URL.createObjectURL(file)
                //setmyMediaUrl(preview)
                const myResult = myFileItemReader.result
                logger.log('preview', preview)
                logger.log('myResult', myResult)
                if (myResult) {
                    const mySlide = form.values.slides.find(
                        (s, i) => i === slideIndex
                    )
                    if (mySlide) {
                        mySlide.mediaUpload = myResult
                        mySlide.previewURL = preview
                        mySlide.mediaUploadFileName = file.name
                        const currentSlides = form.values.slides
                        currentSlides.splice(slideIndex, 1, mySlide)

                        form.setValues({
                            ...form.values,
                            slides: [...currentSlides],
                        })
                    }
                }
            },
            false
        )
        try {
            myFileItemReader.readAsDataURL(file)
        } catch (e) {
            logger.error(e.message)
        }
    }

    useEffect(() => {
        const id = `myVideo_${slideIndex}`
        const ref = document.getElementById(id) as any
        if (ref) {
            ref.volume = volumeValue ? volumeValue / 100 : 0
        }
    }, [volumeValue])
    // closeWhite penWhite
    return <Fragment>{hasMedia() ? renderMedia() : renderDropZone()}</Fragment>
}
export default MediaDrop
