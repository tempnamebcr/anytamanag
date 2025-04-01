import PrimaryButton from "@/Components/PrimaryButton";
import TDropdown from "@/Components/Table/TDropdown";
import {router} from "@inertiajs/react";
import dayjs from "dayjs";

const projectsColumns = [
    {
        name: "Nume",
        selector: (row) => <span className="text-[16px] font-semibold">{row.name}</span>,
        sortable: true,
        sortField: "name",
    },
    {
        name: "Comenzi",
        selector: (row) => (
            <PrimaryButton
                onClick={() => {
                    router.get(
                        route("orders.index", { projectId: row.id })
                    );
                }}
            >
                Vezi comenzi
            </PrimaryButton>
        ),
    },
    {
        name: "Data Creării",
        selector: (row) => dayjs(row.created_at).format("DD/MM/YYYY"),
        sortable: true,
        sortField: "created_at",
    },
    {
        selector: (row) => <TDropdown row={row} prefix="projects" />,
    },
];
export default projectsColumns
