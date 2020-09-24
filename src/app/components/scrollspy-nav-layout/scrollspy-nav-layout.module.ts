import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

import { ScrollspyNavLayoutComponent } from './scrollspy-nav-layout.component';
import { ScrollspyNavComponent } from './scrollspy-nav/scrollspy-nav.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MarkdownModule,
    MatDividerModule,
  ],
  declarations: [ScrollspyNavComponent,ScrollspyNavLayoutComponent],
  exports: [ScrollspyNavLayoutComponent],
})
export class ScrollspyNavLayoutModule { }
