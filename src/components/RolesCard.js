import { useRouter } from "next/navigation";
import { useRoles } from "../context/RolesContext";
import { toast } from "react-hot-toast";

export const RolCard = ({ rol }) => {
  const router = useRouter();
  const { deleteRole } = useRoles();

  const handleDelete = () => {
    const accept = window.confirm("¿Estás seguro de eliminar este Rol?");
    if (accept) {
      deleteRole(rol.id);
      toast.success("Eliminado correctamente");
    }
  };

  return (
    <div className=" p-3 mx-auto my-3 bg-light text-dark   shadow-sm p-3  bg-body rounded" style={{width: "18rem"}}>
      <h4>{rol.name}</h4> {/* Mostrar el título del rol */}
      <div>
        <button className="btn btn-outline-danger me-2 pt-0" onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}>
          Delete
        </button>
        <button className="btn btn-outline-success pt-0" onClick={() => router.push(`pages/roles/edit/${rol.id}`)}>
          Edit
        </button>
      </div>
    </div>
  );
};
