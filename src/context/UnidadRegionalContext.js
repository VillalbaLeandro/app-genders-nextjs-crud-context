
"use client"

import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { createContext, useContext } from "react";
import { v4 as uuid } from "uuid";

export const UnidadRegionalContext = createContext(); // Cambiado a UnidadRegionalContext

export const useUnidadRegional = () => {
    const context = useContext(UnidadRegionalContext);
    if (!context) throw new Error("useUnidadRegional must be used within a provider");
    return context;
}

export const UnidadRegionalProvider = ({ children }) => {
    const [unidadesRegionales, setUnidadesRegionales] = useLocalStorage('unidadesRegionales', []);

    const createUnidadRegional = (number, location) => {
        setUnidadesRegionales([
            ...unidadesRegionales,
            {
                number,
                location,
                id: uuid()
            }
        ]);
    }

    const deleteUnidadRegional = (id) => {
        setUnidadesRegionales([...unidadesRegionales.filter(unidad => unidad.id !== id)]);
    }

    const updateUnidadRegional = (id, newData) => {
        setUnidadesRegionales([
            ...unidadesRegionales.map(unidad =>
                unidad.id === id ? { ...unidad, ...newData } : unidad
            )
        ]);
    }

    return (
        <UnidadRegionalContext.Provider value={{
            unidadesRegionales,
            createUnidadRegional,
            deleteUnidadRegional,
            updateUnidadRegional
        }}>
            {children}
        </UnidadRegionalContext.Provider>
    );
}
