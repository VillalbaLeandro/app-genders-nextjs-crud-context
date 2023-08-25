"use client"

import React from "react";
import { useGenders } from '../context/GendersContext';
import { useRoles } from '../context/RolesContext'; // Importar el contexto de roles
import { useUnidadRegional } from '../context/UnidadRegionalContext';
import { GenderCard } from "../components/GenderCard";
import { SelectOptions } from "@/components/SelectOptions";
import { RolCard } from "@/components/RolesCard";
import { UnidadRegionalCard } from "../components/UnidadRegionalCard";

function Page() {
  const { genders } = useGenders();
  const { roles } = useRoles(); // Obtener los roles del contexto de roles
  const { unidadesRegionales } = useUnidadRegional()

  if (genders.length === 0 && roles.length === 0 && unidadesRegionales.length === 0) {
    return (
      <div className="d-flex flex-column align-items-center mt-3">
        <p>No hay géneros cargados. Por favor, cargue algún género.</p>
      </div>
    );
  }

  return (
    <>

      <div className="container p-3 mx-auto my-3 bg-light text-dark   shadow-sm p-3  bg-body rounded" style={{ width: "60rem" }}>
        <div className="d-flex align-items-center mt-3">
          <select className="form-select me-3" aria-label="Seleccione un género">
            <option value="">Seleccione un género</option>
            {genders.map((gender) => (
              <SelectOptions key={gender.id} value={gender.title} label={gender.title} />
            ))}
          </select>
          <select className="form-select" aria-label="Seleccione un rol">
            <option value="">Seleccione un rol</option>
            {roles.map((role) => (
              <SelectOptions key={role.id} value={role.name} label={role.name} />
            ))}
          </select>
       
          

        </div>
        <div className="d-flex align-items-center mt-3">
          <select className="form-select" aria-label="Seleccione una unidad regional">
            <option value="">Seleccione una unidad regional</option>
            {unidadesRegionales.map((unidadRegional) => (
              <SelectOptions key={unidadRegional.id} value={unidadRegional.number} label={`Unidad Regional ${unidadRegional.number}`} />
            ))}
          </select>
        </div>
      </div>
      <div className="container p-3 mx-auto my-3 bg-success text-dark   shadow-sm p-3  bg-body rounded" style={{ width: "60rem" }}  >
        <div className="mt-4"><h4>Genders</h4></div>
        <span> {genders.length} Genders </span>

        <div className="container d-flex flex-wrap">
          {genders.map((gender) => (
            <GenderCard gender={gender} key={gender.id} />
          ))}
        </div>
        <div className="mt-4"><h4>Roles</h4></div>
        <span> {roles.length} Roles </span>

        <div className="container d-flex flex-wrap">
          {roles.map((rol) => (
            <RolCard value={rol.name} rol={rol} key={rol.id} />
          ))}
        </div>




        <div className="mt-4"><h4>Unidades Regionales</h4></div>
        <span> {unidadesRegionales.length} Unidades Regionales </span>

        <div className="container d-flex flex-wrap">
          {unidadesRegionales.map((unidadRegional) => (
            <UnidadRegionalCard value={unidadRegional.name} unidadRegional={unidadRegional} key={unidadRegional.id} />
          ))}
        </div>
      </div>

    </>
  );
}

export default Page;
