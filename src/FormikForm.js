import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

const ValidationSchema = Yup.object().shape({

    name: Yup.string()
    .min(1, "Too Short of Name!")
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
                postalCode: ""
            }}
            validationSchema={ValidationSchema}
            >
            {({ values, errors, touched, handleChange, handleBlur }) => (
                <form>
                    <h2>The Formik Form with yup</h2>
                    <div className="input-row">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter your name"
                            onChange={handleChange} 
                            onBlur={handleBlur}
                            value={values.name}
                        />
                    </div>
                    <div className="input-row">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            onChange={handleChange} 
                            onBlur={handleBlur}
                            value={values.email}
                        />
                    </div>
                    <div className="input-row">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            )}
            </Formik>
    )
}