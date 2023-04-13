import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Employee } from "../model/employee";
import { MsaluserService } from "./msaluser.service";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = environment.baseUrl + "api/Employee/Employees";

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private http: HttpClient, private msalService: MsaluserService) {}

  getEmployees(): Observable<Employee[]> {

    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        //Authorization: "Bearer " + this.msalService.GetAccessToken(),
        Authorization: "Bearer " + "606ab769-02c6-4de1-b355-ca211b268cec.c5b71890-2994-4268-8eed-c824c357f508-login.windows.net-idtoken-d1f26553-c9bd-46b6-90d5-52ee649dbcac-c5b71890-2994-4268-8eed-c824c357f508---",
      }),
    };

    return this.http.get(this.url, this.httpOptions).pipe((response: any) => {
      
      return response;
    });

    
  }
  getCurrentUserInfo() {
    this.msalService.getCurrentUserInfo();
  }

  logout() {
    this.msalService.logout();
  }
}
