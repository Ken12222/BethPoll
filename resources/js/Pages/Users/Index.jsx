import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, usePage, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function UserIndex({ users }) {
    const user = usePage().props.auth.user;
    const [searchContestant, setSearchContestant] = useState("");
    const { data, setData, post, processing, errors } = useForm("");
    function handleBulkUpload() {
        if (!data) {
            alert("Please select a file for upload");
        }
        const formData = new FormData();
        formData.append("file", file);

        Inertia.post("/users/bulk-upload", formData, {
            onSuccess: () => {
                alert("Users uploaded successfully");
                setData(null);
            },
            onError: (errors) => {
                console.log(errors);
            },
        });
    }
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
                                    <div className="flex">
                                        <Link
                                            className="flex rounded-lg bg-blue-600 text-white px-6 py-2 w-36 h-fit"
                                            href="/users/create"
                                        >
                                            Add Voter
                                        </Link>
                                        <form className="flex justify-end items-center">
                                            <input
                                                className="w-3/5 items-center "
                                                type="file"
                                                accept=".csv"
                                                name="bulk_upload"
                                                value={data.bulkUpload}
                                                onChange={(e) =>
                                                    setData(e.target.files)
                                                }
                                            />
                                            <button
                                                className="flex rounded-lg bg-green-600 text-white px-6 py-2 w-fit h-fit"
                                                onClick={handleBulkUpload}
                                            >
                                                Upload Voters
                                            </button>
                                        </form>
                                    </div>
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
