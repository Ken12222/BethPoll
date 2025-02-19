import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link, useForm } from "@inertiajs/react";
import presbylogo from "../../images/pcg_logo.png";
import { useState } from "react";

export default function Dashboard({ contestants, votes }) {
    const user = usePage().props.auth.user;
    const { data, setData, post, processing, errors, reset } = useForm({
        contestant_id: "",
        vote: 0,
    });
    //sconst [vote, setVote] = useState(false);
    {
        console.log(votes);
    }

    function handleVote(e) {
        e.preventDefault();

        post("/votes");
    }
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Welcome, {user.name}
                </h2>
            }
        >
            <Head title="Dashboard" />
            {user.role === "admin" ? (
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6">admin Logged in</div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <p className="text-gray-400 p-6">
                                Vote Your Presidential Candidate
                            </p>
                            <div className="grid grid-cols md:grid-cols-3">
                                {Array.isArray(contestants) &&
                                contestants.length > 0 ? (
                                    contestants.map((contestant) =>
                                        contestant.position === "President" ? (
                                            <div
                                                key={contestant.id}
                                                className="p-6"
                                            >
                                                <img
                                                    className="w-36 h-36 mx-auto my-2"
                                                    src={presbylogo}
                                                    alt=""
                                                />
                                                <div className="flex">
                                                    <p>
                                                        {contestant.firstName}
                                                    </p>
                                                    <p>{contestant.lastName}</p>
                                                </div>
                                                <p className="text-gray-400">
                                                    {contestant.position}
                                                </p>

                                                {/* Toast message */}
                                                <form onSubmit={handleVote}>
                                                    <input
                                                        type="hidden"
                                                        value={
                                                            (data.contestant_id =
                                                                contestant.id)
                                                        }
                                                        // onChange={(e) =>
                                                        //     setData({
                                                        //         ...data,
                                                        //         contestant_id:
                                                        //             contestant.id,
                                                        //     })
                                                        // }
                                                    />

                                                    <input
                                                        type="hidden"
                                                        value={
                                                            !data.vote
                                                                ? (data.vote =
                                                                      !data.vote)
                                                                : ""
                                                        }
                                                        // onChange={(e) =>
                                                        //     setData({
                                                        //         ...data,
                                                        //         vote: vote
                                                        //             ? vote ===
                                                        //               !vote
                                                        //             : "",
                                                        //     })
                                                        // }
                                                    />
                                                    <button className="bg-green-500 text-white w-full px-4 py-1 ">
                                                        Vote
                                                    </button>
                                                </form>
                                            </div>
                                        ) : (
                                            ""
                                        )
                                    )
                                ) : (
                                    <p className="text-gray-400">
                                        There are no contestants yet
                                    </p>
                                )}
                            </div>

                            {/* Vice President */}
                            <p className="text-gray-400 p-6">
                                Vote Your Vice Presidential
                            </p>
                            <div className="grid grid-cols md:grid-cols-3">
                                {Array.isArray(contestants) &&
                                contestants.length > 0 ? (
                                    contestants.map((contestant) =>
                                        contestant.position ===
                                        "Vice President" ? (
                                            <div
                                                key={contestant.id}
                                                className="p-6"
                                            >
                                                <img
                                                    className="w-36 h-36 mx-auto my-2"
                                                    src={presbylogo}
                                                    alt=""
                                                />
                                                <div className="flex">
                                                    <p>
                                                        {contestant.firstName}
                                                    </p>
                                                    <p>{contestant.lastName}</p>
                                                </div>
                                                <p className="text-gray-400">
                                                    {contestant.position}
                                                </p>
                                                <button className="bg-green-500 text-white px-4 py-1 w-full">
                                                    Vote
                                                </button>
                                            </div>
                                        ) : (
                                            ""
                                        )
                                    )
                                ) : (
                                    <p className="text-gray-400">
                                        There are no candidates yet
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
