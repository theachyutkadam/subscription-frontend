import { Component, OnInit } from '@angular/core';
import { HttpServices } from '../../connections/services/http-services';
import { DateFormatPipe } from '../../date-format.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [DateFormatPipe, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {

  updateRole(arg0: any) {
    throw new Error('Method not implemented.');
  }
  roles: any;
  selectedRole: any | null = null;
  showUpdateModal: boolean = false;
  newRole: any = {
    name: '',
    status: '',
    description: '',
    deletedAt: '',
  };
  roleForm!: FormGroup;
  fb: FormBuilder = new FormBuilder();

  constructor(private _http: HttpServices) { }

  ngOnInit(): void {
    this.getRoles();
    this.roleForm = this.fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required],
      deletedAt: ['', Validators.required]
    });
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

  // createRoles(newRole: any) {
  //   console.log('Roles Start', newRole)
  //   this._http.post('roles', newRole).subscribe(
  //     (response: any) => {
  //       console.log('Role created successfully:', response);
  //       this.roles.push(response.data);
  //     },
  //     (error: any) => {
  //       console.error('Error creating Role:', error);
  //       console.log('Roles', newRole)
  //     }
  //   );
  // }
  createRoles() {
    const params = {
      "name": this.roleForm.value.name,
      "status": 'active',
      "description": this.roleForm.value.description,
      // "deletedAt" : 'null'
    }
    this._http.post('roles', params).subscribe(
      (response: any) => {
        console.log('Role created successfully:', response);
        this.roles.push(response.data);
      },
      (error: any) => {
        console.error('Error creating Role:', error);
        console.log('Roles', params)
      }
    );
  }

  checkStatus(status: any) {
    if (status == "active") {
      return "btn-success"
    }
    if (status == "pending") {
      return "btn-warning"
    }
    if (status == "inactive") {
      return "btn-secondary"
    }
    if (status == "deleted") {
      return "btn-danger"
    }
    return "btn-primary"
  }

  checkDeleted(status: any): string {
    return status == null ? "btn-success" : "btn-danger"
  }
}
