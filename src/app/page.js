"use client"
import React from "react";
import { useGenders } from '../context/GendersContext';
import { GenderCard } from "../components/GenderCard";
import { SelectOptionGenders } from "@/components/SelectOptionGenders";

function Page() {
  const { genders } = useGenders();

  if (genders.length === 0) {
    return (
      <div className="d-flex flex-column align-items-center mt-3">
        <p>No hay géneros cargados. Por favor, cargue algún género.</p>
      </div>
    );
  }

  return (
    <>
        <div className="d-flex align-items-center mt-3">
        <select className="form-select" aria-label="Default select example">
          <option value="">Seleccione un genero</option> {/* Opción por defecto */}
          {genders.map((gender) => (
            <SelectOptionGenders gender={gender} key={gender.id}> {gender.title} </SelectOptionGenders>
          ))}
        </select>
      </div>
      <div className="container d-flex flex-wrap  m-3">
        {genders.map((gender) => (
          <GenderCard gender={gender} key={gender.id}></GenderCard>
        ))}
      </div>
    
    </>
  );
}

export default Page;
