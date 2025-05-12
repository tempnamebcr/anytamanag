import dayjs from "dayjs";
import { orderOptions } from "../helper";
import TDropdown from "@/Components/Table/TDropdown";
import { router } from "@inertiajs/react";
import Select from "@/Components/Select";

const ExpandedOrder = ({ data }) => {
    if (!data.log || data.log.length === 0) {
        return <p className="text-gray-500 italic">Nu există înregistrări în istoric.</p>;
    }

    return (
        <div className="p-4 bg-gray-100 rounded-md border border-gray-300 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Istoric modificări</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
                {data.log.map((entry, index) => (
                    <li
                        key={index}
                        className="p-2 bg-white rounded-md shadow-sm border border-gray-200"
                        dangerouslySetInnerHTML={{ __html: JSON.parse(entry) }}
                    />
                ))}
            </ul>
        </div>
    );
};

const getOrdersColumns = (permissions) => [
    {
        name: "Titlu",
        selector: (row) => <span className="font-semibold">{row.title}</span>,
        sortable: true,
        wrap: true,
        sortField: "title",
        style: { minWidth: "150px" }
    },
    {
        name: "Status",
        selector: (row) => (
            <Select
                options={orderOptions}
                disabled={!permissions.includes("schimbare-status-comenzi")}
                onChange={(e) => {
                    router.post(route("orders.changeStatus", { id: row.id }), {
                        status: e.target.value,
                    });
                }}
                id="status"
                name="status"
                value={row.status}
                autoComplete="status"
            />
        ),
        style: { minWidth: "205px" }
    },
    {
        name: "Descriere",
        selector: (row) => row.description,
        wrap: true,
        style: { minWidth: "210px" }
    },
    {
        name: "Data Creării",
        selector: (row) => dayjs(row.created_at).format("DD/MM/YYYY"),
        sortable: true,
        sortField: "created_at",
        style: { minWidth: "170px" }
    },
    {
        selector: (row) =>
            permissions.includes("adaugare-comenzi") && (
                <TDropdown row={row} prefix="orders" />
            ),
        style: { minWidth: "200px" }
    },
];

export { getOrdersColumns, ExpandedOrder };
