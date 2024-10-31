import React, { useState } from 'react';
//import DeleteBookForm from './Partials/DeleteBookForm'
import DangerButton from '@/Components/DangerButton'
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UpdateBookForm from './Partials/UpdateBookForm';

export default function BookDetails() {
    const [showDeleteBookForm, setShowDeleteBookForm] = useState(false);
    const book = usePage().props.book;

    const handleDeleteBookForm = () => {
        setShowDeleteBookForm(!showDeleteBookForm);
    };

    if (book) {
        console.log(book);

        return (
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Book details
                    </h2>
                }
            >
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center rounded-lg bg-white p-6 m-5 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] dark:bg-gray-800 dark:ring-red-700">
                        <UpdateBookForm
                            className="container flex flex-col w-max rounded-lg bg-white p-6 m-5 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] dark:bg-gray-800 dark:ring-gray-500"
                            bookForUpdate={book}
                        />
                        <div className="flex items-center justify-center">
                            <DangerButton action={() => handleDeleteBookForm()}>
                                Delete this book
                            </DangerButton>
                        </div>
                        <div className="absolute left-50 dark:bg-gray-700 rounded-lg">
                            {/* <DeleteBookForm
                                className="container flex flex-col w-max rounded-lg bg-white p-6 m-5 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] dark:bg-gray-800 dark:ring-red-700"
                                shown={showDeleteBookForm}
                                setHidden={handleDeleteBookForm}
                                bookForDeletion={book}
                            /> */}
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        )
    }
    else {
        return (
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Book details
                    </h2>
                }
            >
                <div className="flex flex-col items-center justify-center">
                    <div className="container flex w-max rounded-lg bg-white p-6 m-5 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] dark:bg-gray-800 dark:ring-red-700">
                        Loading...12345
                    </div>
                </div>
            </AuthenticatedLayout>
        )
    }
}
