import { Component, OnInit } from '@angular/core';
import { HttpServices } from '../../connections/services/http-services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from '../../date-format.pipe';

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [FormsModule, CommonModule, DateFormatPipe],
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.css'
})
export class SubscriptionsComponent implements OnInit {

  subscriptions:any
  selectedSubscription: any;
showUpdateForm: any;
// updateSubscriptions: any;
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

 toggleUpdateForm(): void {
  this.showUpdateForm = !this.showUpdateForm;
}

cancelUpdateUser(): void {
  this.toggleUpdateForm();
}


 deleteSubscriptions(subscriptionId: any) {
  return this._http.delete(`subscriptions/${subscriptionId}`);
}

deleteSubscription(subscription: any): void {
  const subscriptionId = subscription.id;
  this.deleteSubscriptions(subscriptionId).subscribe(
    () => {
      this.subscriptions = this.subscriptions?.filter((u: { id: any; }) => u.id !== subscriptionId);
    },
    (error: any) => {
      console.error('Error deleting subscription:', error);
    }
  );
}

updateSubscriptions(subscription: any): void {
  console.log('Selected Plan:', subscription);
  this.selectedSubscription = { ...subscription };
  console.log('Selected Subscription after setting:', this.selectedSubscription);
  
  this.toggleUpdateForm(); 
}


updateSubscription(subscription: any): void {
  const subscriptionId = subscription.id;
  this._http.put(`subscriptions/${subscriptionId}`, subscription).subscribe(
    (response: any) => {
      console.log('Subscription updated successfully:', response);
    },
    (error: any) => {
      console.error('Error updating subscription:', error);
    }
  );
}
}
