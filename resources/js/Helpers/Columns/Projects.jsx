import PrimaryButton from "@/Components/PrimaryButton";
import TDropdown from "@/Components/Table/TDropdown";
import { router } from "@inertiajs/react";
import dayjs from "dayjs";

const getProjectsColumns = (permissions) => [
    {
        name: "Nume",
        selector: (row) => <span className="text-[16px] font-semibold">{row.name}</span>,
        sortable: true,
        sortField: "name",
        wrap: true,
        style: { minWidth: "150px" }
    },
    {
        name: "Comenzi",
        selector: (row) => (
            <PrimaryButton
                onClick={() => {
                    router.get(route("orders.index", { projectId: row.id }));
                }}
            >
                Vezi comenzi
            </PrimaryButton>
        ),
        style: { minWidth: "200px" }
    },
    {
        name: "Data Creării",
        selector: (row) => dayjs(row.created_at).format("DD/MM/YYYY"),
        sortable: true,
        sortField: "created_at",
        style: { minWidth: "150px" }
    },
    {
        selector: (row) =>
            permissions.includes("adaugare-proiecte") && (
                <TDropdown row={row} prefix="projects" />
            ),
        style: { minWidth: "150px" }
    },
];

export default getProjectsColumns;
