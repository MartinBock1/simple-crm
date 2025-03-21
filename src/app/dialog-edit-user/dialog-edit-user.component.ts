import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
  MAT_DATE_LOCALE,
  NativeDateAdapter,
} from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { User } from '../../models/user.class';
import { UserService } from '../services/user.service';

export const EURO_DATE_FORMATS = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export class EuropeanDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: any): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`; // Formatierung auf TT.MM.JJJJ
  }
}

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
  ],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss'],
})
export class DialogEditUserComponent {
  user: User;
  birthDate!: Date;
  isLoading = false;

  /**
   * Constructor for initializing the DialogEditUserComponent.
   *
   * This constructor is responsible for initializing the component with injected dependencies. It receives the dialog reference,
   * user data, and the user service. A new `User` object is created using the provided `data`, and default settings for
   * a date picker are applied to the user using the `userService`.
   *
   * @param {MatDialogRef<DialogEditUserComponent>} dialogRef - Reference to the dialog window, allowing the component to control its state (open/close).
   * @param {User} data - The user data passed to the dialog, which is used to initialize the `user` object.
   * @param {UserService} userService - Service for managing user-related data and operations, such as updating user settings.
   * @constructor
   * @memberof DialogEditUserComponent
   */
  constructor(
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private userService: UserService
  ) {
    this.user = new User(data);
    this.userService.defaultSettingsDatePicker(this.user);
  }

  /**
   * Saves the user by updating the user details through the user service.
   *
   * This method checks if the `birthDate` is a `Date` object and converts it to a timestamp if necessary.
   * It then sets the loading state to `true`, calls the `updateUser` method from the `userService` to update the user,
   * and handles both success and failure scenarios. On success, it logs a message, updates the loading state,
   * and closes the dialog with a `true` flag. If the update fails, it logs an error message.
   *
   * @function saveUser
   * @memberof YourComponent
   * @returns {void}
   */
  saveUser(): void {
    if (this.user.birthDate instanceof Date) {
      this.user.birthDate = this.user.birthDate.getTime();
    }
    this.isLoading = true;
    this.userService
      .updateUser(this.user)
      .then(() => {
        console.log('update user success');
        this.isLoading = false;
        this.dialogRef.close(true);
      })
      .catch((error) => {
        console.error('Error when updating the user:', error);
      });
  }
}