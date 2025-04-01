import { Head, usePage, useForm, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function editAllowedVotes({ message, error }) {
    const { data, setData, post, processing, errors } = useForm({
        voteAllowed: "",
    });
    const id = usePage().props.voteAllowedID;

    function handleSubmit(e) {
        e.preventDefault();

        post(`/Configuration/${id}`);
    }
    return (
        <>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Add New Allowed Votes Value
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
                                        Total Votes to Cast
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.voteAllowed}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                voteAllowed: e.target.value,
                                            })
                                        }
                                        placeholder="Specify total number of votes a member can cast. Eg: 10"
                                        className="w-full rounded-lg"
                                    />
                                    {error && (
                                        <p className="text-red-600 text-center">
                                            {error}
                                        </p>
                                    )}
                                    {errors && (
                                        <p className="text-red-600 text-center">
                                            {errors.voteAllowed}
                                        </p>
                                    )}
                                    {message && (
                                        <p className="text-green-600 text-center">
                                            {message}
                                        </p>
                                    )}
                                </div>

                                <div className="w-full mx-auto flex justify-center">
                                    <button className="text-white bg-black px-6 py-2 rounded-lg">
                                        Submit
                                    </button>
                                </div>
                            </form>
                            <p className="text-center text-red-600 mb-4">
                                Each member can cast a total of Seven votes by
                                Default. Kindly update according to requirement.
                            </p>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
