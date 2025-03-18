import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
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
  user = new User(); // Neuen User erstellen
  birthDate!: Date; // Geburtsdatum des Users
  isLoading = false; // Zeigt an, ob gerade geladen wird

  constructor(
    public dialogRef: MatDialogRef<DialogAddUserComponent>,
    private userService: UserService
  ) {}

  // Methode zum Speichern des Benutzers
  saveUser() {
    this.user.birthDate = this.birthDate.getTime(); // Geburtsdatum auf Zeitstempel setzen
    this.isLoading = true; // Setzt die Ladeanzeige aktiv

    // Benutzer über den UserService speichern
    this.userService.addUser(this.user).then(() => {
      this.isLoading = false; // Ladeanzeige deaktivieren
      this.dialogRef.close(); // Dialog schließen
    });
  }
}
