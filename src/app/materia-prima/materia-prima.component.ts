import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ServicioService } from '../servicio.service'

@Component({
  selector: 'app-materia-prima',
  templateUrl: './materia-prima.component.html',
  styleUrls: ['./materia-prima.component.css']
})
export class MateriaPrimaComponent implements OnInit {

  title = "MANEJO DE MATERIA PRIMA";

  Materiaprimas: any = [];              //Lista de Tipos de Documentos
  TituloMateriaprimas = "";             //Titulo Lista de Tipos de Documentos
  TablaMateriaprimas: any = [];        //Encabezados tabla Lista de Tipos de Documentos 

  MiMateriaprima: any = [];             //Tipo de Documento Buscado
  TituloMateriaprima = "";              //Titulo de Tipo de Documento Buscado
  TabBusMateriaprima: any = [];        //Encabezados tabla Tipo de Documento Buscado 
  comboListaMateriaprima: any = [];     //Combo Buscar Tipo de Documento

  TituloMateriaprimaEdit = "";          //Titulo de Tipo de Documento a Editar
  MiMateriaprimaE: any = [];            //Tipo de Documento a Editar
  comboEditarMateriaprima: any = [];    //Combo Editar Tipo de Documento

  controlLista = 1;               //Control para limpiar la lista
  BuscarEvalor = 1;               //Control para carga del valor a buscar

   //*****************************************************************************
 //Form group 
  ListaMateriaprima =  new FormGroup (
  {

  });

  filtrarMateriaprima =  new FormGroup(
  {
    combofiltro: new FormControl()
  });

  
  // InsertarGContacto =  new FormGroup(
  // {
  //   textCatalogo: new FormControl(), 
  //   textIniCatalogo:new FormControl()
  // });

  
  // ActualizarACatalogo =  new FormGroup(
  // {
  //   BuscarIdCatalogo:new FormControl(),  
  //   textnuevoCatalogo:new FormControl(), 
  //   textnuevoTIPO_CATALOGO: new FormControl()
  // });

//**********************************************************************************

  constructor
  (
    private formBuilder: FormBuilder, 
    private servi: ServicioService,
    Router : Router
  ) { }


//..............................................................................................
// CRUD
//............................................................................................
// Lista Tipos de documentos. inicial 

public consultaMateriaprimaI()
{
      this.servi.getMateria_Primas().subscribe((data: any) => 
      {

          let dat = data;
         
          this.Materiaprimas = data;
          this.TituloMateriaprimas = "LISTA DE MATERIA PRIMA";
          this.TablaMateriaprimas[0] = "indicador";
          this.TablaMateriaprimas[1] = "Materia prima";
          this.TablaMateriaprimas[2] = "Cantidad";
          this.TablaMateriaprimas[3] = "Tipo";
          this.TablaMateriaprimas[4] = "Presentacion";
      });
  }

//............................................................................................
// Lista Tipos de documentos.

public consultaMateriaprimas(op:any)
{

  if(this.controlLista == 1)
  {

      this.servi.getMateria_Primas().subscribe((data: any) => { //revisar


        if (op == 1)
        {
          console.log(data);
          let dat = data;
         
          this.Materiaprimas = data;
          this.TituloMateriaprimas = "LISTA DE MATERIA PRIMA";
          this.TablaMateriaprimas[0] = "indicador";
          this.TablaMateriaprimas[1] = "Materia prima";
          this.TablaMateriaprimas[2] = "Cantidad";
          this.TablaMateriaprimas[3] = "Tipo";
          this.TablaMateriaprimas[4] = "Presentacion";

          }
          else if(op == 2)
          {
            this.comboListaMateriaprima = data;//JSON.parse(data);
            this.MiMateriaprima = null;
            this.TituloMateriaprima = "";
            this.TabBusMateriaprima[0] = "";
            this.TabBusMateriaprima[1] = "";
            this.TabBusMateriaprima[2] = "";
            this.TabBusMateriaprima[3] = "";
            this.TabBusMateriaprima[4] = "";
          }
          else if(op == 3)
          { 
            this.comboEditarMateriaprima  = data;//JSON.parse(data);
            this.MiMateriaprimaE = null;
            this.TituloMateriaprimaEdit = ""; 
          }              
    },
      error => { console.error(error + " ") });
  }
  else
  {
    this.Materiaprimas = null;
    this.TituloMateriaprimas = "";
    this.TablaMateriaprimas[0] = "";
    this.TablaMateriaprimas[1] = "";
    this.TablaMateriaprimas[2] = "";
    this.TablaMateriaprimas[3] = "";
    this.TablaMateriaprimas[4] = "";
    this.controlLista = 1; 
  }
 
}


//--------------------------------------------------------------------------------------------->
//para Limpiar la lista

  public LimpiarLista() 
    {
      this.controlLista = 0;
    }

    ngOnInit(): void 
    {
      this.ListaMateriaprima = this.formBuilder.group(
        {
    
        });   
  
        
      this.filtrarMateriaprima = this.formBuilder.group(
      {
        combofiltro: []
      });
    }
}
