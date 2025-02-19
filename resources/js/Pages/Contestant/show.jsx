import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

export default function showCotestant({ contestant }) {
    {
        console.log(contestant);
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
                            {contestant ? (
                                <div className="flex gap-4">
                                    <img
                                        className="w-36 h-36 mx-4"
                                        src=""
                                        alt=""
                                    />
                                    <div>
                                        <div className="flex">
                                            <p className="text-gray-400">
                                                Name:
                                            </p>
                                            <p>
                                                {" "}
                                                {contestant.firstName}{" "}
                                                {contestant.lastName}
                                            </p>
                                        </div>
                                        <div className="flex">
                                            <p className="text-gray-400">
                                                Position:
                                            </p>
                                            <p> {contestant.position}</p>
                                        </div>
                                    </div>
                                    <Link
                                        href={route("contestant.destroy", {
                                            id: contestant.id,
                                        })}
                                        method="delete"
                                        className="text-white bg-red-500 rounded-lg p-2 h-fit"
                                    >
                                        Remove Candidate
                                    </Link>
                                    <Link
                                        href="/contestants/edit"
                                        className="text-white bg-blue-500 rounded-lg p-2 h-fit"
                                    >
                                        Update Details
                                    </Link>
                                </div>
                            ) : (
                                <p className="text-gray-400">
                                    There are no contestants with this id
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
