import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioService } from '../servicio.service'

@Component({
  selector: 'app-productox-materia-prima',
  templateUrl: './productox-materia-prima.component.html',
  styleUrls: ['./productox-materia-prima.component.css']
})
export class ProductoxMateriaPrimaComponent implements OnInit {

  title = "MANEJO DE Producto";

  Tpasos: any = [];              //Lista de Tipos de Documentos
  TituloTpasos = "";             //Titulo Lista de Tipos de Documentos
  TablaTpasos: any = [];        //Encabezados tabla Lista de Tipos de Documentos 

  MiTpaso: any = [];             //Tipo de Documento Buscado
  TituloTpaso = "";              //Titulo de Tipo de Documento Buscado
  TabBusTpaso: any = [];        //Encabezados tabla Tipo de Documento Buscado 
  comboListaTpaso: any = [];     //Combo Buscar Tipo de Documento

  TituloTpasoEdit = "";          //Titulo de Tipo de Documento a Editar
  MiTpasoE: any = [];            //Tipo de Documento a Editar
  comboEditarTpaso: any = [];    //Combo Editar Tipo de Documento

  controlLista = 1;               //Control para limpiar la lista
  BuscarEvalor = 1;               //Control para carga del valor a buscar
  cataidmateria: any = [];
  cataidproducto: any = [];

   //*****************************************************************************
 //Form group 
  ListaTpaso =  new FormGroup (
  {

  });

  filtrarTpaso =  new FormGroup(
  {
    combofiltro: new FormControl()
  });

  
  InsertarGTpaso =  new FormGroup(
  {
    filidmateria: new FormControl(), 
    filidproducto:new FormControl()
  });

  
  ActualizarATpaso =  new FormGroup(
  {
    BuscaridTpaso:new FormControl(),  
    filidmateria: new FormControl(), 
    filidproducto:new FormControl()
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

public consultaTpasoI()
{
      this.servi.getTpasos().subscribe((data: any) => 
      {

          let dat = data;
         
          this.Tpasos = data;
          this.TituloTpasos = "LISTA DE TABLA DE PASO";
          this.TablaTpasos[0] = "Indicador";
          this.TablaTpasos[1] = "Materia prima";
          this.TablaTpasos[2] = "Producto";

      });
  }

//............................................................................................
// Lista Tipos de documentos.

public consultaTpasos(op:any)
{
  //console.error(" El listado 1 " );
  if(this.controlLista == 1)
  {
      //console.log("component")
      this.servi.getTpasos().subscribe((data: any) => { //revisar


        if (op == 1)
        {
          let dat = data;

          this.Tpasos = data;
          this.TituloTpasos = "LISTA DE TABLA DE PASO";
          this.TablaTpasos[0] = "Indicador";
          this.TablaTpasos[1] = "Materia prima";
          this.TablaTpasos[2] = "Producto";

          }
          else if(op == 2)
          {
            this.comboListaTpaso = data;//JSON.parse(data);
            this.MiTpaso = null;
            this.TituloTpaso = "";
            this.TabBusTpaso[0] = "";
            this.TabBusTpaso[1] = "";
            this.TabBusTpaso[2] = "";

          }
          else if(op == 3)
          { 
            this.comboEditarTpaso  = data;//JSON.parse(data);
            this.MiTpasoE = null;
            this.TituloTpasoEdit = ""; 
          }              
    },
      error => { console.error(error + " ") });
  }
  else
  {
    this.Tpasos = null;
    this.TituloTpasos = "";
    this.TablaTpasos[0] = "";
    this.TablaTpasos[1] = "";
    this.TablaTpasos[2] = "";


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

public buscarTpaso() 
{

  var filtovalor = this.filtrarTpaso.getRawValue()['combofiltro'];
  this.servi.getTpaso('/' + filtovalor).subscribe((data: {}) => {


    this.MiTpaso = data;   
    this.TituloTpaso = "DATO SELECCIONADO";
    this.TabBusTpaso[0] = "Indicador";
    this.TabBusTpaso[1] = "Materia prima";
    this.TabBusTpaso[2] = "Producto";

  
  },
    error => { console.log(error) });

}

//----------------------------------------------------------------------------------------------->
//----------------------------------------------------------------------------------------------->
// Insertar un contacto
public InsertarTpaso() {

  var datosvalo1 = this.InsertarGTpaso.getRawValue()['filidmateria'];
  var datosvalo2 = this.InsertarGTpaso.getRawValue()['filidproducto'];
  var cadena = {"ID_MATERIA_PRIMA": datosvalo1, "ID_PRODUCTO": datosvalo2};

  this.servi.insertTpaso(cadena).then
    ( res => {
      }
    ).catch(err => {
    });
    this.InsertarGTpaso.reset();
}
//------------------------------------------------------------------------------------------------->
//--------------------------------------------------------------
// Actualiza el Tipo de Documento 
buscarEditarTpaso() 
{
  if ( this.BuscarEvalor != 0)
  {
    this.BuscarEvalor = this.ActualizarATpaso.getRawValue()["BuscaridTpaso"];
    
  }
  
  this.servi.getListarTpasoEsp('/' + this.BuscarEvalor).subscribe((data: {}) => {

    this.MiTpasoE = data; 
    this.TituloTpasoEdit = "DATO A EDITAR";   
    
  }, error => { console.log(error) });

}

public ActualizarTpaso() 
{
  var datosvalo1 = this.ActualizarATpaso.getRawValue()['filidmateria']
  var datosvalo2 = this.ActualizarATpaso.getRawValue()['filidproducto'];
  var cadena = { "ID_PROD_X_MAT": this.BuscarEvalor,"ID_MATERIA_PRIMA": datosvalo1, "ID_PRODUCTO": datosvalo2};

  this.servi.updateTpaso(cadena).then
    (
      res => {
        console.log("res  ",res)
      }
    ).catch(err => {
      console.log(err)
    });

    this.BuscarEvalor = 0;
    this.ActualizarATpaso.reset();
     

  }

//------------------------------------------------------------------------------------------------->

//------------------------------------------------------------------------------------------->
    ngOnInit(): void 
    {
      this.ListaTpaso = this.formBuilder.group(
        {
    
        });   
  
        
      this.filtrarTpaso = this.formBuilder.group(
      {
        combofiltro: []
      });

      this.InsertarGTpaso = this.formBuilder.group(
        {
          filidmateria: [],
          filidproducto:[]
        });
        this.ActualizarATpaso = this.formBuilder.group(
          {
            BuscaridTpaso:[],  
            filidmateria: [], 
            filidproducto:[]
          });
          this.formBuilder.group

    }
    public Filtro1(){

      this.servi.getListarMateriaprimaEsp('/').subscribe((data:any) =>{
        this.cataidmateria = data;
      },
      error => {console.log(error)});
    }
    
    public Filtro2(){
    
      this.servi.getListarProductoEsp('/').subscribe((data:any) =>{
        this.cataidproducto= data;
      },
      error => {console.log(error)});
    }
}
