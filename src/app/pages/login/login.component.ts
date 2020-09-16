import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { UserService } from './../../services/api';
import { OverlayService } from './../../components/overlay/overlay.service';
import { SocialPlatform, UserSignInModel } from './../../models/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public errorMessage = '';
  public platform = '';
  public authForm: FormGroup;

  constructor(private userService:UserService,
    private router: Router,
    private _socialAuthService: SocialAuthService,
    private _overlayService: OverlayService) {
    this.authForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });

    // this._overlayService.show();
    // this._socialAuthService.initState.subscribe(() => { }, console.error,
    //   () => {
    //     console.log('all providers are ready');
    //     this._overlayService.hide();
    //   });

    // this._socialAuthService.authState.subscribe((user) => {

    //   let loginUser = new UserSignInModel();
    //   let platformDetails = new SocialPlatform();
    //   loginUser.name = user.firstName;
    //   loginUser.email = user.email;

    //   platformDetails.platform = this.platform;
    //   platformDetails.platformid = user.id;
    //   platformDetails.platformImage = user.photoUrl;

    //   loginUser.platformdetail = platformDetails;
    //   this._userService.signInUser(loginUser).subscribe((data) => {
    //     console.log(data);
    //     this.storageService.setSession(Constants.SessionKey, JSON.stringify(data));
    //     this.storageService.setSession(Constants.AuthToken, user.authToken);
    //     this._overlayService.hide();
    //     this.router.navigate(['/dashboard']);
    //   },
    //     error => {
    //       this._overlayService.hide();
    //       switch (error.error) {
    //         case 'InactiveUser':
    //           this.errorMessage = "You are no longer active.";
    //           break;
    //         case 'InvalidUser':
    //           this.errorMessage = "Invalid user detected.";
    //           break;
    //         default:
    //           this.errorMessage = 'Something went wrong';
    //           break;
    //       }
    //     });
    // });

  }


  login() {
    // this.isSubmitting = true;
    console.log(this.authForm.value);
    this.userService
      .attemptAuth(this.authForm.value)
      .subscribe(
        data => {
          this.router.navigate(['/dashboard']);
          // this.isSubmitting = false;
        },
        err => {
          this.errorMessage = err.message;
          // this.isSubmitting = false;
          // this.alertService.error(err.message);
        }
      );
  }


  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("bg-default");
  }
  ngOnDestroy(): void {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("bg-default");
  }

  changedData() {
    this.errorMessage = '';
  }

  googleSignIn() {
    this.platform = 'google';
    this._overlayService.show();
    this._socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  fbSignIn() {
    this.platform = 'facebook';
    this._overlayService.show();
    this._socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  
}
