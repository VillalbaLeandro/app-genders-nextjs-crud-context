"use client"
import { useEffect, useState } from "react";
import { useRoles } from "../../../../context/RolesContext"; // Importa el contexto de roles
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import ErrorsMessages from "@/components/ErrorsMessages";

function Page({ params }) {
    const { roles, createRole, updateRole } = useRoles(); // Usa el contexto de roles
    const router = useRouter();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();

    const [isSubmitting, setIsSubmitting] = useState(false); // Agrega estado para el estado de envío

    const onSubmit = handleSubmit(async (data) => {
        setIsSubmitting(true); // Indica que se está enviando

        try {
            if (params.id) {
                await updateRole(params.id, data); // Usa await para esperar la respuesta
                toast.success('Rol modificado correctamente');
            } else {
                await createRole(data.name, data.description);
                toast.success('Se creó el rol correctamente');
            }
            router.push("/");
        } catch (error) {
            toast.error('Ocurrió un error. Por favor, inténtalo de nuevo.'); // Muestra un mensaje de error
        } finally {
            setIsSubmitting(false); // Indica que se ha completado el envío (ya sea con éxito o error)
        }
    });

    useEffect(() => {
        if (params.id) {
            const roleFound = roles.find((role) => role.id === params.id);
            if (roleFound) {
                setValue("name", roleFound.name);
                setValue("description", roleFound.description);
            }
        }
    }, []);

    return (
        <form onSubmit={onSubmit} className="p-3 mb-2 bg-light text-dark mb-3  shadow-sm p-3 mb-5 bg-body rounded" style={{width: "18rem"}}
        >
            <label htmlFor="exampleFormControlInput1" className="form-label">Ingresar Rol</label>
            <input className="form-control " id="exampleFormControlInput1"
                placeholder="Ingrese un Rol" maxLength="20"
                {...register("name", { required: true })}
            />
            {errors.name && (
                <ErrorsMessages errors={errors.name} />
            )}
            <div className="mb-4"></div>
           
            <button type="submit" className="btn btn-outline-success mt-3" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Guardar"}
            </button>
        </form>
    );
}

export default Page;
