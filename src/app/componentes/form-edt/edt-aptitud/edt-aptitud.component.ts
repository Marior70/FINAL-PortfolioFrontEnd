import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AptitudService } from 'src/app/servicios/aptitud.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
   selector: 'app-edt-aptitud',
   templateUrl: './edt-aptitud.component.html',
   styleUrls: ['./edt-aptitud.component.css']
})
export class EdtAptitudComponent implements OnInit {
   formEdtAptitud: FormGroup;
   aptitudList: any;
   esAdmin = false;

   constructor(private formBuilder: FormBuilder, private authServ: AutenticacionService, private datosPortfolio: PortfolioService, private aptServ: AptitudService, private activatedRouter: ActivatedRoute, private ruta: Router) {
      this.formEdtAptitud = this.formBuilder.group(
         {
            id: '',
            nombre: ['', [Validators.required, Validators.maxLength(65), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ0-9 ,./"\'-_]*')]],
            valor: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
         })
   }

   ngOnInit(): void {
      this.esAdmin = this.authServ.EsAdmin;

      this.aptServ.obtenerDatos().subscribe(aptitudes => {
         // this.datosPortfolio.obtenerDatos().subscribe(data => {
         this.aptitudList = aptitudes;

         for (let i = 0; i < this.aptitudList.length; i++) {
            if (this.aptitudList[i].id == this.activatedRouter.snapshot.params['id']) {
               this.formEdtAptitud.patchValue(this.aptitudList[i]);
            }
         }
      });
   }

   get Id() {
      return this.formEdtAptitud.get('id');
   }

   get Nombre() {
      return this.formEdtAptitud.get('nombre');
   }

   get Valor() {
      return this.formEdtAptitud.get('valor');
   }

   onEnviarEdtAptitud(event: Event) {
      event.preventDefault;
      // const rutaURL = "aptitud/editar/";
      const idEditar = this.activatedRouter.snapshot.params['id'];

      this.aptServ.editarDatos(idEditar, this.formEdtAptitud).subscribe(data => {
         this.aptServ.obtenerDatos().subscribe(aptitudes => {
            this.aptitudList = aptitudes;
         });
      });
      this.ruta.navigate(['/portfolio']);

      /* this.datosPortfolio.editarDatos(rutaURL, idEditar, this.formEdtAptitud.value).subscribe(data => {
         this.datosPortfolio.obtenerDatos().subscribe(data => {
            this.aptitudList = data.aptitudes;
         });
      }); 
      this.ruta.navigate(['/portfolio']);*/
   }
}