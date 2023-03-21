/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GuamUserService } from './guam-user.service';

describe('Service: GuamUser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuamUserService]
    });
  });

  it('should ...', inject([GuamUserService], (service: GuamUserService) => {
    expect(service).toBeTruthy();
  }));
});
