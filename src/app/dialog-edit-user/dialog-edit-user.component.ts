import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user.class';
import { UserService } from '../services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
  MAT_DATE_FORMATS,
  DateAdapter,
  MAT_DATE_LOCALE,
  NativeDateAdapter,
} from '@angular/material/core';
import { FormsModule } from '@angular/forms';

export const EURO_DATE_FORMATS = {
  parse: {
    dateInput: 'DD.MM.YYYY', // Eingabeformat
  },
  display: {
    dateInput: 'DD.MM.YYYY', // Anzeigeformat
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
    provideNativeDateAdapter(), // Bereitstellung des DateAdapters für den MatDatepicker
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' }
  ],
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    MatDatepickerModule,
    FormsModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss'],
})
export class DialogEditUserComponent {
  user: User; // Die Benutzerdaten, die bearbeitet werden
  birthDate!: Date;

  constructor(
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User, // Die Daten werden vom Haupt-Component übergeben
    private userService: UserService
  ) {
    this.user = new User(data); 
    this.userService.defaultSettingsDatePicker(this.user); // Konvertierung aufrufen
  }

  // Speichern der bearbeiteten Benutzerdaten
  saveUser(): void {
    if (this.user.birthDate instanceof Date) {
      this.user.birthDate = this.user.birthDate.getTime(); // Konvertiere Date-Objekt in Zeitstempel
    }
    this.userService
      .updateUser(this.user)
      .then(() => {
        console.log('Benutzer erfolgreich aktualisiert');
        this.dialogRef.close(true); // Schließt den Dialog und gibt `true` zurück
      })
      .catch((error) => {
        console.error('Fehler beim Aktualisieren des Benutzers:', error);
      });
  }  
}