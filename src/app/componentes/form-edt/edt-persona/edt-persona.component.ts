import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from 'src/app/servicios/persona.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
   selector: 'app-edt-persona',
   templateUrl: './edt-persona.component.html',
   styleUrls: ['./edt-persona.component.css']
})
export class EdtPersonaComponent {
   formEdtPersona: FormGroup;
   personaList: any;
   perActual: any;
   esAdmin = false;

   constructor(private formBuilder: FormBuilder, private perServ: PersonaService,private authServ: AutenticacionService, private datosPortfolio: PortfolioService, private activatedRouter: ActivatedRoute, private ruta: Router) {
      this.formEdtPersona = this.formBuilder.group(
         {
            id: '',
            Nombres: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ"\'-]*')]],
            Apellidos: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ"\'-]*')]],
            foto: ['', [Validators.maxLength(35), Validators.pattern('[a-zA-Z0-9._-]+\.png$')]],
            email: ['', [Validators.required, Validators.email]],
            movil: ['', [Validators.required, Validators.pattern('^549[0-9]{10}')]],
            acercade: ['', [Validators.required, Validators.maxLength(255), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ0-9 ,./"\'-_]*')]],
            localidad: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ0-9,./"\'-_]*')]],
            provincia: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ0-9 ,./"\'-_]*')]],
            titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-záéíóúüñA-ZÁÉÍÓÚÑ0-9 ,./"\'-_]*')]],
         })
   }

   ngOnInit(): void {
      this.esAdmin = this.authServ.EsAdmin;
      this.perServ.obtenerDatos().subscribe(personas => {
         this.personaList = personas;
         this.perActual = this.personaList[0];

         /* for (let i = 0; i < this.personaList.length; i++) {
            if (this.personaList[i].id == this.activatedRouter.snapshot.params['id']) {
               // En el formulario, el input para 'foto' requiere sólo el nombre de archivo. Éste archivo estará previamente cargado en el servidor
               // El controlador del backend le agrega el path de la carpeta 'img' y lo guarda en la BD. 
               // En la base de datos tengo en foto: './assets/img/unString.png' unString.split("/") será: [".","assets","img","unString.png"]
               this.personaList[i].foto = this.personaList[i].foto.split("/",4)[3];
               // }
               this.formEdtPersona.patchValue(this.personaList[i]);
            }
         } */
         this.perActual.nombres = this.perActual.fullname.split("", 2)[0];
         this.perActual.apellidos = this.perActual.fullname.split("", 2)[1];
         this.perActual.localidad = this.perActual.residencia.split(",", 3)[0];
         this.perActual.provincia = this.perActual.residencia.split(",", 3)[1];
         this.perActual.foto = this.perActual.foto.split("/", 4)[3];
         this.formEdtPersona.patchValue(this.perActual);
      });
   }

   get Id() {
      return this.formEdtPersona.get('id');
   }

   get Nombres() {
      return this.formEdtPersona.get('nombres');
   }

   get Apellidos() {
      return this.formEdtPersona.get('apellidos');
   }

   get Foto() {
      return this.formEdtPersona.get('foto');
   }

   get Email() {
      return this.formEdtPersona.get('email');
   }

   get Movil() {
      return this.formEdtPersona.get('movil');
   }

   get Acercade() {
      return this.formEdtPersona.get('acercade');
   }

   get Localidad() {

      return this.formEdtPersona.get('localidad');
   }

   get Provincia() {

      return this.formEdtPersona.get('provincia');
   }

   get Titulo() {
      return this.formEdtPersona.get('titulo');
   }


   onEnviarEdtPersona(event: Event) {
      event.preventDefault;
      const rutaURL = "persona/editar/";
      const idEditar = this.activatedRouter.snapshot.params['id'];

      this.perServ.editarDatos(idEditar, this.formEdtPersona).subscribe(data => {
         this.perServ.obtenerDatos().subscribe(personas => {
            this.personaList = personas;
            this.perActual = this.personaList[0];
         });
      });
      this.ruta.navigate(['/portfolio']);
   }
}
