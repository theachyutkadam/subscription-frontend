import { Component, OnInit } from '@angular/core';


import { HttpServices } from '../../connections/services/http-services';
import { DateFormatPipe } from '../../date-format.pipe';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [DateFormatPipe],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.css'
})
export class PlansComponent implements OnInit {
  plans:any
  constructor(private _http: HttpServices) {}

  ngOnInit(): void {
    this.getPlans()
  }

  getPlans() {
    this._http.get('plans', '').subscribe((response: any) => {
    console.warn("response", response)
    this.plans = response.data
  },
  (err: any) => {
    console.log(err);
  })
 }

 checkActive(status: any){
  if(status == "1"){
    return "btn-success"
  }
  if(status == "0"){
    return "btn-danger"
  }
  return "btn-primary"
}

}
