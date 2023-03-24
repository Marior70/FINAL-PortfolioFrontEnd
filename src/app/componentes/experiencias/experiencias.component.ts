import { Component, OnInit } from '@angular/core';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
   selector: 'app-experiencias',
   templateUrl: './experiencias.component.html',
   styleUrls: ['./experiencias.component.css']
})

export class ExperienciasComponent implements OnInit {
   experienciaList: any;
   constructor(private expServ: ExperienciaService, private datosPortfolio: PortfolioService,  private authServ: AutenticacionService) { }
   esAdmin = false;

   ngOnInit(): void {
      this.esAdmin = this.authServ.EsAdmin;
      this.expServ.obtenerDatos().subscribe(experiencias => {
         this.experienciaList = experiencias;
      });
   }

   borrar(id: number) {
      this.expServ.borrarDatos(id).subscribe(experiencias => {
         this.expServ.obtenerDatos().subscribe(experiencias => {
            this.experienciaList = experiencias;
         });
      });
   }

   // ngOnInit(): void {
   //    this.esAdmin = true;
   //    this.datosPortfolio.obtenerDatos().subscribe(data => {
   //       this.experienciaList = data.experiencias;
   //    });
   // }

   // borrar(id?: number) {
   //    const rutaURL = "experiencia/borrar/" + id;
   //    if (id != undefined) {
   //       this.datosPortfolio.borrarDatos(rutaURL).subscribe(data => {
   //          this.datosPortfolio.obtenerDatos().subscribe(data => {
   //             this.experienciaList = data.experiencias;
   //          });
   //       });
   //    }
   // }
}
