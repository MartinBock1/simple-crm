import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.class';
import { UserService } from '../services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
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

  constructor(
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User, 
    private userService: UserService
  ) {
    this.user = new User(data);
    this.userService.defaultSettingsDatePicker(this.user); 
  }

  saveUser(): void {
    if (this.user.birthDate instanceof Date) {
      this.user.birthDate = this.user.birthDate.getTime(); 
    }
    this.isLoading = true;
    this.userService
      .updateUser(this.user)
      .then(() => {
        console.log('Benutzer erfolgreich aktualisiert');
        this.isLoading = false; 
        this.dialogRef.close(true); 
      })
      .catch((error) => {
        console.error('Fehler beim Aktualisieren des Benutzers:', error);
      });
  }
}