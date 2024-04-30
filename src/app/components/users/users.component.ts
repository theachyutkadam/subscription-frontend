import { Component, OnInit } from '@angular/core';
import { HttpServices } from '../../connections/services/http-services';
import { DateFormatPipe } from '../../date-format.pipe';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [DateFormatPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
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

  checkStatus(status: any){
    if(status == "active"){
      return "btn-success"
    }else if(status == "pending"){
      return "btn-warning"
    }else if(status == "inactive"){
      return "btn-secondary"
    }else if(status == "deleted"){
      return "btn-danger"
    }
    return "btn-primary"
  }
}
