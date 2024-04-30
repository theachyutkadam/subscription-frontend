import { Component, OnInit } from '@angular/core';
import { HttpServices } from '../../connections/services/http-services';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  users: any;
updateUser: any;
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

  deleteUsers(userId: any) {
    return this._http.delete(`users/${userId}`);
  }
  
  deleteUser(user: any): void {
    const userId = user.id;
    this.deleteUsers(userId).subscribe(
      () => {
        this.users = this.users?.filter((u: { id: any; }) => u.id !== userId);
      },
      (error: any) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  checkStatus(status: any){
    if(status == "active"){
      return "btn-success"
    }
    if(status == "pending"){
      return "btn-warning"
    }
    if(status == "inactive"){
      return "btn-secondary"
    }
    if(status == "deleted"){
      return "btn-danger"
    }
    return "btn-primary"
  }
}
