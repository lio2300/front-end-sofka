import { TestBed } from '@angular/core/testing';

import { FormProductService } from './form-product.service';

describe('FormProductService', () => {
  let service: FormProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
