import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonaService } from 'src/app/servicios/persona.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-new-persona',
  templateUrl: './new-persona.component.html',
  styleUrls: ['./new-persona.component.css']
})
export class NewPersonaComponent implements OnInit {
   formNewPersona: FormGroup;
   personaList: any;
   perActual: any;
   esAdmin = false;

   constructor(private formBuilder: FormBuilder, private perServ: PersonaService,private datosPortfolio: PortfolioService, private authServ: AutenticacionService, private ruta: Router) {
      this.formNewPersona = this.formBuilder.group(
         {
            Nombres: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ"\'-]*')]], 
            Apellidos: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ"\'-]*')]], 
            foto: ['', [Validators.maxLength(35), Validators.pattern('[a-zA-Z0-9._-]+\.png$')]],
            email: ['', [Validators.required, Validators.email]],
            movil: ['', [Validators.required, Validators.pattern('+54 9[\d]{9,10}')]],
            acercade: ['', [Validators.required, Validators.maxLength(255), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ0-9 ,./"\'-_]*')]],
            localidad: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ0-9,./"\'-_]*')]],
            provincia: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ0-9 ,./"\'-_]*')]],
            titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ0-9 ,./"\'-_]*')]],
         })
   }

   ngOnInit(): void {
      this.esAdmin = this.authServ.EsAdmin;
   }

   get Nombres() {
      return this.formNewPersona.get('nombres');
   }

   get Apellidos() {
      return this.formNewPersona.get('apellidos');
   }

   get Foto() {
      return this.formNewPersona.get('foto');
   }

   get Email() {
      return this.formNewPersona.get('email');
   }

   get Movil() {
      return this.formNewPersona.get('movil');
   }

   get Acercade() {
      return this.formNewPersona.get('acercade');
   }

   get Localidad() {
      return this.formNewPersona.get('localidad');
   }

   get Provincia() {
      return this.formNewPersona.get('provincia');
   }

   get Titulo() {
      return this.formNewPersona.get('titulo');
   }


   onEnviarNewPersona(event: Event) {
      event.preventDefault;
      // const rutaURL = "persona/nuevo"

      this.perServ.agregarDatos(this.formNewPersona).subscribe(data => {
         this.perServ.obtenerDatos().subscribe(personas => {
            this.personaList = personas;
            this.perActual = this.personaList[0];
         });
      });
      this.ruta.navigate(['/portfolio']);
   }
}
