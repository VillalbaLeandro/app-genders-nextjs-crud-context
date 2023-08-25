import { useRouter } from "next/navigation";
import { useGenders } from "../context/GendersContext";
import { toast } from "react-hot-toast";

export const GenderCard = ({ gender }) => {
    const router = useRouter()
    const { deleteGender } = useGenders()
    //creamos la funcion que pide confirmacion para eliminar y llama a la funcion deleteGender de GenderCard.js
    const handleDelete = () => {
        const accept = window.confirm("¿Estás seguro de eliminar este género?");
        if (accept) {
            deleteGender(gender.id);
            toast.success("Eliminado correctamente");
        }
    };

    return (
        <div className=" p-3 mx-auto my-3 bg-light text-dark   shadow-sm p-3  bg-body rounded" style={{width: "18rem"}}
         >
            <h4>{gender.title}</h4>
            <p className="overflow-auto" style={{ maxHeight: "6em" }}>{gender.description}</p>
            <div>

            <button className="btn btn-outline-danger me-2 pt-0" onClick={(e) => {
                e.stopPropagation();
                handleDelete(); 
            }}>
                Delete
            </button>
            <button className="btn btn-outline-success pt-0" 
            onClick={() => router.push(`pages/genders/edit/${gender.id}`)}>
                Edit
            </button>
            </div>
            
        </div>
    );
}