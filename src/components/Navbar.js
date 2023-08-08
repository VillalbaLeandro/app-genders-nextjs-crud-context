import { useRouter } from "next/navigation"
import Link from "next/link";

export function Navbar() {
    const router = useRouter()
    return (
        <header>
            <Link href="/">
                <h1> Gender App </h1>
            </Link>
            <div>
                <button
                    onClick={() => router.push("/new")}>
                    Add Gender
                </button>
            </div>
        </header>
    )
}
