import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
   providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

   constructor(private autenticationService: AutenticacionService) {
      
   }

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let currentUser = this.autenticationService.UsuarioAutenticado; //estamos leyendo del observable y no del sessionStorage
      if (currentUser && currentUser.token) {
         req = req.clone({
            setHeaders: {
               Authorization: `Bearer ${currentUser.token}`
            }
         })
      }
      console.log("-----> Interceptor está corriendo, currentUser: " + JSON.stringify(currentUser.token));
      return next.handle(req);
   }
}

/*
      let token = this.autenticationService.UsuarioAutenticado; //leyendo del observable y no del sessionStorage
      //  if(currentUser && currentUser.accessToken) {
      if (token != '{}') {
         console.log("-----> Authorización OK --> " + `${token}`);
         req = req.clone({
            setHeaders: {
               //  Authorization: `Bearer $(currentUser.accessToken)`
               Authorization: `Bearer ${token}`
            }
         })
      }
      return next.handle(req);
*/