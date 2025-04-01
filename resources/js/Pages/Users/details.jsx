import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, router } from "@inertiajs/react";

export default function showUser({ member }) {
    function handleDelete(id) {
        router.delete(`/users/${id}`);
    }
    return (
        <main>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Candidate Details
                    </h2>
                }
            >
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-4">
                            {member ? (
                                <div className="flex gap-4">
                                    <div>
                                        <div className="flex mb-4">
                                            <p className="text-gray-400 mr-2">
                                                Name:
                                            </p>
                                            <p className="font-bold text-2xl">
                                                {member.name}
                                            </p>
                                        </div>
                                        <div className="flex mb-4">
                                            <p className="text-gray-400 mr-2">
                                                Role:
                                            </p>
                                            {member.role}
                                        </div>
                                        {/* <Link
                                            href={route("contestant.destroy", {
                                                id: member.id,
                                            })}
                                            method="delete"
                                            className="text-white bg-red-500 rounded-lg p-2 h-fit mr-4"
                                        >
                                            Delete
                                        </Link> */}
                                        <div className="flex items-center gap-4 ">
                                            <form
                                                onSubmit={() =>
                                                    handleDelete(member.id)
                                                }
                                            >
                                                <button className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 my-2 rounded-lg duration-500">
                                                    Delete
                                                </button>
                                            </form>

                                            <Link
                                                href={`/users/${member.id}/edit`}
                                                className="text-white bg-blue-500 rounded-lg p-2 h-fit"
                                            >
                                                Update Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-400">
                                    There are no details for this member
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
            ;
        </main>
    );
}
