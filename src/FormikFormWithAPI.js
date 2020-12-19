import React, { useEffect } from 'react';
import {
    Formik,
    Field,
    Form
  } from "formik";
import * as Yup from 'yup';
import axios from './axios';
import { TextFormField } from './TextFormField';
import { SelectFormField } from './SelectFormField';

const ValidationSchema = Yup.object().shape({

    name: Yup.string()
    .min(3, "Too Short of Name!")
    .max(255, "Too Long of Name!")
    .required("Names is Required"),
    job: Yup.string()
    .required("Country is Required"),

});

export default function FormikForm() {
    
    async function postUser (formValues) {
        const response = await axios
        .post('users', {
            method: 'post',
            data: {}
        })
        .catch((err) => console.log(err));
            
        console.log(response)
        
    }
        

    return (
        <Formik
            initialValues={{
                name: "",
                job: "",
                
            }}
            validationSchema={ValidationSchema}
            onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                postUser(data.values)
                setSubmitting(false)
                
            }}>
            {({ values, errors, isSubmitting}) => (
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
                    <pre> {JSON.stringify(values, null, 2)}</pre>
		            <pre> {JSON.stringify(errors, null, 2)}</pre>
                </Form>
            )}
            </Formik>
    )
}