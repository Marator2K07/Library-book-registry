import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import NavLink from '@/Components/NavLink';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { DELAY_AFTER_SUCCESSFULLY_ACTION } from '@/constants';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function UpdateAuthorForm({
    className = '',
    hidden = false,
    setHidden = null,
    authorForUpdate = null }) {

    const nameInput = useRef();
    const emailInput = useRef();
    const currentPasswordInput = useRef();
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
        name: authorForUpdate ? authorForUpdate.name : '',
        email: authorForUpdate ? authorForUpdate.user.email : '',
        current_password: '',
        password: '',
        day_of_birth: authorForUpdate ? authorForUpdate.day_of_birth : ''
    });

    const handleUpdate = (e) => {
        e.preventDefault();

        post(route('authors.update', { author: authorForUpdate }), {
            preserveScroll: true,
            onSuccess: () => {
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
                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
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
            show={!hidden}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
        >
            <section className={className}>
                <header>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Author with id: {authorForUpdate.id}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        You can update field(s) for current entity.
                    </p>
                    <p className="text-sm text-gray-600 dark:text-yellow-400">
                        !Author will be updated simultaneously with the account for him!
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
                            htmlFor="current_password"
                            value="Current password (!from admin account!)"
                        />
                        <TextInput
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            type="password"
                            onChange={(e) =>
                                setData('current_password', e.target.value)
                            }
                            className="block w-full"
                        />
                        <InputError
                            message={errors.current_password}
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="password"
                            value="New password"
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
                            <PrimaryButton disabled={processing}>Update</PrimaryButton>
                            <NavLink href={route('authors.index')}>
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
                                Author succesfully updated
                            </p>
                        </Transition>
                    </div>
                </form>
            </section>
        </Transition>
    );
}
