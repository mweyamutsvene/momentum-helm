import { Component, Input } from '@angular/core';
import { ProfilesService } from '../profiles.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent {
  @Input() profile!: number;

  newExperience: string = '';

  constructor(public profilesService: ProfilesService) {}

  get experience() {
    return this.profilesService.getProfile(this.profile).experience;
  }

  onNewExperience() {
    this.profilesService.addExperience(this.profile, this.newExperience);
  }
}
