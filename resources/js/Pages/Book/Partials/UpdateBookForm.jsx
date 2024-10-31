import EntityMultiSelector from '@/Components/EntityMultiSelector';
import EntitySelector from '@/Components/EntitySelector';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import NavLink from '@/Components/NavLink';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { DELAY_AFTER_SUCCESSFULLY_ACTION } from '@/constants';
import { publicationTypeToString } from '@/utils';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

export default function UpdateBookForm({
    className = '',
    shown = true,
    setHidden = null,
    bookForUpdate = null
}) {

    const titleInput = useRef();
    const publicationDayInput = useRef();
    const [types, setTypes] = useState([
        { id: 0, name: 'GRAPHIC' },
        { id: 1, name: 'DIGITAL' },
        { id: 2, name: 'PRINTED' }
    ])
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);

    // подгружаем авторов и жанры
    useEffect(() => {
        const loadAuthors = async () => {
            setAuthors((await axios.get('/api/authors/get')).data);
        }
        const loadGenres = async () => {
            setGenres((await axios.get('/api/genres/get')).data);
        }
        loadAuthors();
        loadGenres();
    }, []);

    // функции обратного вызова
    const handleTypeSelect = (type) => {
        setData('type', type.id);
    }
    const handleAuthorSelect = (author) => {
        setData('author_id', author.id);
    }
    const handleGenresSelect = (genreId) => {
        if (data.genres_ids.includes(genreId)) {
            setData('genres_ids', data.genres_ids.filter(id => id !== genreId));
        } else {
            setData('genres_ids', [...data.genres_ids, genreId]);
        }
    }

    const {
        data,
        setData,
        errors,
        post,
        reset,
        recentlySuccessful
    } = useForm({
        title: bookForUpdate ? bookForUpdate.title : '',
        day_of_publication: bookForUpdate ? bookForUpdate.day_of_publication : '',
        type: bookForUpdate ? bookForUpdate.publication_type : '',
        author_id: bookForUpdate ? bookForUpdate.author_id : null,
        genres_ids: bookForUpdate ? bookForUpdate.genres.map((item) => item.id) : []
    });

    const handleSearch = (e) => {
        e.preventDefault();

        post(route('books.update', {
            book: bookForUpdate,
            title: data.title,
            day_of_publication: data.day_of_publication,
            publication_type: data.type,
            author_id: data.author_id,
            genres_ids: data.genres_ids
        }), {
            preserveScroll: true,
            onSuccess: () => {
                //
            },
            onError: (errors) => {
                if (errors.title) {
                    reset('title');
                    titleInput.current.focus();
                }
                if (errors.day_of_publication) {
                    reset('day_of_publication');
                    publicationDayInput.current.focus();
                }
            }
        });
    };

    return (
        <Transition
            show={shown}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
        >
            <section className={className}>
                <header>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Book with id: {bookForUpdate.id}
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        You can update field(s) for current entity.
                    </p>
                </header>

                <div className="flex w-max mt-4 gap-4 items-center justify-start">
                    <div>
                        <InputLabel
                            className="text-sm font-semibold leading-tight text-gray-800 dark:text-gray-200"
                            htmlFor="title"
                            value="Title"
                        />
                        <TextInput
                            id="title"
                            ref={titleInput}
                            value={data.title}
                            onChange={(e) => {
                                setData('title', e.target.value);
                            }}
                            className="mt-1 block w-full"
                        />
                        <InputError
                            message={errors.title}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <InputLabel
                            className="text-sm font-semibold leading-tight text-gray-800 dark:text-gray-200"
                            htmlFor="day_of_publication"
                            value="Publication day (Format: dd.mm.yyyy)"
                        />
                        <TextInput
                            id="title"
                            ref={publicationDayInput}
                            value={data.day_of_publication}
                            onChange={(e) => {
                                setData('day_of_publication', e.target.value);
                            }}
                            className="mt-1 block w-full"
                        />
                        <InputError
                            message={errors.day_of_publication}
                            className="mt-1"
                        />
                    </div>
                </div>

                <div className="flex gap-2 mt-3 items-center justify-start">

                    <div className="flex-col text-sm font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        <p>Author:</p>
                        <p>(choose one)</p>
                    </div>
                    <div className="text-xs font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        <EntitySelector
                            initEntity={bookForUpdate.author}
                            entities={authors}
                            onSelect={handleAuthorSelect}
                        />
                        <InputError
                            message={errors.author_id}
                            className="mt-1"
                        />
                    </div>
                    <div className="flex-col text-sm font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        <p>Genres:</p>
                        <p>(choose many)</p>
                    </div>
                    <div className="text-xs font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        <EntityMultiSelector
                            initEntities={bookForUpdate.genres.map((item) => item.id)}
                            entities={genres}
                            onSelect={handleGenresSelect} />
                        <InputError
                            message={errors.genres_ids}
                            className="mt-1"
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-4 mt-3">
                    <div className="flex items-center gap-4">
                        <div className="flex-col text-sm font-semibold leading-tight text-gray-800 dark:text-gray-200">
                            <p>Select type (choose one):</p>
                        </div>
                        <div>
                            <div className="text-xs font-semibold leading-tight text-gray-800 dark:text-gray-200">
                                <EntitySelector
                                    initEntity={bookForUpdate ? {
                                        id: bookForUpdate.publication_type,
                                        name: publicationTypeToString(bookForUpdate.publication_type)
                                    } : null}
                                    entities={types}
                                    onSelect={handleTypeSelect}
                                    style={{ height: 45 }}
                                />
                                <InputError
                                    message={errors.publication_type}
                                    className="mt-1"
                                />
                            </div>
                        </div>
                        <PrimaryButton onClick={(e) => handleSearch(e)}>Update</PrimaryButton>
                        <NavLink href={route('books.index')}>
                            Back
                        </NavLink>
                    </div>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Book succesfully updated
                        </p>
                    </Transition>
                </div>
            </section>
        </Transition>
    );
}
