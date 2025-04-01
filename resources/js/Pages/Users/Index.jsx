import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, usePage, useForm, router } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function UserIndex({ users }) {
    const user = usePage().props.auth.user;
    const [searchContestant, setSearchContestant] = useState("");
    const { data, setData, post, processing, errors } = useForm("");
    const [queryFn, setQueryFn] = useState("");

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

    function handleDelete(id) {
        router.delete(`/users/${id}`);
    }

    return (
        <>
            <AuthenticatedLayout>
                {/* Admin Logged in view */}
                {user.role === "admin" ? (
                    <div className="py-12">
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                <div className="flex mx-auto px-4 items-center justify-between">
                                    <form className="flex items-center">
                                        <input
                                            className="w-80 border-0 bg-gray-100 my-4 rounded-lg"
                                            type="text"
                                            placeholder="Search a member by name"
                                            name="query"
                                            value={data.query}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    query: e.target.value,
                                                })
                                            }
                                        />
                                        <div>
                                            <button className="ml-4">
                                                Search
                                            </button>
                                            <button className="ml-8 border-2 border-gray-300 px-4 py-2 rounded-lg">
                                                Clear Search
                                            </button>
                                        </div>
                                    </form>

                                    <div className="flex">
                                        <Link
                                            className="rounded-lg duration-500 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2"
                                            href="/users/create"
                                        >
                                            Add Voter
                                        </Link>
                                        {/* <form className="flex justify-end items-center">
                                            <input
                                                className="w-3/5 items-center "
                                                type="file"
                                                accept=".csv"
                                                name="file"
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
                                            <p>{errors && errors.error}</p>
                                        </form> */}
                                    </div>
                                </div>

                                <table className="w-full mx-4 mb-4">
                                    <tbody>
                                        <tr className="w-full ">
                                            <th className="text-left py-4 text-gray-400">
                                                ID
                                            </th>
                                            <th className="text-left py-4 text-gray-400">
                                                Name
                                            </th>
                                            <th className="text-left py-4 text-gray-400">
                                                Membership ID
                                            </th>
                                            <th className="text-left py-4 text-gray-400">
                                                Votes Casted
                                            </th>
                                            <th className="text-left py-4 text-gray-400">
                                                Action
                                            </th>
                                        </tr>
                                        {Array.isArray(users) &&
                                        users.length > 0 ? (
                                            users.map((user) => (
                                                <tr
                                                    key={user.id}
                                                    className="w-full border-b"
                                                >
                                                    <td className="text-left py-2">
                                                        {user.id}
                                                    </td>
                                                    <td>{user.name}</td>
                                                    <td>
                                                        {user.membership_id}
                                                    </td>
                                                    <td>{user.vote_count}</td>
                                                    <td>
                                                        <Link
                                                            href={`/users/${user.id}`}
                                                            className="bg-green-600 hover:bg-green-500 rounded-lg duration-500 text-white px-4 py-2"
                                                        >
                                                            View
                                                        </Link>
                                                    </td>
                                                    <td className="flex justify-center">
                                                        <form
                                                            onSubmit={() =>
                                                                handleDelete(
                                                                    user.id
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
                    <p className="text-gray-400 flex justify-center p-4">
                        You are not allowed to view this page
                    </p>
                )}
            </AuthenticatedLayout>
        </>
    );
}
