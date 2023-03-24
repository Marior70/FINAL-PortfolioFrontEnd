import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
// rutaURL: string = "./assets/datos/"
baseURL: string = "http://localhost:8080/api/curso";

constructor(private http: HttpClient) { }

obtenerDatos(): Observable<any> {
   return this.http.get<any>(this.baseURL + "/listar");
}

editarDatos(id: number, form: FormGroup): Observable<any> {
   return this.http.put<any>(this.baseURL + "/editar/" + `${id}`, form.value);
}

agregarDatos(form: FormGroup): Observable<any> {
   return this.http.post<any>(this.baseURL + "/nuevo", form.value);
}

borrarDatos(id: number): Observable<any> {
   return this.http.delete<any>(this.baseURL + "/borrar/" + `${id}`);
}
}
