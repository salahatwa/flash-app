import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { ChannelComponent } from '../../pages/channel/channel.component';
import { ChannelOperationComponent } from '../../pages/channel/channel-operation/channel-operation.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { QuestionComponent } from './../../pages/question/question.component';
import { SuccessComponent } from './../../pages/success/success.component';
import { CreateSurveyComponent } from './../../pages/survey/create-survey/create-survey.component';
import { SurveyComponent } from './../../pages/survey/survey.component';
import { SharedModule } from './../../shared/shared.module';
import { AdminLayoutRoutes } from './admin-layout.routing';



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
    ChannelComponent,
    ChannelOperationComponent,
    SurveyComponent,
    SuccessComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    QuestionComponent,
    CreateSurveyComponent
  ]
})

export class AdminLayoutModule {}
