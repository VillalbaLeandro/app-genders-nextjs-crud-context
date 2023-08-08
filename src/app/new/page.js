"use client"
import { useEffect } from "react";
import { useGenders } from "../../context/GendersContext";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";


function Page({ params }) {
    const { genders, createGender, updateGender } = useGenders();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();

    const onSubmit = handleSubmit((data) => {
        if (params.id) {
            updateGender(params.id, data);
            toast.success('Genero modificado correctamente')

        } else {
            createGender(data.title, data.description);
            toast.success('se creo el genero correctamente')
        }
        router.push("/");
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
        <form onSubmit={onSubmit}>
            <input
                placeholder="Ingrese un Genero"
                {...register("title", { required: true })}
            />
            {errors.title && (
                <span>
                    Este campo es requerido
                </span>
            )}
            <textarea
                placeholder="Ingrese descripcion del genero"
                {...register("description", { required: true })}
            />
            {errors.description && (
                <span>
                    Este campo es requerido
                </span>
            )}
            <button>Guardar</button>
        </form>
    );
}

export default Page;