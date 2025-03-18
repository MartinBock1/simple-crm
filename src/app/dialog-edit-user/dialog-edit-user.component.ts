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
} from '@angular/material/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  providers: [
    provideNativeDateAdapter(), // Bereitstellung des DateAdapters für den MatDatepicker
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
    this.user = new User(data); // Erstellen eines User-Objekts aus den übergebenen Daten
    if (this.user.birthDate) {
      this.birthDate = new Date(this.user.birthDate); // Konvertiert den Zeitstempel in ein Date-Objekt
    }
  }

  // Speichern der bearbeiteten Benutzerdaten
  saveUser(): void {
    this.user.birthDate = this.birthDate.getTime(); // Geburtsdatum auf Zeitstempel setzen
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