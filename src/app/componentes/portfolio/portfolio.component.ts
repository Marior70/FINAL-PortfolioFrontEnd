import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
   constructor(private authServ: AutenticacionService){

   }
   
   ngOnInit(): void {
       this.authServ.portfolioAbierto = true;
   }
}
