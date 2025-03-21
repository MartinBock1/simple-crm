import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { User } from '../../models/user.class';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatCardModule,
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
})
//
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date;
  isLoading = false;

  /**
   * Constructor for initializing the DialogAddUserComponent.
   *
   * This constructor accepts dependencies that are injected by Angular's dependency injection system.
   * The `dialogRef` is used to interact with the dialog window, and `userService` is used to manage user-related data.
   *
   * @param {MatDialogRef<DialogAddUserComponent>} dialogRef - Reference to the dialog window, allowing the component to control its state (open/close).
   * @param {UserService} userService - Service for handling user data operations, such as adding, updating, and fetching users.
   * @constructor
   * @memberof DialogAddUserComponent
   */
  constructor(
    public dialogRef: MatDialogRef<DialogAddUserComponent>,
    private userService: UserService
  ) {}

  /**
   * Saves the user by setting the birthDate and calling the user service to add the user.
   *
   * This method updates the user's birthDate to its timestamp, sets the loading state to true,
   * and then makes a call to the user service to add the user. Once the user is successfully added,
   * it sets the loading state to false and closes the dialog.
   *
   * @function saveUser
   * @memberof YourComponent
   */
  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    this.isLoading = true;

    this.userService.addUser(this.user).then(() => {
      this.isLoading = false;
      this.dialogRef.close();
    });
  }
}
