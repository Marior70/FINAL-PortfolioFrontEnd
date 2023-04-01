import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'; // Necesario para hacer la llamada a la api
import { BehaviorSubject, Observable, pipe } from 'rxjs'; // Lib de JS de programación reactiva que facilita la composición de cód asíncrono basado en la secuencia observable.
// BehaviorSubject, además de exponer médotos como next, error y complete, tiene nocion de estado, que al suscribirnos, nos permite aceeder al ultimo valor disponible.
import { map } from 'rxjs/operators';

@Injectable({
   providedIn: 'root'
})
export class AutenticacionService {
   url = "http://localhost:8080/auth/abrirportfolio";
   currentUserSubject: BehaviorSubject<any>;
   // portfolioAbierto: boolean = true;

   constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')||'{}'))
   }

   IniciarSesion(credenciales: any): Observable<any> {

      // console.log("-----> Autenticacion.service.IniciarSesion: " + JSON.stringify(credenciales));

      return this.http.post(this.url, credenciales).pipe(map(data => {
            sessionStorage.setItem('currentUser', JSON.stringify(data));
            this.currentUserSubject.next(data);
            return data;
         }))
   }

   get UsuarioAutenticado() {
      return this.currentUserSubject.value;
   }

   get EsAdmin() {
      return this.currentUserSubject.value.rol == "ROLE_ADMIN";
   }

   /* get PortfolioAbierto() {
      return !this.portfolioAbierto;
   } */

   borrarToken(){
      sessionStorage.removeItem('currentUser');
   }
}

/* // Versión si recibo la data en el header "Authorization" (A CORREGIR / TERMINAR DE DESARROLLAR)

url = "http://localhost:8080/auth/abrirportfolio";
      tokenActualSubject: BehaviorSubject<any>;
      // rolActualSubject: BehaviorSubject<any>
   
      constructor(private http: HttpClient) {
         this.tokenActualSubject = new BehaviorSubject<any>(sessionStorage.getItem('tokenActual'));
         // this.rolActualSubject = new BehaviorSubject<any>(sessionStorage.getItem('Rol'))
      }
   
      IniciarSesion(credenciales: any): Observable<any> {
   
         console.log("-----> Autenticacion.service.IniciarSesion: " + JSON.stringify(credenciales));
         
         return this.http.post(this.url, credenciales,{observe:'response'}).pipe(map(
            (response: HttpResponse<any>) => {
               const body = response.body;
               const headers = response.headers;
               const bearerToken = headers.get('Authorization');
               
               console.log("-----> bearerToken= " + bearerToken);
               
               const token = bearerToken?.replace("Bearer ","");
               sessionStorage.setItem('token',JSON.stringify(token));

               
               console.log("-----> sessionStorage.token: " + sessionStorage.getItem('token'));
               
               const rol = headers.get('Rol');
               sessionStorage.setItem('Rol',rol||'');

               // this.tokenActualSubject.next(response);
               
               return body;
            }
         )) 
      }
   
      get UsuarioAutenticado() { 
         console.log("-----> IniciarSesion.usuarioAutenticado: " + this.tokenActualSubject.value);
         return this.tokenActualSubject.value;  
      }
      get RolUsuarioAutenticado() {      
         return sessionStorage.getItem('rolActual') == "ROLE_ADMIN";
      }  
*/