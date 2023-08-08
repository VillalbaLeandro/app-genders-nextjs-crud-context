"use client"
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { createContext, useContext } from "react";
//generador de id´s
import { v4 as uuid } from "uuid";

//crear contexto
export const GenderContext = createContext();

export const useGenders = () => {
    const context = useContext(GenderContext)
    if (!context) throw new Error("useGenders must used within a provider")
    return context
}

//exportamos el proveedor de contexto para que sea accesible de manera global
export const GenderProvider = ({ children }) => {
    const [genders, setGenders] = useLocalStorage('genders', [])
    //crear genero
    const createGender = (title, description) => {
        setGenders([...genders, {
            title,
            description,
            id: uuid()
        }])
    }
    //eliminar genero
    const deleteGender = (id) => {
        setGenders([...genders.filter(gender => gender.id !== id)])
    }
    //editar genero
    const updateGender = (id, newData) => {
        //{...gender, ...updateGender} tomar la lista de generos que esta recorriendo(...gender)y la combinarlo con el nuevo objeto(...updatedGender)
        setGenders([...genders.map(gender =>
            gender.id === id ? { ...gender, ...newData } : gender)]);
    }
    //exportamos las funciones
    return <GenderContext.Provider value={{
        genders,
        createGender,
        deleteGender,
        updateGender
    }}>
        {children}
    </GenderContext.Provider>
}