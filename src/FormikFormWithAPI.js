import React from 'react';
import {
    Formik,
    Field,
    Form
  } from "formik";
import * as Yup from 'yup';
import { TextFormField } from './TextFormField';

const ValidationSchema = Yup.object().shape({

    name: Yup.string()
    .min(3, "Too Short of Name!")
    .max(255, "Too Long of Name!")
    .required("Names is Required"),
    job: Yup.string()
    .required("Country is Required"),

});

export default function FormikForm() {
    
    return (
        <Formik
            initialValues={{
                name: "",
                job: "",
                
            }}
            validationSchema={ValidationSchema}
            onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                //async call
                setSubmitting(false)
            }}>
            {({ values, isSubmitting}) => (
                <Form>
                    <h2>The Formik Form with yup</h2>
                    <div className="input-row">
                        <Field label="Name" name="name" component={TextFormField}/>
                    </div>
                    <div>
                    <Field
                        options={[
                    { label: "Waiter", value: "waiter" },
                    { label: "Farmer", value: "farmer" }
                        ]}
                        label="Job"
                        name="job"
                        component={SelectFormField}
                />
                    </div>
                    <div className="input-row">
                        <button type="submit" disabled={isSubmitting}>Submit</button>
                    </div>
                </Form>
            )}
            </Formik>
    )
}