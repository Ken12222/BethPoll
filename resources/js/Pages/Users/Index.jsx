import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, usePage, useForm } from "@inertiajs/react";
import { useState } from "react";

// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableFooter,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "../../components/ui/table";

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
                                        </form>
                                    </div>
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
                                                Votes Count
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
                                                </tr>
                                            ))
                                        ) : (
                                            <p className="text-gray-400 flex justify-center p-4">
                                                There are no Contestants Yet
                                            </p>
                                        )}
                                    </tbody>
                                </table>

                                {/* <Table>
                                    <TableCaption className="mb-4">
                                        Voters For the 2025 Bethlehem
                                        Congregation Elections
                                    </TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">
                                                ID
                                            </TableHead>
                                            <TableHead>Voter Name</TableHead>
                                            <TableHead>Membership ID</TableHead>

                                            <TableHead className="text-left">
                                                Votes Cast
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Array.isArray(users) &&
                                        users.length > 0 ? (
                                            users.map((user) => (
                                                <TableRow key={user.id}>
                                                    <TableCell className="font-medium">
                                                        {user.id}
                                                    </TableCell>

                                                    <TableCell className="font-medium">
                                                        {user.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {user.membership_id}
                                                    </TableCell>

                                                    <TableCell>
                                                        {user.vote_count}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <p className="text-gray-400 flex justify-center p-4">
                                                There are no Contestants Yet
                                            </p>
                                        )}
                                    </TableBody>
                                </Table> */}
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
