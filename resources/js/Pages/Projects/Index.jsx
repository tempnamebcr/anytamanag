import { Head, router, usePage } from "@inertiajs/react";
import DataTable from "react-data-table-component";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect, useRef } from "react";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import PlusIcon from "../../../assets/PlusIcon";
import usePagination from "@/Hooks/usePagination";
import getProjectsColumns from "@/Helpers/Columns/Projects";

export default function ProjectsIndex() {
    const { projects } = usePage().props;
    const permissions = usePage().props.auth.permissions;
    const isFirstRun = useRef(true);
    const projectsColumns = getProjectsColumns(permissions);
    const {
        tempSearch,
        search,
        orderBy,
        orderDirection,
        page,
        perPage,
        setTempSearch,
        setSearch,
        setPage,
        setPerPage,
        handleSort,
    } = usePagination(projects);

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        router.get(
            route("projects.index"),
            { search, orderBy, orderDirection, page, perPage },
            {
                preserveState: true,
                replace: true,
            }
        );
    }, [search, orderBy, orderDirection, page, perPage]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Proiecte
                </h2>
            }
        >
            <Head title="Proiecte" />

            <div className="py-12 h-full">
                <div className="mx-auto h-full max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden h-full bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {permissions.includes("adaugare-proiecte") && (
                                <div className="flex mb-3">
                                    <PrimaryButton
                                        className="mr-3"
                                        onClick={() =>
                                            router.get(route("projects.create"))
                                        }
                                    >
                                        <PlusIcon
                                            fill="white"
                                            className="mr-2"
                                        />
                                        Adaugă
                                    </PrimaryButton>
                                </div>
                            )}
                            <div className="flex mb-3">
                                <TextInput
                                    id="search"
                                    name="search"
                                    value={tempSearch}
                                    className="mt-1 w-full sm:w-1/3 ml-auto"
                                    placeholder="Cauta un proiect"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setTempSearch(e.target.value)
                                    }
                                    onBlur={(e) => setSearch(e.target.value)}
                                    onKeyDown={(e) =>
                                        e.key === "Enter" &&
                                        setSearch(tempSearch)
                                    }
                                />
                                <PrimaryButton
                                    className="ms-4"
                                    onClick={() => setSearch(tempSearch)}
                                >
                                    Caută
                                </PrimaryButton>
                            </div>
                            <DataTable
                                columns={projectsColumns}
                                data={projects.data}
                                pagination
                                paginationServer
                                paginationTotalRows={projects.total}
                                paginationPerPage={perPage}
                                paginationComponentOptions={{
                                    rowsPerPageText: "Rezultate pe pagină",
                                }}
                                onChangePage={(page) => setPage(page)}
                                onChangeRowsPerPage={(newPerPage) =>
                                    setPerPage(newPerPage)
                                }
                                onSort={handleSort}
                                sortServer
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
