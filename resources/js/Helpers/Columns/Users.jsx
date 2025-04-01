import TDropdown from "@/Components/Table/TDropdown";
import dayjs from "dayjs";

const usersColumns = [
    {
        name: "Nume",
        selector: (row) => row.name,
        sortable: true,
        sortField: "name",
    },
    {
        name: "Data Creării",
        selector: (row) => dayjs(row.created_at).format("DD/MM/YYYY"),
        sortable: true,
        sortField: "created_at",
    },
    {
        selector: (row) => <TDropdown row={row} prefix="users" />,
    },
];

export default usersColumns
