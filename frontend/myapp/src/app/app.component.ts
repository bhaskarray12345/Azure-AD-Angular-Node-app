import { Component } from "@angular/core";
import { Employee } from "./model/employee";
import { DataService } from "./service/data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "AzureMSALAngular";

  employees: Employee[] | undefined;
  errorMessage: any;
  isLoggedIn: boolean = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getEmployees().subscribe(
      (values) => {
        this.employees = values;
        this.isLoggedIn = true
        console.log(values);
      },
      (error) => {
        console.log(error);
        this.errorMessage = error
      }
    );
  }
  getUser(){  
    this.dataService.getCurrentUserInfo();  
  }  
  
  logout(){  
    this.dataService.logout();  
  }  
}