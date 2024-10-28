import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { DELAY_AFTER_SUCCESSFULLY_ACTION } from '@/constants';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function CreateAuthorForm({
    className = '',
    hidden = false,
    setHidden = null }) {

    const nameInput = useRef();
    const emailInput = useRef();
    const passwordInput = useRef();
    const birthdayInput = useRef();

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        name: '',
        email: '',
        password: '',
        day_of_birth: ''
    });

    const handleCreate = (e) => {
        e.preventDefault();

        post(route('authors.store', {
            page: new URLSearchParams(window.location.search).get("page")
        }), {
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
                if (errors.email) {
                    reset('email');
                    emailInput.current.focus();
                }
                if (errors.password) {
                    reset('password');
                    passwordInput.current.focus();
                }
                if (errors.day_of_birth) {
                    reset('day_of_birth');
                    birthdayInput.current.focus();
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
                        New author
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Create a new author with specified fields.
                    </p>
                    <p className="text-sm text-gray-600 dark:text-yellow-400">
                        !The author will be created simultaneously with the account for him!
                    </p>
                </header>

                <form onSubmit={handleCreate} className="mt-6 space-y-6">
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
                            className="block w-full"
                        />
                        <InputError
                            message={errors.name}
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="email"
                            value="Email"
                        />
                        <TextInput
                            id="email"
                            ref={emailInput}
                            value={data.email}
                            onChange={(e) =>
                                setData('email', e.target.value)
                            }
                            className="block w-full"
                        />
                        <InputError
                            message={errors.email}
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                        />
                        <TextInput
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            type="password"
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="block w-full"
                        />
                        <InputError
                            message={errors.password}
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="day_of_birth"
                            value="Birthday (Format: YYYY-MM-DD)"
                        />
                        <TextInput
                            id="day_of_birth"
                            ref={birthdayInput}
                            value={data.day_of_birth}
                            onChange={(e) =>
                                setData('day_of_birth', e.target.value)
                            }
                            className="block w-full"
                        />
                        <InputError
                            message={errors.day_of_birth}
                            className="mt-1"
                        />
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center gap-4">
                            <PrimaryButton disabled={processing}>Create</PrimaryButton>
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
                                New author succesfully created
                            </p>
                        </Transition>
                    </div>
                </form>
            </section>
        </Transition>
    );
}
