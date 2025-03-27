import { Head, Link } from "@inertiajs/react";
import presby_logo from "../../images/pcg_logo.png";
import bgImage from "../../images/bgg.jpg";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    return (
        <div
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                width: "100vw",
            }}
        >
            <header className="w-5/6 mx-auto grid items-center gap-2 py-10">
                <nav className="-mx-3 flex flex-1 justify-end">
                    {auth.user ? (
                        <div className="flex justify-between w-full mx-auto">
                            <Link
                                href={route("dashboard")}
                                className="rounded-md  px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] text-black"
                            >
                                BethPoll
                            </Link>
                            <p>Hello</p>
                        </div>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="rounded-md px-3 py-2 text-white bg-blue-800 ring-1 ring-transparent transition hover:text-white/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white "
                            >
                                Log in
                            </Link>
                            {/* <Link
                                href={route("register")}
                                className="rounded-md px-3 py-2 text-white ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                            >
                                Register
                            </Link> */}
                        </>
                    )}
                </nav>
                <h1 className="flex justify-center text-2xl text-white">
                    Welcome to The Bethlehem Presby
                </h1>
                <h1 className="flex justify-center text-xl text-white">
                    Vote Portal
                </h1>
                <img
                    className="w-100 h-100 mx-auto my-auto"
                    src={presby_logo}
                    alt="presby_logo"
                />
            </header>
        </div>
    );
}
