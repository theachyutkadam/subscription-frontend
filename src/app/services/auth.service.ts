import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuth = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    this.autoSignIn();
  }

  autoSignIn() {
    if (sessionStorage.getItem('authToken')) {
      this.isAuth.next(true);
      // this.router.navigate(['/dashboard']);
    }
  }

  signIn(authToken: string) {
    sessionStorage.setItem('authToken', authToken);
    this.isAuth.next(true);
    this.router.navigate(['/dashboard']);
  }

  signOut() {
    sessionStorage.removeItem('authToken');
    this.isAuth.next(false);
    this.router.navigate(['/login']);
  }
}
