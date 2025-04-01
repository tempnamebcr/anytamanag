import { Head, router, useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import toast from "react-hot-toast";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Select from "@/Components/Select";
import {orderOptions} from "@/Helpers/helper";
import Textarea from "@/Components/Textarea";
import SearchableSelect from "@/Components/SearchableSelect";
import {useEffect} from "react";

export default function OrdersCreate() {
    const { projects } = usePage().props;
    const user = usePage().props.auth.user;
    const selectedProjectId = Number(new URLSearchParams(window.location.search).get("projectId")) ?? null;
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        description: "",
        status: "nepreluata",
        project_id: selectedProjectId,
        user_id: user.id
    });

    const projectOptions = projects?.map((project) => (
        {value: project.id, label: project.name, selected: project.id == selectedProjectId}
    ))

    useEffect(() => {
        const selectedProject = projects.find((project) => project.id == data.project_id);
        if (selectedProject) {
            const title = `${selectedProject.name.toUpperCase()}${selectedProject.orders_count + 1}`;
            setData('title', title);
        }
    }, [data.project_id]);

    const selectParent = (value) => {
        setData("project_id", value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("orders.store"), {
            onFinish: () => toast.success("Adaugata cu success!"),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Adaugare Comanda
                </h2>
            }
        >
            <Head title="Creare Comanda" />

            <div className="py-12 h-full">
                <div className="mx-auto h-full max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden h-full bg-white shadow-sm sm:rounded-lg">
                        <PrimaryButton
                            className="mt-6 ml-6"
                            onClick={() => router.get(route("orders.index", {project_id: selectedProjectId}))}
                        >
                            Inapoi
                        </PrimaryButton>
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="title" value="Titlu" />

                                    <TextInput
                                        id="title"
                                        name="title"
                                        value={data.title}
                                        className="mt-1 block w-full"
                                        autoComplete="title"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.title}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="projects"
                                        value="Proiect"
                                    />

                                    <SearchableSelect
                                        id="projects"
                                        name="projects"
                                        value={data.project_id}
                                        className="mt-1 block w-full"
                                        autoComplete="status"
                                        isFocused={true}
                                        options={projectOptions}
                                        selectParent={(id) => selectParent(id)}
                                        onChange={(e) => {
                                            setData('project_id', e.target.value)
                                        }}
                                        required
                                    />

                                    <InputError
                                        message={errors.title}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="status"
                                        value="Status"
                                    />

                                    <Select
                                        id="status"
                                        name="status"
                                        value={data.status}
                                        className="mt-1 block w-full"
                                        autoComplete="status"
                                        isFocused={true}
                                        options={orderOptions}
                                        onChange={(e) => {
                                            setData('status', e.target.value)
                                        }}
                                        required
                                    />

                                    <InputError
                                        message={errors.title}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="description"
                                        value="Descriere"
                                    />

                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        autoComplete="description"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.title}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4 flex items-center justify-end">
                                    <PrimaryButton
                                        className="ms-4"
                                        disabled={processing}
                                    >
                                        Adauga
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
