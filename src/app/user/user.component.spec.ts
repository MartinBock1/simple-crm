import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

const firebaseTestConfig = {
  projectId: 'simple-crm-aae5e',
  appId: '1:471885741953:web:c2fe6c7b7cd2484ae37280',
  storageBucket: 'simple-crm-aae5e.appspot.com', // 🔹 Korrigierte Domain
  apiKey: 'AIzaSyBK2zvLDWDivgpiWiuziZUswjx59gEjA6U',
  authDomain: 'simple-crm-aae5e.firebaseapp.com',
  messagingSenderId: '471885741953',
};

class FirestoreMock {
  collection() {
    return {
      add: jasmine.createSpy('add'),
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of([])),
    };
  }
}

class MatDialogRefMock {
  close() {}
}

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserComponent, 
        BrowserAnimationsModule,
        provideFirebaseApp(() => initializeApp(firebaseTestConfig)), 
        provideFirestore(() => getFirestore()), 
      ],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        { provide: Firestore, useClass: FirestoreMock }, 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

