import { Head, router, usePage } from "@inertiajs/react";
import DataTable from "react-data-table-component";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect } from "react";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import PlusIcon from "../../../assets/PlusIcon";
import usersColumns from "@/Helpers/Columns/Users"
import usePagination from "@/Hooks/usePagination";

export default function UsersIndex() {
    const { users } = usePage().props;
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
    } = usePagination(users);

    useEffect(() => {
        router.get(
            route("users.index"),
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
                    Utilizatori
                </h2>
            }
        >
            <Head title="Utilizatori" />

            <div className="py-12 h-full">
                <div className="mx-auto h-full max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden h-full bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex w-full mb-3">
                                <PrimaryButton
                                    className="mr-3"
                                    onClick={() =>
                                        router.get(route("register"))
                                    }
                                >
                                    <PlusIcon fill="white" className="mr-2" />
                                    Adaugă
                                </PrimaryButton>
                            </div>
                            <div className="flex mb-3">
                                <TextInput
                                    id="search"
                                    name="search"
                                    value={tempSearch}
                                    className="mt-1 w-full sm:w-1/3 ml-auto"
                                    placeholder="Cauta un utilizator"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setTempSearch(e.target.value)
                                    }
                                    onBlur={(e) =>
                                        setSearch(e.target.value)
                                    }
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
                                columns={usersColumns}
                                data={users.data}
                                pagination
                                paginationServer
                                paginationTotalRows={users.total}
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
