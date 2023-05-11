import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ServicioService } from '../servicio.service'
@Component({
  selector: 'app-produccion',
  templateUrl: './produccion.component.html',
  styleUrls: ['./produccion.component.css']
})
export class ProduccionComponent implements OnInit {

  title = "MANEJO DE Produccions";

  Produccions: any = [];              //Lista de Tipos de Documentos
  TituloProduccions = "";             //Titulo Lista de Tipos de Documentos
  TablaProduccions: any = [];        //Encabezados tabla Lista de Tipos de Documentos 

  MiProduccion: any = [];             //Tipo de Documento Buscado
  TituloProduccion = "";              //Titulo de Tipo de Documento Buscado
  TabBusProduccion: any = [];        //Encabezados tabla Tipo de Documento Buscado 
  comboListaProduccion: any = [];     //Combo Buscar Tipo de Documento

  TituloProduccionEdit = "";          //Titulo de Tipo de Documento a Editar
  MiProduccionE: any = [];            //Tipo de Documento a Editar
  comboEditarProduccion: any = [];    //Combo Editar Tipo de Documento

  controlLista = 1;               //Control para limpiar la lista
  BuscarEvalor = 1;               //Control para carga del valor a buscar
  cataidpersonal: any = [];
  cataproducto: any = [];

   //*****************************************************************************
 //Form group 
  ListaProduccion =  new FormGroup (
  {

  });

  filtrarProduccion =  new FormGroup(
  {
    combofiltro: new FormControl()
  });

  
  InsertarGProduccion =  new FormGroup(
  {
    textcalidad: new FormControl(), 
    textfecha:new FormControl(),
    textcantidad:new FormControl(),
    textdefectuoso:new FormControl(),
    filpersonal:new FormControl(),
    filproducto:new FormControl()
  });

  
  ActualizarAProduccion =  new FormGroup(
  {
    BuscarIdProduccion:new FormControl(),  
    textcalidad: new FormControl(), 
    textfecha:new FormControl(),
    textcantidad:new FormControl(),
    textdefectuoso:new FormControl(),
    filpersonal:new FormControl(),
    filproducto:new FormControl()
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

public consultaProduccionI()
{
      this.servi.getProduccions().subscribe((data: any) => 
      {

          let dat = data;
         
          this.Produccions = data;
          this.TituloProduccions = "LISTA DE PRODUCION";
          this.TablaProduccions[0] = "indicador";
          this.TablaProduccions[1] = "Personal";
          this.TablaProduccions[2] = "Fecha de produccion";
          this.TablaProduccions[3] = "Producto";
          this.TablaProduccions[4] = "Cantidad";
          this.TablaProduccions[5] = "Calidad";
          this.TablaProduccions[6] = "Defectuosos";
          
      });
  }

//............................................................................................
// Lista Tipos de documentos.

public consultaProduccions(op:any)
{
  //console.error(" El listado 1 " );
  if(this.controlLista == 1)
  {
      //console.log("component")
      this.servi.getProduccions().subscribe((data: any) => { //revisar


        if (op == 1)
        {
          let dat = data;
         
          this.Produccions = data;
          this.TituloProduccions = "LISTA DE Produccions";
          this.TablaProduccions[0] = "indicador";
          this.TablaProduccions[1] = "Personal";
          this.TablaProduccions[2] = "Fecha de produccion";
          this.TablaProduccions[3] = "Producto";
          this.TablaProduccions[4] = "Cantidad";
          this.TablaProduccions[5] = "Calidad";
          this.TablaProduccions[6] = "Defectuosos";

          }
          else if(op == 2)
          {
            this.comboListaProduccion = data;//JSON.parse(data);
            this.MiProduccion = null;
            this.TituloProduccion = "";
            this.TabBusProduccion[0] = "";
            this.TabBusProduccion[1] = "";
            this.TabBusProduccion[2] = "";
            this.TabBusProduccion[3] = "";
            this.TabBusProduccion[4] = "";
            this.TabBusProduccion[5] = "";
            this.TabBusProduccion[6] = "";
          }
          else if(op == 3)
          { 
            this.comboEditarProduccion  = data;//JSON.parse(data);
            this.MiProduccionE = null;
            this.TituloProduccionEdit = ""; 
          }              
    },
      error => { console.error(error + " ") });
  }
  else
  {
    this.Produccions = null;
    this.TituloProduccions = "";
    this.TablaProduccions[0] = "";
    this.TablaProduccions[1] = "";
    this.TablaProduccions[2] = "";
    this.TablaProduccions[3] = "";
    this.TablaProduccions[4] = "";
    this.TablaProduccions[5] = "";
    this.TablaProduccions[6] = "";
    this.controlLista = 1; 
  }
 
}


//--------------------------------------------------------------------------------------------->
//para Limpiar la lista

  public LimpiarLista() 
    {
      this.controlLista = 0;
    }

//--------------------------------------------------------------------------------------------->
//Llamar ID

public buscarProduccion() 
{

  var filtovalor = this.filtrarProduccion.getRawValue()['combofiltro'];
  this.servi.getProduccion('/' + filtovalor).subscribe((data: {}) => {


    this.MiProduccion = data;   
    this.TituloProduccion = "PRODUCCION SELECCIONADA";
    this.TabBusProduccion[0] = "Indicador";
    this.TabBusProduccion[1] = "Personal";
    this.TabBusProduccion[2] = "Fecha de produccion";
    this.TabBusProduccion[3] = "Producto";
    this.TabBusProduccion[4] = "Cantidad";
    this.TabBusProduccion[5] = "Calidad";
    this.TabBusProduccion[6] = "Defectuosos";
  
  },
    error => { console.log(error) });

}
//----------------------------------------------------------------------------------------------->
//----------------------------------------------------------------------------------------------->
// Insertar un contacto
public InsertarProduccion() {
  var datosvalo1 = this.InsertarGProduccion.getRawValue()['textcalidad']
  var datosvalo2 = this.InsertarGProduccion.getRawValue()['textfecha']
  var datosvalo3 = this.InsertarGProduccion.getRawValue()['textcantidad'];
  var datosvalo4 = this.InsertarGProduccion.getRawValue()['textdefectuoso'];
  var datosvalo5 = this.InsertarGProduccion.getRawValue()['filpersonal'];
  var datosvalo6 = this.InsertarGProduccion.getRawValue()['filproducto'];
  var cadena = {"CALIDAD": datosvalo1, "FEC_PRODUCCION": datosvalo2, "CANTIDAD_PRODUCCION":datosvalo3,"DEFECTUOSOS":datosvalo4,"ID_PERSONAL":datosvalo5,"ID_PRODUCTO":datosvalo6 };

  this.servi.insertProduccion(cadena).then
    ( res => {
      }
    ).catch(err => {
    });
    this.InsertarGProduccion.reset();
}
//------------------------------------------------------------------------------------------------->
//--------------------------------------------------------------
// Actualiza el Tipo de Documento 
buscarEditarProduccion() 
{
  if ( this.BuscarEvalor != 0)
  {
    this.BuscarEvalor = this.ActualizarAProduccion.getRawValue()["BuscarIdProduccion"];
    
  }
  
  this.servi.getProduccion('/' + this.BuscarEvalor).subscribe((data: {}) => {

    this.MiProduccionE = data; 
    this.TituloProduccionEdit = "PRODUCCION A EDITAR";   
    
  }, error => { console.log(error) });

}

public ActualizarProduccion() {
  var datosvalo1 = this.InsertarGProduccion.getRawValue()['textcalidad']
  var datosvalo2 = this.InsertarGProduccion.getRawValue()['textfecha']
  var datosvalo3 = this.InsertarGProduccion.getRawValue()['textcantidad'];
  var datosvalo4 = this.InsertarGProduccion.getRawValue()['textdefectuoso'];
  var datosvalo5 = this.InsertarGProduccion.getRawValue()['filpersonal'];
  var datosvalo6 = this.InsertarGProduccion.getRawValue()['filproducto'];
  var cadena = {"ID_PRODUCCION":this.BuscarEvalor,"CALIDAD": datosvalo1, 
  "FEC_PRODUCCION": datosvalo2, " CANTIDAD_PRODUCCION":datosvalo3,"DEFECTUOSOS":datosvalo4,
  "ID_PERSONAL":datosvalo5,"ID_PRODUCTO":datosvalo6 };


  this.servi.updateProduccion(cadena).then
    (
      res => {
        console.log("res  ",res)
      }
    ).catch(err => {
      console.log(err)
    });

    this.BuscarEvalor = 0;
    this.ActualizarAProduccion.reset();
     

  }
//----------------------------------------------------------------------------------------------->
//----------------------------------------------------------------------------------------------->

  ngOnInit(): void 
    {
      this.ListaProduccion = this.formBuilder.group(
        {
    
        });   
  
        
      this.filtrarProduccion = this.formBuilder.group(
      {
        combofiltro: []
      });

      this.InsertarGProduccion = this.formBuilder.group(
        {
          textcalidad: [], 
          textfecha: [],
          textcantidad: [],
          textdefectuoso: [],
          filpersonal: [],
          filproducto: []
        });
        this.ActualizarAProduccion = this.formBuilder.group(
          {
            BuscarIdProduccion: [],
            textcalidad: [], 
            textfecha: [],
            textcantidad: [],
            textdefectuoso: [],
            filpersonal: [],
            filproducto: []
          });
          this.formBuilder.group
    }
    public Filtro1(){

      this.servi.getListarPersonalEsp('/').subscribe((data:any) =>{
        this.cataidpersonal = data;
      },
      error => {console.log(error)});
    }
    
    public Filtro2(){
    
      this.servi.getListarProductoEsp('/').subscribe((data:any) =>{
        this.cataproducto = data;
      },
      error => {console.log(error)});
    }
  } 
