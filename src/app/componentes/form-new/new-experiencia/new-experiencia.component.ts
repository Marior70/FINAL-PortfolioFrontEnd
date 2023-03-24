import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-new-experiencia',
  templateUrl: './new-experiencia.component.html',
  styleUrls: ['./new-experiencia.component.css']
})
export class NewExperienciaComponent implements OnInit {
   formNewExperiencia: FormGroup;
   experienciaList: any;
   esAdmin = false;

   constructor(private formBuilder: FormBuilder,private expServ: ExperienciaService,private datosPortfolio: PortfolioService, private authServ: AutenticacionService, private ruta: Router) {
     this.formNewExperiencia = this.formBuilder.group(
       {
         entidad: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ0-9 ,./"\'-_]*')]],     
         logo: ['', [Validators.maxLength(35), Validators.pattern('[a-zA-Z0-9._-]+\.png$')]],
         rol: ['', [Validators.maxLength(100), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ0-9 ,./"\'-_]*')]],
         descripcion: ['', [Validators.required, Validators.maxLength(255), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ0-9 ,./"\'-_]*')]],
         fechaIni: ['', [Validators.required, Validators.pattern('[a-zA-Z]{3}\-(19[3-9]{1}|20[0-2]{1})[0-9]{1}')]],
         fechaFin: ['', [Validators.pattern('^$|^[a-zA-Z]{3}\-(19[3-9]{1}|20[0-2]{1})[0-9]{1}$')]],
       })
   }
 
   ngOnInit(): void {
      this.esAdmin = this.authServ.EsAdmin;
   }
 
   get Entidad() {
     return this.formNewExperiencia.get('entidad');
   }
 
   get Logo() {
     return this.formNewExperiencia.get('logo');
   }
 
   get Rol() {
     return this.formNewExperiencia.get('rol');
   }
 
   get Descripcion() {
     return this.formNewExperiencia.get('descripcion');
   }
 
   get FechaIni() {
     return this.formNewExperiencia.get('fechaIni');
   }
 
   get FechaFin() {
     return this.formNewExperiencia.get('FechaFin');
   }
 
   onEnviarNewExperiencia(event: Event) {
      event.preventDefault;
      const rutaURL = "experiencia/nueva"

      this.expServ.agregarDatos(this.formNewExperiencia).subscribe(data => {
         this.expServ.obtenerDatos().subscribe(experiencias => {
            this.experienciaList = experiencias;
         });
      });
      this.ruta.navigate(['/portfolio']);
      }
}
