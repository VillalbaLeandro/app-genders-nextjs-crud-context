"use client"
import { useEffect, useState } from "react";
import { useGenders } from "../../context/GendersContext";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import ErrorsMessages from "@/components/ErrorsMessages";

function Page({ params }) {
    const { genders, createGender, updateGender } = useGenders();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();

    const [isSubmitting, setIsSubmitting] = useState(false); // Agregamos estado para el estado de envío

    const onSubmit = handleSubmit(async (data) => {
        setIsSubmitting(true); // Indicar que se está enviando

        try {
            if (params.id) {
                await updateGender(params.id, data); // Usamos await para esperar la respuesta
                toast.success('Género modificado correctamente');
            } else {
                await createGender(data.title, data.description);
                toast.success('Se creó el género correctamente');
            }
            router.push("/");
        } catch (error) {
            toast.error('Ocurrió un error. Por favor, inténtalo de nuevo.'); // Mostramos un mensaje de error
        } finally {
            setIsSubmitting(false); // Indicar que se ha completado el envío (ya sea con éxito o error)
        }
    });

    useEffect(() => {
        if (params.id) {
            const genderFound = genders.find((gender) => gender.id === params.id);
            if (genderFound) {
                setValue("title", genderFound.title);
                setValue("description", genderFound.description);
            }
        }
    }, []);

    return (
        <form onSubmit={onSubmit} className="p-3 mb-2 bg-light text-dark mb-3  shadow-sm p-3 mb-5 bg-body rounded" style={{width: "18rem"}}
        >
            <label htmlFor="exampleFormControlInput1" className="form-label">Ingresar Género</label>
            <input className="form-control " id="exampleFormControlInput1"
                placeholder="Ingrese un Género"
                {...register("title", { required: true })}
            />
            {errors.title && (
                <ErrorsMessages  errors={errors.title}/>
            )}
            <div className="mb-4"></div>
            <label htmlFor="exampleFormControlTextarea1 " className="form-label">Descripción</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                placeholder="Ingrese descripción del género"
                {...register("description", { required: true })}
            />
            {errors.description && (
                <ErrorsMessages errors={errors.description}/>

            )}
            <button type="submit" className="btn btn-outline-success mt-3" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Guardar"}
            </button>
        </form>
    );
}

export default Page;
