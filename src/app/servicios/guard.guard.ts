import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
   providedIn: 'root'
})
export class GuardGuard implements CanActivate {
   constructor(private autenticacionService: AutenticacionService, private rutas: Router) {
   }
   canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let currentUser = this.autenticacionService.UsuarioAutenticado;
      if (currentUser && currentUser.token) {
         return true;
      } else {
         this.rutas.navigate(['/abrirportfolio']);
         return false;
      }
   }
}