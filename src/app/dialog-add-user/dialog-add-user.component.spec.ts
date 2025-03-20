import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddUserComponent } from './dialog-add-user.component';
import { MatDialogRef } from '@angular/material/dialog';
import { Firestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule

// Mock MatDialogRef
class MatDialogRefMock {
  close() {}
}

// Mock Firestore service
class FirestoreMock {
  collection() {
    return {
      add: jasmine.createSpy('add'), // Mock the add method
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of([])) // Mock valueChanges method
    };
  }
}

describe('DialogAddUserComponent', () => {
  let component: DialogAddUserComponent;
  let fixture: ComponentFixture<DialogAddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DialogAddUserComponent, // Declare the component
        BrowserAnimationsModule, // Import BrowserAnimationsModule to enable animations
      ],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock }, // Mock MatDialogRef
        { provide: Firestore, useClass: FirestoreMock }, // Provide the mock Firestore service
      ],
    }).compileComponents();
    
    fixture = TestBed.createComponent(DialogAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
