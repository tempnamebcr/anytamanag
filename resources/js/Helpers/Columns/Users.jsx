import Select from "@/Components/Select";
import TDropdown from "@/Components/Table/TDropdown";
import {router} from "@inertiajs/react";
import dayjs from "dayjs";

const getUsersColumns = (permissions, rolesArray) => [
    {
        name: "Nume",
        selector: (row) => row.name,
        sortable: true,
        sortField: "name",
        wrap: true,
        style: { minWidth: "150px" }
    },
    {
        name: "Data Creării",
        selector: (row) => dayjs(row.created_at).format("DD/MM/YYYY"),
        sortable: true,
        sortField: "created_at",
    },
    {
        name: "Rol",
        selector: (row) =>
        <Select
            options={rolesArray}
            disabled={!permissions.includes("adaugare-utilizatori")}
            onChange={(e) => {
                router.post(route("users.changeRole", { id: row.id }), {
                    role: e.target.value,
                });
            }}
            value={row.roles[0].name}
            id="role"
            name="role"
            autoComplete="role"
        />
    },
    {
        selector: (row) =>
            permissions.includes("adaugare-utilizatori") && (
                <TDropdown row={row} prefix="users" />
            ),
        style: { minWidth: "200px" }
    },
];

export default getUsersColumns;
