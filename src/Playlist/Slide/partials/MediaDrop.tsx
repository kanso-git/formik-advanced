import React, { useState, Fragment, useRef, useEffect } from 'react'

import Dropzone from 'react-dropzone'
import { unisexAvatar, closeWhite, cloudComputing } from '../../../images'
import { AppLogger } from '../../../AppLogger'
import { IPlaylist } from '../../IPlaylist'
import { FormikProps, getIn } from 'formik'
import { MediaType } from '../../../generated/globalTypes'
import {
    getMediaUrl,
    isImage,
    deleteMedia,
    isViedo,
    uploadMedia,
} from '../../../common/utils'
//import MyPlayer from './ReactPlayer'

const logger = AppLogger.getInstance()

interface MediaDropProps {
    mediaUrl?: string
    mediaType: MediaType
    mediaChange: (e: any) => void
    mediaDelete: (e: boolean) => void
}

interface MediaDropProps {
    value: string
    form: FormikProps<IPlaylist>
    name: string //media
    mediaDeleted: string
    mediaUploadName: string
    volume: string
    slideIndex: number
}

const MediaDrop = (props: MediaDropProps) => {
    let {
        value: media,
        form,
        name,
        mediaDeleted,
        mediaUploadName,
        volume,
        slideIndex,
    } = props

    const player = useRef(null)
    const error = getIn(form.errors, name)
    const touched = getIn(form.touched, name)
    const mediaDeletedFlag = getIn(form.values, mediaDeleted)
    const mediaUploadNameValue = getIn(form.values, mediaUploadName)
    const volumeValue = getIn(form.values, volume)

    /**
     * check if we have media content
     */
    const hasMedia = (): boolean => {
        // wehen initial media is deleted check if we have a preview
        if (mediaDeletedFlag) {
            return mediaUploadNameValue ? true : false
        } else {
            // media not deleted : 2 cases new slide or saved slide
            return media || mediaUploadNameValue ? true : false
        }
    }

    /**
     * get the current media url
     *
     */
    const getCurrentMedia = (): string | undefined => {
        let currentMediaUrl: any = ''
        if (mediaDeletedFlag) {
            currentMediaUrl = mediaUploadNameValue
        } else {
            currentMediaUrl = mediaUploadNameValue
                ? getMediaUrl(mediaUploadNameValue)
                : getMediaUrl(media)
        }
        return currentMediaUrl
    }

    /**
     * get the media type
     */
    const getMediaType = (mediaName: string): MediaType | undefined => {
        let mediaType
        if (isImage(mediaName)) {
            mediaType = MediaType.SLIDE_IMAGE
        } else if (isViedo(mediaName)) {
            mediaType = MediaType.SLIDE_VIDEO
        }
        return mediaType
    }
    const handleDeleteMedia = async (): Promise<any> => {
        //when we click on the x button set the filed as touched
        form.setFieldTouched(name)
        // mediaDeletedFalg is set only when deleting the saved media
        if (media && !mediaDeletedFlag) {
            form.setFieldValue(mediaDeleted, true)
        } else if (mediaUploadNameValue) {
            const mySlide = form.values.slides.find((s, i) => i === slideIndex)
            const mediaType = getMediaType(mediaUploadNameValue)
            if (mySlide && mediaType) {
                debugger
                await deleteMedia(mediaUploadNameValue, mediaType)

                mySlide.mediaUploadName = undefined
                mySlide.name = ''
                const currentSlides = form.values.slides
                currentSlides.splice(slideIndex, 1, mySlide)

                form.setValues({
                    ...form.values,
                    slides: [...currentSlides],
                })
            }
        }
    }
    /**
     * TODO test the below method
     */
    const hasMediaError = (): boolean => {
        if (mediaDeletedFlag) {
            return mediaUploadNameValue ? false : true
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
            const mediaContent = mediaUploadNameValue
                ? mediaUploadNameValue
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
                const mediaType = getMediaType(file.name)
                logger.log('preview', preview)
                logger.log('myResult', myResult)

                if (myResult) {
                    const mySlide = form.values.slides.find(
                        (s, i) => i === slideIndex
                    )

                    if (mySlide && mediaType) {
                        /**
                           interface IUpload {
                                data: string | ArrayBuffer
                                name: string
                                type: string
                            }
                                                   
                        */

                        const fileName = await uploadMedia({
                            data: myResult,
                            name: file.name,
                            type: mediaType,
                        })
                        mySlide.mediaUploadName = fileName
                        mySlide.name = file.name
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
