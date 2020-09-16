import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '../components/components.module';
import { AuthModule } from '../services/auth/auth.module';

@NgModule({
  imports: [
    CommonModule,
    // RouterModule,
    // NgbModule,
    AuthModule,
    ComponentsModule
    //FlashSurveyMaterialModules
  ],
  declarations: [
    //FileUploadComponent
  ],
  exports: [
    //FileUploadComponent
    AuthModule,
    ComponentsModule
  ]
})
export class SharedModule { }
