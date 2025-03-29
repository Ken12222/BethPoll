import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link, useForm, router } from "@inertiajs/react";
import presbylogo from "../../images/pcg_logo.png";
import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import React from "react";

// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableFooter,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "../components/ui/table";
import { redirect } from "react-router-dom";

export default function Dashboard({
    contestants,
    votesCount,
    totalVoteReached,
}) {
    const user = usePage().props.auth.user;
    const { data, setData, post, processing, errors, reset } = useForm({
        contestant_id: "",
        vote: 1,
    });

    //handle Export
    const exportPDF = () => {
        const input = document.getElementById("print-section");

        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            pdf.addImage(imgData, "PNG", 10, 10);
            pdf.save("data.pdf");
        });
    };

    //handle Print
    const handlePrint = () => {
        const printContents =
            document.getElementById("print-section").innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    };

    const handleVote = (e, contestantId) => {
        e.preventDefault();

        setData("contestant_id", contestantId);
        setData("vote", 1);

        post("/votes", {
            headers: {
                "Content-Type": "Application/json",
            },
        });
    };
    function handleLogout(e) {
        //e.preventDefault();

        post("logout");
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
                            <div className="w-full mt-8 flex justify-end mr-16 ">
                                <button
                                    onClick={exportPDF}
                                    className=" border mx-4 px-4 py-1 hover:bg-gray-50"
                                >
                                    Export
                                </button>
                                <button
                                    onClick={handlePrint}
                                    className="border mx-4 px-4 py-1 hover:bg-gray-50"
                                >
                                    Print
                                </button>
                            </div>

                            <div className="p-6 flex gap-4">
                                <div
                                    id="print-section"
                                    className="w-full  grid grid-cols my-8"
                                >
                                    <table className="w-full mx-4 mb-4">
                                        <tbody>
                                            <tr className="w-full ">
                                                <th className="text-left py-4 text-gray-400">
                                                    ID
                                                </th>
                                                <th className="text-left py-4 text-gray-400">
                                                    Image
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
                                            {console.log(contestants)}
                                            {Array.isArray(contestants) &&
                                            contestants.length > 0 ? (
                                                contestants.map(
                                                    (contestant) => (
                                                        <tr
                                                            key={contestant.id}
                                                            className="w-full border-b"
                                                        >
                                                            <td className="text-left py-2">
                                                                {contestant.id}
                                                            </td>
                                                            <td>
                                                                <img
                                                                    className="w-8 h-8 my-2"
                                                                    src={
                                                                        contestant.image
                                                                    }
                                                                    alt="contestant_profile"
                                                                />
                                                            </td>
                                                            <td>
                                                                {
                                                                    contestant.firstName
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    contestant.lastName
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    contestant
                                                                        .votes
                                                                        .length
                                                                }
                                                            </td>
                                                        </tr>
                                                    )
                                                )
                                            ) : (
                                                <p className="text-gray-400 flex justify-center p-4">
                                                    There are no Contestants Yet
                                                </p>
                                            )}
                                        </tbody>
                                    </table>
                                    {/* <Table>
                                        <TableCaption>
                                            Final Results From the Bethlehem
                                            Poll {date.getFullYear()}
                                        </TableCaption>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[100px]">
                                                    ID
                                                </TableHead>
                                                <TableHead>Image</TableHead>
                                                <TableHead>Firstname</TableHead>
                                                <TableHead>Lastname</TableHead>
                                                <TableHead className="text-left">
                                                    Votes Count
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {Array.isArray(contestants) &&
                                            contestants.length > 0 ? (
                                                contestants.map(
                                                    (contestant) => (
                                                        <TableRow
                                                            key={contestant.id}
                                                        >
                                                            <TableCell className="font-medium">
                                                                {contestant.id}
                                                            </TableCell>
                                                            <TableCell>
                                                                <img
                                                                    className="w-8 h-8 my-2"
                                                                    src={
                                                                        contestant.image
                                                                    }
                                                                    alt=""
                                                                />
                                                            </TableCell>
                                                            <TableCell className="font-medium">
                                                                {
                                                                    contestant.firstName
                                                                }
                                                            </TableCell>
                                                            <TableCell>
                                                                {
                                                                    contestant.lastName
                                                                }
                                                            </TableCell>

                                                            <TableCell>
                                                                {
                                                                    contestant
                                                                        .votes
                                                                        .length
                                                                }
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                )
                                            ) : (
                                                <p className="text-gray-400 flex justify-center p-4">
                                                    There are no Contestants Yet
                                                </p>
                                            )}
                                        </TableBody>

                                        <TableFooter>
                                            <TableRow>
                                                <TableCell>
                                                    Total Votes
                                                </TableCell>

                                                <TableCell className="text-right">
                                                    200
                                                </TableCell>
                                            </TableRow>
                                        </TableFooter>
                                    </Table> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        {totalVoteReached || votesCount == 10 ? (
                            <div className="flex justify-center items-center overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                <p className="text-green-400 flex justify-center p-8">
                                    Thank You for Voting
                                </p>
                                <button
                                    name="logout"
                                    className="h-fit bg-blue-400 px-4 py-2 text-white rounded-lg"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                <p className="text-blue-400 p-6">
                                    Kindly click the circle icon to select
                                    candidate and Proceed to Vote
                                </p>
                                <p className="text-red-400">
                                    {errors.errors && errors}
                                </p>
                                <p className="text-green-400">
                                    {errors.message && message}
                                </p>
                                <div className="grid grid-cols md:grid-cols-3">
                                    {Array.isArray(contestants) &&
                                    contestants.length > 0 ? (
                                        contestants.map((contestant) => (
                                            <div
                                                key={contestant.id}
                                                className="p-6"
                                            >
                                                {/* <img
                                                        className="w-auto h-36 mx-auto my-2"
                                                        src={contestant.image}
                                                        alt=""
                                                    /> */}
                                                <div className="flex items-center">
                                                    <input
                                                        className="mr-2"
                                                        type="radio"
                                                        name="contestant_id"
                                                        value={
                                                            data.contestant_id
                                                        }
                                                        onChange={(e) =>
                                                            setData({
                                                                ...data,
                                                                contestant_id:
                                                                    contestant.id,
                                                            })
                                                        }
                                                    />
                                                    <p>
                                                        {contestant.firstName}
                                                    </p>
                                                    <p>{contestant.lastName}</p>
                                                </div>

                                                {contestant.votes.filter(
                                                    (votes) =>
                                                        votes.contestant_id ===
                                                            contestant.id &&
                                                        votes.vote === 1 &&
                                                        votes.user_id ===
                                                            user.id
                                                ).length > 0 ? (
                                                    <span className="bg-gray-400 text-white px-4 py-1 flex justify-center">
                                                        Voted
                                                    </span>
                                                ) : (
                                                    <form
                                                        onSubmit={(e) =>
                                                            handleVote(
                                                                e,
                                                                contestant.id
                                                            )
                                                        }
                                                    >
                                                        <button className="bg-green-500 text-white px-4 py-1 w-full">
                                                            {processing
                                                                ? "Voting..."
                                                                : "Vote"}
                                                        </button>
                                                    </form>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-400">
                                            There are no contestants yet
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
