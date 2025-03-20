import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { Firestore } from '@angular/fire/firestore'; // Assuming Firestore is from AngularFire
import { of } from 'rxjs';

// Mock Firestore service using Jasmine
class FirestoreMock {
  // Jasmine spy to mock methods
  collection = jasmine.createSpy('collection').and.returnValue({
    add: jasmine.createSpy('add'),
    valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of([]))
  });
}

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    providers: [
        UserService,
        { provide: Firestore, useClass: FirestoreMock } // Provide mock Firestore
      ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
