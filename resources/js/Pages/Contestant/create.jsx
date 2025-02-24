import { Head, usePage, useForm, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";

export default function createContestant() {
    const { data, setData, post, processing, errors } = useForm({
        firstName: "",
        lastName: "",
        image: "",
    });

    function handleSubmit(e) {
        e.preventDefault();

        post("/contestants");
    }
    return (
        <>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Add New Contestants
                    </h2>
                }
            >
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-wrap md:no-wrap gap-4 my-4"
                                encType="multipart/form-data"
                            >
                                <div className="w-5/6 mx-auto">
                                    <label htmlFor="Firstname">Firstname</label>
                                    <input
                                        type="text"
                                        value={data.firstName}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                firstName: e.target.value,
                                            })
                                        }
                                        placeholder="enter candidate firstname"
                                        className="w-full rounded-lg"
                                    />
                                    {errors.firstName && (
                                        <p className="text-red-600">
                                            {errors.firstName}
                                        </p>
                                    )}
                                </div>

                                <div className="w-5/6 mx-auto">
                                    <label htmlFor="Lastname">Lastname</label>
                                    <input
                                        type="text"
                                        value={data.lastName}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                lastName: e.target.value,
                                            })
                                        }
                                        placeholder="enter candidate lastname"
                                        className="w-full rounded-lg"
                                    />
                                    {errors.lastName && (
                                        <p className="text-red-600">
                                            {errors.lastName}
                                        </p>
                                    )}
                                </div>

                                <div className="w-5/6 mx-auto">
                                    <label htmlFor="Image">Upload Image</label>
                                    <input
                                        type="file"
                                        name="image"
                                        value={data.image}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                image: e.target.files[0],
                                            })
                                        }
                                        className="w-full border-2 rounded-lg p-1"
                                    />
                                    {errors.image && (
                                        <p className="text-red-600">
                                            {errors.image}
                                        </p>
                                    )}
                                </div>
                                <div className="w-full mx-auto flex justify-center">
                                    <button className="text-white bg-black px-6 py-2 rounded-lg">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
