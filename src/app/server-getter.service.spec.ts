import { TestBed } from '@angular/core/testing';

import { ServerGetterService } from './server-getter.service';

describe('ServerGetterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerGetterService = TestBed.get(ServerGetterService);
    expect(service).toBeTruthy();
  });
});
