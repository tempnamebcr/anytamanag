import React from "react";
import PrimaryButton from "../PrimaryButton";
import { router } from "@inertiajs/react";
import SecondaryButton from "../SecondaryButton";

const TDropdown = ({ row, prefix }) => {
    return (
        <div className="flex gap-3">
            <PrimaryButton
                onClick={() => router.get(route(`${prefix}.edit`, row.id))}
                className="block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none "
            >
                Editeaza
            </PrimaryButton>
            <SecondaryButton
                onClick={() => router.delete(route(`${prefix}.destroy`, row.id))}
                className="block text-red-500 w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none "
            >
                Sterge
            </SecondaryButton>
        </div>
    );
};

export default TDropdown;
