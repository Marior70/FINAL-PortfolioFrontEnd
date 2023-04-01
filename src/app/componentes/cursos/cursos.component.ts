import { Component, OnInit } from '@angular/core';
import { CursoService } from 'src/app/servicios/curso.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
   selector: 'app-cursos',
   templateUrl: './cursos.component.html',
   styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
   cursoList: any;
   esAdmin = false;
   constructor(private curServ: CursoService, private datosPortfolio: PortfolioService, private authServ: AutenticacionService) { }

   ngOnInit(): void {
      this.esAdmin = this.authServ.EsAdmin;
      this.curServ.obtenerDatos().subscribe(cursos => {
         this.cursoList = cursos;
      });
   }

   borrar(id: number) {
      this.curServ.borrarDatos(id).subscribe(cursos => {
         this.curServ.obtenerDatos().subscribe(cursos => {
            this.cursoList = cursos;
         });
      });
   }

   /* ngOnInit(): void {
      this.esAdmin = true;
      this.datosPortfolio.obtenerDatos().subscribe(data => {
         this.cursoList = data.cursos;
      });
   }

   borrar(id?: number) {
      const rutaURL = "curso/borrar/" + id;
      if (id != undefined) {
         this.datosPortfolio.borrarDatos(rutaURL).subscribe(data => {
            this.datosPortfolio.obtenerDatos().subscribe(data => {
               this.cursoList = data.cursos;
            });
         });
      }
   } */
}
