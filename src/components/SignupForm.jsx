import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function SignupForm() {
    const initialValues = {
        name: '',
        email: '',
        password: '',
        linkedin: ''
    };

    const onSubmit = (values) => {
        console.log(values); // You can handle form submission logic here
    };

    const validate = (values) => {
        const errors = {};

        if (!values.name) {
            errors.name = 'Required';
        }

        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
        }

        if (!values.linkedin) {
            errors.linkedin = 'Required';
        } else if (!/^(https?:\/\/)?(www\.)?linkedin\.com\/.*/i.test(values.linkedin)) {
            errors.linkedin = 'Invalid LinkedIn profile URL';
        }

        return errors;
    };

    return (
        <div className="max-w-md w-full bg-gray-900 rounded-lg shadow-lg p-8">
            <div className='flex justify-evenly'>
                <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
                    <img src="/vite.svg" className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
                    <img src="/react.svg" className="logo react" alt="React logo" />
                </a>
            </div>
            <h1 className="text-3xl font-bold mb-4 text-center">accessToCode</h1>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
                <Form>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2">
                            Name:
                        </label>
                        <Field
                            type="text"
                            id="name"
                            name="name"
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-900 bg-white leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">
                            Email:
                        </label>
                        <Field
                            type="email"
                            id="email"
                            name="email"
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-900 bg-white leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-300 text-sm font-bold mb-2">
                            Password:
                        </label>
                        <Field
                            type="password"
                            id="password"
                            name="password"
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-900 bg-white leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="linkedin" className="block text-gray-300 text-sm font-bold mb-2">
                            LinkedIn Profile:
                        </label>
                        <Field
                            type="text"
                            id="linkedin"
                            name="linkedin"
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-900 bg-white leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <ErrorMessage name="linkedin" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Sign Up
                    </button>
                </Form>
            </Formik>
        </div>
    );
}

export default SignupForm;
