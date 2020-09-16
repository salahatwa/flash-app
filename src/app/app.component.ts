import { Component } from '@angular/core';
import { OverlayService } from './components/overlay/overlay.service';
import { UserService } from './services/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'flashsurvey';
  public displayProgressSpinner = false;
  constructor(overlayService: OverlayService, private userService: UserService) {
    this.userService.populate();
    overlayService.progressBarVisibility.subscribe((data) => {
      this.displayProgressSpinner = data;
    });

  }

}
