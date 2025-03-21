import { Head, usePage, useForm, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";

export default function createContestant() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        membership_id: "",
        password: "",
    });

    function handleSubmit(e) {
        e.preventDefault();

        post("/users/store");
        //router.visit("users.index");
    }
    return (
        <>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Add New Voter
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
                                    <label htmlFor="Firstname">
                                        Voter Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                name: e.target.value,
                                            })
                                        }
                                        placeholder="enter candidate firstname"
                                        className="w-full rounded-lg"
                                    />
                                    {errors.name && (
                                        <p className="text-red-600">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div className="w-5/6 mx-auto">
                                    <label htmlFor="Lastname">
                                        Membership ID
                                    </label>
                                    <input
                                        type="text"
                                        value={data.membership_id}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                membership_id: e.target.value,
                                            })
                                        }
                                        placeholder="enter candidate lastname"
                                        className="w-full rounded-lg"
                                    />
                                    {errors.membership_id && (
                                        <p className="text-red-600">
                                            {errors.membership_id}
                                        </p>
                                    )}
                                </div>

                                <div className="w-5/6 mx-auto">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                password: e.target.value,
                                            })
                                        }
                                        placeholder="enter candidate lastname"
                                        className="w-full rounded-lg"
                                    />
                                    {errors.password && (
                                        <p className="text-red-600">
                                            {errors.password}
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
