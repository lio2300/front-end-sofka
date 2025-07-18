import {getErrorMessage} from "@app/Utils/errorMessages";

describe('getErrorMessage', () => {
  it('debe retornar string vacío si errors es null', () => {
    const result = getErrorMessage(null);
    expect(result).toBe('');
  });

  it('debe retornar mensaje para "required"', () => {
    const result = getErrorMessage({ required: true });
    expect(result).toBe('Este campo es obligatorio');
  });

  it('debe retornar mensaje para "minlength"', () => {
    const result = getErrorMessage({
      minlength: {
        requiredLength: 5,
        actualLength: 2
      }
    });
    expect(result).toBe('Mínimo 5 caracteres');
  });

  it('debe retornar mensaje para "maxlength"', () => {
    const result = getErrorMessage({
      maxlength: {
        requiredLength: 10,
        actualLength: 15
      }
    });
    expect(result).toBe('Máximo 10 caracteres');
  });

  it('debe retornar mensaje para "idExists"', () => {
    const result = getErrorMessage({ idExists: true });
    expect(result).toBe('El ID ya existe');
  });

  it('debe retornar mensaje para "releaseDate"', () => {
    const result = getErrorMessage({ releaseDate: true });
    expect(result).toBe('Fecha de lanzamiento inválida, debe ser igual o mayor a la fecha actual');
  });

  it('debe retornar mensaje para "revisionDate"', () => {
    const result = getErrorMessage({ revisionDate: true });
    expect(result).toBe('Fecha de revisión inválida');
  });

  it('debe retornar mensaje genérico si el error no está mapeado', () => {
    const result = getErrorMessage({ unknownError: true });
    expect(result).toBe('Campo inválido');
  });
});
