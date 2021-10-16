import { TestBed } from '@angular/core/testing';

import { AuthnticationInterceptor } from './authntication.interceptor';

describe('AuthnticationInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthnticationInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthnticationInterceptor = TestBed.inject(AuthnticationInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
