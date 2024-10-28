import { DELAY_AFTER_SUCCESSFULLY_ACTION } from '@/app';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function UpdateGenreForm({
    className = '',
    hidden = false,
    setHidden = null,
    genreForUpdate = null }) {

    const nameInput = useRef();

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        name: genreForUpdate ? genreForUpdate.name : ''
    });

    const handleUpdate = (e) => {
        e.preventDefault();

        post(route('genres.update', {genre: genreForUpdate}), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setTimeout(() => {
                    setHidden();
                }, DELAY_AFTER_SUCCESSFULLY_ACTION);
            },
            onError: (errors) => {
                if (errors.name) {
                    reset('name');
                    nameInput.current.focus();
                }
            },
        });
    };

    return (
        <Transition
            show={hidden}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
        >
            <section className={className}>
                <header>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Update genre
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Change the current genre name.
                    </p>
                </header>

                <form onSubmit={handleUpdate} className="mt-6 space-y-6">
                    <div>
                        <InputLabel
                            htmlFor="name"
                            value="Name"
                        />
                        <TextInput
                            id="name"
                            ref={nameInput}
                            value={data.name}
                            onChange={(e) =>
                                setData('name', e.target.value)
                            }
                            className="mt-1 block w-full"
                        />
                        <InputError
                            message={errors.name}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center gap-4">
                            <PrimaryButton disabled={processing}>Update</PrimaryButton>
                            <SecondaryButton action={setHidden}>Back</SecondaryButton>
                        </div>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Genre succesfully updated
                            </p>
                        </Transition>
                    </div>
                </form>
            </section>
        </Transition>
    );
}
