import {HttpErrorResponse} from "@angular/common/http";

export class HandleErrors {

    constructor(protected errorResponse: HttpErrorResponse) {}

    createAlert(message: string): void {
        const firstDiv = document.createElement("div");
        firstDiv.id = "alert-message";
        firstDiv.classList.add("handler-error");
        firstDiv.innerText = message;
        const content = document.getElementById("layout-content")!;

        content.insertBefore(firstDiv, content.firstChild);
    }

    removeAlert(): void {
        const alert = document.getElementById("alert-message");
        if (alert) {
            alert.remove();
        }
    }

    getMessageError(status: number): string {
        if (status >= 400 && status < 500) {
            return "Error en la petición";
        }

        if (status >= 500 && status < 600) {
            return "Error en el servidor";
        }

        return "Error desconocido";
    }

    showError(): void {
        this.createAlert(this.getMessageError(this.errorResponse.status));

        setTimeout(() => {
            this.removeAlert();
        }, 5000);
    }
}
