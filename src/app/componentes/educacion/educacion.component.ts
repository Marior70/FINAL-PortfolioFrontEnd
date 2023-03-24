import { Component, OnInit } from '@angular/core';
import { EducacionService } from 'src/app/servicios/educacion.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
   selector: 'app-educacion',
   templateUrl: './educacion.component.html',
   styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
   educacionList: any;
   esAdmin = false;
   constructor(private eduServ: EducacionService, private datosPortfolio: PortfolioService, private authServ: AutenticacionService) { }

   ngOnInit(): void {
      this.esAdmin = this.authServ.EsAdmin;
      this.eduServ.obtenerDatos().subscribe(educacion => {
         this.educacionList = educacion;
      });
   }

   borrar(id: number) {
      this.eduServ.borrarDatos(id).subscribe(educacion => {
         this.eduServ.obtenerDatos().subscribe(educaciion => {
            this.educacionList = educacion;
         });
      });
   }

   // ngOnInit(): void {
   //    this.esAdmin = true;
   //    this.datosPortfolio.obtenerDatos().subscribe(data => {
   //       this.educacionList = data.educacion;
   //    });
   // }

   // borrar(id?: number) {
   //    const rutaURL = "educacion/borrar/" + id;
   //    if (id != undefined) {
   //       this.datosPortfolio.borrarDatos(rutaURL).subscribe(data => {
   //          this.datosPortfolio.obtenerDatos().subscribe(data => {
   //             this.educacionList = data.educacion;
   //          });
   //       });
   //    }
   // }
}
