import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function contestantIndex({ contestants }) {
    const user = usePage().props.auth.user;
    console.log(contestants);
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
                                    <input
                                        type="text"
                                        placeholder="search contestant"
                                        className="border-0 bg-gray-100 my-4 w-2/4 rounded-lg"
                                    />
                                    <Link
                                        className="flex rounded-lg bg-blue-600 text-white px-6 py-2 w-fit h-fit"
                                        href="/contestants/create"
                                    >
                                        Add Contestant
                                    </Link>
                                </div>

                                <div className=" flex justify-between px-4 py-2">
                                    <p className="pr-4 text-gray-400">Name</p>
                                    <p className="pr-4 text-gray-400">
                                        Position
                                    </p>
                                    <p className="pr-4 text-gray-400">Votes</p>
                                    <p className="pr-4 text-gray-400">
                                        Created At
                                    </p>
                                    <p className="pr-4 text-gray-400">Action</p>
                                </div>
                                {Array.isArray(contestants) &&
                                contestants.length > 0 ? (
                                    contestants.map((contestant) => (
                                        <div
                                            key={contestant.id}
                                            className="flex justify-between p-4"
                                        >
                                            <p className="pr-4">
                                                {contestant.firstName}{" "}
                                                {contestant.lastName}
                                            </p>
                                            <p className="pr-4">
                                                {contestant.position}
                                            </p>
                                            <p>{contestant.created_at}</p>
                                            <Link
                                                className="flex rounded-lg bg-green-600 text-white px-6 py-1"
                                                href={route("contestant.show", {
                                                    id: contestant.id,
                                                })}
                                            >
                                                View
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-400 flex justify-center p-4">
                                        There are no Contestants Yet
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    //Regular User Logged in View
                    <div className="py-12">
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                <div className=" flex justify-between px-4 py-2">
                                    <p className="pr-4 text-gray-400">Name</p>
                                    <p className="pr-4 text-gray-400">
                                        Position
                                    </p>
                                    <p className="pr-4 text-gray-400">Votes</p>
                                    <p className="pr-4 text-gray-400">
                                        Created At
                                    </p>
                                    <p className="pr-4 text-gray-400">Action</p>
                                </div>
                                {Array.isArray(contestants) &&
                                contestants.length > 0 ? (
                                    contestants.map((contestant) => (
                                        <div
                                            key={contestant.id}
                                            className="flex justify-between p-4"
                                        >
                                            <p className="pr-4">
                                                {contestant.firstName}{" "}
                                                {contestant.lastName}
                                            </p>
                                            <p className="pr-4">
                                                {contestant.position}
                                            </p>
                                            <p>{contestant.created_at}</p>
                                            <Link
                                                className="flex rounded-lg bg-green-600 text-white px-6 py-1"
                                                href={route("contestant.show", {
                                                    id: contestant.id,
                                                })}
                                            >
                                                Vote
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-400 flex justify-center p-4">
                                        There are no Contestants Yet
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </AuthenticatedLayout>
        </>
    );
}
