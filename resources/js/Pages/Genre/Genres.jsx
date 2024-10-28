import DangerButton from '@/Components/DangerButton';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, usePage } from '@inertiajs/react'
import React, { useState } from 'react'
import { Transition } from '@headlessui/react';
import SecondaryButton from '@/Components/SecondaryButton';
import CreateGenreForm from './Partials/CreateGenreForm';
import DeleteGenreForm from './Partials/DeleteGenreForm';
import UpdateGenreForm from './Partials/UpdateGenreForm';

export default function Genres() {
    const { genres, links } = usePage().props;
    const [genreForDeletion, setGenreForDeletion] = useState(null);
    const [genreForUpdate, setGenreForUpdate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showCreateGenreForm, setShowCreateGenreForm] = useState(false);
    const [showDeleteGenreForm, setShowDeleteGenreForm] = useState(false);
    const [showUpdateGenreForm, setShowUpdateGenreForm] = useState(false);

    // управление показом форм с основными операциями над жанрами
    const handleCreateGenreForm = () => {
        if (showModal === true) {
            setShowModal(false);
            setShowCreateGenreForm(false);
            return;
        }
        setShowCreateGenreForm(!showCreateGenreForm);
        setShowModal(!showModal);
    };
    const handleDeleteGenreForm = () => {
        if (showModal) {
            setShowModal(false);
            setShowDeleteGenreForm(false);
            return;
        }
        setShowDeleteGenreForm(!showDeleteGenreForm);
        setShowModal(!showModal);
    };
    const handleUpdateGenreForm = () => {
        if (showModal) {
            setShowModal(false);
            setShowUpdateGenreForm(false);
            return;
        }
        setShowUpdateGenreForm(!showUpdateGenreForm);
        setShowModal(!showModal);
    }

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
                                            <PrimaryButton
                                                onClick={() => {
                                                    handleUpdateGenreForm();
                                                    setGenreForUpdate(genre);
                                                    setShowCreateGenreForm(false);
                                                    setShowDeleteGenreForm(false);
                                                }}
                                                className="btn btn-info mr-1"
                                            >
                                                Update
                                            </PrimaryButton>
                                            <DangerButton action={() => {
                                                handleDeleteGenreForm();
                                                setGenreForDeletion(genre);
                                                setShowCreateGenreForm(false);
                                                setShowUpdateGenreForm(false);
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
                                    genreForDeletion={genreForDeletion}
                                />
                                <UpdateGenreForm
                                    className="container flex flex-col w-max rounded-lg bg-white p-6 m-5 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] dark:bg-gray-800 dark:ring-red-700"
                                    hidden={showUpdateGenreForm}
                                    setHidden={handleUpdateGenreForm}
                                    genreForUpdate={genreForUpdate}
                                />
                            </div>
                        </Transition>
                    }

                    <div className="container flex w-max gap-4 rounded-lg bg-white p-6 m-5 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] dark:bg-gray-800 dark:ring-red-700">
                        {links.previous &&
                            <SecondaryButton
                                className="btn btn-outline-secondary"
                                action={() => location = links.previous}
                            >
                                <a className="page-link" href={links.previous}>Previous page</a>
                            </SecondaryButton>}
                        <PrimaryButton
                            onClick={() => {
                                handleCreateGenreForm();
                                setShowDeleteGenreForm(false);
                                setShowUpdateGenreForm(false);
                            }}>
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
