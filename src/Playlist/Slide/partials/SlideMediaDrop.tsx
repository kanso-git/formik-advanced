import React, { useState, Fragment, useRef, useEffect } from 'react'
import Dropzone from 'react-dropzone'
import { cloudComputing, penWhite } from '../../../images'
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

const logger = AppLogger.getInstance()

interface MediaDropProps {
    value: string //mediaValue
    form: FormikProps<IPlaylist>
    name: string //media
    deletedMedia: string
    slideIndex: number
}

const SlideMediaDrop = (props: MediaDropProps) => {
    let { value: mediaValue, form, name, deletedMedia, slideIndex } = props

    const touched = getIn(form.touched, name)
    const error = getIn(form.errors, name)
    const deletedMediaValue = getIn(form.values, deletedMedia)

    /**
     * check if we have media content
     */
    const hasMedia = (): boolean => {
        return mediaValue && mediaValue.trim().length > 0 ? true : false
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

        const mySlide = form.values.slides.find((s, i) => i === slideIndex)
        const mediaType = getMediaType(mediaValue)

        // mediaDeletedFalg is set only when deleting the saved media
        if (mySlide && mediaValue && !deletedMediaValue) {
            mySlide.media = ''
            mySlide.name = ''
            mySlide.deletedMedia = mediaValue

            const currentSlides = form.values.slides
            currentSlides.splice(slideIndex, 1, mySlide)

            form.setValues({
                ...form.values,
                slides: [...currentSlides],
            })
        } else if (mySlide && mediaValue && mediaType) {
            await deleteMedia(mediaValue, mediaType)

            mySlide.media = ''
            mySlide.name = ''
            const currentSlides = form.values.slides
            currentSlides.splice(slideIndex, 1, mySlide)

            form.setValues({
                ...form.values,
                slides: [...currentSlides],
            })
        }
        //when we click on the x button set the filed as touched
        form.setFieldTouched(name)
    }

    const hasMediaError = (): boolean => {
        return error && touched ? true : false
    }

    const renderHtml5Video = (src: string): JSX.Element => {
        return (
            <video
                id={`myVideo_${slideIndex}`}
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
        const mediaUrl = getMediaUrl(mediaValue) //the url to mediaValue
        if (mediaUrl) {
            if (isImage(mediaValue)) {
                return <img src={mediaUrl} alt={''} />
            } else if (isViedo(mediaValue)) {
                return renderHtml5Video(mediaUrl)
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
                            <div className="error-message">{error}</div>
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
                        const fileName = await uploadMedia({
                            data: myResult,
                            name: file.name,
                            type: mediaType,
                        })
                        mySlide.media = fileName
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

    // closeWhite penWhite
    return <Fragment>{hasMedia() ? renderMedia() : renderDropZone()}</Fragment>
}
export default SlideMediaDrop
