import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';
import { ProviderListComponent } from './../../pages/task/task-operation/provider-list/provider-list.component';
import { TaskConfirmationDialogComponent } from './../../pages/task/task-operation/task-confirmation-create/task-confirmation-dialog.component';
import { TaskOperationComponent } from './../../pages/task/task-operation/task-operation.component';
import { ChannelOperationComponent } from '../../pages/channel/channel-operation/channel-operation.component';
import { ChannelComponent } from '../../pages/channel/channel.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { ProviderComponent } from './../../pages/provider/provider.component';
import { QuestionComponent } from './../../pages/question/question.component';
import { SuccessComponent } from './../../pages/success/success.component';
import { CreateSurveyComponent } from './../../pages/survey/create-survey/create-survey.component';
import { SurveyComponent } from './../../pages/survey/survey.component';
import { SharedModule } from './../../shared/shared.module';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { TaskListComponent } from './../../pages/task/task-list.component';



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
    ProviderComponent,
    ChannelOperationComponent,
    ProviderListComponent,
    TaskListComponent,
    TaskOperationComponent,
    TaskConfirmationDialogComponent,
    SurveyComponent,
    SuccessComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    QuestionComponent,
    CreateSurveyComponent
  ]
})

export class AdminLayoutModule { }
