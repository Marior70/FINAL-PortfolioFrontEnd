import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './componentes/navbar/navbar.component';
import { FooterComponent } from './componentes/footer/footer.component';

import { LoginComponent } from './componentes/login/login.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';

import { PersonaComponent } from './componentes/persona/persona.component';
import { ExperienciasComponent } from './componentes/experiencias/experiencias.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { CursosComponent } from './componentes/cursos/cursos.component';
import { AptitudesComponent } from './componentes/aptitudes/aptitudes.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';

import { EdtPersonaComponent } from './componentes/form-edt/edt-persona/edt-persona.component';
import { EdtExperienciaComponent } from './componentes/form-edt/edt-experiencia/edt-experiencia.component';
import { EdtEducacionComponent } from './componentes/form-edt/edt-educacion/edt-educacion.component';
import { EdtCursoComponent } from './componentes/form-edt/edt-curso/edt-curso.component';
import { EdtAptitudComponent } from './componentes/form-edt/edt-aptitud/edt-aptitud.component';
import { EdtProyectoComponent } from './componentes/form-edt/edt-proyecto/edt-proyecto.component';

import { NewPersonaComponent } from './componentes/form-new/new-persona/new-persona.component';
import { NewExperienciaComponent } from './componentes/form-new/new-experiencia/new-experiencia.component';
import { NewEducacionComponent } from './componentes/form-new/new-educacion/new-educacion.component';
import { NewCursoComponent } from './componentes/form-new/new-curso/new-curso.component';
import { NewAptitudComponent } from './componentes/form-new/new-aptitud/new-aptitud.component';
import { NewProyectoComponent } from './componentes/form-new/new-proyecto/new-proyecto.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PortfolioService } from './servicios/portfolio.service';
import { PersonaService } from './servicios/persona.service';
import { ExperienciaService } from './servicios/experiencia.service';
import { EducacionService } from './servicios/educacion.service';
import { CursoService } from './servicios/curso.service';
import { AptitudService } from './servicios/aptitud.service';
import { ProyectoService } from './servicios/proyecto.service';
import { InterceptorService } from './servicios/interceptor.service';

@NgModule({
   declarations: [
      AppComponent,
      NavbarComponent,
      FooterComponent,
      LoginComponent,
      PortfolioComponent,
      PersonaComponent,
      ExperienciasComponent,
      EducacionComponent,
      CursosComponent,
      AptitudesComponent,
      ProyectosComponent,
      EdtPersonaComponent,
      EdtExperienciaComponent,
      EdtEducacionComponent,
      EdtCursoComponent,
      EdtAptitudComponent,
      EdtProyectoComponent,
      NewPersonaComponent,
      NewExperienciaComponent,
      NewEducacionComponent,
      NewCursoComponent,
      NewAptitudComponent,
      NewProyectoComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule
   ],
   providers: [
      PortfolioService,
      PersonaService,
      ExperienciaService,
      EducacionService,
      CursoService,
      AptitudService,
      ProyectoService,
      {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
