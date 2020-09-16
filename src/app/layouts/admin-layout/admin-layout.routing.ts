import { Routes } from '@angular/router';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { ChannelComponent } from '../../pages/channel/channel.component';
import { ChannelOperationComponent } from '../../pages/channel/channel-operation/channel-operation.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { SuccessComponent } from './../../pages/success/success.component';
import { CreateSurveyComponent } from './../../pages/survey/create-survey/create-survey.component';
import { SurveyComponent } from './../../pages/survey/survey.component';
import { AuthGuard } from './../../services/auth/auth-guard.service';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'user-profile',   component: UserProfileComponent, canActivate: [AuthGuard]  },
    { path: 'category',   component: ChannelComponent, canActivate: [AuthGuard]  },
    { path: 'category/view/:id',   component: ChannelOperationComponent, canActivate: [AuthGuard]  },
    { path: 'survey',   component: SurveyComponent , canActivate: [AuthGuard] },
    { path: 'survey/new',   component: CreateSurveyComponent},
    { path: 'success/:type/:id',   component: SuccessComponent, canActivate: [AuthGuard] }
];
