import React from 'react'
import { generate } from 'shortid'
import { Formik, Form, Field, FieldArray, getIn } from 'formik'
import * as yup from 'yup'
import DraggablePlaylist from './DraggablePlaylist'
import arrayMove from 'array-move'
import MyField from '../fields/MyField'
import TopHeader from '../TopHeader'
import { getDefaultFromValuesTest } from './IPlaylist'

const validationSchema = yup.object().shape({
    id: yup.string(),
    name: yup.string().required('Name is Required'),
    description: yup.string(),
    coverImage: yup.string(),
    locked: yup.boolean(),
    slides: yup.array().of(
        yup.object().shape({
            name: yup.string().required('Name is Required'),
            media: yup.string().required('Media is required'),
            volume: yup.number(),
            duration: yup.number().min(3).max(10),
            enabled: yup.boolean(),
            startDate: yup.date().required('Start Date is required'),
            endDate: yup
                .date()
                .when(
                    'startDate',
                    (startDate: Date, schema: any) =>
                        startDate && schema.min(startDate)
                ),
        })
    ),
})
const Playlist = () => {
    const testData = getDefaultFromValuesTest()

    const myArrayMove = ({ oldIndex, newIndex }: any, form: any) => {
        const slides = arrayMove(form.values.slides, oldIndex, newIndex)
        console.log(slides)

        form.setValues({
            ...form.values,
            slides,
        })
    }
    return (
        <div className="dashboard-content-wrapper user-management">
            <header className="dashboard-header">
                <TopHeader />
            </header>
            <div className="dashboard-content">
                <div className="main-content select">
                    <Formik
                        validationSchema={validationSchema}
                        initialValues={testData}
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
                                    <div className="playlist-container">
                                        <div className="detail-block">
                                            <MyField name="name" label="name" />
                                            <MyField
                                                name="description"
                                                label="description"
                                            />
                                        </div>

                                        <FieldArray name="slides">
                                            {({ form, push }) => {
                                                //console.log(form.errors)

                                                return (
                                                    <DraggablePlaylist
                                                        helperClass="sortable-slide-cards"
                                                        slides={
                                                            form.values.slides
                                                        }
                                                        form={form}
                                                        onSortEnd={(
                                                            props: any
                                                        ) =>
                                                            myArrayMove(
                                                                props,
                                                                form
                                                            )
                                                        }
                                                        axis="xy"
                                                        distance={50}
                                                        push={push}
                                                    />
                                                )
                                            }}
                                        </FieldArray>

                                        <div className="playlist-actions">
                                            <button type="submit">
                                                save playlist
                                            </button>
                                            <button type="reset">cancel</button>
                                        </div>

                                        <pre>
                                            {JSON.stringify(
                                                values,
                                                undefined,
                                                3
                                            )}
                                        </pre>
                                    </div>
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
