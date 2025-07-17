import {ValidationErrors} from "@angular/forms";

export const getErrorMessage = (errors: ValidationErrors | null): string =>{
    if (!errors) {
        return "";
    }

    if (errors["required"]) {
        return "Este campo es obligatorio";
    }
    if (errors["minlength"]) {
        return `Mínimo ${errors["minlength"].requiredLength} caracteres`;
    }
    if (errors["maxlength"]) {
        return `Máximo ${errors["maxlength"].requiredLength} caracteres`;
    }
    if (errors["idExists"]) {
        return "El ID ya existe";
    }
    if (errors["releaseDate"]) {
        return "Fecha de lanzamiento inválida";
    }
    if (errors["revisionDate"]) {
        return "Fecha de revisión inválida";
    }

    return "Campo inválido";
};
