import { useEffect, useState } from "react";
export function useLocalStorage(key, initialState) {
    const [state, setState] = useState(initialState);
    // se usa useeffect para que localstorage se use solamente del lado del cliente para evitar errores.

    useEffect(() => {
        const item = localStorage.getItem(key);
        if (item) {
            try {
                const parsedItem = JSON.parse(item);
                setState(parsedItem);
            } catch (error) {
                console.error("Error parsing localStorage item:", error);
            }
        }
    }, [key]); 
    
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [state]);
    return [state, setState];
}