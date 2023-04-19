import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
   selector: 'app-navbar',
   templateUrl: './navbar.component.html',
   styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
   portfolioAbierto: boolean = false;
   constructor(private authServ: AutenticacionService, private ruta: Router) { }

   ngOnInit(): void {
      // this.portfolioAbierto = this.authServ.PortfolioAbierto;
   }

   cerrarPortfolio() {
      this.authServ.borrarToken;
      // this.portfolioAbierto = this.authServ.PortfolioAbierto;
      this.ruta.navigate(['/abrirportfolio']);
   }
}
