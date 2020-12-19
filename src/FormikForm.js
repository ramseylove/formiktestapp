import React from 'react';
import {
    Formik,
    Field,
    Form
  } from "formik";
import * as Yup from 'yup';
import { TextFormField } from './TextFormField';
import { SelectFormField } from './SelectFormField';

const ValidationSchema = Yup.object().shape({

    name: Yup.string()
    .min(3, "Too Short of Name!")
    .max(255, "Too Long of Name!")
    .required("Names is Required"),
    country: Yup.string()
    .min(1, "Too Short of country!")
    .max(255, "Too Long of Country")
    .required("Country is Required"),
    email: Yup.string()
    .email("Must be an email address")
    .max(255, "Too Long of email")
    .required("Email is required")
});

export default function FormikForm() {
    
    return (
        <Formik
            initialValues={{
                name: "",
                email: "",
                country: "",
                
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
                    <div className="input-row">
                        <label htmlFor="email">Email</label>
                        <Field
                            name="email"
                            id="email"
                            component={TextFormField}
                        />
                    </div>
                    <div>
                    <Field
                        options={[
                    { label: "Dog", value: "dog" },
                    { label: "Cat", value: "cat" }
                        ]}
                        label="Pet"
                        name="pet"
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