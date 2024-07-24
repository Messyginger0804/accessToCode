import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const validationSchema = Yup.object({
    make: Yup.string().required('Required'),
    model: Yup.string().required('Required'),
    image_url: Yup.string().url('Invalid URL').required('Required'),
    specs: Yup.object({
        RAM: Yup.string().required('Required'),
        display: Yup.string().required('Required'),
        processor: Yup.string().required('Required'),
        storage: Yup.string().required('Required'),
    }).required('Required')
});

const initialValues = {
    make: '',
    model: '',
    image_url: '',
    specs: {
        RAM: '',
        display: '',
        processor: '',
        storage: ''
    }
};

const AddProduct = ({ refreshInventory }) => {
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_PORT}/api/inventory/create`, values);

            if (response.status === 201) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Item added successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                resetForm();
                refreshInventory(); // Notify parent to refresh the inventory list
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to add item. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error('Error adding item:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Error adding item. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-md w-full bg-gray-900 rounded-lg shadow-lg p-8">
            <h2 className="text-xl font-bold mb-4">Add New Inventory Item</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-4">
                        <div>
                            <Field
                                type="text"
                                name="make"
                                placeholder="Make"
                                className="w-full p-2 rounded-lg bg-gray-700 text-gray-300"
                            />
                            <ErrorMessage name="make" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <Field
                                type="text"
                                name="model"
                                placeholder="Model"
                                className="w-full p-2 rounded-lg bg-gray-700 text-gray-300"
                            />
                            <ErrorMessage name="model" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <Field
                                type="text"
                                name="image_url"
                                placeholder="Image URL"
                                className="w-full p-2 rounded-lg bg-gray-700 text-gray-300"
                            />
                            <ErrorMessage name="image_url" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-1">Specs</label>
                            <div className="space-y-2">
                                <Field
                                    type="text"
                                    name="specs.RAM"
                                    placeholder="RAM"
                                    className="w-full p-2 rounded-lg bg-gray-700 text-gray-300"
                                />
                                <ErrorMessage name="specs.RAM" component="div" className="text-red-500 text-sm mt-1" />

                                <Field
                                    type="text"
                                    name="specs.display"
                                    placeholder="Display"
                                    className="w-full p-2 rounded-lg bg-gray-700 text-gray-300"
                                />
                                <ErrorMessage name="specs.display" component="div" className="text-red-500 text-sm mt-1" />

                                <Field
                                    type="text"
                                    name="specs.processor"
                                    placeholder="Processor"
                                    className="w-full p-2 rounded-lg bg-gray-700 text-gray-300"
                                />
                                <ErrorMessage name="specs.processor" component="div" className="text-red-500 text-sm mt-1" />

                                <Field
                                    type="text"
                                    name="specs.storage"
                                    placeholder="Storage"
                                    className="w-full p-2 rounded-lg bg-gray-700 text-gray-300"
                                />
                                <ErrorMessage name="specs.storage" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Add Item'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddProduct;
