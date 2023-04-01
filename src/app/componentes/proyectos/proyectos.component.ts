import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
   selector: 'app-proyectos',
   templateUrl: './proyectos.component.html',
   styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
   proyectoList: any;
   esAdmin = false;
   constructor(private proServ: ProyectoService, private datosPortfolio: PortfolioService, private authServ: AutenticacionService ) { }

   ngOnInit(): void {
      this.esAdmin = this.authServ.EsAdmin;
      this.proServ.obtenerDatos().subscribe(proyectos => {
         this.proyectoList = proyectos;
      });
   }

   borrar(id: number) {
      this.proServ.borrarDatos(id).subscribe(proyectos => {
         this.proServ.obtenerDatos().subscribe(proyectos => {
            this.proyectoList = proyectos;
         });
      });
   }

   /* ngOnInit(): void {
      this.esAdmin = true;
      this.datosPortfolio.obtenerDatos().subscribe(data => {
         this.proyectoList = data.proyectos;
      });
   }

   borrar(id?: number) {
      const rutaURL = "proyecto/borrar/" + id;
      if (id != undefined) {
         this.datosPortfolio.borrarDatos(rutaURL).subscribe(data => {
            this.datosPortfolio.obtenerDatos().subscribe(data => {
               this.proyectoList = data.proyectos;
            });
         });
      }
   } */
}