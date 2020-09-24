import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule, SecurityContext } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AnchorService, AngularMarkdownEditorModule, MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { ComponentsModule } from '../components/components.module';
import { ScrollspyNavLayoutModule } from '../components/scrollspy-nav-layout/scrollspy-nav-layout.module';
import { AuthModule } from '../services/auth/auth.module';
import { TimeAgoModule } from './timeAgo/time-ago.module';

export function markedOptionsFactory(anchorService: AnchorService): MarkedOptions {
  const renderer = new MarkedRenderer();

  // fix `href` for absolute link with fragments so that _copy-paste_ urls are correct
  renderer.link = (href: string, title: string, text: string) => {
    return MarkedRenderer.prototype.link.call(renderer, anchorService.normalizeExternalUrl(href), title, text);
  };

  return { renderer };
}

@NgModule({
  imports: [
    CommonModule,
    // RouterModule,
    // NgbModule,
    AuthModule,
    ReactiveFormsModule,
    ComponentsModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory,
        deps: [AnchorService],
      },
      sanitize: SecurityContext.NONE,
    }),
    ScrollspyNavLayoutModule,
    AngularMarkdownEditorModule.forRoot({
      // add any Global Options/Config you might want
      // to avoid passing the same options over and over in each components of your App
      iconlibrary: 'glyph'
    }),
    TimeAgoModule
    //FlashSurveyMaterialModules
  ],
  declarations: [
    //FileUploadComponent
  ],
  exports: [
    //FileUploadComponent
    AuthModule,
    ComponentsModule,
    MarkdownModule,
    ScrollspyNavLayoutModule,
    AngularMarkdownEditorModule,
    ReactiveFormsModule,
    TimeAgoModule
  ]
})
export class SharedModule { }
