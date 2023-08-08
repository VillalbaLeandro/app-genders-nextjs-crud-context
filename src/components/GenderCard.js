import { useRouter } from "next/navigation";
import { useGenders } from "../context/GendersContext";
import { toast } from "react-hot-toast";

export const GenderCard = ({ gender }) => {
    const router = useRouter()
    const { deleteGender } = useGenders()

    return (
        <div style={{ background: "#202020", color: "white" }}
            onClick={() =>
                router.push(`/edit/${gender.id}`)}
        >
            <h1>{gender.title}</h1>
            <button onClick={(e) => {
                //detiene la redireccion del elemento de atras
                e.stopPropagation()
                const accept = window.confirm("estas seguro de eliminar este genero?")
                if (accept) deleteGender(gender.id)
                toast.success("eliminado correctamemte")

            }} >
                Delete</button>
            <p>{gender.description}</p>
        </div>
    )
}