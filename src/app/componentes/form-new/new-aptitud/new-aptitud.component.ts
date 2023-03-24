import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AptitudService } from 'src/app/servicios/aptitud.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-new-aptitud',
  templateUrl: './new-aptitud.component.html',
  styleUrls: ['./new-aptitud.component.css']
})
export class NewAptitudComponent implements OnInit {
   formNewAptitud: FormGroup;
   aptitudList: any;
   esAdmin = false;

   constructor(private formBuilder: FormBuilder, private aptServ: AptitudService, private datosPortfolio: PortfolioService, private authServ: AutenticacionService, private ruta: Router) {
      this.formNewAptitud = this.formBuilder.group(
       {
         nombre: ['', [Validators.required, Validators.maxLength(65), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ0-9 ,./"\'-_]*')]],
         valor: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
       })
   }
 
   ngOnInit(): void {
      this.esAdmin = this.authServ.EsAdmin;
   }
 
   get Nombre() {
     return this.formNewAptitud.get('nombre');
   }
 
   get Valor() {
     return this.formNewAptitud.get('valor');
   }
 
   onEnviarNewAptitud(event: Event) {
      event.preventDefault;
      // const rutaURL = "aptitud/nueva"

      this.aptServ.agregarDatos(this.formNewAptitud).subscribe(data => {
         this.aptServ.obtenerDatos().subscribe(aptitudes => {
            this.aptitudList = aptitudes;
         });
      });
      this.ruta.navigate(['/portfolio']);
   }
}