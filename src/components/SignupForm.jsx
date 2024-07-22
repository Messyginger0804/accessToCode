import { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AiOutlineLoading } from 'react-icons/ai';

function SignupForm() {
    const successMessage = `You're signed up!`;

    const initialValues = {
        username: '',
        email: '',
        linkedin: ''
    };

    const [error, setError] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (values, { setSubmitting }) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_PORT}/api/clients/create`, values);

            if (response.status === 201) {
                console.log('User created:', response.data);
                setIsSubmitted(true);
            } else {
                throw new Error('Failed to create user');
            }
        } catch (error) {
            console.error('Error creating user:', error);
            setError('Failed to create user. Please try again.');
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };

    const validate = (values) => {
        const errors = {};

        if (!values.username) {
            errors.username = 'Required';
        }

        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!values.linkedin) {
            errors.linkedin = 'Required';
        } else if (!/^https?:\/\/(www\.)?linkedin\.com\/in\/.*/i.test(values.linkedin)) {
            errors.linkedin = 'Invalid LinkedIn profile URL';
        }

        return errors;
    };

    const handleLinkedInFocus = (event) => {
        if (!event.currentTarget.value) {
            event.currentTarget.value = 'https://www.linkedin.com/in/';
        }
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
                {({ isSubmitting, values }) => (
                    <Form>
                        {isSubmitted ? (
                            <div className="text-center mt-14 bg-gray-700 rounded p-4">
                                <p className="text-3xl text-white mb-4 shadow-sky-200">{successMessage}</p>
                                <p className="text-gray-300 mb-4">
                                    Make sure we are connected on <a className="underline text-blue-500" href={values.linkedin}>LinkedIn</a>
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="mb-4">
                                    <Field
                                        type="text"
                                        id="username"
                                        name="username"
                                        placeholder="Name"
                                        className="appearance-none border rounded w-full py-2 px-3 text-gray-900 bg-white leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div className="mb-4">
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        className="appearance-none border rounded w-full py-2 px-3 text-gray-900 bg-white leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div className="mb-4">
                                    <Field
                                        type="text"
                                        id="linkedin"
                                        name="linkedin"
                                        placeholder="LinkedIn Profile"
                                        onFocus={handleLinkedInFocus}
                                        className="appearance-none border rounded w-full py-2 px-3 text-gray-900 bg-white leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    <ErrorMessage name="linkedin" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    disabled={isSubmitting}
                                >
                                    {isLoading ? (
                                        <AiOutlineLoading className="animate-spin mr-2" size={24} />
                                    ) : (
                                        'Sign Up'
                                    )}
                                </button>
                                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                            </>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default SignupForm;
