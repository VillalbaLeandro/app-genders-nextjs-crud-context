"use client"


import { useEffect, useState } from "react";
import { useUnidadRegional } from "../../../../context/UnidadRegionalContext"; // Importar el contexto de Unidad Regional
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import ErrorsMessages from "@/components/ErrorsMessages";

function Page({ params }) {
  const { unidadesRegionales, createUnidadRegional, updateUnidadRegional } = useUnidadRegional();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false); // Agregar estado para el estado de envío

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true); // Indicar que se está enviando

    try {
      if (params.id) {
        await updateUnidadRegional(params.id, data); // Usar await para esperar la respuesta
        toast.success('Unidad Regional modificada correctamente');
      } else {
        await createUnidadRegional(data.numero, data.ubicacion); // Cambiar las propiedades según lo que necesites
        toast.success('Se creó la Unidad Regional correctamente');
      }
      router.push("/");
    } catch (error) {
      toast.error('Ocurrió un error. Por favor, inténtalo de nuevo.'); // Mostrar un mensaje de error
    } finally {
      setIsSubmitting(false); // Indicar que se ha completado el envío (ya sea con éxito o error)
    }
  });

  useEffect(() => {
    if (params.id) {
      const unidadRegionalFound = unidadesRegionales.find((unidadRegional) => unidadRegional.id === params.id);
      if (unidadRegionalFound) {
        setValue("numero", unidadRegionalFound.numero); // Cambiar "title" por "numero" y "description" por "ubicacion" según lo que necesites
        setValue("ubicacion", unidadRegionalFound.ubicacion); // Cambiar "title" por "numero" y "description" por "ubicacion" según lo que necesites
      }
    }
  }, []);

  return (
    <form onSubmit={onSubmit} className="p-3 mb-2 bg-light text-dark mb-3  shadow-sm p-3 mb-5 bg-body rounded" style={{ width: "18rem" }}>
      <label htmlFor="exampleFormControlInput1" className="form-label">Número de Unidad Regional</label>
      <input className="form-control " id="exampleFormControlInput1"
        placeholder="Ingrese el número de Unidad Regional"
        {...register("numero", { required: true })}
      />
      {errors.numero && (
        <ErrorsMessages errors={errors.numero} />
      )}
      <div className="mb-4"></div>
      <label htmlFor="exampleFormControlTextarea1" className="form-label">Ubicación</label>
      <textarea className="form-control" id="exampleFormControlTextarea1"
        placeholder="Ingrese la ubicación de la Unidad Regional"
        {...register("ubicacion", { required: true })}
      />
      {errors.ubicacion && (
        <ErrorsMessages errors={errors.ubicacion} />
      )}
      <button type="submit" className="btn btn-outline-success mt-3" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Guardar"}
      </button>
    </form>
  );
}

export default Page;
