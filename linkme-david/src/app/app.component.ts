import { Component, OnInit } from '@angular/core';
import Profile, { profiles } from './profile.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'linkme-david';
  profiles: Profile[] = profiles;

  ngOnInit() {
    setTimeout(() => {
      this.profiles[0].firstName = 'Bob';
      this.profiles[1].firstName = 'Thomas';
    }, 3000);
  }

  firstProfile() {
    return this.profiles[0];
  }
}
