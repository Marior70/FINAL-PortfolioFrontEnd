import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   formLogin: FormGroup;
   constructor(private formBuilder: FormBuilder, private authServ: AutenticacionService, private ruta: Router) { 
      this.formLogin = this.formBuilder.group(
         {
            username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            // email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
         }
      )
   }

   ngOnInit(): void {
      // this.authServ.PortfolioAbierto;
   }

   get Username() {
      return this.formLogin.get('username');
   }

   // get Email() {
   //    return this.formLogin.get('email');
   // }

   get Password() {
      return this.formLogin.get('password');
   }

   onEnviar(event: Event) {
      event.preventDefault;
      
      this.authServ.IniciarSesion(this.formLogin.value).subscribe(data => {
         this.ruta.navigate(['/portfolio']);
         // this.authServ.PortfolioAbierto;
      });
   }
}
