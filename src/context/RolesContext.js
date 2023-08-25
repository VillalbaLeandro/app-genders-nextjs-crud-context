"use client"

import React, { createContext, useContext, useState } from "react";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { v4 as uuid } from "uuid";

const RolesContext = createContext();

export function useRoles() {
    const context = useContext(RolesContext);
    if (!context) throw new Error("useRoles must be used within a provider");
    return context;
}

export function RolesProvider({ children }) {
    const [roles, setRoles] = useLocalStorage("roles", []);

    const createRole = (name, description) => {
        setRoles([...roles, { name, description, id: uuid() }]);
    };

    const deleteRole = (id) => {
        setRoles([...roles.filter((role) => role.id !== id)]);
    };

    const updateRole = (id, newData) => {
        setRoles([
            ...roles.map((role) =>
                role.id === id ? { ...role, ...newData } : role
            ),
        ]);
    };

    return (
        <RolesContext.Provider value={{ roles, createRole, deleteRole, updateRole }}>
            {children}
        </RolesContext.Provider>
    );
}
