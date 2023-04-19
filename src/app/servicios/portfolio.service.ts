import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class PortfolioService {
   // rutaURL: string = "./assets/datos/"  
   baseURL: string = "https://portfolio-mrl-api.onrender.com/api/";

   constructor(private http: HttpClient) { }

   obtenerDatos(): Observable<any> {

      // Versión 1 para obtener los datos de un json ubicado en la carpeta ./assets/datos/
      //  return this.http.get(this.pathJson + 'Portfolio-Latin.json');

      // Versión 2 para obtener los datos desde una URL de una api en un servidor Backend
      return this.http.get<any>(this.baseURL + "portfolio");// 
   }

   // editarDatos, agregarDatos y borrarDatos en versión parametrizada para utilizar un único servicio en el Portfolio
   // La desventaja: en cada llamada se actualiza la vista completa
   
   /* editarDatos(rutaURL: string, id: number, datosForm: any): Observable<any> {
      return this.http.put<any>(this.baseURL + rutaURL + `${id}`, datosForm);
   }

   agregarDatos(rutaURL: string, datosForm: any): Observable<any> {
      return this.http.post<any>(this.baseURL + rutaURL, datosForm)
   }

   borrarDatos(rutaURL: string): Observable<any> {
      return this.http.delete<any>(this.baseURL + rutaURL);
   } */

}
