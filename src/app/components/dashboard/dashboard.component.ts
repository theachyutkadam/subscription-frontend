import { Component, OnInit } from '@angular/core';
import { HttpServices } from '../../connections/services/http-services';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  users: any;
  constructor(private _http: HttpServices) {}

  ngOnInit() {
    this.getUsers()
  }

  getUsers() {
    this._http.get('users', '').subscribe((response: any) => {
      console.warn("response", response)
      this.users = response.data
    },
    (err: any) => {
      console.log(err);
    })
  }
}
