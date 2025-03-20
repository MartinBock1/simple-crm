import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditAddressComponent } from './dialog-edit-address.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Firestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { UserService } from './../services/user.service'; // Import UserService
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule

// Mock MatDialogRef
class MatDialogRefMock {
  close() {}
}

// Mock MatMdcDialogData (or MatDialogData) as it is required by the dialog
class MatDialogDataMock {
  // Add mock data properties that your component expects
  street: string = 'Hauptstraße 1';
  zipCode: number = 12345;
  city: string = 'Berlin';
}

// Mock Firestore service
class FirestoreMock {
  collection() {
    return {
      doc: () => ({
        get: () => of({ data: () => ({ street: 'Hauptstraße 1', zipCode: 12345, city: 'Berlin' }) }) // Mock Firestore data
      })
    };
  }
}

// Mock UserService
class UserServiceMock {
  getUserAddress() {
    return of({ street: 'Hauptstraße 1', zipCode: 12345, city: 'Berlin' }); // Mock user address data
  }
}

describe('DialogEditAddressComponent', () => {
  let component: DialogEditAddressComponent;
  let fixture: ComponentFixture<DialogEditAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DialogEditAddressComponent, // Declare the component
        BrowserAnimationsModule, // Import BrowserAnimationsModule for animations
      ],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock }, // Provide mock MatDialogRef
        { provide: MAT_DIALOG_DATA, useClass: MatDialogDataMock }, // Provide mock MAT_DIALOG_DATA
        { provide: Firestore, useClass: FirestoreMock }, // Provide mock Firestore service
        { provide: UserService, useClass: UserServiceMock }, // Provide mock UserService
      ],
    }).compileComponents();
    
    fixture = TestBed.createComponent(DialogEditAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
