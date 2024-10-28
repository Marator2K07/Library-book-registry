import DangerButton from '@/Components/DangerButton';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, usePage } from '@inertiajs/react'
import React, { useState } from 'react'
//import CreateAuthorForm from './Partials/CreateAuthorForm';
import { Transition } from '@headlessui/react';
import SecondaryButton from '@/Components/SecondaryButton';
//import DeleteAuthorForm from './Partials/DeleteAuthorForm';
//import UpdateAuthorForm from './Partials/UpdateAuthorForm';

export default function Authors() {
    // вручную определяем корректный формат даты
    const formattedDate = new Intl.DateTimeFormat('en-EN', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    })
    const { authors, links } = usePage().props;
    const [authorForDeletion, setAuthorForDeletion] = useState(null);
    const [authorForUpdate, setAuthorForUpdate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showCreateAuthorForm, setShowCreateAuthorForm] = useState(false);
    const [showDeleteAuthorForm, setShowDeleteAuthorForm] = useState(false);
    const [showUpdateAuthorForm, setShowUpdateAuthorForm] = useState(false);

    // управление показом форм с основными операциями над жанрами
    const handleCreateAuthorForm = () => {
        if (showModal === true) {
            setShowModal(false);
            setShowCreateAuthorForm(false);
            return;
        }
        setShowCreateAuthorForm(!showCreateAuthorForm);
        setShowModal(!showModal);
    };
    const handleDeleteAuthorForm = () => {
        if (showModal) {
            setShowModal(false);
            setShowDeleteAuthorForm(false);
            return;
        }
        setShowDeleteAuthorForm(!showDeleteAuthorForm);
        setShowModal(!showModal);
    };
    const handleUpdateAuthorForm = () => {
        if (showModal) {
            setShowModal(false);
            setShowUpdateAuthorForm(false);
            return;
        }
        setShowUpdateAuthorForm(!showUpdateAuthorForm);
        setShowModal(!showModal);
    }

    if (authors && links) {
        console.log(authors);


        return (
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Authors
                    </h2>
                }
            >
                <Head title="Book Authors" />

                <div className="flex flex-col items-center justify-center">
                    <div className="container flex w-max rounded-lg bg-white p-6 m-5 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] dark:bg-gray-800 dark:ring-red-700">
                        <table className="table text-white">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Birthday</th>
                                    <th>Books</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {authors.data.map(author => (
                                    <tr
                                        key={author.id}
                                        className="ring-1 dark:ring-red-900 rounded-lg"
                                    >
                                        <td className="p-1">{author.id}. </td>
                                        <td className="p-1">{author.name}</td>
                                        <td className="p-1">{
                                            formattedDate.format(new Date(author.day_of_birth))
                                        }</td>
                                        <td className="p-1">{author.books_count}</td>
                                        <td className="p-1">
                                            <PrimaryButton
                                                onClick={() => {
                                                    handleUpdateAuthorForm();
                                                    setAuthorForUpdate(author);
                                                    setShowCreateAuthorForm(false);
                                                    setShowDeleteAuthorForm(false);
                                                }}
                                                className="btn btn-info mr-2"
                                            >
                                                Update
                                            </PrimaryButton>
                                            <DangerButton action={() => {
                                                handleDeleteAuthorForm();
                                                setAuthorForDeletion(author);
                                                setShowCreateAuthorForm(false);
                                                setShowUpdateAuthorForm(false);
                                            }}>
                                                Delete
                                            </DangerButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* {
                        <Transition
                            show={showModal}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <div className="absolute dark:bg-gray-700 ring-1 rounded-lg">
                                <CreateAuthorForm
                                    className="container flex flex-col w-max rounded-lg bg-white p-6 m-5 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] dark:bg-gray-800 dark:ring-red-700"
                                    hidden={showCreateAuthorForm}
                                    setHidden={handleCreateAuthorForm}
                                />
                                <DeleteAuthorForm
                                    className="container flex flex-col w-max rounded-lg bg-white p-6 m-5 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] dark:bg-gray-800 dark:ring-red-700"
                                    hidden={showDeleteAuthorForm}
                                    setHidden={handleDeleteAuthorForm}
                                    authorForDeletion={authorForDeletion}
                                />
                                <UpdateAuthorForm
                                    className="container flex flex-col w-max rounded-lg bg-white p-6 m-5 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] dark:bg-gray-800 dark:ring-red-700"
                                    hidden={showUpdateAuthorForm}
                                    setHidden={handleUpdateAuthorForm}
                                    authorForUpdate={authorForUpdate}
                                />
                            </div>
                        </Transition>
                    } */}

                    <div className="container flex w-max gap-4 rounded-lg bg-white p-6 m-5 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] dark:bg-gray-800 dark:ring-red-700">
                        {links.previous &&
                            <SecondaryButton
                                className="btn btn-outline-secondary"
                                action={() => location = links.previous}
                            >
                                Previous page
                            </SecondaryButton>}
                        <PrimaryButton
                            onClick={() => {
                                handleCreateAuthorForm();
                                setShowDeleteAuthorForm(false);
                                setShowUpdateAuthorForm(false);
                            }}>
                            New author
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
                        Authors
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
