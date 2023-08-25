"use client"

import { useRouter } from "next/navigation"
import Link from "next/link";
import { useGenders } from "../context/GendersContext";

export function Navbar() {
    const router = useRouter()
    const {genders} = useGenders()
    return (
        <header className="navbar bg-dark border-bottom border-body d-flex justify-content-around mb-5" data-bs-theme="dark">
            <Link className="text-decoration-none" href="/">
                <h1>  App ¿? </h1>
            </Link>

            <div>
                <button className="btn btn-outline-primary m-3 "
                    onClick={() => router.push("/pages/genders/new")}>
                    Add Gender
                </button>
                <button className="btn btn-outline-primary m-3"
                    onClick={() => router.push("/pages/roles/new")}>
                    Add Rol
                </button>
                <button className="btn btn-outline-primary m-3"
                    onClick={() => router.push("/pages/unidad-regional/new")}>
                    Add unidad regional
                </button>
            </div>
        </header>
    )
}
