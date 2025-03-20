import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditUserComponent } from './dialog-edit-user.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Firestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { UserService } from './../services/user.service'; // Import the UserService
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule

// Mock MatDialogRef
class MatDialogRefMock {
  close() {}
}

// Mock MAT_DIALOG_DATA (or MatMdcDialogData)
class MatDialogDataMock {
  name: string = 'John Doe';
  email: string = 'johndoe@example.com';
  birthDate: number = -46486800000;
}

// Mock Firestore service
class FirestoreMock {
  collection() {
    return {
      doc: () => ({
        get: () =>
          of({
            data: () => ({
              name: 'John Doe',
              email: 'johndoe@example.com',
              birthDate: -46486800000,
            }),
          }), // Mock the document retrieval
      }),
    };
  }
}

// Mock UserService
class UserServiceMock {
  getUser() {
    return of({
      name: 'John Doe',
      email: 'johndoe@example.com',
      birthDate: -46486800000,
    }); // Mock the method that retrieves user data
  }

  // Add the missing defaultSettingsDatePicker method to match the real service
  defaultSettingsDatePicker() {
    return of({}); // Mock whatever value is expected here
  }
}

describe('DialogEditUserComponent', () => {
  let component: DialogEditUserComponent;
  let fixture: ComponentFixture<DialogEditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DialogEditUserComponent, // Declare the component
        BrowserAnimationsModule, // Import BrowserAnimationsModule for animations
      ],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock }, // Provide the mock MatDialogRef
        { provide: MAT_DIALOG_DATA, useClass: MatDialogDataMock }, // Provide the mock MAT_DIALOG_DATA
        { provide: Firestore, useClass: FirestoreMock }, // Provide the mock Firestore service
        { provide: UserService, useClass: UserServiceMock }, // Provide the mock UserService
      ],
    }).compileComponents();
    
    fixture = TestBed.createComponent(DialogEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
