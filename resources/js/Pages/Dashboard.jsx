import OrdersCard from "@/Components/Cards/OrdersCard";
import ProjectsCard from "@/Components/Cards/ProjectsCard";
import UsersCard from "@/Components/Cards/UsersCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import "react-select-search/style.css";

export default function Dashboard() {
    const permissions = usePage().props.auth.permissions;
    const user = usePage().props.auth.user;
    const { usersCount, projectsCount, ordersCount } = usePage().props;
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 h-full">
                <div className="mx-auto h-full max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden h-full min-h-[800px] bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 flex flex-col justify-center gap-4">
                            {
                                user?.roles?.[0]?.name == "admin" &&
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                                    <UsersCard count={usersCount} />
                                    <ProjectsCard count={projectsCount} />
                                    <OrdersCard ordersCount={ordersCount} />
                                </div>
                            }
                            {permissions.includes("vizualizare-proiecte") && (
                                <button
                                    className="w-full sm:w-[350px] m-auto rounded-md border border-transparent bg-gray-800 py-4 px-8 text-xl font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                                    onClick={() =>
                                        router.get(route("projects.index"))
                                    }
                                >
                                    Lista de proiecte
                                </button>
                            )}
                            {permissions.includes("vizualizare-comenzi") && (
                                <button
                                    className="w-full sm:w-[350px] m-auto rounded-md border border-transparent bg-gray-800 py-4 px-8 text-xl font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                                    onClick={() =>
                                        router.get(route("orders.index"))
                                    }
                                >
                                    Lista de comenzi
                                </button>
                            )}
                            {permissions.includes(
                                "vizualizare-utilizatori"
                            ) && (
                                <button
                                    className="w-full sm:w-[350px] m-auto rounded-md border border-transparent bg-gray-800 py-4 px-8 text-xl font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                                    onClick={() =>
                                        router.get(route("users.index"))
                                    }
                                >
                                    Lista de Angajati
                                </button>
                            )}
                            {permissions.includes("vizualizare-permisiuni") && (
                                <button
                                    className="w-full sm:w-[350px] m-auto rounded-md border border-transparent bg-gray-800 py-4 px-8 text-xl font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                                    onClick={() =>
                                        router.get(route("permissions.index"))
                                    }
                                >
                                    Lista de Permisiuni
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
