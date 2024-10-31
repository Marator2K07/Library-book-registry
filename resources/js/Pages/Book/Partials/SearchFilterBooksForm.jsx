import EntityMultiSelector from '@/Components/EntityMultiSelector';
import EntitySelector from '@/Components/EntitySelector';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

export default function SearchFilterBooksForm({
    className = '',
    shown = true,
    setHidden = null
}) {

    const titleInput = useRef();
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
        get
    } = useForm({
        title: '',
        sort: 'asc',
        author_id: null,
        genres_ids: []
    });

    const handleSearch = (e) => {
        e.preventDefault();

        get(route('books.search', {
            title: data.title,
            sort: data.sort,
            author_id: data.author_id,
            genres_ids: data.genres_ids
        }));
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
                        Search/filter
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Please specify the book details for your search.
                    </p>
                </header>

                <div className="mt-4 space-y-6">
                    <div>
                        <div className="flex gap-4 items-center justify-start">
                            <InputLabel
                                htmlFor="title"
                                value="Title"
                            />
                            <div className="text-xs font-semibold leading-tight text-gray-800 dark:text-gray-200">
                                (Sorting:
                                <label htmlFor="sort-title-asc">
                                    <input
                                        type="radio"
                                        id="sort-title-asc"
                                        name="sortBy"
                                        value="asc"
                                        style={{ color: 'red' }}
                                        onClick={() => {
                                            setData('sort', 'asc');
                                        }}
                                        defaultChecked={data.sort === 'asc'}
                                    />
                                    Direct(A-Z)
                                </label>
                                <label htmlFor="sort-title-desc">
                                    <input
                                        type="radio"
                                        id="sort-title-desc"
                                        name="sortBy"
                                        value="desc"
                                        style={{ color: 'red' }}
                                        onClick={() => {
                                            setData('sort', 'desc');
                                        }}
                                        defaultChecked={data.sort === 'desc'}
                                    />
                                    Reverse(Z-A)
                                </label>
                                )
                            </div>
                        </div>

                        <div className="flex gap-4 items-center justify-center">
                            <TextInput
                                id="title"
                                ref={titleInput}
                                value={data.title}
                                onChange={(e) => {
                                    setData('title', e.target.value);
                                }}
                                className="mt-1 block w-full"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 mt-3 items-center justify-start">
                    <div className="flex-col text-sm font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        <p>Author filter:</p>
                        <p>(choose one)</p>
                    </div>
                    <div className="text-xs font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        <EntitySelector entities={authors} onSelect={handleAuthorSelect} />
                    </div>
                    <div className="flex-col text-sm font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        <p>Genres filter:</p>
                        <p>(choose many)</p>
                    </div>
                    <div className="text-xs font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        <EntityMultiSelector entities={genres} onSelect={handleGenresSelect} />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-4 mt-3">
                    <div className="flex items-center gap-4">
                        <PrimaryButton onClick={(e) => handleSearch(e)}>Search</PrimaryButton>
                        <SecondaryButton action={setHidden}>Back</SecondaryButton>
                    </div>
                </div>
            </section>
        </Transition>
    );
}
