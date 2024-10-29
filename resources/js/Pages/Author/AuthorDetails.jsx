import React, { useState } from 'react'
import UpdateAuthorForm from './Partials/UpdateAuthorForm'
import DeleteAuthorForm from './Partials/DeleteAuthorForm'
import DangerButton from '@/Components/DangerButton'
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AuthorDetails() {
    const [showDeleteAuthorForm, setShowDeleteAuthorForm] = useState(false);
    const author = usePage().props.author;

    const handleDeleteAuthorForm = () => {
        setShowDeleteAuthorForm(!showDeleteAuthorForm);
    };

    if (author) {
        console.log(author);

        return (
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Author details
                    </h2>
                }
            >
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center rounded-lg bg-white p-6 m-5 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] dark:bg-gray-800 dark:ring-red-700">
                        <UpdateAuthorForm
                            className="container flex flex-col w-max rounded-lg bg-white p-6 m-5 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] dark:bg-gray-800 dark:ring-gray-500"
                            authorForUpdate={author}
                        />
                        <div className="flex items-center justify-center">
                            <DangerButton action={() => handleDeleteAuthorForm()}>
                                Delete this author
                            </DangerButton>
                        </div>
                        <div className="absolute left-50 dark:bg-gray-700 rounded-lg">
                            <DeleteAuthorForm
                                className="container flex flex-col w-max rounded-lg bg-white p-6 m-5 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] dark:bg-gray-800 dark:ring-red-700"
                                hidden={showDeleteAuthorForm}
                                setHidden={handleDeleteAuthorForm}
                                authorForDeletion={author}
                            />
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
                        Author details
                    </h2>
                }
            >
                <div className="flex flex-col items-center justify-center">
                    <div className="container flex w-max rounded-lg bg-white p-6 m-5 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] dark:bg-gray-800 dark:ring-red-700">
                        Loading...
                    </div>
                </div>
            </AuthenticatedLayout>
        )
    }
}
