import React from "react";
import PrimaryButton from "../PrimaryButton";
import { router } from "@inertiajs/react";

const TDropdown = ({ row, prefix }) => {
    return (
        <div className="flex gap-3">
            <PrimaryButton
                onClick={() => router.get(route(`${prefix}.edit`, row.id))}
                className="text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none "
            >
                Editeaza
            </PrimaryButton>
        </div>
    );
};

export default TDropdown;
