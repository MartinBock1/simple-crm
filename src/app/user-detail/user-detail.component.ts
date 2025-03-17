import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  firestore: Firestore = inject(Firestore);
  userId = '';

  constructor(private route: ActivatedRoute) {}

ngOnInit() {
  this.route.paramMap.subscribe(paramMap => {
    const userId = paramMap.get('id');
    console.log('Got ID :', userId);
  });
}
}
