import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { OverlayService } from '../../components/overlay/overlay.service';
import { ChannelAdminService } from '../../services/api';
import { ConfirmDialogComponent } from './../../components/dialogs/confirm-dialog/confirm-dialog.component';
import { PaginationConfig } from './../../components/pagination/pagination';
import { Channel, PageChannel } from './../../models/models';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {

  pageConfig: PaginationConfig = {
    currentPage: 0,
    totalPages: 1,
    totalElements: 0
  }

  channels: Channel[];

  isSubmitted: boolean;


  constructor(private channelService: ChannelAdminService, private modalService: NgbModal,
    private _snackBar: MatSnackBar,
    private _overlayService: OverlayService) {
    this.getChannels();
  }

  getChannels(pageNo?: number) {
    this._overlayService.show();
    this.channelService.listPage(pageNo).pipe().subscribe((data: PageChannel) => {
      this.channels = data.content;
      this.pageConfig.totalElements = data.totalElements;
      this.pageConfig.totalPages = data.totalPages;
      this._overlayService.hide();
    },
      error => {
        this._overlayService.hide();
        this.openDismiss(error.error, "Dismiss");
      });
  }

  pageChanged(pagenumber) {
    this.pageConfig.currentPage = pagenumber;
    this.getChannels(this.pageConfig.currentPage);
  }

  ngOnInit() { }

  askDeleteConfirmation(channel: Channel) {
    const modalRef:NgbModalRef = this.modalService.open(ConfirmDialogComponent, { centered: true });

    modalRef.result.then((userResponse) => {
      console.log(`User's choice: ${userResponse}`);

      if (userResponse)
        this.deleteChannel(channel.id);

    }).catch((error) => {

    });
  }

  counter(i: number) {
    return new Array(i);
  }

  updateWeight(channel: Channel) {
    this._overlayService.show();
    this.channelService.weight(channel.id, channel.weight).pipe(finalize(() => {
      this._overlayService.hide();
    })).subscribe((data) => {
      this.getChannels(this.pageConfig.currentPage);
    });
  }

  deleteChannel(channelId) {
    this._overlayService.show();
    this.channelService.delete(channelId).subscribe((data) => {
      this.openDismiss("Deleted successfully", "Dismiss");
      this.pageChanged(this.pageConfig.currentPage);
    },
      error => {
        this._overlayService.hide();
        switch (error.error) {
          case 'InvalidOperation':
            this.openDismiss("You are no longer authorized to delete this poll", "Dismiss");
            break;
          default:
            this.openDismiss("Something went wrong we can investiage further", "Dismiss");
            break;
        }
      });
  }

  // open snackbar
  openDismiss(message: string, buttontext: string) {
    this._snackBar.open(message, buttontext, {
      duration: 3000,
    });
  }

}
