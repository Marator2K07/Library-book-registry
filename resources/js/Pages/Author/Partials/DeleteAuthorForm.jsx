import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { DELAY_AFTER_SUCCESSFULLY_ACTION } from '@/constants';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';

export default function DeleteAuthorForm({
    className = '',
    hidden = false,
    setHidden = null,
    authorForDeletion = null }) {

    const {
        delete: destroy,
        processing,
        recentlySuccessful,
    } = useForm();

    const handleDelete = (e) => {
        e.preventDefault();

        destroy(route('authors.destroy', { author: authorForDeletion }), {
            preserveScroll: true,
            onSuccess: () => {
                setTimeout(() => {
                    setHidden();
                }, DELAY_AFTER_SUCCESSFULLY_ACTION);
            }
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
                        Confirm deletion
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Are you sure you want to delete selected author?
                    </p>
                    <p className="mt-1 text-sm text-gray-600 dark:text-yellow-400">
                    !All of the author's books will be deleted along with him!
                    </p>
                </header>

                <form onSubmit={handleDelete} className="mt-6 space-y-6">
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center gap-4">
                            <DangerButton disabled={processing}>Delete</DangerButton>
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
                                Author succesfully deleted
                            </p>
                        </Transition>
                    </div>
                </form>
            </section>
        </Transition>
    );
}
