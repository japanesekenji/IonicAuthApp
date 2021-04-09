import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanActivate {
  
   constructor(private api: ApiService, private router: Router) {

   }

  canActivate(): Observable<boolean> {
    return this.api.user.pipe(
      take(1),
      map(user => {
        if (!user) {
          return true;
        } else {
          this.router.navigateByUrl('/app');
          return false;
        }
      })
    )
  }
}
