import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CursoService } from 'src/app/servicios/curso.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
   selector: 'app-new-curso',
   templateUrl: './new-curso.component.html',
   styleUrls: ['./new-curso.component.css']
})
export class NewCursoComponent implements OnInit {
   formNewCurso: FormGroup;
   cursoList: any;
   esAdmin = false;

   constructor(private formBuilder: FormBuilder, private curServ: CursoService,private datosPortfolio: PortfolioService,  private authServ: AutenticacionService, private ruta: Router) {
      this.formNewCurso = this.formBuilder.group(
         {
            entidad: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ0-9 ,./"\'-_]*')]],
            logo: ['', [Validators.maxLength(35), Validators.pattern('[a-zA-Z0-9._-]+\.png$')]],
            tema: ['', [Validators.required, Validators.maxLength(100), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ0-9,./"\'-_]*')]],
            fechaIni: ['', [Validators.required, Validators.pattern('[a-zA-Z]{3}\-(19[3-9]{1}|20[0-2]{1})[0-9]{1}')]],
            fechaFin: ['', [Validators.pattern('[a-zA-Z]{3}\-(19[3-9]{1}|20[0-2]{1})[0-9]{1}')]],
         })
   }

   ngOnInit(): void {
      this.esAdmin = this.authServ.EsAdmin;
   }

   get Entidad() {
      return this.formNewCurso.get('entidad');
   }

   get Logo() {
      return this.formNewCurso.get('logo');
   }

   get Tema() {
      return this.formNewCurso.get('tema');
   }

   get FechaIni() {
      return this.formNewCurso.get('fechaIni');
   }

   get FechaFin() {
      return this.formNewCurso.get('FechaFin');
   }

   onEnviarNewCurso(event: Event) {
      event.preventDefault;
      // const rutaURL = "curso/nuevo"

      this.curServ.agregarDatos(this.formNewCurso).subscribe(data => {
         this.curServ.obtenerDatos().subscribe(cursos => {
            this.cursoList = cursos;
         });
      });
      this.ruta.navigate(['/portfolio']);
   }
}
