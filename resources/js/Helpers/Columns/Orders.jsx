import dayjs from "dayjs";
import { orderOptions } from "../helper";
import TDropdown from "@/Components/Table/TDropdown";
import { router } from "@inertiajs/react";
import Select from "@/Components/Select";

const ExpandedOrder = ({ data }) => <pre>{JSON.stringify(data.log, null, 2)}</pre>;

const ordersColumns = [
    {
        name: "Titlu",
        selector: (row) => <span className="font-semibold">{row.title}</span>,
        sortable: true,
        wrap: true,
        sortField: "title",
    },
    {
        name: "Status",
        selector: (row) => (
            <Select
                options={orderOptions}
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
    },
    {
        name: "Descriere",
        selector: (row) => row.description,
        wrap: true,
    },
    {
        name: "Data Creării",
        selector: (row) => dayjs(row.created_at).format("DD/MM/YYYY"),
        sortable: true,
        sortField: "created_at",
    },
    {
        selector: (row) => <TDropdown row={row} prefix="orders" />,
    },
];



export { ordersColumns, ExpandedOrder };
