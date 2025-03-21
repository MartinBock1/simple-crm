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

  /**
   * Constructor for initializing the component with necessary services and dependencies.
   *
   * This constructor injects the `ActivatedRoute`, `UserService`, and `MatDialog` services into the component.
   * The `ActivatedRoute` is used for accessing route parameters, the `UserService` is used for retrieving and managing user data,
   * and the `MatDialog` service is used for managing dialog windows.
   *
   * @param {ActivatedRoute} route - The service that provides access to route parameters.
   * @param {UserService} userService - The service that handles user data operations.
   * @param {MatDialog} dialog - The service used to open dialog windows.
   * @constructor
   * @memberof YourComponent
   */
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  /**
   * Initializes the component by subscribing to route parameters and fetching the user data.
   *
   * This method is called when the component is initialized. It subscribes to the `paramMap` observable of the `ActivatedRoute`,
   * retrieving the user ID from the route parameters. If the ID exists, it stores it in `userId` and calls `fetchUser` to retrieve the user's details.
   *
   * @memberof YourComponent
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.userId = id;
        this.fetchUser(id);
      }
    });
  }

  /**
   * Fetches user details from the `UserService` using the user ID.
   *
   * This method calls the `getUserById` method of the `UserService` to retrieve user data based on the provided `id`.
   * Once the data is fetched, it assigns the result to the `user` property and logs the user data to the console.
   *
   * @param {string} id - The ID of the user to be fetched.
   * @memberof YourComponent
   */
  fetchUser(id: string): void {
    this.userService.getUserById(id).then((user) => {
      this.user = user;
      console.log('Benutzer geladen:', this.user);
    });
  }

  /**
   * Opens a dialog to edit the user's details.
   *
   * This method opens the `DialogEditUserComponent` dialog with the current user data as input.
   * After the dialog is closed, it checks if any changes were made (based on the result) and re-fetches the user data.
   *
   * @memberof YourComponent
   */
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

  /**
   * Opens a dialog to edit the user's address.
   *
   * Similar to `openEditUserDialog`, this method opens the `DialogEditAddressComponent` dialog with the user's current data.
   * After the dialog is closed, it re-fetches the user data if changes were made.
   *
   * @memberof YourComponent
   */
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

  /**
   * Returns the user data as a formatted JSON string.
   *
   * This method converts the `user` object to a formatted JSON string using `JSON.stringify`.
   * If no user data is available, it returns the string 'Benutzer nicht gefunden' (User not found).
   *
   * @returns {string} The user data as a formatted JSON string or a message if no user is found.
   * @memberof YourComponent
   */
  getUserAsJSON(): string {
    return this.user
      ? JSON.stringify(this.user, null, 2)
      : 'Benutzer nicht gefunden';
  }
}