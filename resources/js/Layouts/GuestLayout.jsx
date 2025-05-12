import ApplicationLogo from "@/Components/ApplicationLogo";
import {Link} from "@inertiajs/react";
import { Toaster } from "react-hot-toast";

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <Toaster position="top-right" reverseOrder={false} />
            <div>
                <Link href={route("dashboard")}>
                    <ApplicationLogo className="w-1/2 sm:min-w-[300px] sm:w-1/4 mx-auto mb-5" />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
