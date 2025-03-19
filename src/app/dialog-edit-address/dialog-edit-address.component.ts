import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.class';
import { UserService } from '../services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';

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

  constructor(
    public dialogRef: MatDialogRef<DialogEditAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User, // Die Daten werden vom Haupt-Component übergeben
    private userService: UserService
  ) {
    this.user = new User(data);
  }

  // Speichern der bearbeiteten Benutzerdaten
  saveAddress(): void {
    this.isLoading = true;
    this.userService
      .updateUser({ ...this.user } as User)
      .then(() => {
        this.isLoading = false; // Ladeanzeige deaktivieren
        console.log('Benutzer erfolgreich aktualisiert');
        this.dialogRef.close(true); // Schließt den Dialog und gibt `true` zurück
      })
      .catch((error) => {
        console.error('Fehler beim Aktualisieren des Benutzers:', error);
      });
  }
}
