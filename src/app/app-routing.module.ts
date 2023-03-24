import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './componentes/login/login.component';
// import { PersonaComponent } from './componentes/persona/persona.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { GuardGuard } from './servicios/guard.guard';

// import { ExperienciasComponent } from './componentes/experiencias/experiencias.component';
// import { EducacionComponent } from './componentes/educacion/educacion.component';
// import { CursosComponent } from './componentes/cursos/cursos.component';
// import { AptitudesComponent } from './componentes/aptitudes/aptitudes.component';
// import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
// import { PortadaComponent } from './componentes/portada/portada.component';

import { EdtPersonaComponent } from './componentes/form-edt/edt-persona/edt-persona.component';
import { EdtExperienciaComponent } from './componentes/form-edt/edt-experiencia/edt-experiencia.component';
import { EdtEducacionComponent } from './componentes/form-edt/edt-educacion/edt-educacion.component';
import { EdtCursoComponent } from './componentes/form-edt/edt-curso/edt-curso.component';
import { EdtAptitudComponent } from './componentes/form-edt/edt-aptitud/edt-aptitud.component';
import { EdtProyectoComponent } from './componentes/form-edt/edt-proyecto/edt-proyecto.component';

// import { NewPersonaComponent } from './componentes/form-new/new-persona/new-persona.component';
import { NewExperienciaComponent } from './componentes/form-new/new-experiencia/new-experiencia.component';
import { NewEducacionComponent } from './componentes/form-new/new-educacion/new-educacion.component';
import { NewCursoComponent } from './componentes/form-new/new-curso/new-curso.component';
import { NewAptitudComponent } from './componentes/form-new/new-aptitud/new-aptitud.component';
import { NewProyectoComponent } from './componentes/form-new/new-proyecto/new-proyecto.component';

const routes: Routes = [
   {path:'',redirectTo:'abrirportfolio',pathMatch:'full'},
	{path:'abrirportfolio',component:LoginComponent},
	{path:'portfolio',component:PortfolioComponent, canActivate:[GuardGuard]},
   // {path:'portfolio/acercade',component:PersonaComponent},
   // {path:'portfolio/experiencias',component:ExperienciasComponent},
   // {path:'portfolio/educacion',component:EducacionComponent},
   // {path:'portfolio/cursos',component:CursosComponent},
   // {path:'portfolio/aptitudes',component:AptitudesComponent},
   // {path:'portfolio/proyectos',component:ProyectosComponent},
   
   {path:'misdatos/editar/:id',component:EdtPersonaComponent, canActivate:[GuardGuard]},
   // {path:'misdatos/nueva',component:NewPersonaComponent},
   
   {path:'experiencia/editar/:id',component:EdtExperienciaComponent, canActivate:[GuardGuard]},
   {path:'experiencia/nueva',component:NewExperienciaComponent, canActivate:[GuardGuard]},
   
   {path:'educacion/editar/:id',component:EdtEducacionComponent, canActivate:[GuardGuard]},
   {path:'educacion/nueva',component:NewEducacionComponent, canActivate:[GuardGuard]},
   
   {path:'curso/editar/:id',component:EdtCursoComponent, canActivate:[GuardGuard]},
   {path:'curso/nuevo',component:NewCursoComponent, canActivate:[GuardGuard]},
   
   {path:'aptitud/editar/:id',component:EdtAptitudComponent, canActivate:[GuardGuard]},
   {path:'aptitud/nueva',component:NewAptitudComponent, canActivate:[GuardGuard]},
   
   {path:'proyecto/editar/:id',component:EdtProyectoComponent, canActivate:[GuardGuard]},
   {path:'proyecto/nuevo',component:NewProyectoComponent, canActivate:[GuardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
