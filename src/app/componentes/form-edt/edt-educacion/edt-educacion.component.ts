import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EducacionService } from 'src/app/servicios/educacion.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';


@Component({
   selector: 'app-edt-educacion',
   templateUrl: './edt-educacion.component.html',
   styleUrls: ['./edt-educacion.component.css']
})
export class EdtEducacionComponent implements OnInit {
   formEdtEducacion: FormGroup;
   educacionList: any;
   esAdmin = false;

   constructor(private formBuilder: FormBuilder, private eduServ: EducacionService,private authServ: AutenticacionService, private datosPortfolio: PortfolioService, private activatedRouter: ActivatedRoute, private ruta: Router) {
      this.formEdtEducacion = this.formBuilder.group(
         {
            id: '',
            entidad: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ0-9 ,./"\'-_]*')]],
            logo: ['', [Validators.maxLength(35), Validators.pattern('[a-zA-Z0-9._-]+\.png$')]],
            localidad: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ0-9 ,./"\'-_]*')]],
            provincia: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ0-9 ,./"\'-_]*')]],
            titulo: ['', [Validators.minLength(3), Validators.maxLength(35), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ0-9 ,./"\'-_]*')]],
            nivel: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern('[a-zA-Z]*')]],
            estado: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100), Validators.pattern('[A-Z]*')]],
            fechaIni: ['', [Validators.required, Validators.pattern('[a-zA-Z]{3}\-(19[3-9]{1}|20[0-2]{1})[0-9]{1}')]],
            fechaFin: ['', [Validators.pattern('^$|^[a-zA-Z]{3}\-(19[3-9]{1}|20[0-2]{1})[0-9]{1}$')]],
         })
   }

   ngOnInit(): void {
      this.esAdmin = this.authServ.EsAdmin;

      this.eduServ.obtenerDatos().subscribe(educacion => {
         this.educacionList = educacion;

         for (let i = 0; i < this.educacionList.length; i++) {
            if (this.educacionList[i].id == this.activatedRouter.snapshot.params['id']) {
               this.educacionList[i].localidad = this.educacionList[i].fullLocalidad.split(",",3)[0];
               this.educacionList[i].provincia = this.educacionList[i].fullLocalidad.split(",",3)[1];
               this.educacionList[i].logo = this.educacionList[i].logo.split("/",4)[3];
               this.formEdtEducacion.patchValue(this.educacionList[i]);
            }
         }
      });
   }

   get Id() {
      return this.formEdtEducacion.get('id');
   }

   get Entidad() {
      return this.formEdtEducacion.get('entidad');
   }

   get Logo() {
      return this.formEdtEducacion.get('logo');
   }

   get Localidad() {
      return this.formEdtEducacion.get('localidad');
   }

   get Provincia() {
      return this.formEdtEducacion.get('provincia');
   }

   get Titulo() {
      return this.formEdtEducacion.get('titulo');
   }

   get Nivel() {
      return this.formEdtEducacion.get('nivel');
   }

   get Estado() {
      return this.formEdtEducacion.get('estado');
   }

   get FechaIni() {
      return this.formEdtEducacion.get('fechaIni');
   }

   get FechaFin() {
      return this.formEdtEducacion.get('FechaFin');
   }

   onEnviarEdtEducacion(event: Event) {
      event.preventDefault;
      const rutaURL = "educacion/editar/";
      const idEditar = this.activatedRouter.snapshot.params['id'];

      this.eduServ.editarDatos(idEditar, this.formEdtEducacion).subscribe(data => {
         this.eduServ.obtenerDatos().subscribe(educacion => {
            this.educacionList = educacion;
         });
      });
      this.ruta.navigate(['/portfolio']);
   }
}
