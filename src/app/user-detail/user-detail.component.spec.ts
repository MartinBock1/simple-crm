import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailComponent } from './user-detail.component';
import { UserService } from '../services/user.service';
import { User } from '../../models/user.class';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { Firestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

// Mock UserService
class UserServiceMock {
  getUserById(id: string): Promise<User> {
    return Promise.resolve({
      id,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      zipCode: '',
      city: '',
      birthDate: '01.01.1970',
      street: '',
      toJSON: () => ({
        id,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        zipCode: '',
        city: '',
        birthDate: '01.01.1970',
        street: '',
      }),
    });
  }
}

// Mock MatDialog
class MatDialogMock {
  open() {
    return { afterClosed: () => of(true) };
  }
}

// Mock Firestore service
class FirestoreMock {
  collection() {
    return {
      doc: () => ({
        get: () => of({ data: () => ({}) }) // Mock Firestore's document retrieval
      })
    };
  }
}

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailComponent], // Declare the component
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of({ get: () => '123' }) },
        }, // Mock ActivatedRoute with route params
        { provide: UserService, useClass: UserServiceMock }, // Use the mock UserService
        { provide: MatDialog, useClass: MatDialogMock }, // Mock MatDialog
      ],
    }).compileComponents();
    
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user details on init', async () => {
    await component.ngOnInit(); // Manually trigger ngOnInit
    expect(component.user).toEqual({
      id: '123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      zipCode: '',
      city: '',
      birthDate: '01.01.1970',
      street: '',
      toJSON: jasmine.any(Function),
    });
  });

  
});
