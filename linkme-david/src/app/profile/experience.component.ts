import {
  Component,
  EventEmitter,
  ElementRef,
  Input,
  Output,
  OnDestroy,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements OnDestroy {
  @Input() experience!: string[];
  @Output() newExperienceEvent = new EventEmitter<string>();

  @ViewChild('myLocalRef') myLocalRef!: ElementRef;

  newExperience: string = '';

  ngOnDestroy() {
    console.log('destroy');
    // unsubscribe
    // cancel http request
  }

  onNewExperience() {
    console.log(this.myLocalRef.nativeElement);

    console.log(this.myLocalRef);
    if (this.newExperience) {
      this.newExperienceEvent.emit(this.newExperience);
    }
    this.newExperience = '';
  }
}
