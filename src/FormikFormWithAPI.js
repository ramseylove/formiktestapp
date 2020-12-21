import React, { useEffect, useState } from 'react';
import {
    Formik,
    Field,
    Form
  } from "formik";
import {
    List,
    ListItem,
    ListItemText
} from '@material-ui/core';
import * as Yup from 'yup';
import request from './axios';
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
    const [ person, setPerson ] = useState([]);
    
    const addPerson = (person) => {
        setPerson((people) => [person, ...people])
    }
    
    async function postUser (formValues) {
        const response = await request
        .post('/users', {formValues})
        .catch((err) => console.log(err));
        addPerson(response.data)
        console.log(person)
    }
    

    return (
        <div>
        <Formik
            initialValues={{
                name: "",
                job: "",
                
            }}
            validationSchema={ValidationSchema}
            onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                postUser(data)
                setSubmitting(false);
                
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
             <div>
             <List>
                 {person.map(peep => (
                     <ListItem key={peep.id}>
                     <ListItemText primary={peep.formValues.name} secondary={peep.createdAt} /> 
                     </ListItem>
                 ))}
             </List>
         </div>
         </div>
    )
}