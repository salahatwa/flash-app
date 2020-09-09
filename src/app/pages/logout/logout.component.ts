import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';
import { StorageService } from './../../services/storage/storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(socialAuthService: SocialAuthService,
    storageService: StorageService) {
      storageService.clearAllSession();
      socialAuthService.signOut();
  }

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("bg-darker");
  }
  ngOnDestroy(): void {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("bg-darker");
  }

}
