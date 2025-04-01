import { Head, router, useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import toast from "react-hot-toast";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

export default function UsersIndex() {
    const { project } = usePage().props;
    const { data, setData, patch, processing, errors, reset } = useForm({
        name: project?.name,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("projects.update", { project: project.id }), {
            onFinish: () => toast.success("Editat cu success!"),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Editare proiect {project?.name}
                </h2>
            }
        >
            <Head title="Utilizatori" />

            <div className="py-12 h-full">
                <div className="mx-auto h-full max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden h-full bg-white shadow-sm sm:rounded-lg">
                        <PrimaryButton
                            className="mt-6 ml-6"
                            onClick={() => router.get(route("orders.index"))}
                        >
                            Inapoi
                        </PrimaryButton>
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="name" value="Nume" />

                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4 flex items-center justify-end">
                                    <PrimaryButton
                                        className="ms-4"
                                        disabled={processing}
                                    >
                                        Confirm Editarea
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
