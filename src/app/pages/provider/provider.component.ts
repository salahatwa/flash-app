import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import { OverlayService } from './../../components/overlay/overlay.service';
import { PaginationConfig } from './../../components/pagination/pagination';
import { Provider } from './../../models/models';
import { ProviderService } from './../../services/provider.service';
import { UserService } from './../../services/api';
import { UtilService } from './../../services/util.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from 'src/app/components/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss']
})
export class ProviderComponent implements OnInit {

  pageConfig: PaginationConfig = {
    currentPage: 0,
    totalPages: 1,
    totalElements: 0
  }

  isSubmitting: boolean = false;
  providers: Provider[];
  isLoading: boolean;

  constructor(private _overlayService: OverlayService, private modalService: NgbModal, private providerService: ProviderService, private utilService: UtilService,
    private userService: UserService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadProvider();
  }


  loadProvider(pageNo?: number) {
    this._overlayService.show();

    this.providerService.getUserProviderList(pageNo).pipe(finalize(() => {
      this.isLoading = false;
    })).subscribe(data => {
      this.providers = data.content;

      this.pageConfig.totalElements = data.totalElements;
      this.pageConfig.totalPages = data.totalPages;
      this._overlayService.hide();

    },
      err => {
        console.log(err);
      });
  }

  pageChanged(event) {

    // this.isLoading = true;
    this.pageConfig.currentPage = event - 1;
    this.loadProvider(this.pageConfig.currentPage);
  }

  twitterLogin() {
    this.isSubmitting = true;
    this.userService
      .initTwitter('/provider/twitter/init')
      .subscribe(
        data => {
          this.isSubmitting = false;
          this.utilService.popupCenter({ url: data.authorizeUrl, w: 500, h: 500 });
        },
        err => {
          console.error(err);
          this.isSubmitting = false;
          // this.alertService.error(err.message)
          this._snackBar.open(err.message, 'Dismiss', {
            duration: 3000,
          });
        }
      );
  }

  linkedLogin() {
    this.isSubmitting = true;
    this.userService
      .initLinkedIn('/provider/linkedIn/init')
      .subscribe(
        data => {
          this.isSubmitting = false;
          this.utilService.popupCenter({ url: data.authorizeUrl, w: 500, h: 500 });
        },
        err => {
          console.error(err);
          this.isSubmitting = false;
          this._snackBar.open(err.message, 'Dismiss', {
            duration: 3000,
          });
        }
      );
  }


  askDeleteConfirmation(provider: Provider) {
    const modalRef: NgbModalRef = this.modalService.open(ConfirmDialogComponent, { centered: true });

    modalRef.result.then((userResponse) => {
      console.log(`User's choice: ${userResponse}`);

      if (userResponse)
        this.removeProvider(provider.id);

    }).catch((error) => {

    });
  }

  removeProvider(id: string) {
    this._overlayService.show();
    this.providerService.removeProviderById(id).pipe(finalize(() => {
      this._overlayService.hide();
    })).subscribe((data) => {
      console.log("Done delete");
      this.pageChanged(this.pageConfig.currentPage);
    });
  }
}
