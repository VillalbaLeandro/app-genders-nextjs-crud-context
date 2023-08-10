import React from "react";

const ErrorsMessages = ({ errors }) => {
    return (
        <>
            {errors && (
                <span className="text-danger" >
                    Este campo es requerido
                </span>
            )}
        </>
    );
};

export default ErrorsMessages;
