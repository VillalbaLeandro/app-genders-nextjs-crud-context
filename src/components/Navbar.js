import { useRouter } from "next/navigation"
import Link from "next/link";
import { useGenders } from "../context/GendersContext";

export function Navbar() {
    const router = useRouter()
    const {genders} = useGenders()
    return (
        <header className="navbar bg-dark border-bottom border-body d-flex justify-content-around mb-5" data-bs-theme="dark">
            <Link className="text-decoration-none" href="/">
                <h1  > Gender App </h1>
                <span> {genders.length} Genders </span>
            </Link>

            <div>
                <button className="btn btn-outline-primary"
                    onClick={() => router.push("/new")}>
                    Add Gender
                </button>
            </div>
        </header>
    )
}
