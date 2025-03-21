import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { User } from '../../models/user.class';
import { UserService } from '../services/user.service';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit, OnDestroy {
  allUsers: User[] = [];
  unsubscribe: any;

  /**
   * Constructor for initializing the component with the necessary services.
   *
   * This constructor injects the `UserService` and `MatDialog` services into the component.
   * The `UserService` is used for managing user-related data and operations, while `MatDialog` is used for opening and managing dialog windows.
   *
   * @param {UserService} userService - The service responsible for handling user data and operations.
   * @param {MatDialog} dialog - The MatDialog service used to manage dialog windows in the component.
   * @constructor
   * @memberof YourComponent
   */
  constructor(private userService: UserService, public dialog: MatDialog) {}

  /**
   * Initializes the component by fetching the list of users.
   *
   * This method is called when the component is initialized. It subscribes to the `getUsers` method of the `UserService`
   * to retrieve the list of users. The retrieved users are then stored in the `allUsers` property.
   *
   * @memberof YourComponent
   */
  ngOnInit(): void {
    this.unsubscribe = this.userService.getUsers((users) => {
      this.allUsers = users;
    });
  }

  /**
   * Cleans up subscriptions and other resources when the component is destroyed.
   *
   * This method is called when the component is about to be destroyed. It ensures that any active subscriptions
   * (such as the one created in `ngOnInit`) are unsubscribed to prevent memory leaks.
   *
   * @memberof YourComponent
   */
  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  /**
   * Opens the dialog for adding a new user.
   *
   * This method opens the dialog window for adding a new user by calling the `open` method of `MatDialog`,
   * which will display the `DialogAddUserComponent`.
   *
   * @memberof YourComponent
   */
  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}