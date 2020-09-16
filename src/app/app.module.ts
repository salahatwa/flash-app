import { AppOverlayModule } from './components/overlay/overlay.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PreLoginLayoutComponent } from './layouts/prelogin-layout/prelogin-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { FlashSurveyMaterialModules } from './material.module';
import { ProgressSpinnerComponent, ProgressSpinnerModule } from './components/progress-spinner/progress-spinner.module';

import { OverlayService } from './components/overlay/overlay.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    ProgressSpinnerModule,
    SharedModule,
    FlashSurveyMaterialModules
  ],
  declarations: [
    ProgressSpinnerComponent,
    AppComponent,
    AdminLayoutComponent,
    PreLoginLayoutComponent
  ],
  entryComponents: [
    ProgressSpinnerComponent,
    AppComponent
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
