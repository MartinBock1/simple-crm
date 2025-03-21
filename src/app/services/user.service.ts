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

  /**
   * Adds a new user to the Firestore database.
   *
   * This method takes a `User` object, converts it to a JSON representation using the `toJSON` method,
   * and then adds it to the 'users' collection in Firestore using the `addDoc` method.
   *
   * @param {User} user - The user object to be added to the Firestore database.
   * @returns {Promise<DocumentReference>} A promise that resolves with the document reference of the newly added user.
   * @memberof YourService
   */
  addUser(user: User) {
    return addDoc(collection(this.firestore, 'users'), user.toJSON());
  }

  /**
   * Retrieves a list of users from the Firestore database and invokes a callback with the user data.
   *
   * This method listens for real-time updates to the 'users' collection in Firestore. It fetches the documents in the collection,
   * maps them to `User` objects, and then calls the provided callback function with the list of users.
   * The callback is invoked whenever the snapshot of the 'users' collection changes.
   *
   * @param {Function} callback - A function that is called with the list of users whenever the data in the 'users' collection is updated.
   * @param {User[]} callback.users - The array of `User` objects retrieved from Firestore.
   * @returns {Unsubscribe} A function to unsubscribe from the real-time updates.
   * @memberof YourService
   */
  getUsers(callback: (users: User[]) => void) {
    const usersCollection = collection(this.firestore, 'users');

    return onSnapshot(usersCollection, (snapshot) => {
      const users = snapshot.docs.map((doc) => this.mapToUser(doc));
      callback(users);
    });
  }

  /**
   * Retrieves a user by their ID from the Firestore database.
   *
   * This method fetches a document from the 'users' collection in Firestore using the provided user ID.
   * If the document exists, it is mapped to a `User` object and returned. If the document does not exist,
   * a message is logged to the console and the method returns `null`.
   *
   * @param {string} id - The ID of the user to be retrieved from Firestore.
   * @returns {Promise<User | null>} A promise that resolves with a `User` object if found, or `null` if no user is found.
   * @memberof YourService
   */
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

  /**
   * Sets the default settings for the user's birthDate.
   *
   * This method checks if the `user` object has a `birthDate`. If it exists, it converts the `birthDate` to a `Date` object.
   * If no `birthDate` is provided, the method assigns the current date as the default value.
   *
   * @param {User} user - The user object whose birthDate will be set or modified.
   * @memberof YourService
   */
  defaultSettingsDatePicker(user: User) {
    if (user.birthDate) {
      user.birthDate = new Date(user.birthDate);
    } else {
      user.birthDate = new Date();
    }
  }

  /**
   * Maps a Firestore document snapshot to a User object.
   *
   * This method extracts the data from a Firestore `DocumentSnapshot` and converts it into a `User` object.
   * It checks if the document contains data, and if not, it logs a warning and returns a new, empty `User` object.
   * If data is present, the method maps the values to the corresponding properties of the `User` object, providing default values
   * for missing fields (e.g., empty strings or zeros).
   *
   * @param {DocumentSnapshot<DocumentData>} doc - The Firestore document snapshot containing the user data.
   * @returns {User} A `User` object populated with the data from the document snapshot.
   * @memberof YourService
   */
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

  /**
   * Updates an existing user in the Firestore database.
   *
   * This method updates the user document in the 'users' collection with the provided user data.
   * It uses the `updateDoc` method from Firestore to apply changes to the fields: `firstName`, `lastName`, `email`,
   * `city`, `birthDate`, and `street` for the user document with the given user ID.
   *
   * @param {User} user - The `User` object containing the updated user data.
   * @returns {Promise<void>} A promise that resolves when the user document has been successfully updated.
   * @memberof YourService
   */
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
