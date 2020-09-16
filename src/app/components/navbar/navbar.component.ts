// import { StorageService } from './../../services/storage/storage.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from '../sidebar/sidebar.component';
import { UserService } from './../../services/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  firstname = '';
  profileUrl = '';

  constructor(location: Location,  private userService:UserService, private router: Router) {
    this.location = location;
  }

  ngOnInit() {
   
    this.userService.currentUser.subscribe((user) => {
      this.firstname = user.username;
      this.profileUrl = user.avatar;
      this.listTitles = ROUTES.filter(listTitle => listTitle);
    });

  
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

}
