import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function UserIndex({ users }) {
    const user = usePage().props.auth.user;
    console.log(users);
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
                                        Add Voter
                                    </Link>
                                </div>

                                <div className=" flex justify-between px-4 py-2">
                                    <p className="pr-4 text-gray-400">Name</p>

                                    <p className="pr-4 text-gray-400">Action</p>
                                </div>
                                {Array.isArray(users) && users.length > 0 ? (
                                    users.map((user) => (
                                        <div
                                            key={user.id}
                                            className="flex justify-between px-4 pb-2 border-b mb-2"
                                        >
                                            <p className="pr-4">{user.name}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-400 flex justify-center p-4">
                                        There are no users Yet
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-400 flex justify-center p-4">
                        You are not allowed to view this page
                    </p>
                )}
            </AuthenticatedLayout>
        </>
    );
}
