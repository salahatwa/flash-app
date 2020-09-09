import { SuccessComponent } from './../../pages/success/success.component';
import { CreatePollComponent } from './../../pages/poll/create-poll/create-poll.component';
import { SurveyComponent } from './../../pages/survey/survey.component';
import { PollComponent } from './../../pages/poll/poll.component';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './../../shared/shared.module';
import { FileUploadComponent } from './../../pages/file-upload/file-upload.component';
import { CreateSurveyComponent } from './../../pages/survey/create-survey/create-survey.component';
import { QuestionComponent } from './../../pages/question/question.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    SharedModule,
    ClipboardModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    PollComponent,
    CreatePollComponent,
    SurveyComponent,
    SuccessComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    FileUploadComponent,
    QuestionComponent,
    CreateSurveyComponent
  ]
})

export class AdminLayoutModule {}
