import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { StorageService } from './../../services/storage/storage.service';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { UserService } from './../../services/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  //
  public errorMessage = '';
  public signUpForm: FormGroup;
  public socialSite = '';


  constructor(private userService: UserService,
    private router: Router,
    private _socialAuthService: SocialAuthService) {


    this.signUpForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });

  
    this._socialAuthService.authState.subscribe((user) => {
      console.log(user);
    });
  }

  changedData() {
    this.errorMessage = '';
  }

  signUp() {

    if (this.signUpForm.valid) {
      //let data = this.modifyData(this.fg.value);


      // if (data..endsWith(".com")) {
      //   this.storageService.setSession("username",data.email);
      //   this.router.navigate(['/dashboard']);

      // }
      // else {
      //   this.errorMessage = "Incorrect credentails";
      // }
    }

    // this.isSubmitting = true;
    this.userService
      .signUp(this.signUpForm.value)
      .subscribe(
        data => {
          this.router.navigate(['/dashboard']);
          // this.isSubmitting = false;
        },
        err => {
          this.errorMessage = err.message;
        }
      );
  }

  // modifyData(data): any {
  //   let returnData = new UserSignInModel();
  //   returnData.userName = data.name;
  //   returnData.password = data.password;
  //   returnData.userEmail = data.email;
  //   return returnData;
  // }

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("bg-default");
  }

  ngOnDestroy(): void {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("bg-default");
  }

  googleRegister() {
    this.socialSite = 'google';
    this._socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  fbRegister() {
    this.socialSite = 'facebook';
    this._socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

}
