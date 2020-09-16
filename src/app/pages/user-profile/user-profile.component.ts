import { Component, OnInit } from '@angular/core';
import { UserLoginResponse } from './../../models/users';
// import { StorageService } from './../../services/storage/storage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userDetails: UserLoginResponse;

  constructor() {

  }

  ngOnInit() {
    // this.userDetails = this._storageService.getUserSessionDetails();
  }

  getUrl() {
    return "url('" + this.userDetails.profileUrl + "')";
  }
}
