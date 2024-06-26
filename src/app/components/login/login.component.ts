import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { HttpServices } from '../../connections/services/http-services';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // email: any
  // password: any
  login_form: FormGroup | any
  input_error_message = "Invalid filed"

  constructor(
    private authService: AuthService,
    private _http: HttpServices,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  form_fields = {
    email: ['', Validators.required],
    password: ['', Validators.required],
  }

  ngOnInit() {
    // this.auth.isLogin()
    this.login_form = this.fb.group(this.form_fields)
  }

  login() {
    const params = {
      "email": this.login_form.value.email,
      "password": this.login_form.value.password
    }
    this._http.post('users/login', params).subscribe((response: any) => {
      console.warn("response", response)
      if(response.status == "success"){
        this.authService.signIn(response.token)
      }else{
        console.error(response.errors)
      }
    },(err: any)=>{
      console.error(err)
    })
  }
}
