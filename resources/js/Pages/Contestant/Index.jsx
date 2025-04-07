import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, router, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function contestantIndex({ contestants }) {
    const user = usePage().props.auth.user;

    const [searchContestant, setSearchContestant] = useState("");

    return (
        <>
            <AuthenticatedLayout>
                {/* Admin Logged in view */}
                {user.role === "admin" ? (
                    <div className="py-12">
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                <div className="w-full mx-auto px-4 flex items-center justify-between">
                                    <form action="">
                                        <input
                                            type="text"
                                            name="searchquery"
                                            placeholder="search contestant"
                                            className="border-0 bg-gray-100 my-4 w-2/4 rounded-lg"
                                        />
                                    </form>

                                    <Link
                                        className="flex rounded-lg bg-blue-600 text-white px-6 py-2 w-fit h-fit"
                                        href="/contestants/create"
                                    >
                                        Add Candidate
                                    </Link>
                                </div>
                                <table className="w-full mx-4 mb-4">
                                    <tbody>
                                        <tr className="w-full ">
                                            <th className="text-left py-4 text-gray-400">
                                                ID
                                            </th>
                                            <th className="text-left py-4 text-gray-400">
                                                Firstname
                                            </th>
                                            <th className="text-left py-4 text-gray-400">
                                                Lastname
                                            </th>
                                            <th className="text-left py-4 text-gray-400">
                                                Action
                                            </th>
                                        </tr>
                                        {Array.isArray(contestants) &&
                                        contestants.length > 0 ? (
                                            contestants.map((contestant) => (
                                                <tr
                                                    key={contestant.id}
                                                    className="w-full border-b"
                                                >
                                                    <td className="text-left py-2">
                                                        {contestant.id}
                                                    </td>
                                                    <td>
                                                        {contestant.firstName}
                                                    </td>
                                                    <td>
                                                        {contestant.lastName}
                                                    </td>
                                                    <td>
                                                        <Link
                                                            href={`/contestants/${contestant.id}`}
                                                            className="bg-green-600 hover:bg-green-500 rounded-lg duration-500 text-white px-4 py-2"
                                                        >
                                                            View
                                                        </Link>
                                                    </td>
                                                    <td className="flex justify-center">
                                                        <form
                                                            onSubmit={() =>
                                                                handleDelete(
                                                                    contestant.id
                                                                )
                                                            }
                                                        >
                                                            <button className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 my-2 rounded-lg duration-500">
                                                                Delete
                                                            </button>
                                                        </form>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <p className="text-gray-400 flex justify-center p-4">
                                                There are no Contestants Yet
                                            </p>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : (
                    //Regular User Logged in View
                    router.visit("Dashboard")
                )}
            </AuthenticatedLayout>
        </>
    );
}
