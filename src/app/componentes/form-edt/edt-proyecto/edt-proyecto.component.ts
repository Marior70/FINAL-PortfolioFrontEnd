import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
   selector: 'app-edt-proyecto',
   templateUrl: './edt-proyecto.component.html',
   styleUrls: ['./edt-proyecto.component.css']
})
export class EdtProyectoComponent implements OnInit {
   formEdtProyecto: FormGroup;
   proyectoList: any;
   esAdmin = false;

   constructor(private formBuilder: FormBuilder, private proServ: ProyectoService,private authServ: AutenticacionService, private datosPortfolio: PortfolioService, private activatedRouter: ActivatedRoute, private ruta: Router) {
      this.formEdtProyecto = this.formBuilder.group(
         {
            id: '',
            nombre: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ0-9 ,./"\'-_]*')]], 
            logo: ['', [Validators.maxLength(35), Validators.pattern('[a-zA-Z0-9._-]+\.png$')]],
            descripcion: ['', [Validators.required, Validators.maxLength(255), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ0-9 ,.!@#$%&¡()/"\'-_]*')]],
            link: ['', [Validators.required, Validators.maxLength(255), Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]]
         })
   }

   ngOnInit(): void {
      this.esAdmin = this.authServ.EsAdmin;

      this.proServ.obtenerDatos().subscribe(proyectos => {
         this.proyectoList = proyectos;

         for (let i = 0; i < this.proyectoList.length; i++) {
            if (this.proyectoList[i].id == this.activatedRouter.snapshot.params['id']) {
               this.proyectoList[i].logo = this.proyectoList[i].logo.split("/",4)[3];
               this.formEdtProyecto.patchValue(this.proyectoList[i]);
            }
         }
      });
   }

   get Id() {
      return this.formEdtProyecto.get('id');
   }

   get Nombre() {
      return this.formEdtProyecto.get('nombre');
   }

   get Logo() {
      return this.formEdtProyecto.get('logo');
   }

   get Descripcion() {
      return this.formEdtProyecto.get('descripcion');
   }

   get Link() {
      return this.formEdtProyecto.get('link');
   }

   onEnviarEdtProyecto(event: Event) {
      event.preventDefault;
      const rutaURL = "proyecto/editar/";
      const idEditar = this.activatedRouter.snapshot.params['id'];

      this.proServ.editarDatos(idEditar, this.formEdtProyecto).subscribe(data => {
         this.proServ.obtenerDatos().subscribe(proyectos => {
            this.proyectoList = proyectos;
         });
      });
      this.ruta.navigate(['/portfolio']);
   }
}
