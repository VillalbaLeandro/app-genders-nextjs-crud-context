import { useRouter } from "next/navigation";
import { useUnidadRegional } from "../context/UnidadRegionalContext"; // Importar el contexto de Unidad Regional
import { toast } from "react-hot-toast";

export const UnidadRegionalCard = ({ unidadRegional }) => {
  const router = useRouter();
  const { deleteUnidadRegional } = useUnidadRegional(); // Usar la función deleteUnidadRegional del contexto

  const handleDelete = () => {
    const accept = window.confirm("¿Estás seguro de eliminar esta Unidad Regional?");
    if (accept) {
      deleteUnidadRegional(unidadRegional.id);
      toast.success("Unidad Regional eliminada correctamente");
    }
  };

  return (
    <div className="p-3 mx-auto my-3 bg-light text-dark shadow-sm p-3 bg-body rounded" style={{ width: "18rem" }}>
      <h4>Unidad Regional Nº {unidadRegional.number}</h4>
      <p className="overflow-auto" style={{ maxHeight: "6em" }}>{unidadRegional.location}</p>
      <div>
        <button className="btn btn-outline-danger me-2 pt-0" onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}>
          Delete
        </button>
        <button className="btn btn-outline-success pt-0" onClick={() => router.push(`pages/unidad-regional/edit/${unidadRegional.id}`)}>
          Edit
        </button>
      </div>
    </div>
  );
};
