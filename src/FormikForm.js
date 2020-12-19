import React from 'react';
import { Formik } from 'formik';
import Autosuggest from 'react-autosuggest';
import * as Yup from 'yup';

import Error from './Error';

const ValidationSchema = Yup.object().shape({

    name: Yup.string().min(1, "Too Short of Name!").max(255, "Too Long of Name!").required("Names is Required"),
    // country: Yup.string().min(1, "Too Short of country!").max(255, "Too Long of Country").required("Country is Required"),
    email: Yup.string().email("Must be an email address").max(255, "Too Long of email").required("Email is required")
});

export default function FormikForm() {
    const  [ country, setCountry ] = useState("");
    const [ suggestions, setSuggestions ] = useState([]);

    return (
        <Formik
            initialValues={{
                name: "",
                email: "",
                country: "",
                postalCode: ""
            }}
            validationSchema={ValidationSchema}
            onSubmit={(values, {setSubmitting, resetForm }) => {
                setSubmitting(true);

                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    resetForm();
                    setSubmitting(false);
                }, 500);
            }}
            >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
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
                            className={touched.name && errors.name ? "has-error" : null} // if field has been touched applys has-error class
                        />
                        <Error touched={touched.name} message={errors.name} />
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
                            className={touched.email && errors.email ? "has-error" : null}
                            
                        />
                        <Error touched={touched.email} message={errors.email} />
                    </div>
                    <div className="input-row">
                        <button type="submit" disabled={isSubmitting}>Submit</button>
                    </div>
                </form>
            )}
            </Formik>
    )
}