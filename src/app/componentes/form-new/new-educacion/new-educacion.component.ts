import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EducacionService } from 'src/app/servicios/educacion.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
   selector: 'app-new-educacion',
   templateUrl: './new-educacion.component.html',
   styleUrls: ['./new-educacion.component.css']
})
export class NewEducacionComponent implements OnInit {
   formNewEducacion: FormGroup;
   educacionList: any;
   esAdmin = false;
   pathLogo = "./assets/img/";

   constructor(private formBuilder: FormBuilder,private eduServ: EducacionService,private datosPortfolio: PortfolioService, private authServ: AutenticacionService, private ruta: Router) {
      this.formNewEducacion = this.formBuilder.group(
         {
            entidad: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ0-9 ,./"\'-_]*')]],
            logo: ['', [Validators.maxLength(35), Validators.pattern('[a-zA-Z0-9._-]+\.png$')]],
            localidad: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ0-9 ,./"\'-_]*')]],
            provincia: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ0-9 ,./"\'-_]*')]],
            titulo: ['', [Validators.minLength(3), Validators.maxLength(35), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ0-9 ,./"\'-_]*')]],
            nivel: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern('[a-zA-Z]*')]],
            estado: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100), Validators.pattern('[A-Z]*')]],
            fechaIni: ['', [Validators.required, Validators.pattern('[a-zA-Z]{3}\-(19[3-9]{1}|20[0-2]{1})[0-9]{1}')]],
            fechaFin: ['', [Validators.pattern('[a-zA-Z]{3}\-(19[3-9]{1}|20[0-2]{1})[0-9]{1}')]],
         })
   }

   ngOnInit(): void {
      this.esAdmin = this.authServ.EsAdmin;
   }

   get Entidad() {
      return this.formNewEducacion.get('entidad');
   }

   get Logo() {
      return this.formNewEducacion.get('logo');
   }

   get Localidad() {
      return this.formNewEducacion.get('localidad');
   }

   get Provincia() {
      return this.formNewEducacion.get('provincia');
   }

   get Titulo() {
      return this.formNewEducacion.get('titulo');
   }

   get Nivel() {
      return this.formNewEducacion.get('nivel');
   }

   get Estado() {
      return this.formNewEducacion.get('estado');
   }

   get FechaIni() {
      return this.formNewEducacion.get('fechaIni');
   }

   get FechaFin() {
      return this.formNewEducacion.get('FechaFin');
   }

   onEnviarNewEducacion(event: Event) {
      event.preventDefault;
      // const rutaURL = "educacion/nueva"

      this.eduServ.agregarDatos(this.formNewEducacion).subscribe(data => {
         this.eduServ.obtenerDatos().subscribe(educacion => {
            this.educacionList = educacion;
         });
      });
      this.ruta.navigate(['/portfolio']);
   }
}
