import {useState} from "react";

export default function usePagination({ variable }) {
    const [tempSearch, setTempSearch] = useState(
        new URLSearchParams(window.location.search).get("search") || ""
    );
    const [search, setSearch] = useState(
        new URLSearchParams(window.location.search).get("search") || ""
    );
    const [orderBy, setOrderBy] = useState("id");
    const [orderDirection, setOrderDirection] = useState("desc");
    const [page, setPage] = useState(variable?.current_page);
    const [perPage, setPerPage] = useState(variable?.per_page);
    const handleSort = (column, sortDirection) => {
        setOrderBy(column.sortField);
        setOrderDirection(sortDirection);
    };
    return {
        tempSearch,
        search,
        orderBy,
        orderDirection,
        page,
        perPage,
        handleSort,
        setTempSearch,
        setSearch,
        setPage,
        setPerPage
    }
}
