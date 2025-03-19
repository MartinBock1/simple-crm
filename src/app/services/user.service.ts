import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  onSnapshot,
  DocumentSnapshot,
  DocumentData,
  doc,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { User } from '../../models/user.class';

@Injectable({
  providedIn: 'root', 
})
export class UserService {
  firestore: Firestore = inject(Firestore); 

  constructor() {}

  addUser(user: User) {
    return addDoc(collection(this.firestore, 'users'), user.toJSON()); 
  }

  getUsers(callback: (users: User[]) => void) {
    const usersCollection = collection(this.firestore, 'users');

    return onSnapshot(usersCollection, (snapshot) => {
      const users = snapshot.docs.map((doc) => this.mapToUser(doc));
      callback(users); 
    });
  }

  getUserById(id: string): Promise<User | null> {
    const userRef = doc(this.firestore, 'users', id); 
    return getDoc(userRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        return this.mapToUser(docSnapshot); 
      } else {
        console.log('No user found with this id.');
        return null; 
      }
    });
  }

  defaultSettingsDatePicker(user: User) {
    if (user.birthDate) {
      user.birthDate = new Date(user.birthDate);
    } else {
      user.birthDate = new Date();
    }
  }

  public mapToUser(doc: DocumentSnapshot<DocumentData>): User {
    const docData = doc.data();

    if (!docData) {
      console.warn('Documentdata are undefined');
      return new User(); 
    }

    return new User({
      firstName: docData['firstName'] || '',
      lastName: docData['lastName'] || '',
      email: docData['email'] || '',
      zipCode: docData['zipCode'] || 0,
      city: docData['city'] || '',
      birthDate: docData['birthDate'] || 0,
      street: docData['street'] || '',
      id: doc.id, 
    });
  }

  updateUser(user: User): Promise<void> {
    const userRef = doc(this.firestore, 'users', user.id); 
    return updateDoc(userRef, {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      city: user.city,
      birthDate: user.birthDate,
      street: user.street,
    });
  }
}
