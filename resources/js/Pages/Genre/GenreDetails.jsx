import React, { useState } from 'react'
import UpdateGenreForm from './Partials/UpdateGenreForm'
import DeleteGenreForm from './Partials/DeleteGenreForm'
import DangerButton from '@/Components/DangerButton'
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function GenreDetails() {
    const [showDeleteGenreForm, setShowDeleteGenreForm] = useState(false);
    const genre = usePage().props.genre;

    const handleDeleteGenreForm = () => {
        setShowDeleteGenreForm(!showDeleteGenreForm);
    };

    if (genre) {
        return (
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Genre details
                    </h2>
                }
            >
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center rounded-lg bg-white p-6 m-5 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] dark:bg-gray-800 dark:ring-red-700">
                        <UpdateGenreForm
                            className="container flex flex-col w-max rounded-lg bg-white p-6 m-5 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] dark:bg-gray-800 dark:ring-gray-500"
                            genreForUpdate={genre}
                        />
                        <div className="flex items-center justify-center">
                            <DangerButton action={() => handleDeleteGenreForm()}>
                                Delete this genre
                            </DangerButton>
                        </div>
                        <div className="absolute left-50 dark:bg-gray-700 rounded-lg">
                            <DeleteGenreForm
                                className="container flex flex-col w-max rounded-lg bg-white p-6 m-5 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] dark:bg-gray-800 dark:ring-red-700"
                                shown={showDeleteGenreForm}
                                setHidden={handleDeleteGenreForm}
                                genreForDeletion={genre}
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
                        Genre details
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
