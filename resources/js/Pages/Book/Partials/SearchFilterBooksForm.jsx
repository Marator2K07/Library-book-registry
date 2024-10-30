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
        errors,
        get,
        processing,
        recentlySuccessful,
    } = useForm({
        title: ''
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
                        <InputLabel
                            htmlFor="title"
                            value="Title"
                        />
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
                            <InputError
                                message={errors.title}
                                className="mt-2"
                            />
                            <div className="flex flex-col items-center gap-4">
                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>Search</PrimaryButton>
                                </div>
                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        List succesfully updated
                                    </p>
                                </Transition>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </Transition>
    );
}
