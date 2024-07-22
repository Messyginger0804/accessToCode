import { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AiOutlineLoading } from 'react-icons/ai'; // Assuming 'react-icons' package is used
import Swal from 'sweetalert2'; // Import SweetAlert2

function SignupForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false); // Add state to control form visibility

    const initialValues = {
        username: '',
        email: '',
        linkedin: ''
    };

    const onSubmit = async (values, { setSubmitting }) => {
        setIsLoading(true); // Set loading state to true when submitting
        try {
            const response = await axios.post(`${import.meta.env.VITE_PORT}/api/clients/create`, values);

            if (response.data.success) {
                Swal.fire({
                    title: 'Success!',
                    html: `
                        <p>You are signed up for the next giveaway!</p>
                        <ul class="list-disc list-inside">
                            <li>
                                <a
                                    href="https://www.linkedin.com/in/jeremy-ashley-webdev/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style="color: #1d72b8; text-decoration: underline;"
                                >
                                    Connect with me on LinkedIn
                                </a>
                            </li>
                        </ul>
                    `,
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    setIsSubmitted(true); // Hide the form after successful signup
                });
            } else {
                Swal.fire({
                    title: 'Already Registered!',
                    text: 'Hey, we already have you in the database! You are signed up for the next giveaway already.',
                    icon: 'info',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error('Error creating user:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to create user. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
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
        <div className="max-w-md w-full h-full bg-gray-900 rounded-lg shadow-lg p-8 flex flex-col justify-center items-center">
            <div className='flex justify-evenly mb-4'>
                <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
                    <img src="/vite.svg" className="logo" alt="Vite logo" />
                </a>
            </div>
            <h1 className="text-3xl font-bold mb-4 text-center">accessToCode</h1>
            {!isSubmitted ? (
                <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
                    {({ isSubmitting }) => (
                        <Form className='mt-6'>
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
                        </Form>
                    )}
                </Formik>
            ) : (
                <div className="text-center">
                    <p className="text-xl font-bold text-white mb-4">You are signed up for the next giveaway!</p>
                    <p className="text-white text-sm">To be eligible to win, please connect with me on LinkedIn:</p>
                    <ul className="list-disc list-inside text-white text-sm mt-2">
                        <li>
                            <a
                                href="https://www.linkedin.com/in/jeremy-ashley-webdev/" // Replace with your LinkedIn profile URL
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:underline"
                            >
                                Connect with me on LinkedIn
                            </a>
                        </li>
                    </ul>
                </div>
            )}
            <div className="mt-6 text-center text-gray-400 text-sm">
                <p>Disclaimer: This giveaway is subject to availability of products. The giveaway will only be conducted when we have products available to give away.</p>
            </div>
        </div>
    );
}

export default SignupForm;
