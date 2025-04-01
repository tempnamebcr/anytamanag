import { Head, router, usePage } from "@inertiajs/react";
import DataTable from "react-data-table-component";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect, useState } from "react";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import PlusIcon from "../../../assets/PlusIcon";
import SearchableSelect from "@/Components/SearchableSelect";
import { ordersColumns, ExpandedOrder } from "@/Helpers/Columns/Orders";
import usePagination from "@/Hooks/usePagination";
import {orderOptions} from "@/Helpers/helper";

export default function OrdersIndex() {
    const { orders, projects } = usePage().props;
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
    } = usePagination(orders);
    const [projectId, setProjectId] = useState(
        new URLSearchParams(window.location.search).get("projectId") || ""
    );
    const [status, setStatus] = useState([]);
    const selectedProject = projects.find((project) => project.id == projectId);

    const toggleStatus = (value) => {
        setStatus((prevSearch) =>
            prevSearch.includes(value)
                ? prevSearch.filter((item) => item !== value)
                : [...prevSearch, value]
        );
    };

    const projectOptions = projects?.map((project) => ({
        value: project.id,
        label: project.name,
        selected: project.id == projectId,
    }));

    useEffect(() => {
        router.get(
            route("orders.index"),
            {
                search,
                orderBy,
                orderDirection,
                page,
                perPage,
                projectId,
                status: status.length ? status.join(",") : undefined,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    }, [search, orderBy, orderDirection, page, perPage, projectId, status]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Comenzi{" "}
                    {selectedProject
                        ? "pe proiectul " + selectedProject.name
                        : "pe toate proiectele"}
                </h2>
            }
        >
            <Head title="Comenzi" />

            <div className="py-12 h-full">
                <div className="mx-auto h-full max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden h-full bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex mb-3">
                                <PrimaryButton
                                    className="mr-3"
                                    onClick={() =>
                                        router.get(
                                            route("orders.create", {
                                                projectId: projectId,
                                            })
                                        )
                                    }
                                >
                                    <PlusIcon fill="white" className="mr-2" />
                                    Adaugă
                                </PrimaryButton>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-between mb-3 w-full">
                                <SearchableSelect
                                    id="projects"
                                    name="projects"
                                    placeholder="Filtrează proiect"
                                    value={projectId}
                                    className="mt-1 block max-w-sm mb-3 sm:mb-0"
                                    options={projectOptions}
                                    selectParent={(id) => setProjectId(id)}
                                    onChange={(e) => {
                                        setProjectId(e.target.value);
                                    }}
                                />
                                <div>
                                    <TextInput
                                        id="search"
                                        name="search"
                                        value={tempSearch}
                                        className="mt-1"
                                        placeholder="Caută"
                                        isFocused={true}
                                        onBlur={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        onChange={(e) =>
                                            setTempSearch(e.target.value)
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
                            </div>
                            <div>
                                {orderOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() =>
                                            toggleStatus(option.value)
                                        }
                                        className={`px-4 py-2 mr-1 sm:mr-3 rounded-md text-white transition ${
                                            status.includes(option.value)
                                                ? "bg-blue-500"
                                                : "bg-gray-400"
                                        }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                            <DataTable
                                columns={ordersColumns}
                                data={orders.data}
                                pagination
                                paginationServer
                                paginationTotalRows={orders.total}
                                paginationPerPage={perPage}
                                paginationComponentOptions={{
                                    rowsPerPageText: "Rezultate pe pagină",
                                }}
                                onChangePage={(page) => setPage(page)}
                                onChangeRowsPerPage={(newPerPage) =>
                                    setPerPage(newPerPage)
                                }
                                expandableRows
                                expandableRowsComponent={ExpandedOrder}
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
