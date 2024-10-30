import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, usePage } from '@inertiajs/react'
import React, { useState } from 'react'
import SecondaryButton from '@/Components/SecondaryButton';
// import CreateBookForm from './Partials/CreateBookForm';
import NavLink from '@/Components/NavLink';
import TruncatedText from '@/Components/TruncatedText';
import { MAX_BOOK_AUTHOR_LENGTH_RATIO, MAX_BOOK_TITLE_LENGTH_RATIO } from '@/constants';
import { publicationTypeToString } from '@/utils';
import EntityList from '@/Components/EntityList';

export default function Books() {
    // вручную определяем нужный формат даты
    const formattedDate = new Intl.DateTimeFormat('en-EN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const { books, links } = usePage().props;
    const [showCreateBookForm, setShowCreateBookForm] = useState(false);

    const handleCreateBookForm = () => {
        setShowCreateBookForm(!showCreateBookForm);
    };

    if (books && links) {
        console.log(books);

        return (
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Books
                    </h2>
                }
            >
                <Head title="Book books" />

                <div className="flex flex-col items-center justify-center">
                    <div className="container flex w-auto rounded-lg bg-white p-4 m-5 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] dark:bg-gray-800 dark:ring-red-700">
                        <table className="table text-white">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Published</th>
                                    <th>Added</th>
                                    <th>Author</th>
                                    <th>Genres</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.data.map(book => (
                                    <tr
                                        key={book.id}
                                        className="ring-1 dark:ring-red-900 rounded-lg w-min"
                                    >
                                        <td className="p-1">{book.id}. </td>
                                        <td className="p-1">
                                            <TruncatedText
                                                text={book.title}
                                                length={MAX_BOOK_TITLE_LENGTH_RATIO}
                                            />
                                        </td>
                                        <td className="p-1">
                                            {publicationTypeToString(book.publication_type)}
                                        </td>
                                        <td className="p-1">{book.day_of_publication}</td>
                                        <td className="p-1">{book.created_at}</td>
                                        <td className="p-1">
                                            <TruncatedText
                                                text={book.author.name}
                                                length={MAX_BOOK_AUTHOR_LENGTH_RATIO}
                                            />
                                        </td>
                                        <td className="p-1"><EntityList entities={book.genres} /></td>
                                        <td className="p-1">
                                            {/* <NavLink href={route('books.show', { id: book.id })}>
                                                Details
                                            </NavLink> */}
                                            <NavLink >
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
                            {/* <CreateBookForm
                                className="container flex flex-col w-max rounded-lg bg-white p-6 m-5 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] dark:bg-gray-800 dark:ring-red-700"
                                hidden={showCreateBookForm}
                                setHidden={handleCreateBookForm}
                            /> */}
                        </div>
                    }

                    <div className="container flex w-max gap-4 rounded-lg bg-white p-6 m-5 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] dark:bg-gray-800 dark:ring-red-700">
                        {links.previous &&
                            <SecondaryButton
                                className="btn btn-outline-secondary"
                                action={() => location = links.previous}
                            >
                                Previous page
                            </SecondaryButton>}
                        <PrimaryButton
                            onClick={() => { handleCreateBookForm() }}
                        >
                            New book
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
                        Book books
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
