import { FormsModule } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { User } from '../../models/user.class';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss',
})
export class DialogEditAddressComponent {
  user: Partial<User> = {
    street: '',
    zipCode: '',
    city: '',
  };
  isLoading = false;

  /**
   * Constructor for initializing the DialogEditAddressComponent.
   *
   * This constructor receives dependencies through Angular's dependency injection system. It allows the component
   * to interact with the dialog window, receive data passed to the dialog, and utilize the `userService` to manage user data.
   * Additionally, a new `User` object is created from the provided `data` to initialize the `user` property.
   *
   * @param {MatDialogRef<DialogEditAddressComponent>} dialogRef - Reference to the dialog window, allowing the component to control its state (open/close).
   * @param {User} data - The data passed to the dialog, which contains user information that will be used to initialize the `user` object.
   * @param {UserService} userService - Service for managing user-related data operations, such as fetching, updating, and deleting users.
   * @constructor
   * @memberof DialogEditAddressComponent
   */
  constructor(
    public dialogRef: MatDialogRef<DialogEditAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private userService: UserService
  ) {
    this.user = new User(data);
  }

  /**
   * Saves the updated address by sending the user data to the user service.
   *
   * This method sets the loading state to `true` while performing the update operation.
   * It calls the `updateUser` method from the `userService` to update the user details.
   * Upon successful update, it sets the loading state to `false`, logs a success message,
   * and closes the dialog with a `true` flag. If the update fails, it logs an error message to the console.
   *
   * @function saveAddress
   * @memberof YourComponent
   * @returns {void}
   */
  saveAddress(): void {
    this.isLoading = true;
    this.userService
      .updateUser({ ...this.user } as User)
      .then(() => {
        this.isLoading = false;
        console.log('update user success');
        this.dialogRef.close(true);
      })
      .catch((error) => {
        console.error('Error when updating the user:', error);
      });
  }
}
