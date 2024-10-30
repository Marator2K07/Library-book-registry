import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function SearchFilterBooksForm({
    className = '',
    hidden = false,
    setHidden = null }) {
    const bookNameInput = useRef();

    const {
        data,
        setData,
        get,
        processing,
    } = useForm({
        title: '',
        sort: 'asc'
    });

    const handleSearch = (e) => {
        e.preventDefault();

        get(route('books.search', {
            title: data.title
        }));
    };

    return (
        <Transition
            show={!hidden}
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

                <form onSubmit={handleSearch} className="mt-2 space-y-6">
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
                                        style={{color: 'red'}}
                                        onClick={() => setData('sort', 'asc')}
                                        checked={data.sort === 'asc'}
                                    />
                                    Direct(A-Z)
                                </label>
                                <label htmlFor="sort-title-desc">
                                    <input
                                        type="radio"
                                        id="sort-title-desc"
                                        name="sortBy"
                                        value="desc"
                                        style={{color: 'red'}}
                                        onClick={() => setData('sort', 'desc')}
                                        checked={data.sort === 'desc'}
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
                            <div className="flex flex-col items-center gap-4">
                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>Search</PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </Transition>
    );
}
