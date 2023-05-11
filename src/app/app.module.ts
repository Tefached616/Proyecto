import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

//import { MenuInicioComponent } from './menu-inicio/menu-inicio.component';

// Librería para poder consumir el servicio
import { HttpModule, } from '@angular/http';
import { HttpClientModule, } from '@angular/common/http';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AppComponent } from './app-component/app.component';
import { MenuInicioComponent } from './menu-inicio/menu-inicio.component'
import { CatalogoComponent } from './catalogo/catalogo.component';

import { ServicioService } from './servicio.service';
import { ContactoComponent } from './contacto/contacto.component';
import { MateriaPrimaComponent } from './materia-prima/materia-prima.component';
import { PersonalComponent } from './personal/personal.component';
import { ProduccionComponent } from './produccion/produccion.component';
import { ProductoComponent } from './producto/producto.component';
import { ProductoxMateriaPrimaComponent } from './productox-materia-prima/productox-materia-prima.component';
import { MateriaComponent } from './materia/materia.component';

const appRoutes: Routes = 
[
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'Inicio'
  },
  {
    path: 'Inicio',
    component: MenuInicioComponent,
  },
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// se incluye esto y la coma despues del corchete anterior

  {
    path: 'Catalogo',
    component: CatalogoComponent,   
  },

  {
    path: 'Contacto',
    component: ContactoComponent,   
  },

  {
    path: 'MateriaPrima',
    component: MateriaPrimaComponent,   
  },

  {
    path: 'Personal',
    component: PersonalComponent,   
  },

  {
    path: 'Produccion',
    component: ProduccionComponent,   
  },

  {
    path: 'Producto',
    component: ProductoComponent,   
  },

  {
    path: 'Productoxmateriaprima',
    component: ProductoxMateriaPrimaComponent,   
  },

  {
    path: 'Materia',
    component: MateriaComponent,
  }

];
//*************************************************************
@NgModule({
  declarations: [
    AppComponent,
    MenuInicioComponent,
    CatalogoComponent,
    ContactoComponent,
    MateriaPrimaComponent,
    PersonalComponent,
    ProduccionComponent,
    ProductoComponent,
    ProductoxMateriaPrimaComponent,
    MateriaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes), // se agregan estos 
    HttpClientModule  // <- Agregar la clase
  ],
  
  providers: [ServicioService],
  bootstrap: [AppComponent]
})
export class AppModule { }