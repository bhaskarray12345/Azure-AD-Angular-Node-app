import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../model/employee';
import { BackendService } from '../service/backend.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  employee: Employee = {
    employeeID: 0,
    name: '',
    age: 0,
    designation: ''
  }
  constructor(
    private backendService: BackendService)
   { }

  ngOnInit() {
    this.backendService.getProfile().subscribe({
      next: data => {
          console.log('data ',data)
          this.employee = data

      },
      error: error => {
          console.error('There was an error!', error);
      }
  });
  }
}