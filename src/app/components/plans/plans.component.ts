import { Component, OnInit } from '@angular/core';


import { HttpServices } from '../../connections/services/http-services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// import { DatePipe } from '@angular/common';
import { DateFormatPipe } from '../../date-format.pipe';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [FormsModule, CommonModule, DateFormatPipe],
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  plans: any;
  formattedDate: string | undefined;
  showUpdateForm: boolean = false;
  selectedPlan: any | null = null;
  roleMappings: ReadonlyMap<unknown, unknown> | undefined;

  constructor(private _http: HttpServices) {}

  ngOnInit(): void {
    this.getPlans();
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

  // formatDate(dateString: string) {
  //   this.formattedDate = this.datePipe.transform(dateString, 'dd MMM yy') || '';
  // }

  toggleUpdateForm(): void {
    this.showUpdateForm = !this.showUpdateForm;
  }

  cancelUpdateUser(): void {
    this.toggleUpdateForm();
  }

  deletePlans(planId: any) {
    return this._http.delete(`plans/${planId}`);
  }

  deletePlan(plan: any): void {
    const planId = plan.id;
    this.deletePlans(planId).subscribe(
      () => {
        this.plans = this.plans?.filter((u: { id: any; }) => u.id !== planId);
      },
      (error: any) => {
        console.error('Error deleting plan:', error);
      }
    );
  }

  updatePlans(plan: any): void {
    console.log('Selected Plan:', plan);
    this.selectedPlan = { ...plan };
    console.log('Selected Plan after setting:', this.selectedPlan);

    this.toggleUpdateForm();
  }
  updatePlan(plan: any): void {
    const planId = plan.id;
    console.log('Plan:', plan);
    console.log('Plan ID:', planId);

    this._http.put(`plans/${planId}`, plan).subscribe(
      (response: any) => {
        console.log('Plan updated successfully:', response);
      },
      (error: any) => {
        console.error('Error updating plan:', error);
      }
    );
  }

  // updatePlan(plan: any): void {
  //   const planId = plan.id;
  //   this._http.put(`plans/${planId}`, plan).subscribe(
  //     (response: any) => {
  //       console.log('Plan updated successfully:', response);
  //       // Optionally, you can perform additional actions upon successful update
  //       // For example, update the plans list or display a success message
  //     },
  //     (error: any) => {
  //       console.error('Error updating plan:', error);
  //       if (error.error && error.error.error === 'No plan found with this id') {
  //         // Display an error message indicating that no plan was found with the provided ID
  //         alert('No plan found with this ID. Please try again.');
  //       } else {
  //         // Handle other error scenarios
  //         alert('An error occurred while updating the plan. Please try again.');
  //       }
  //     }
  //   );
  // }

  checkActive(status: any): string {
    return status == 1 ? "btn-success" : "btn-danger";
  }
}

