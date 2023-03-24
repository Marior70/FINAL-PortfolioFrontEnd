import { Component, OnInit } from '@angular/core';
// import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AptitudService } from 'src/app/servicios/aptitud.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
   selector: 'app-aptitudes',
   templateUrl: './aptitudes.component.html',
   styleUrls: ['./aptitudes.component.css']
})
export class AptitudesComponent implements OnInit {
   aptitudList: any;
   esAdmin = false;
   constructor(private aptServ: AptitudService, /* private datosPortfolio: PortfolioService, */ private authServ: AutenticacionService) { }

   ngOnInit(): void {
      this.esAdmin = this.authServ.EsAdmin;
      this.aptServ.obtenerDatos().subscribe(aptitudes => {
         this.aptitudList = aptitudes;
      });
   }

   borrar(id: number) {
      this.aptServ.borrarDatos(id).subscribe(aptitudes => {
         this.aptServ.obtenerDatos().subscribe(aptitudes => {
            this.aptitudList = aptitudes;
         }); 
      });
   }

   // Utilizano un único servicio de portfolio
   // ngOnInit(): void {
   //    this.esAdmin = true;
   //    this.datosPortfolio.obtenerDatos().subscribe(data => {
   //       this.aptitudList = data.aptitudes;
   //    });
   // }

   // borrar(id?: number) {
   //    const rutaURL = "aptitud/borrar/" + id;
   //    if (id != undefined) {
   //       this.datosPortfolio.borrarDatos(rutaURL).subscribe(data => {
   //          this.datosPortfolio.obtenerDatos().subscribe(data => {
   //             this.aptitudList = data.aptitudes;
   //          });
   //       });
   //    }
   // }
}