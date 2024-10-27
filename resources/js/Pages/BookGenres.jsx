import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function BookGenres() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Book genres
                </h2>
            }
        >
            <Head title="Book genres" />

        </AuthenticatedLayout>
    )
}
