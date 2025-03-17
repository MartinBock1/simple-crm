import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import {
  collection,
  Firestore,
  onSnapshot,
  DocumentData,
  DocumentSnapshot,
} from '@angular/fire/firestore';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit, OnDestroy {
  user = new User();
  allUsers: User[] = [];
  firestore: Firestore = inject(Firestore);
  unsubscribe!: () => void;
  routeParam: any;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    const usersCollection = collection(this.firestore, 'users');
    this.unsubscribe = onSnapshot(usersCollection, (snapshot) => {
      const changes = snapshot.docs.map((doc) => this.mapToUser(doc));
      console.log('received changes from DB', changes);
      this.allUsers = changes;
    });
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  // Methode, um Firestore-Daten in den User-Typ zu konvertieren
  private mapToUser(doc: DocumentSnapshot<DocumentData>): User {
    const docData = doc.data();

    // Wenn docData undefined ist, gebe einen leeren User zurück
    if (!docData) {
      console.warn('Document data is undefined');
      return new User(); // Leerer User, falls keine Daten vorhanden sind
    }

    const user = new User({
      firstName: docData['firstName'] || '',
      lastName: docData['lastName'] || '',
      email: docData['email'] || '',
      zipCode: docData['zipCode'] || 0,
      city: docData['city'] || '',
      birthDate: docData['birthDate'] || 0,
      street: docData['street'] || '',
    });
    user['id'] = doc.id; // Die ID wird als zusätzliche Eigenschaft gespeichert
    return user;
  }
}
