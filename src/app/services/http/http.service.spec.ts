import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { HttpService, IHttpResponse } from './http.service';
import { HandleErrors } from '@app/Utils/handleErrors';
import { environment } from '../../../environments/environment.dev';

jest.mock('@app/Utils/handleErrors', () => {
  return {
    HandleErrors: jest.fn().mockImplementation(() => {
    
      return { showError: jest.fn() };
    }),
  };
});

describe('HttpService', () => {
  let service: HttpService;
  let httpTestingController: HttpTestingController;

  const testUrl = 'test-endpoint';
  const fullApiUrl = `${environment.apiURL}bp/${testUrl}`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService],
    });

    service = TestBed.inject(HttpService);
    httpTestingController = TestBed.inject(HttpTestingController);

    jest.clearAllMocks();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('GET requests', () => {
    it('should perform a GET request to the correct URL', () => {
      const mockResponse: IHttpResponse<{ id: number }> = { data: { id: 1 } };

      service.get(testUrl).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpTestingController.expectOne(fullApiUrl);
      expect(req.request.method).toBe('GET');

      req.flush(mockResponse);
    });
  });

  describe('POST requests', () => {
    it('should perform a POST request with the correct URL and body', () => {
      const mockData = { name: 'Test Product' };
      const mockResponse: IHttpResponse<{ name: string }> = { data: mockData };

      service.post(testUrl, mockData).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpTestingController.expectOne(fullApiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockData);

      req.flush(mockResponse);
    });
  });

  describe('PUT requests', () => {
    it('should perform a PUT request with the correct URL and body', () => {
      const mockData = { id: 1, name: 'Updated Product' };
      const mockResponse: IHttpResponse<{ id: number; name: string }> = { data: mockData };

      service.put(testUrl, mockData).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpTestingController.expectOne(fullApiUrl);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(mockData);

      req.flush(mockResponse);
    });
  });

  describe('DELETE requests', () => {
    it('should perform a DELETE request to the correct URL', () => {
      const mockResponse: IHttpResponse<unknown> = { data: 'Product deleted' };

      service.delete(testUrl).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpTestingController.expectOne(fullApiUrl);
      expect(req.request.method).toBe('DELETE');

      req.flush(mockResponse);
    });
  });

  describe('PATCH requests', () => {
    it('should perform a PATCH request with the correct URL and body', () => {
        const partialData = { name: 'Patched Name' };
        const mockResponse: IHttpResponse<unknown> = { data: 'Patched successfully' };

        service.patch(testUrl, partialData).subscribe(response => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpTestingController.expectOne(fullApiUrl);
        expect(req.request.method).toBe('PATCH');
        expect(req.request.body).toEqual(partialData);

        req.flush(mockResponse);
    });
  });

  describe('Error Handling', () => {
    it('handleError should instantiate HandleErrors and call showError', () => {
        const mockError = new HttpErrorResponse({ status: 500 });

        service.handleError(mockError).subscribe({
            error: () => {
                expect(HandleErrors).toHaveBeenCalledWith(mockError);
                
                const mockHandleErrorsInstance = (HandleErrors as jest.Mock).mock.instances[0];
                expect(mockHandleErrorsInstance.showError).toHaveBeenCalled();
            }
        });
    });
  });
});
