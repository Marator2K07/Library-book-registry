import DangerButton from '@/Components/DangerButton';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, usePage } from '@inertiajs/react'
import React, { useState } from 'react'
import CreateGenreForm from './Profile/Partials/Genre/CreateGenreForm';
import { Transition } from '@headlessui/react';
import DeleteGenreForm from './Profile/Partials/Genre/DeleteGenreForm';

export default function Genres() {
    const { genres, links } = usePage().props;
    const [idForDeletion, setIdForDeletion] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showCreateGenreForm, setShowCreateGenreForm] = useState(false);
    const [showDeleteGenreForm, setShowDeleteGenreForm] = useState(false);

    // управление показом формы создания нового жанра
    const handleCreateGenreForm = () => {
        setShowCreateGenreForm(!showCreateGenreForm);
        setShowModal(!showModal);
    };

    // управление показом формы удаления жанра
    const handleDeleteGenreForm = () => {
        setShowDeleteGenreForm(!showDeleteGenreForm);
        setShowModal(!showModal);
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
                                            <PrimaryButton className="btn btn-info mr-2">Update</PrimaryButton>
                                            <DangerButton action={() => {
                                                handleDeleteGenreForm();
                                                setIdForDeletion(genre.id);
                                            }}>
                                                Delete
                                            </DangerButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {
                        <Transition
                            show={showModal}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <div className="absolute dark:bg-gray-700 ring-1 rounded-lg">
                                <CreateGenreForm
                                    className="container flex flex-col w-max rounded-lg bg-white p-6 m-5 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] dark:bg-gray-800 dark:ring-red-700"
                                    hidden={showCreateGenreForm}
                                    setHidden={handleCreateGenreForm}
                                />
                                <DeleteGenreForm
                                    className="container flex flex-col w-max rounded-lg bg-white p-6 m-5 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] dark:bg-gray-800 dark:ring-red-700"
                                    hidden={showDeleteGenreForm}
                                    setHidden={handleDeleteGenreForm}
                                    idForDeletion={idForDeletion}
                                />
                            </div>
                        </Transition>
                    }

                    <div className="container flex w-max gap-4 rounded-lg bg-white p-6 m-5 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] dark:bg-gray-800 dark:ring-red-700">
                        {links.previous &&
                            <PrimaryButton className="btn btn-outline-secondary">
                                <a className="page-link" href={links.previous}>Previous page</a>
                            </PrimaryButton>}
                        <PrimaryButton onClick={ () => handleCreateGenreForm() }>
                            New genre
                        </PrimaryButton>
                        {links.next &&
                            <PrimaryButton className="btn btn-outline-secondary">
                                <a className="page-link" href={links.next}>Next page</a>
                            </PrimaryButton>}
                    </div>
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
