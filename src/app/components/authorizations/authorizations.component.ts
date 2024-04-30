import { Component, OnInit } from '@angular/core';
import { HttpServices } from '../../connections/services/http-services';
import { DateFormatPipe } from '../../date-format.pipe';

@Component({
  selector: 'app-authorizations',
  standalone: true,
  imports: [DateFormatPipe],
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

checkAccess(status: any){
  return status == "1" ? "btn-success" : "btn-danger"
}
}
