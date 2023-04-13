import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from "src/environments/environment";
import { MsalModule, MsalRedirectComponent, MsalGuard, MsalInterceptor } from "@azure/msal-angular";
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';

import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { MsaluserService } from "./service/msaluser.service";

//export const protectedResourceMap: any = [
  //[environment.baseUrl, environment.scopeUri],
//];

//export function MSALInstanceFactory(): IPublicClientApplication {
//
// return new PublicClientApplication({
// auth: {
//    clientId: "d1f26553-c9bd-46b6-90d5-52ee649dbcac",
//   redirectUri: "http://localhost:4200",
//    postLogoutRedirectUri: "http://localhost:4200",
//}
/// })

//}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MsalModule.forRoot(new PublicClientApplication({
      auth: {
        clientId: "d1f26553-c9bd-46b6-90d5-52ee649dbcac", // This is your client ID
        authority: "https://login.microsoftonline.com/c5b71890-2994-4268-8eed-c824c357f508", // This is your tenant ID
        redirectUri: "http://localhost:4200/",
        // This is your redirect URI
      },
      cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false, // Set to true for Internet Explorer 11
      }
    }), {
      interactionType: InteractionType.Redirect, // MSAL Guard Configuration
      authRequest: {
        scopes: ['user-read']
      }
    }, {
      interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
      protectedResourceMap: new Map([ 
        ['https://graph.microsoft.com', ['api://591701bd-003d-4ac8-a675-c2dcc49b7254/user-read']]
    ])
    })
  ],
  providers: [
    HttpClient,
    MsaluserService,
    MsalGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }