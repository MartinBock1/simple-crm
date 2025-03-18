import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { doc, Firestore, onSnapshot } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service'; // Importiere den UserService
import { User } from '../../models/user.class';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component'; // Dialog zum Bearbeiten importieren

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  userId: string = ''; // Die ID des Benutzers
  user: User | null = null; // Der Benutzer, der angezeigt werden soll
  unsubscribe: () => void = () => {}; // Variable für die Unsubscribe-Funktion

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private firestore: Firestore,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.userId = id;
        this.fetchUser(id);
      }
    });
  }

  // // Echtzeit-Daten mit onSnapshot laden
  // fetchUser(id: string): void {
  //   const userRef = doc(this.firestore, 'users', id);
  //   this.unsubscribe = onSnapshot(userRef, (docSnapshot) => {
  //     if (docSnapshot.exists()) {
  //       this.user = this.userService.mapToUser(docSnapshot);
  //       console.log('Retrieved user:', this.user); // Ausgabe der Benutzerdaten in der Konsole
  //     } else {
  //       console.log('user not found');
  //       this.user = null;
  //     }
  //   });
  // }

  // ngOnDestroy(): void {
  //   // Unsubscribe beim Zerstören der Komponente
  //   if (this.unsubscribe) {
  //     this.unsubscribe();
  //   }
  // }

  // getUserAsJSON(): string {
  //   return this.user
  //     ? JSON.stringify(this.user, null, 2)
  //     : 'Benutzer nicht gefunden';
  // }
  // Öffnet den Dialog zum Bearbeiten des Benutzers

  // Abrufen des Benutzers aus Firestore
  fetchUser(id: string): void {
    this.userService.getUserById(id).then((user) => {
      this.user = user;
      console.log('Benutzer geladen:', this.user);
    });
  }
  
  openEditDialog(): void {
    if (this.user) {
      const dialogRef = this.dialog.open(DialogEditUserComponent, {
        width: '400px', // Größe des Dialogs
        data: this.user, // Die Benutzerdaten werden dem Dialog übergeben
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // Benutzer neu laden, nachdem die Änderungen gespeichert wurden
          this.fetchUser(this.userId);
        }
      });
    }
  }

  // Gibt die Benutzerdaten als JSON aus (nur zur Anzeige)
  getUserAsJSON(): string {
    return this.user
      ? JSON.stringify(this.user, null, 2)
      : 'Benutzer nicht gefunden';
  }
}