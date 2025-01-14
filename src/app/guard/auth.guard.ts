import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanActivateFn,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '../Services/Auth/auth.service';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate { //,CanActivateChild
  constructor(private authService: AuthService, private router: Router) {}


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //console.log('Token found in localStorage:', this.authService.getToken());

    if (this.authService.isLoggedIn()) {
      console.log('User is logged in');
      return true;
    }

    else {
      console.log('User is not logged in, redirecting to login');
      this.router.navigate(['/login']);
      return false;
    }
  }


}
