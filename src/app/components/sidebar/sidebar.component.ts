import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserVO } from './../../models/models';
import { UserService } from './../../services/api';
import { UserLoginResponse } from './../../models/users';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/social-accounts', title: 'Social accounts', icon: 'ni-hat-3 text-orange', class: '' },
  { path: '/tasks', title: 'Tasks', icon: 'ni-bullet-list-67 text-red', class: '' },
  { path: '/category', title: 'Category', icon: 'ni-planet text-blue', class: '' },
  // { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
  // { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
  // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
  // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  public userDetails: UserVO;
  constructor(private router: Router, private userService: UserService) {
    this.userService.currentUser.subscribe((user) => {
      this.userDetails = user;
    });
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
}
