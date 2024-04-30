import { Component, OnInit } from '@angular/core';
import { HttpServices } from '../../connections/services/http-services';
import { DateFormatPipe } from '../../date-format.pipe';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [DateFormatPipe],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit{
  roles:any;
  constructor(private _http: HttpServices) {}

  ngOnInit(): void {
      this.getRoles()
  }

  getRoles() {
    this._http.get('roles', '').subscribe((response: any) => {
      console.warn("response", response)
      this.roles = response.data
    },
    (err: any) => {
      console.log(err);
    })
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
