import { Head, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import PlusIcon from "../../../assets/PlusIcon";
import { useEffect, useState } from "react";
import SearchableSelect from "@/Components/SearchableSelect";

const pagesOptions = [
    { label: "Utilizatori", value: "utilizatori" },
    { label: "Proiecte", value: "proiecte" },
    { label: "Roluri si Permisiuni", value: "permisiuni" },
    { label: "Comenzi", value: "comenzi" },
];

export default function UsersIndex() {
    const { roles, permissions } = usePage().props;
    const [selectedPage, setSelectedPage] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [rolePermissions, setRolePermissions] = useState({});
    const [filteredPagesOptions, setFilteredPagesOptions] = useState(pagesOptions);

    useEffect(() => {
        let filteredOptions;
        if (!selectedPage) {
            filteredOptions = pagesOptions;
        } else {
            filteredOptions = pagesOptions.filter((option) => {
                return option.value == selectedPage;
            });
        }
        setFilteredPagesOptions(filteredOptions);
    }, [selectedPage]);


    useEffect(() => {
        if (!selectedRole){
            setRolePermissions({});
            return;
        }

        const role = roles.find((r) => r.name === selectedRole);
        if (!role) return;

        const updatedPermissions = role.permissions.reduce((acc, permission) => {
            acc[permission.name] = true;
            return acc;
        }, {});
        console.log(updatedPermissions)
        setRolePermissions(updatedPermissions);
    }, [selectedRole]);

    const togglePermission = (permissionName) => {
        setRolePermissions((prev) => ({
            ...prev,
            [permissionName]: !prev[permissionName],
        }));
    };

    const rolesOptions = () => {
        return roles?.map((role) => {
            return {
                label: role.name,
                value: role.name,
            };
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Roluri si Permisiuni
                </h2>
            }
        >
            <Head title="Roluri si Permisiuni" />

            <div className="py-12 h-full min-h-[800px]">
                <div className="mx-auto h-full max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden h-full bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 min-h-[800px]">
                            <div className="flex mb-3">
                                <PrimaryButton
                                    className="mr-3"
                                    onClick={() =>
                                        router.get(route("permissions.create"))
                                    }
                                >
                                    <PlusIcon fill="white" className="mr-2" />
                                    Adaugă Rol
                                </PrimaryButton>
                            </div>
                            <div className="flex mb-3">
                                <p className="my-auto mr-3 text-lg">
                                    Selecteaza Rolul
                                </p>
                                <SearchableSelect
                                    id="pages"
                                    name="pages"
                                    placeholder="Niciunul"
                                    value={selectedRole}
                                    className="mt-1 block max-w-sm mb-3 sm:mb-0"
                                    options={rolesOptions()}
                                    selectParent={(id) => setSelectedRole(id)}
                                    onChange={(e) => {
                                        setSelectedRole(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="flex">
                                <p className="my-auto mr-3 text-lg">
                                    Selecteaza Pagina
                                </p>
                                <SearchableSelect
                                    id="pages"
                                    name="pages"
                                    placeholder="Toate"
                                    value={selectedPage}
                                    className="mt-1 block max-w-sm mb-3 sm:mb-0"
                                    options={pagesOptions}
                                    selectParent={(id) => setSelectedPage(id)}
                                    onChange={(e) => {
                                        setSelectedPage(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="space-y-4 mt-3">
                                {filteredPagesOptions.map((page) => {
                                    const relatedPermissions =
                                        permissions.filter((perm) =>
                                            perm.name.includes(page.value)
                                        );

                                    return (
                                        <div
                                            key={page.value}
                                            className="border p-4 rounded-lg"
                                        >
                                            <h3 className="font-bold text-lg">
                                                {page.label}
                                            </h3>
                                            <div className="mt-2 flex flex-wrap gap-4">
                                                {relatedPermissions.length >
                                                0 ? (
                                                    relatedPermissions.map(
                                                        (perm) => (
                                                            <label
                                                                key={perm.name}
                                                                className="flex items-center space-x-2"
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    checked={
                                                                        rolePermissions[perm.name] || false
                                                                    }
                                                                    onChange={() =>
                                                                        togglePermission(
                                                                            perm.name
                                                                        )
                                                                    }
                                                                />
                                                                <span>
                                                                    {perm.name}
                                                                </span>
                                                            </label>
                                                        )
                                                    )
                                                ) : (
                                                    <p className="text-gray-500">
                                                        Nicio permisiune
                                                        disponibilă
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
