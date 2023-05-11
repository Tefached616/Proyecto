import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ServicioService } from '../servicio.service'

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})

export class CatalogoComponent implements OnInit 
{
  title = "MANEJO DE CATALOGOS";

  Catalogos: any = [];              //Lista de Tipos de Documentos
  TituloCatalogos = "";             //Titulo Lista de Tipos de Documentos
  TablaCatalogos: any = [];        //Encabezados tabla Lista de Tipos de Documentos 

  MiCatalogo: any = [];             //Tipo de Documento Buscado
  TituloCatalogo = "";              //Titulo de Tipo de Documento Buscado
  TabBusCatalogo: any = [];        //Encabezados tabla Tipo de Documento Buscado 
  comboListaCatalogo: any = [];     //Combo Buscar Tipo de Documento

  TituloCatalogoEdit = "";          //Titulo de Tipo de Documento a Editar
  MiCatalogoE: any = [];            //Tipo de Documento a Editar
  comboEditarCatalogo: any = [];    //Combo Editar Tipo de Documento

  controlLista = 1;               //Control para limpiar la lista
  BuscarEvalor = 1;               //Control para carga del valor a buscar

  catauniCatalogo: any = [];
  cataTipcontacto: any = [];
  catatipmateriaprima: any = [];
  catapresmateria: any = [];
  catatipdoc: any =[];
  cataCargo: any =[];
  catacategoria: any=[];
  cataclase: any = [];

  CBcatalogocatalogo: any = [];
  CBcatalogotipcontacto: any = [];
  CBcatalogotipmateriaprima: any = [];
  CBcatalogopresmateria: any = [];
  CBcatalogotipdoc: any = [];
  CBcatalogocargo: any = [];
  CBcatalogocategoria: any = [];
  CBcatalogoclase: any = [];

  catalogocatalogosel: any = [];
  catalogotipcontactosel: any = [];
  catalogotipmateriaprimasel: any = [];
  catalogopresmateriasel: any = [];
  catalogotipdocsel: any = [];
  catalogocargosel: any = [];
  catalogocategoriasel: any = [];
  catalogoclasesel: any = [];



   //*****************************************************************************
 //Form group 
  ListaCatalogo =  new FormGroup (
  {

  });

  filtrarCatalogo =  new FormGroup(
  {
    combofiltro: new FormControl()
  });

  
  InsertarGCatalogo =  new FormGroup(
  {
    textNuevoCatalogo: new FormControl(), 
    filTipoCatalogo:new FormControl()
  });

  
  ActualizarACatalogo =  new FormGroup(
  {
    BuscarIdCatalogo:new FormControl(),  
    textnuevoCatalogo:new FormControl(), 
    filtnuevoTIPO_CATALOGO: new FormControl()
  });

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

public consultaCatalogoI()
{
      this.servi.getCatalogos().subscribe((data: any) => 
      {

          let dat = data;
         
          this.Catalogos = JSON.parse(data);
          this.TituloCatalogos = "LISTA DE TIPOS DE DOCUMENTOS";
          this.TablaCatalogos[0] = "indicador";
          this.TablaCatalogos[1] = "Denominación";
          this.TablaCatalogos[2] = "Iniciales";
      });
  }

//............................................................................................
// Lista Tipos de documentos.

public consultaCatalogos(op:any)
{
  if(this.controlLista == 1)
  {
      //console.log("component")
      this.servi.getCatalogos().subscribe((data: any) => { //revisar

        if (op == 1)
        {
          let dat = data;
         
            this.Catalogos = data;//JSON.parse(data);
            this.TituloCatalogos = "LISTA DE CATALOGOS";
            this.TablaCatalogos[0] = "Indicador";
            this.TablaCatalogos[1] = "Denominacion";
            this.TablaCatalogos[2] = "Tipo Catalogo";
            //console.error(" El listado 3 " + this.TipDocs);
          }
          else if(op == 2)
          {
            this.comboListaCatalogo = data;//JSON.parse(data);
            this.MiCatalogo = null;
            this.TituloCatalogo = "";
            this.TabBusCatalogo[0] = "";
            this.TabBusCatalogo[1] = "";
            this.TabBusCatalogo[2] = "";
            //console.error(" El listado 4 " );
          }
          else if(op == 3)
          { 
            this.comboEditarCatalogo  = data;//JSON.parse(data);
            this.MiCatalogoE = null;
            this.TituloCatalogoEdit = ""; 

          }              
    },
      error => { console.error(error + " ") });
  }
  else
  {
    this.Catalogos = null;
    this.TituloCatalogos = "";
    this.TablaCatalogos[0] = "";
    this.TablaCatalogos[1] = "";
    this.TablaCatalogos[2] = "";   
    this.controlLista = 1; 
  }
 
}


//--------------------------------------------------------------------------------------------->
//para Limpiar la lista

public LimpiarLista() 
{
  this.controlLista = 0;
}
// -----------------------------------------------------------------------------------------

// Consulta un tipo de documento por medio de su id.

public buscarCatalogo() 
{

  var filtovalor = this.filtrarCatalogo.getRawValue()['combofiltro'];
  //console.log("318    " + filtovalor );
  this.servi.getCatalogo('/' + filtovalor).subscribe((data: {}) => {
    //console.log("313    " + filtovalor );

    this.MiCatalogo = data;


    //console.log("la data es " + data);
    //console.log("MiCatalogo es " + this.MiCatalogo);
   
    this.TituloCatalogo = "CATALOGO SELECCIONADO";
    this.TabBusCatalogo[0] = "Indicador";
    this.TabBusCatalogo[1] = "Denominador";
    this.TabBusCatalogo[2] = "Tipo catalogo";

  },
    error => { console.log(error) });

}

//--------------------------------------------------------------
 //Para insertar un nuevo Tipo de Documento

 public InsertarCatalogo() {


  var datosvalo2 = this.InsertarGCatalogo.getRawValue()['textNuevoCatalogo'];
  var datosvalo1 = this.InsertarGCatalogo.getRawValue()['filTipoCatalogo'];
  var cadena = { "CATALOGO": datosvalo2, "TIPO_CATALOGO":datosvalo1 };

  this.servi.insertCatalogo(cadena).then
    ( res => {
        //console.log(res)
      }
    ).catch(err => {
      //console.log(err)
    });
    this.InsertarGCatalogo.reset();
}

//----------------------------------------------------------------------------
// Consulta un tipo de documento por medio de su id para editarlo

buscarEditarCatalogo() 
{
  if ( this.BuscarEvalor != 0)
  {
    this.BuscarEvalor = this.ActualizarACatalogo.getRawValue()["buscarID_CATALOGO"];
    //console.error(" dos el filtro " + this.BuscarEvalor);
  }
  //console.error(" tres el filtro " + this.BuscarEvalor);

  this.servi.getCatalogo('/' + this.BuscarEvalor).subscribe((data: {}) => {

    this.MiCatalogoE = data; 
    this.TituloCatalogoEdit = "TIPO DE CATALOGO A EDITAR";   
    
  }, error => { console.log(error) });

}

  
//--------------------------------------------------------------
// Actualiza el Tipo de Documento 

public ActualizarCatalogo() 
{

  var nuevoCatalogo = this.ActualizarACatalogo.getRawValue()['textnuevoCATALOGO'];
  var nuevoiniCatalogo = this.ActualizarACatalogo.getRawValue()['textnuevoTIPO_CATALOGO'];

  var cadena = { "ID_CATALOGO": this.BuscarEvalor,"CATALOGO":nuevoCatalogo ,"TIPO_CATALOGO": nuevoiniCatalogo };
  
  this.servi.updateCatalogo(cadena).then
    (
      res => {
        console.log("res  ",res)
      }
    ).catch(err => {
      console.log(err)
    });

    this.BuscarEvalor = 0;
    this.ActualizarACatalogo.reset();
     

  }

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  ngOnInit(): void 
  {
    this.ListaCatalogo = this.formBuilder.group(
      {
  
      });   

      
    this.filtrarCatalogo = this.formBuilder.group(
    {
      combofiltro: []
    });

    
    this.InsertarGCatalogo = this.formBuilder.group(
    {
      textNuevoCatalogo: [], 
      filTipoCatalogo:[]
    });
    this.formBuilder.group

    
    this.ActualizarACatalogo = this.formBuilder.group(
    {
      buscarID_CATALOGO: [], 
      textnuevoCATALOGO: [], 
      textnuevoTIPO_CATALOGO: []
    });
    this.formBuilder.group

  }

public listarCatalogoE(catip:any)
{

  this.servi.getListarCatalogoEsp('/'+ catip).subscribe((data:{})=>
  {
    if (catip == 1)
      {
        this.catauniCatalogo = data;
      }
      else if (catip == 2)
      {
        this.cataTipcontacto = data; 
      }
      else if (catip == 3)
      {
        this.catatipmateriaprima = data;
      }
      else if (catip == 4)
      {
        this.catapresmateria = data;
      }
      else if (catip == 5)
      {
        this.catatipdoc = data;
      }
      else if(catip == 6)
      {
        this.cataCargo = data;
      }
      else if(catip == 7)
      {
        this.catacategoria = data;
      }
      else //(catip == 8)
      {
        this.cataclase = data;
      }
  },
   error => { console.log(error) });
  }

  public selectcatalogoE(catip: any, catselec: any)
  {
    if (this.BuscarEvalor != 0)
    {
      if (catip == 1)
      {
        this.BuscarEvalor = this.CBcatalogocatalogo.getRawValue()['catCatalogofiltro'];
      }
      else if (catip == 2)
      {
        this.BuscarEvalor = this.CBcatalogotipcontacto.getRawValue()['catTipoContfiltro'];
      }
      else if (catip == 3)
      {
        this.BuscarEvalor = this.catatipmateriaprima.getRawValue()['catTipMateriafiltro'];
      }
      else if (catip == 4)
      {
        this.BuscarEvalor = this.CBcatalogopresmateria.getRawValue()['catPresMaterfiltro'];
      }
      else if (catip == 5)
      {
        this.BuscarEvalor = this.CBcatalogotipdoc.getRawValue()['catTipdocfiltro'];
      }
      else if (catip == 6)
      {
        this.BuscarEvalor = this.CBcatalogocargo.getRawValue()['catCargofiltro'];
      }
      else if (catip == 7)
      {
        this.BuscarEvalor = this.CBcatalogocategoria.getRawValue()['catcategoriafiltro'];
      }
      else //if (catip == 8)
      {
        this.BuscarEvalor = this.CBcatalogoclase.getRawValue()['catClasefiltro'];
      }
    }
   catselec = this.BuscarEvalor;

    this.servi.getListarCatalogoEsp('/' + catip + '/' + catselec).subscribe((data: {}) =>
    {
      if (catip == 1)
      {
        this.catalogocatalogosel = data;
      }
      else if(catip == 2)
      {
        this.catalogotipcontactosel = data;
      }
      else if (catip == 3)
      {
        this.catalogotipmateriaprimasel = data;
      }
      else if (catip == 4)
      {
        this.catalogopresmateriasel = data;
      }
      else if (catip == 5)
      {
        this.catalogotipdocsel = data;
      }
      else if (catip == 6)
      {
        this.catalogocargosel = data;
      }
      else if (catip == 7)
      {
        this.catalogocategoriasel = data;
      }
      else //(catip == 1)
      {
        this.catalogoclasesel = data;
      }

    },
  error =>{console.log(error)});
  
  }
  
}
