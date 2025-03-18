import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  onSnapshot,
  DocumentSnapshot,
  DocumentData,
} from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { User } from '../../models/user.class';

@Injectable({
  providedIn: 'root', // Der Service ist global verfügbar
})
export class UserService {
  firestore: Firestore = inject(Firestore); // Injektion des Firestore-Services

  constructor() {}

  // Methode zum Hinzufügen eines Benutzers
  addUser(user: User) {
    return addDoc(collection(this.firestore, 'users'), user.toJSON()); // Dokument in die Firestore-Sammlung "users" hinzufügen
  }

  // Methode zum Abrufen aller Benutzer
  getUsers(callback: (users: User[]) => void) {
    const usersCollection = collection(this.firestore, 'users');

    // Auf Firestore-Datenänderungen hören und zurückgeben
    return onSnapshot(usersCollection, (snapshot) => {
      const users = snapshot.docs.map((doc) => this.mapToUser(doc));
      callback(users); // Rückgabe der Benutzerdaten über den Callback
    });
  }

  // Wandelt Firestore-Daten in ein User-Objekt um
  private mapToUser(doc: DocumentSnapshot<DocumentData>): User {
    const docData = doc.data();

    if (!docData) {
      console.warn('Dokumentdaten sind undefined');
      return new User(); // Wenn keine Daten vorhanden sind, ein leerer User wird zurückgegeben
    }

    return new User({
      firstName: docData['firstName'] || '',
      lastName: docData['lastName'] || '',
      email: docData['email'] || '',
      zipCode: docData['zipCode'] || 0,
      city: docData['city'] || '',
      birthDate: docData['birthDate'] || 0,
      street: docData['street'] || '',
      id: doc.id, // Die ID wird als zusätzliche Eigenschaft gespeichert
    });
  }
}
