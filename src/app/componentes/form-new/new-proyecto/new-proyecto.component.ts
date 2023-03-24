import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-new-proyecto',
  templateUrl: './new-proyecto.component.html',
  styleUrls: ['./new-proyecto.component.css']
})
export class NewProyectoComponent implements OnInit {
   formNewProyecto: FormGroup;
   proyectoList: any;
   esAdmin = false;

   constructor(private formBuilder: FormBuilder, private proServ: ProyectoService,private datosPortfolio: PortfolioService, private authServ: AutenticacionService, private ruta: Router) {
      this.formNewProyecto = this.formBuilder.group(
         {
            nombre: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ0-9 ,./"\'-_]*')]], 
            logo: ['', [Validators.maxLength(35), Validators.pattern('[a-zA-Z0-9._-]+\.png$')]],
            descripcion: ['', [Validators.required, Validators.maxLength(255), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ0-9 ,./"\'-_]*')]],
            link: ['', [Validators.required, Validators.maxLength(255), Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]]
         })
   }

   ngOnInit(): void {
      this.esAdmin = this.authServ.EsAdmin;
   }

   get Nombre() {
      return this.formNewProyecto.get('nombre');
   }

   get Logo() {
      return this.formNewProyecto.get('logo');
   }

   get Descripcion() {
      return this.formNewProyecto.get('descripcion');
   }

   get Link() {
      return this.formNewProyecto.get('link');
   }

   onEnviarNewProyecto(event: Event) {
      event.preventDefault;
      // const rutaURL = "proyecto/nuevo"

      this.proServ.agregarDatos(this.formNewProyecto).subscribe(data => {
         this.proServ.obtenerDatos().subscribe(proyectos => {
            this.proyectoList = proyectos;
         });
      });
      this.ruta.navigate(['/portfolio']);
      }
}
