import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Category, PageProps } from "@/types";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

const pageTitle = "Category";

export default function Index({
    auth,
    categories,
    flash,
    search,
}: PageProps<{ categories: Category[]; search: string }>) {
    const [searchValue, setSearchValue] = useState(search ?? "");
    const [debouncedValue] = useDebounce(searchValue, 500);
    const isMounted = useRef(false);

    const deleteData = async (category: Category) => {
        const confirmed = await confirm("Are you sure to delete this data?");

        confirmed && router.delete(route("categories.destroy", category.id));
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            document.getElementById("flash-message")?.remove();
        }, 3000);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    useEffect(() => {
        if (isMounted.current == false) {
            isMounted.current = true;
            return;
        }

        if (isMounted.current == true) {
            console.info("triggered");
            const url = route("categories.index");
            router.visit(url, {
                data: { search: debouncedValue },
            });
        }
    }, [debouncedValue]);

    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {pageTitle}
                </h2>
            }
        >
            <Head title={pageTitle} />

            <div className="py-6">
                <div className="mx-auto space-y-3 max-w-7xl sm:px-6 lg:px-8">
                    {flash.message && (
                        <div
                            id="flash-message"
                            className="p-4 text-sm text-gray-800 bg-white rounded-lg "
                            role="alert"
                        >
                            <span className="font-medium">{flash.message}</span>
                        </div>
                    )}
                    <div className="bg-white shadow sm:rounded-lg">
                        <div className="flex flex-row justify-between px-8 pt-6 mb-6">
                            <TextInput
                                placeholder="Search..."
                                className="w-full max-w-xs"
                                autoFocus
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                            <Link href={route("categories.create")}>
                                <PrimaryButton>New Data</PrimaryButton>
                            </Link>
                        </div>

                        <div className="relative overflow-x-auto">
                            <table className="w-full text-left text-gray-800">
                                <thead className="text-xs text-white uppercase bg-gray-800">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 w-[70%]"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 w-[30%]"
                                        >
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.length == 0 && (
                                        <tr className="bg-white border-b">
                                            <td className="px-6 py-4 font-semibold text-center">
                                                No Data
                                            </td>
                                        </tr>
                                    )}
                                    {categories.map((category) => (
                                        <tr
                                            className="bg-white border-b"
                                            key={category.id}
                                        >
                                            <td className="px-6 py-4">
                                                {category.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link
                                                    href={route(
                                                        "categories.edit",
                                                        category.id
                                                    )}
                                                >
                                                    <PrimaryButton
                                                        className="mr-2"
                                                        type="button"
                                                    >
                                                        Edit
                                                    </PrimaryButton>
                                                </Link>
                                                <DangerButton
                                                    onClick={(e) =>
                                                        deleteData(category)
                                                    }
                                                    type="button"
                                                >
                                                    Delete
                                                </DangerButton>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
