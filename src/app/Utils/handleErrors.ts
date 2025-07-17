import {HttpErrorResponse} from "@angular/common/http";

export class HandleErrors {

    constructor(protected errorResponse: HttpErrorResponse) {}

    /**
     * Crea un alerta con el mensaje de error y lo coloca antes del contenido principal
     * @param message - El mensaje de error a mostrar
     */
    createAlert(message: string): void {
        this.removeAlert();
        const firstDiv = document.createElement("div");
        firstDiv.id = "alert-message";
        firstDiv.classList.add("handler-error");
    /**
     * Remove the alert message element from the DOM.
     */
        firstDiv.innerText = message;
        const content = document.getElementById("layout-content")!;

        content.insertBefore(firstDiv, content.firstChild);
    }


    /**
     * Removes the alert message element from the DOM if it exists.
     */
    removeAlert(): void {
        const alert = document.getElementById("alert-message");
        if (alert) {
            alert.remove();
        }
    }

    /**
     * Returns an error message based on the HTTP status code.
     *
     * @param status - The HTTP status code of the error response.
     * @returns A string representing the error message:
     *          - "Error en la petición" for client errors (status 400-499).
     *          - "Error en el servidor" for server errors (status 500-599).
     *          - "Error desconocido" for other status codes.
     */
    getMessageError(status: number): string {
        if (status >= 400 && status < 500) {
            return "Error en la petición";
        }

        if (status >= 500 && status < 600) {
            return "Error en el servidor";
        }

        return "Error desconocido";
    }

    /**
     * Shows an alert message for the given duration.
     * @param msg the message to show. If not provided, it uses the error message
     *            based on the status code of the error response.
     * @example
     *  const handleErrors = new HandleErrors(errorResponse);
     *  handleErrors.showError();
     *  handleErrors.showError("Custom error message");
     */
    showError(msg: string = this.getMessageError(this.errorResponse.status)): void {
        this.createAlert(msg);

        setTimeout(() => {
            this.removeAlert();
        }, 5000);
    }
}
