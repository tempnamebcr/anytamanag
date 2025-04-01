import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import SelectSearch from "react-select-search";
import DataTable from "react-data-table-component";
import "react-select-search/style.css";

export default function Dashboard() {
    const options = [
        { name: "Swedish", value: "sv" },
        { name: "English", value: "en" },
        {
            type: "group",
            name: "Group name",
            items: [{ name: "Spanish", value: "es" }],
        },
    ];

    const columns = [
        {
            name: "Nume",
            selector: (row) => row.name,
        },
        {
            name: "Rol",
            selector: (row) => row.role,
        }
    ];

    const data = [
        {
            id: 1,
            name: "Stefan",
            role: "Magazinier",
        },
        {
            id: 2,
            name: "Gigel",
            role: "Magazinier",
        },
    ];

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
                        <div className="p-6 text-gray-900">
                            <SelectSearch
                                options={options}
                                value="sv"
                                name="language"
                                search={true}
                                placeholder="Choose your language"
                            />
                            <DataTable columns={columns} data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
