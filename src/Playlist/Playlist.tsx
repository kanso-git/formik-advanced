import React from 'react'
import { generate } from 'shortid'
import { Formik, Form, Field, FieldArray, getIn } from 'formik'
import * as yup from 'yup'
import Slide from './Slide/Slide'
import DraggablePlaylist from './DraggablePlaylist'
import arrayMove from 'array-move'
import { ConsoleWriter } from 'istanbul-lib-report'
import MyField from '../fields/MyField'

const validationSchema = yup.object().shape({
    id: yup.string(),
    name: yup.string().required('Name is Required'),
    description: yup.string(),
    coverImage: yup.string(),
    locked: yup.boolean(),
    slides: yup.array().of(
        yup.object().shape({
            name: yup.string().required('Name is Required'),
            enabled: yup.boolean(),
        })
    ),
})
const Playlist = () => {
    const myArrayMove = ({ oldIndex, newIndex }: any, form: any) => {
        const slides = arrayMove(form.values.slides, oldIndex, newIndex)
        console.log(slides)

        form.setValues({
            ...form.values,
            slides,
        })
    }
    return (
        <div className="wrapper">
            <div id="dashboardId" className={`dashboard `}>
                <div className="dashboard-content-wrapper user-management">
                    <Formik
                        validationSchema={validationSchema}
                        initialValues={{
                            id: generate(),
                            name: 'my first playlist',
                            slides: [
                                { id: generate(), name: 'first Slide' },
                                { id: generate(), name: 'second Slide' },
                            ],
                        }}
                        onSubmit={(values, formikHelper) => {
                            alert('submiting')
                            console.log(values)
                        }}
                    >
                        {({
                            values,
                            errors,
                            dirty,
                            touched,
                            handleChange,
                            handleBlur,
                        }) => {
                            return (
                                <Form>
                                    <div className="dashboard-content dashboard-forms">
                                        <div className="playlist">
                                            <div className="detail-block">
                                                <MyField
                                                    name="name"
                                                    label="name"
                                                />
                                                <MyField
                                                    name="description"
                                                    label="description"
                                                />
                                            </div>
                                            <div>
                                                <FieldArray name="slides">
                                                    {({ form, push }) => {
                                                        //console.log(form.errors)

                                                        return (
                                                            <div>
                                                                <DraggablePlaylist
                                                                    helperClass="sortable-user-cards"
                                                                    slides={
                                                                        form
                                                                            .values
                                                                            .slides
                                                                    }
                                                                    onSortEnd={(
                                                                        props: any
                                                                    ) =>
                                                                        myArrayMove(
                                                                            props,
                                                                            form
                                                                        )
                                                                    }
                                                                    axis="xy"
                                                                    push={push}
                                                                />
                                                            </div>
                                                        )
                                                    }}
                                                </FieldArray>
                                            </div>
                                        </div>

                                        <div className="playlist-actions">
                                            <button type="submit">
                                                save playlist
                                            </button>
                                            <button type="reset">cancel</button>
                                        </div>
                                    </div>
                                    <pre>
                                        {JSON.stringify(values, undefined, 3)}
                                    </pre>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default Playlist
