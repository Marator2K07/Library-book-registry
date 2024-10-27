import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Greetings() {
    const roles = JSON.parse(usePage().props.auth.user.role);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Greetings
                </h2>
            }
        >
            <Head title="Greetings" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 dark:ring-red-700 ring-1 ring-white/[0.05]">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {
                                roles.admin
                                    ?
                                    <p>You login as administrator. Full access granted.</p>
                                    :
                                    <p>You login as usual user. Access restricted.</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
