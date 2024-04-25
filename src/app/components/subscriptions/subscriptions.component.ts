import { Component, OnInit } from '@angular/core';
import { HttpServices } from '../../connections/services/http-services';

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [],
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.css'
})
export class SubscriptionsComponent implements OnInit {
  subscriptions:any
  constructor(private _http: HttpServices) {}

  ngOnInit(): void {
    this.getSubscriptions()
  }

  getSubscriptions() {
    this._http.get('subscriptions', '').subscribe((response: any) => {
    console.warn("response", response)
    this.subscriptions = response.data
  },
  (err: any) => {
    console.log(err);
  })
 }

}
