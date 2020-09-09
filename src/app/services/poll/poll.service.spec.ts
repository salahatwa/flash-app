/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PollService } from './poll.service';

describe('Service: Poll', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PollService]
    });
  });

  it('should ...', inject([PollService], (service: PollService) => {
    expect(service).toBeTruthy();
  }));
});
