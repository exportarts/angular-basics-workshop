import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  private readonly QUERY_PARAM_KEY = 'password';
  private readonly PASSWORD = 'expo';

  constructor(private readonly router: Router) {}
  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let _canActivate = false;
    if (next.queryParamMap.has(this.QUERY_PARAM_KEY)) {
      const pw = next.queryParamMap.get(this.QUERY_PARAM_KEY);
      _canActivate = pw === this.PASSWORD;
    }

    if (!_canActivate) {
      this.router.navigate(['/overview']);
      return of(false);
    }

    return of(true);
  }
  
}
