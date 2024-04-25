import { Component, OnInit } from '@angular/core';
import { HttpServices } from '../../connections/services/http-services';

@Component({
  selector: 'app-authorizations',
  standalone: true,
  imports: [],
  templateUrl: './authorizations.component.html',
  styleUrl: './authorizations.component.css'
})
export class AuthorizationsComponent implements OnInit {
  authorizations:any
  constructor(private _http: HttpServices) {}

  ngOnInit(): void {
    this.getAuthorizations()
}

getAuthorizations() {
  this._http.get('authorizations', '').subscribe((response: any) => {
    console.warn("response", response)
    this.authorizations = response.data
  },
  (err: any) => {
    console.log(err);
  })
}

checkAuth(status: any){
  if(status == "1"){
    return "btn-success"
  }
  if(status == "0"){
    return "btn-danger"
  }
  return "btn-primary"
}
}
