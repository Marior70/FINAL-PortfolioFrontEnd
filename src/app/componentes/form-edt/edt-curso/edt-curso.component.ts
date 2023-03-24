import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from 'src/app/servicios/curso.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
   selector: 'app-edt-curso',
   templateUrl: './edt-curso.component.html',
   styleUrls: ['./edt-curso.component.css']
})
export class EdtCursoComponent implements OnInit {
   formEdtCurso: FormGroup;
   cursoList: any;
   esAdmin = false;

   constructor(private formBuilder: FormBuilder, private curServ: CursoService,private authServ: AutenticacionService,  private datosPortfolio: PortfolioService, private activatedRouter: ActivatedRoute, private ruta: Router) {
      this.formEdtCurso = this.formBuilder.group(
         {
            id: '',
            entidad: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ0-9 ,./"\'-_]*')]],
            logo: ['', [Validators.maxLength(35), Validators.pattern('[a-zA-Z0-9._-]+\.png$')]],
            tema: ['', [Validators.required, Validators.maxLength(100), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ0-9,./"\'-_]*')]],
            fechaIni: ['', [Validators.required, Validators.pattern('[a-zA-Z]{3}\-(19[3-9]{1}|20[0-2]{1})[0-9]{1}')]],
            fechaFin: ['', [Validators.pattern('[a-zA-Z]{3}\-(19[3-9]{1}|20[0-2]{1})[0-9]{1}')]],
         })
   }

   ngOnInit(): void {
      this.esAdmin = this.authServ.EsAdmin;

      this.curServ.obtenerDatos().subscribe(cursos => {
         this.cursoList = cursos;

         for (let i = 0; i < this.cursoList.length; i++) {
            if (this.cursoList[i].id == this.activatedRouter.snapshot.params['id']) {
               this.cursoList[i].localidad = this.cursoList[i].fullLocalidad.split(",",3)[0];
               this.cursoList[i].provincia = this.cursoList[i].fullLocalidad.split(",",3)[1];
               this.cursoList[i].logo = this.cursoList[i].logo.split("/",4)[3];
               this.formEdtCurso.patchValue(this.cursoList[i]);
            }
         }
      });
   }

   get Id() {
      return this.formEdtCurso.get('id');
   }

   get Entidad() {
      return this.formEdtCurso.get('entidad');
   }

   get Logo() {
      return this.formEdtCurso.get('logo');
   }

   get Tema() {
      return this.formEdtCurso.get('tema');
   }

   get FechaIni() {
      return this.formEdtCurso.get('fechaIni');
   }

   get FechaFin() {
      return this.formEdtCurso.get('FechaFin');
   }

   onEnviarEdtCurso(event: Event) {
      event.preventDefault;
      const rutaURL = "curso/editar/";
      const idEditar = this.activatedRouter.snapshot.params['id'];

      this.curServ.editarDatos(idEditar, this.formEdtCurso).subscribe(data => {
         this.curServ.obtenerDatos().subscribe(cursos => {
            this.cursoList = cursos;
         });
      });
      this.ruta.navigate(['/portfolio']);
   }
}
