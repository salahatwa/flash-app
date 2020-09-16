import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { OverlayService } from '../../../components/overlay/overlay.service';
import { Channel } from '../../../models/models';
import { ChannelAdminService } from '../../../services/api';

export enum ChannelStatus {
  Display = "1",
  Hide = "0"
}

@Component({
  selector: 'app-channel-operation',
  templateUrl: './channel-operation.component.html',
  styleUrls: ['./channel-operation.component.scss']
})
export class ChannelOperationComponent implements OnInit {

  channelForm: FormGroup;
  formSubmitted = false;
  channel: Channel={};
  ChannelStatus = ChannelStatus;


  constructor(private channelService: ChannelAdminService, private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private _overlayService: OverlayService) {

    this.channelForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      status: new FormControl(1),
      thumbnail: new FormControl(''),
    });

  }

  ngOnInit() {
    let channelId = this.route.snapshot?.params['id'];

    if (channelId && channelId !== 'new') {
      this.channelService.view(channelId).subscribe((channel: Channel) => {
        this.channel = channel;
        console.log(this.channel);
        this.channelForm = new FormGroup({
          name: new FormControl(channel.name, [Validators.required, Validators.minLength(3)]),
          status: new FormControl(channel.status),
          thumbnail: new FormControl(channel.thumbnail),
        });

      }, err => {

      });
    }
  }

  onFileComplete(data: any) {
    if (data.success) {
      console.log(data.data.display_url);
      this.channelForm.controls['thumbnail'].setValue(data.data.display_url);
      this.channel.thumbnail = data.data.display_url;
    }
  }

  onFileRemove(data: any) {
    this.channelForm.controls['thumbnail'].setValue("");
  }

  changeStatus(selected: number) {
    this.channel.status = selected;
  }

  onSubmit() {
    this.formSubmitted = true;
    this._overlayService.show();

    if (this.channelForm.valid) {

      this._overlayService.show();
      Object.assign(this.channelForm.value, this.channel);
      console.log(this.channel);
      this.channelService.update(this.channel).pipe(finalize(() => {
        this._overlayService.hide();
        this.formSubmitted = false;
      })).subscribe(
        (result: Channel) => {
          this.openDismiss('Success created Category ' + result.name, 'Close');
        },
        error => {
          this.openDismiss('Failed to create Category, please try again', 'Close');
        });
    }
  }

  // open snackbar
  openDismiss(message: string, buttontext: string) {
    this._snackBar.open(message, buttontext, {
      duration: 3000,
    });
  }

}
