import { Injectable } from '@angular/core';
import * as Msal from '@azure/msal-angular';
import { PublicClientApplication } from '@azure/msal-browser';
import { config } from './../config/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MsaluserService {

  private accessToken: any;
  public clientApplication: PublicClientApplication;

  constructor() {
    this.clientApplication = new PublicClientApplication(config);
  }

  public authCallback(errorDesc: string, token: any, error: string, tokenType: any) {
    if (token) {

    } else {
      console.log(error + ':' + errorDesc);
    }
  }

  public GetAccessToken(): Observable<any> {

    if (sessionStorage.getItem('msal.idToken') !== undefined && sessionStorage.getItem('msal.idToken') != null) {
      this.accessToken = sessionStorage.getItem('msal.idToken');
    }
    return this.accessToken;
  }

  public getCurrentUserInfo() {
    const user = this.clientApplication.getActiveAccount();
    alert(user?.name);
  }

  public logout() {
    this.clientApplication.logout();
  }

}
