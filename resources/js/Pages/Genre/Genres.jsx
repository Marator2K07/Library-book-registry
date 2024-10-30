import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, usePage } from '@inertiajs/react'
import React, { useState } from 'react'
import SecondaryButton from '@/Components/SecondaryButton';
import CreateGenreForm from './Partials/CreateGenreForm';
import NavLink from '@/Components/NavLink';

export default function Genres() {
    const { genres, links } = usePage().props;
    const [showCreateGenreForm, setShowCreateGenreForm] = useState(false);

    const handleCreateGenreForm = () => {
        setShowCreateGenreForm(!showCreateGenreForm);
    };

    if (genres && links) {
        return (
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Book genres
                    </h2>
                }
            >
                <Head title="Book genres" />

                <div className="flex flex-col items-center justify-center">
                    <div className="container flex w-max gap-4 rounded-lg bg-white p-6 mt-4 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] dark:bg-gray-800 dark:ring-red-700">
                        {links.previous &&
                            <SecondaryButton
                                className="btn btn-outline-secondary"
                                action={() => location = links.previous}
                            >
                                Previous page
                            </SecondaryButton>}
                        <PrimaryButton
                            onClick={() => { handleCreateGenreForm() }}
                        >
                            New genre
                        </PrimaryButton>
                        {links.next &&
                            <SecondaryButton
                                action={() => location = links.next}
                                className="btn btn-outline-secondary"
                            >
                                Next page
                            </SecondaryButton>}
                    </div>
                    <div className="container flex w-max rounded-lg bg-white p-6 m-5 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] dark:bg-gray-800 dark:ring-red-700">
                        <table className="table text-white">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {genres.data.map(genre => (
                                    <tr
                                        key={genre.id}
                                        className="ring-1 dark:ring-red-900 rounded-lg"
                                    >
                                        <td className="p-1">{genre.id}. </td>
                                        <td className="p-1">{genre.name}</td>
                                        <td className="p-1">
                                            <NavLink href={route('genres.show', { id: genre.id })}>
                                                Details
                                            </NavLink>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {
                        <div className="absolute left-50 dark:bg-gray-700 rounded-lg">
                            <CreateGenreForm
                                className="container flex flex-col w-max rounded-lg bg-white p-6 m-5 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] dark:bg-gray-800 dark:ring-red-700"
                                hidden={showCreateGenreForm}
                                setHidden={handleCreateGenreForm}
                            />
                        </div>
                    }
                </div>
            </AuthenticatedLayout>
        )
    } else {
        return (
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Book genres
                    </h2>
                }
            >
                <div className="flex flex-col items-center justify-center">
                    <div className="container text-white flex w-max rounded-lg bg-white p-6 m-5 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] dark:bg-gray-800 dark:ring-red-700">
                        Loading...
                    </div>
                </div>
            </AuthenticatedLayout>
        )
    }
}
