import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date;
  firestore: Firestore = inject(Firestore);
  isLoading = false;

  // loading() {
  //   this.isLoading = !this.isLoading;
  // }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current user is: ', this.user);

    this.isLoading = true;

    // this.firestore
    //   .collection('users')
    //   .add(this.user.toJSON())
    //   .then((result: any) => {
    //     console.log('adding user finished ', result);
    //   });
    // Get the Firestore instance correctly
    const firestoreInstance = this.firestore;

    // Use the collection method and addDoc to add the user
    addDoc(collection(this.firestore, 'users'), this.user.toJSON()).then(
      (result: any) => {
        this.isLoading = false;
        console.log('adding user finished ', result);
      }
    );
  }
}
