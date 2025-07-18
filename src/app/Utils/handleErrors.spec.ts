import { HttpErrorResponse } from '@angular/common/http';
import { HandleErrors } from './handleErrors';

describe('HandleErrors', () => {
  let handleErrors: HandleErrors;
  const mockErrorResponse = new HttpErrorResponse({ status: 500 });

  beforeEach(() => {
    document.body.innerHTML = '<div id="layout-content"></div>';
    handleErrors = new HandleErrors(mockErrorResponse);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('createAlert', () => {
    it('should create an alert div with the correct properties and insert it into the DOM', () => {
      const message = 'Test error message';
      handleErrors.createAlert(message);

      const alertElement = document.getElementById('alert-message');

      expect(alertElement).not.toBeNull();
      expect(alertElement?.tagName).toBe('DIV');
      expect(alertElement?.classList.contains('handler-error')).toBe(true);
      expect(alertElement?.innerText).toBe(message);

      const contentElement = document.getElementById('layout-content');
      expect(contentElement?.firstChild).toBe(alertElement);
    });

    it('should remove an existing alert before creating a new one', () => {
      handleErrors.createAlert('First message');
      const firstAlert = document.getElementById('alert-message');
      expect(firstAlert).not.toBeNull();

      handleErrors.createAlert('Second message');
      const secondAlert = document.getElementById('alert-message');

      expect(document.querySelectorAll('#alert-message').length).toBe(1);
      expect(secondAlert?.innerText).toBe('Second message');
    });
  });

  describe('removeAlert', () => {
    it('should remove the alert element if it exists', () => {
      handleErrors.createAlert('A message');
      let alertElement = document.getElementById('alert-message');
      expect(alertElement).not.toBeNull();

      handleErrors.removeAlert();
      alertElement = document.getElementById('alert-message');
      expect(alertElement).toBeNull();
    });

    it('should not throw an error if the alert element does not exist', () => {
      expect(() => handleErrors.removeAlert()).not.toThrow();
    });
  });

  describe('getMessageError', () => {
    it('should return "Error en la petición" for 4xx status codes', () => {
      expect(handleErrors.getMessageError(400)).toBe('Error en la petición');
      expect(handleErrors.getMessageError(404)).toBe('Error en la petición');
      expect(handleErrors.getMessageError(499)).toBe('Error en la petición');
    });

    it('should return "Error en el servidor" for 5xx status codes', () => {
      expect(handleErrors.getMessageError(500)).toBe('Error en el servidor');
      expect(handleErrors.getMessageError(503)).toBe('Error en el servidor');
      expect(handleErrors.getMessageError(599)).toBe('Error en el servidor');
    });

    it('should return "Error desconocido" for other status codes', () => {
      expect(handleErrors.getMessageError(200)).toBe('Error desconocido');
      expect(handleErrors.getMessageError(302)).toBe('Error desconocido');
      expect(handleErrors.getMessageError(0)).toBe('Error desconocido');
    });
  });

  describe('showError', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.spyOn(global, 'setTimeout');
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should call createAlert with a default message based on the error status', () => {
      const createAlertSpy = jest.spyOn(handleErrors, 'createAlert');
      const defaultMessage = handleErrors.getMessageError(mockErrorResponse.status);

      handleErrors.showError();

      expect(createAlertSpy).toHaveBeenCalledWith(defaultMessage);
    });

    it('should call createAlert with the provided custom message', () => {
      const createAlertSpy = jest.spyOn(handleErrors, 'createAlert');
      const customMessage = 'This is a custom error';

      handleErrors.showError(customMessage);

      expect(createAlertSpy).toHaveBeenCalledWith(customMessage);
    });
  });
});
