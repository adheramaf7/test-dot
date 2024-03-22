import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Category, PageProps, Product } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { FormEventHandler } from "react";

const pageTitle = "Editt Product";

export default function Editt({
    auth,
    product,
    categories,
}: PageProps<{ product: Product; categories: Category[] }>) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: product.name,
        category_id: product.category_id.toString(),
        price: product.price.toString(),
        stock: product.stock.toString(),
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("products.update", product.id));
    };

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
                <div className="mx-auto space-y-6 max-w-7xl sm:px-6 lg:px-8">
                    <div className="p-8 bg-white shadow sm:rounded-lg">
                        <form onSubmit={submit} className="max-w-xl space-y-6">
                            <div>
                                <InputLabel htmlFor="name" value="Name" />

                                <TextInput
                                    id="name"
                                    className="block w-full mt-1"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                    isFocused
                                    autoComplete="name"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.name}
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="category_id"
                                    value="Category"
                                />

                                <select
                                    id="category_id"
                                    className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                    onChange={(e) =>
                                        setData("category_id", e.target.value)
                                    }
                                    value={data.category_id}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError
                                    className="mt-2"
                                    message={errors.category_id}
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="price" value="Price" />

                                <TextInput
                                    id="price"
                                    type="number"
                                    className="block w-full mt-1"
                                    value={data.price}
                                    onChange={(e) =>
                                        setData("price", e.target.value)
                                    }
                                    required
                                    autoComplete="price"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.price}
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="stock" value="Stock" />

                                <TextInput
                                    id="stock"
                                    type="number"
                                    className="block w-full mt-1"
                                    value={data.stock}
                                    onChange={(e) =>
                                        setData("stock", e.target.value)
                                    }
                                    required
                                    autoComplete="stock"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.stock}
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>
                                    Save
                                </PrimaryButton>
                                <Link href={route("products.index")}>
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
