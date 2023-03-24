import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
   selector: 'app-edt-experiencia',
   templateUrl: './edt-experiencia.component.html',
   styleUrls: ['./edt-experiencia.component.css']
})
export class EdtExperienciaComponent implements OnInit {
   formEdtExperiencia: FormGroup;
   experienciaList: any;
   esAdmin = false;

   constructor(private formBuilder: FormBuilder, private expServ: ExperienciaService,private authServ: AutenticacionService, private datosPortfolio: PortfolioService, private activatedRouter: ActivatedRoute, private ruta: Router) {
      this.formEdtExperiencia = this.formBuilder.group(
         {
            id: '',
            entidad: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ0-9 ,./"\'-_]*')]],
            logo: ['', [Validators.maxLength(35), Validators.pattern('[a-zA-Z0-9._-]+\.png$')]],
            rol: ['', [Validators.maxLength(100), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ0-9 ,./"\'-_]*')]],
            descripcion: ['', [Validators.required, Validators.maxLength(255), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ0-9 ,./"\'-_]*')]],
            fechaIni: ['', [Validators.required, Validators.pattern('[a-zA-Z]{3}\-(19[3-9]{1}|20[0-2]{1})[0-9]{1}')]],
            fechaFin: ['', [Validators.pattern('[a-zA-Z]{3}\-(19[3-9]{1}|20[0-2]{1})[0-9]{1}')]],
         })
   }

   ngOnInit(): void {
      this.esAdmin = this.authServ.EsAdmin;

      this.expServ.obtenerDatos().subscribe(experiencias => {
         this.experienciaList = experiencias;

         for (let i = 0; i < this.experienciaList.length; i++) {
            if (this.experienciaList[i].id == this.activatedRouter.snapshot.params['id']) {
               // this.experienciaList[i].localidad = this.experienciaList[i].fullLocalidad.split(",", 3)[0];
               // this.experienciaList[i].provincia = this.experienciaList[i].fullLocalidad.split(",", 3)[1];
               this.experienciaList[i].logo = this.experienciaList[i].logo.split("/", 4)[3];
               this.formEdtExperiencia.patchValue(this.experienciaList[i]);
            }
         }
      });
   }

   get Id() {
      return this.formEdtExperiencia.get('id');
   }

   get Entidad() {
      return this.formEdtExperiencia.get('entidad');
   }

   get Logo() {
      return this.formEdtExperiencia.get('logo');
   }

   get Localidad() {
      return this.formEdtExperiencia.get('localidad');
   }

   get Provincia() {
      return this.formEdtExperiencia.get('provincia');
   }

   get Rol() {
      return this.formEdtExperiencia.get('rol');
   }

   get Descripcion() {
      return this.formEdtExperiencia.get('descripcion');
   }

   get FechaIni() {
      return this.formEdtExperiencia.get('fechaIni');
   }

   get FechaFin() {
      return this.formEdtExperiencia.get('FechaFin');
   }

   onEnviarEdtExperiencia(event: Event) {
      event.preventDefault;
      const rutaURL = "experiencia/editar/";
      const idEditar = this.activatedRouter.snapshot.params['id'];
      this.expServ.editarDatos(idEditar, this.formEdtExperiencia).subscribe(data => {
         this.expServ.obtenerDatos().subscribe(experiencias => {
            this.experienciaList = experiencias;
         });
      });
      this.ruta.navigate(['/portfolio']);
   }
}
