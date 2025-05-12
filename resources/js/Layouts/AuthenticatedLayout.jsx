import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import usersIcon from "../../assets/svg/users.svg";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const permissions = usePage().props.auth.permissions;
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <Toaster position="top-right" reverseOrder={false} />
            <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex">
                                <NavLink href={route("dashboard")}>
                                    <ApplicationLogo className="h-1/2 my-auto" />
                                </NavLink>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    Dashboard
                                </NavLink>
                                {permissions.includes(
                                    "vizualizare-comenzi"
                                ) && (
                                    <NavLink
                                        href={route("orders.index")}
                                        active={route().current("orders.index")}
                                    >
                                        Comenzi
                                    </NavLink>
                                )}
                                {permissions.includes(
                                    "vizualizare-proiecte"
                                ) && (
                                    <NavLink
                                        href={route("projects.index")}
                                        active={route().current(
                                            "projects.index"
                                        )}
                                    >
                                        Proiecte
                                    </NavLink>
                                )}
                                {permissions.includes(
                                    "vizualizare-utilizatori"
                                ) && (
                                    <NavLink
                                        href={route("users.index")}
                                        active={route().current("users.index")}
                                    >
                                        Angajati
                                    </NavLink>
                                )}
                                {permissions.includes(
                                    "vizualizare-permisiuni"
                                ) && (
                                    <NavLink
                                        href={route("permissions.index")}
                                        active={route().current(
                                            "permissions.index"
                                        )}
                                    >
                                        Roluri
                                    </NavLink>
                                )}
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        {user?.roles?.[0]?.name == "admin" && (
                                            <Dropdown.Link
                                                href={route("register")}
                                                as="button"
                                            >
                                                Inregistrare cont nou
                                            </Dropdown.Link>
                                        )}
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Delogare
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        {permissions.includes("vizualizare-permisiuni") && (
                            <ResponsiveNavLink
                                href={route("permissions.index")}
                                active={route().current("permissions.index")}
                            >
                                Permisiuni
                            </ResponsiveNavLink>
                        )}
                        {permissions.includes("vizualizare-proiecte") && (
                            <ResponsiveNavLink
                                href={route("projects.index")}
                                active={route().current("projects.index")}
                            >
                                Proiecte
                            </ResponsiveNavLink>
                        )}
                        {permissions.includes("vizualizare-utilizatori") && (
                            <ResponsiveNavLink
                                href={route("users.index")}
                                active={route().current("users.index")}
                            >
                                Utilizatori
                            </ResponsiveNavLink>
                        )}
                        {permissions.includes("vizualizare-comenzi") && (
                            <ResponsiveNavLink
                                href={route("orders.index")}
                                active={route().current("orders.index")}
                            >
                                Comenzi
                            </ResponsiveNavLink>
                        )}
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800 flex">
                                <img
                                    src={usersIcon}
                                    alt="Users"
                                    className="w-6 h-6 mr-4"
                                />
                                <p>{user.name}</p>
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            {user?.roles?.[0]?.name == "admin" && (
                                <ResponsiveNavLink href={route("register")}>
                                    Inregistrare cont nou
                                </ResponsiveNavLink>
                            )}
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Delogare
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
