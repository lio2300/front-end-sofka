import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';

import { NewProductComponent } from './new-product.component';

import { FinancialProduct } from '@app/class/FinancialProduct';
import { FormProductService } from '@app/services/financial-product/form-product.service';
import { HttpProductService } from '@app/services/financial-product/http-product.service';

jest.mock('@app/Utils/handleErrors', () => {
  return {
    HandleErrors: jest.fn().mockImplementation(() => {
      return { showError: jest.fn() };
    }),
  };
});

const mockProduct: FinancialProduct = {
  id: 'trj-crd-1',
  name: 'Tarjeta de Crédito',
  description: 'Tarjeta de consumo',
  logo: 'logo.png',
  date_release: '2025-07-17',
  date_revision: '2026-07-17',
};

class MockFormProductService {
  loadingVerifyIdExitsProduct = false;
  createForm(): FormGroup {
    return new FormBuilder().group({
      id: [null, [Validators.required]],
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      logo: [null, [Validators.required]],
      date_release: [null, [Validators.required]],
      date_revision: [{ value: null, disabled: true }, [Validators.required]],
    });
  }
}

const mockHttpProductService = {
  retrieveProducts: jest.fn(),
  updateProduct: jest.fn(),
  saveProduct: jest.fn(),
};

const mockRouter = {
  navigate: jest.fn(),
};

const mockActivatedRoute = {
  snapshot: {
    params: { id: '' },
  },
};

describe('NewProductComponent', () => {
  let component: NewProductComponent;
  let fixture: ComponentFixture<NewProductComponent>;
  let formProductService: FormProductService;
  let httpProductService: HttpProductService;
  let router: Router;
  let route: ActivatedRoute;

  let retrieveProductsSubject: Subject<FinancialProduct[]>;
  let saveProductSubject: Subject<FinancialProduct>;
  let updateProductSubject: Subject<FinancialProduct>;

  beforeEach(async () => {
    mockActivatedRoute.snapshot.params.id = '';
    jest.clearAllMocks();

    retrieveProductsSubject = new Subject<FinancialProduct[]>();
    saveProductSubject = new Subject<FinancialProduct>();
    updateProductSubject = new Subject<FinancialProduct>();

    mockHttpProductService.retrieveProducts.mockReturnValue(retrieveProductsSubject.asObservable());
    mockHttpProductService.updateProduct.mockReturnValue(updateProductSubject.asObservable());
    mockHttpProductService.saveProduct.mockReturnValue(saveProductSubject.asObservable());

    await TestBed.configureTestingModule({
      declarations: [NewProductComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: FormProductService, useClass: MockFormProductService },
        { provide: HttpProductService, useValue: mockHttpProductService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewProductComponent);
    component = fixture.componentInstance;

    formProductService = TestBed.inject(FormProductService);
    httpProductService = TestBed.inject(HttpProductService);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Creation Mode (no ID in URL)', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should initialize the form for a new product', () => {
      expect(component.idProduct).toBe('');
      expect(component.formProduct.get('id')?.enabled).toBe(true);
      expect(httpProductService.retrieveProducts).not.toHaveBeenCalled();
    });

    it('should update date_revision when date_release changes', () => {
      const releaseDate = '2025-10-20';
      const expectedRevisionDate = '2026-10-20';

      component.formProduct.get('date_release')?.setValue(releaseDate);

      expect(component.formProduct.get('date_revision')?.value).toBe(expectedRevisionDate);
    });


    it('should call saveProduct on form submission and navigate', fakeAsync(() => {
      component.formProduct.setValue(mockProduct);
      expect(component.formProduct.valid).toBe(true);

      component.saveProduct();

      expect(component.loadingSaveProduct).toBe(true);
      expect(httpProductService.saveProduct).toHaveBeenCalledWith(mockProduct);
      expect(httpProductService.updateProduct).not.toHaveBeenCalled();

      saveProductSubject.next(mockProduct);
      saveProductSubject.complete();
      tick();

      expect(component.loadingSaveProduct).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(['/products']);
    }));
  });

  describe('Edit Mode (with ID in URL)', () => {
    beforeEach(() => {
      mockActivatedRoute.snapshot.params.id = 'trj-crd-1';
      fixture.detectChanges();
    });

    it('should fetch product data and patch the form', fakeAsync(() => {
      expect(component.loadingSaveProduct).toBe(true);

      retrieveProductsSubject.next([mockProduct]);
      retrieveProductsSubject.complete();
      tick();

      expect(httpProductService.retrieveProducts).toHaveBeenCalledWith('trj-crd-1');
      expect(component.formProduct.get('id')?.disabled).toBe(true);
      expect(component.formProduct.get('name')?.value).toBe(mockProduct.name);
      expect(component.loadingSaveProduct).toBe(false);
    }));

    it('should navigate away if product is not found', fakeAsync(() => {
      retrieveProductsSubject.next([]);
      retrieveProductsSubject.complete();
      tick();

      expect(router.navigate).toHaveBeenCalledWith(['/financial-product']);
    }));

    it('should call updateProduct on form submission and navigate', fakeAsync(() => {
      retrieveProductsSubject.next([mockProduct]);
      retrieveProductsSubject.complete();
      tick();

      const updatedProduct = { ...component.formProduct.getRawValue(), name: 'Nueva Tarjeta' };
      component.formProduct.patchValue({ name: 'Nueva Tarjeta' });

      expect(component.formProduct.valid).toBe(true);

      component.saveProduct();

      expect(component.loadingSaveProduct).toBe(true);
      expect(httpProductService.updateProduct).toHaveBeenCalledWith(updatedProduct);
      expect(httpProductService.saveProduct).not.toHaveBeenCalled();

      updateProductSubject.next(updatedProduct);
      updateProductSubject.complete();
      tick();

      expect(component.loadingSaveProduct).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(['/products']);
  }));
  });
});
