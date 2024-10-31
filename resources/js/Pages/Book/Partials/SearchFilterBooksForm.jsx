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
    const bookNameInput = useRef();
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const loadAuthors = async () => {
            setAuthors((await axios.get('/api/authors/get')).data);
        }
        loadAuthors();
    }, []);

    // функция обратного вызова для выбора автора-фильтра
    const handleAuthorSelect = (author) => {
        setData('author_id', author.id);
    }

    const {
        data,
        setData,
        get
    } = useForm({
        title: '',
        sort: 'asc',
        author_filter: false,
        author_id: null
    });

    const handleSearch = (e) => {
        e.preventDefault();

        get(route('books.search', {
            title: data.title,
            sort: data.sort,
            author: data.author
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
                                ref={bookNameInput}
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
                    <InputLabel value="Author filter: " />
                    <div className="text-xs font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        <EntitySelector entities={authors} onSelect={handleAuthorSelect} />
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
