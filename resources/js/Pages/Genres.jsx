import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'

export default function Genres() {
    const { genres, links } = usePage().props;
    if (genres && links) {
        console.log(links);

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
                                    <tr key={genre.id}>
                                        <td>{genre.id}. </td>
                                        <td>{genre.name}</td>
                                        <td className="p-1">
                                            <PrimaryButton className="btn btn-info mr-2" onClick={() => handleEdit(genre)}>
                                                Update
                                            </PrimaryButton>
                                            <PrimaryButton className="btn btn-danger" onClick={() => handleDelete(genre.id)}>
                                                Delete
                                            </PrimaryButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="container flex w-max gap-4 rounded-lg bg-white p-6 m-5 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] dark:bg-gray-800 dark:ring-red-700">
                        {links.previous &&
                            <PrimaryButton
                                className="btn btn-outline-secondary"
                                onClick={() => Inertia.get(links.previous)}>
                                Previous page
                            </PrimaryButton>}
                        <PrimaryButton disabled={processing} onClick={handleCreate}>
                            New genre
                        </PrimaryButton>
                        {links.next &&
                            <PrimaryButton
                                className="btn btn-outline-secondary"
                                onClick={() => Inertia.get(links.next)}>
                                Next page
                            </PrimaryButton>}
                    </div>
                </div>
            </AuthenticatedLayout>
        )
    } else {

    }

}
