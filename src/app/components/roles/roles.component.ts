import { Component, OnInit } from '@angular/core';
import { HttpServices } from '../../connections/services/http-services';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit{
updateUser(arg0: any) {
throw new Error('Method not implemented.');
}
deleteUser(arg0: any) {
throw new Error('Method not implemented.');
}
  roles:any;
  constructor(private _http: HttpServices) {}

  ngOnInit(): void {
      this.getRoles()
  }

  getRoles() {
    console.log("get roles method")
    this._http.get('roles', '').subscribe((response: any) => {
      console.warn("response", response)
      this.roles = response.data
      console.log("get roles successfull")
    },
    (err: any) => {
      console.log(err);
    })
  }

  deleteRoles(roleId: any) {
    return this._http.delete(`roles/${roleId}`);
  }
  
  deleteRole(role: any): void {
    const roleId = role.id;
    this.deleteRoles(roleId).subscribe(
      () => {
        this.roles = this.roles?.filter((u: { id: any; }) => u.id !== roleId);
      },
      (error: any) => {
        console.error('Error deleting role:', error);
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
    if(status == "null"){
      return "btn-danger"
    }
    
  
    return "btn-primary"
  }

  checkDeleted(status: any): string {
    if (status === "null") {
      return "btn-success";
    }
    if (status === "0") {
      return "btn-danger";
    }
    return "btn-primary";
  }

}


