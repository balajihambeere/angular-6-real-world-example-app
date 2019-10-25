import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {
  AuthService, MessageService, JwtService, ApiService, ErrorHandlerService,
  AuthGuard, CourseService, LessonService, CategoryService, TopicService, HomeService,
  LanguageService, CommunicationService, SharedModule
} from './shared';

import { httpInterceptorProviders } from './shared/http-interceptors';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'Learningtv' }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HomeModule,
    AppRoutingModule,
    SharedModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    httpInterceptorProviders,
    AuthService,
    MessageService,
    JwtService,
    ApiService,
    ErrorHandlerService,
    AuthGuard,
    CategoryService,
    CourseService,
    LessonService,
    TopicService,
    HomeService,
    LanguageService,
    CommunicationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
