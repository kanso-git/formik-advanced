import React, { useState, Fragment, useRef, useEffect } from 'react'
import Dropzone from 'react-dropzone'

import { FormikProps, getIn, FormikTouched, FormikErrors } from 'formik'
import { AppLogger } from '../AppLogger'
import { IPlaylist } from './IPlaylist'
import {
    getMediaUrl,
    isImage,
    isViedo,
    deleteMedia,
    uploadMedia,
} from '../common/utils'
import { MediaType } from '../generated/globalTypes'
import { penWhite, cloudComputing } from '../images'

const logger = AppLogger.getInstance()

interface MediaDropProps {
    values: IPlaylist
    fieldChange: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) => void
    touched: FormikTouched<IPlaylist>
    errors: FormikErrors<IPlaylist>
}

const MediaDrop = (props: MediaDropProps) => {
    let { values, touched, fieldChange, errors } = props

    const isTouched = touched.media
    const mediaDeleted = values.mediaDeleted
    const mediaUploadName = values.mediaUploadName
    const media = values.media
    /**
     * check if we have media content
     */
    const hasMedia = (): boolean => {
        // wehen initial media is deleted check if we have a preview
        if (mediaDeleted) {
            return mediaUploadName ? true : false
        } else {
            // media not deleted : 2 cases new slide or saved slide
            return media || mediaUploadName ? true : false
        }
    }

    /**
     * get the current media url
     *
     */
    const getCurrentMedia = (): string | undefined => {
        let currentMediaUrl: any = ''
        if (mediaDeleted) {
            currentMediaUrl = mediaUploadName
        } else {
            currentMediaUrl = mediaUploadName
                ? getMediaUrl(mediaUploadName)
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
    const handleDeleteMedia = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): Promise<any> => {
        e.stopPropagation()
        e.preventDefault()
        //when we click on the x button set the filed as touched
        //fieldChange.setFieldTouched(name)
        // mediaDeletedFalg is set only when deleting the saved media
        if (media && !mediaDeleted) {
            fieldChange('mediaDeleted', true)
        } else if (mediaUploadName) {
            const mediaType = getMediaType(mediaUploadName)
            if (mediaType) {
                await deleteMedia(mediaUploadName, mediaType)
                fieldChange('mediaUploadName', undefined)
            }
        }
    }
    /**
     * TODO test the below method
     */
    const hasMediaError = (): boolean => {
        if (mediaDeleted) {
            return mediaUploadName ? false : true
        } else {
            return !media && isTouched ? true : false
        }
    }

    const renderHtml5Video = (src: string): JSX.Element => {
        return (
            <video
                id={`playlistVideo`}
                style={{
                    width: '345px',
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                }}
                controls
            >
                <source src={src} />
                Your browser does not support HTML5 video.
            </video>
        )
    }

    const renderMediaContent = () => {
        const mediaContent = mediaUploadName ? mediaUploadName : media
        if (mediaContent) {
            if (isImage(mediaContent)) {
                return <img src={getCurrentMedia()} alt={''} />
            } else if (isViedo(mediaContent)) {
                const currentMedia = getCurrentMedia()
                return currentMedia && renderHtml5Video(currentMedia)
            }
        }
    }
    const renderMedia = (): JSX.Element => {
        return (
            <div className="media-upload block-upload">
                <div
                    className="upload-area has-uploads "
                    style={{ border: 'none' }}
                >
                    <div className="uploaded-img">{renderMediaContent()}</div>
                    <button
                        className="remove-uploads"
                        onClick={handleDeleteMedia}
                    >
                        <img src={penWhite} alt="close" />
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

                if (myResult && mediaType) {
                    const fileName = await uploadMedia({
                        data: myResult,
                        name: file.name,
                        type: mediaType,
                    })
                    fieldChange('mediaUploadName', fileName)
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

    // closeWhite penWhite
    return <Fragment>{hasMedia() ? renderMedia() : renderDropZone()}</Fragment>
}
export default MediaDrop
