import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/servicios/persona.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
   selector: 'app-persona',
   templateUrl: './persona.component.html',
   styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
   personaList: any;
   perActual: any;
   esAdmin = false;
   constructor(private perServ: PersonaService, private datosPortfolio: PortfolioService,  private authServ: AutenticacionService) { }

   ngOnInit(): void {
      this.esAdmin = this.authServ.EsAdmin;
      this.perServ.obtenerDatos().subscribe(personas => {
         this.personaList = personas;
         this.perActual = this.personaList[0];
      });
   }

   borrar(id: number) {
      this.perServ.borrarDatos(id).subscribe(personas => {
         this.perServ.obtenerDatos().subscribe(personas => {
            this.personaList = personas;
            this.perActual = this.personaList[0];

         });
      });
   }
   /* ngOnInit(): void {
      this.esAdmin = true;
      this.datosPortfolio.obtenerDatos().subscribe(data => {

         // Si tenemos un único Json con los datos de cada componente, cada componente es un elemento de un array, por lo tanto se debe referenciar con el índice respectivo para obtener los datos.
         // this.personaList = data[0];

         this.personaList = data.persona[0]; // 'persona lo traigo con 'listar', como sólo manejo una persona, la debo referenciar con el indice 0. 
      });
   }

   borrar(id?: number) {
      const rutaURL = "misdatos/borrar/" + id;
      if (id != undefined) {
         this.datosPortfolio.borrarDatos(rutaURL).subscribe(data => {
            this.datosPortfolio.obtenerDatos().subscribe(data => {
               this.personaList = data.persona[0];
            });
         });
      }
   } */
}