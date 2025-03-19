import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from '../services/user.service'; // Importiere den UserService
import { User } from '../../models/user.class';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component'; 
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  userId: string = '';
  user: User | null = null;
  unsubscribe: () => void = () => {};

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
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

  fetchUser(id: string): void {
    this.userService.getUserById(id).then((user) => {
      this.user = user;
      console.log('Benutzer geladen:', this.user);
    });
  }

  openEditUserDialog(): void {
    if (this.user) {
      const dialogRef = this.dialog.open(DialogEditUserComponent, {
        data: this.user,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.fetchUser(this.userId);
        }
      });
    }
  }
  
  openEditAddressDialog(): void {
    if (this.user) {
      const dialogRef = this.dialog.open(DialogEditAddressComponent, {
        data: this.user,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.fetchUser(this.userId);
        }
      });
    }
  }

  getUserAsJSON(): string {
    return this.user
      ? JSON.stringify(this.user, null, 2)
      : 'Benutzer nicht gefunden';
  }
}