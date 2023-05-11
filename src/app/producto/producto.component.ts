import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioService } from '../servicio.service'

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  title = "MANEJO DE PRODUCTO";

  Productos: any = [];              //Lista de Tipos de Documentos
  TituloProductos = "";             //Titulo Lista de Tipos de Documentos
  TablaProductos: any = [];        //Encabezados tabla Lista de Tipos de Documentos 

  MiProducto: any = [];             //Tipo de Documento Buscado
  TituloProducto = "";              //Titulo de Tipo de Documento Buscado
  TabBusProducto: any = [];        //Encabezados tabla Tipo de Documento Buscado 
  comboListaProducto: any = [];     //Combo Buscar Tipo de Documento

  TituloProductoEdit = "";          //Titulo de Tipo de Documento a Editar
  MiProductoE: any = [];            //Tipo de Documento a Editar
  comboEditarProducto: any = [];    //Combo Editar Tipo de Documento

  controlLista = 1;               //Control para limpiar la lista
  BuscarEvalor = 1;               //Control para carga del valor a buscar

  catacategoria: any=[];
  cataclase: any = [];
  
   //*****************************************************************************
 //Form group 
  ListaProducto =  new FormGroup (
  {

  });

  filtrarProducto =  new FormGroup(
  {
    combofiltro: new FormControl()
  });

  
  InsertarGProducto =  new FormGroup(
  {
    textNom_producto: new FormControl(), 
    filCategoria:new FormControl(),
    filClase:new FormControl()
  });

  
  ActualizarAProducto =  new FormGroup(
  {
    BuscarIdProducto:new FormControl(),  
    textNom_producto: new FormControl(), 
    filCategoria:new FormControl(),
    filClase:new FormControl()
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

public consultaProductoI()
{
      this.servi.getProductos().subscribe((data: any) => 
      {

          let dat = data;
         
          this.Productos = data;
          this.TituloProductos = "LISTA DE Productos";
          this.TablaProductos[0] = "Indicador";
          this.TablaProductos[1] = "Nombre 1";
          this.TablaProductos[2] = "Nombre 2";
          this.TablaProductos[3] = "Apellido 1";
          this.TablaProductos[1] = "Apellido 2";
          this.TablaProductos[2] = "Tipo documento";
          this.TablaProductos[3] = "Numero de documento";
          this.TablaProductos[4] = "Cargo";
      });
  }

//............................................................................................
// Lista Tipos de documentos.

public consultaProductos(op:any)
{
  //console.error(" El listado 1 " );
  if(this.controlLista == 1)
  {
      //console.log("component")
      this.servi.getProductos().subscribe((data: any) => { //revisar


        if (op == 1)
        {
          let dat = data;

          this.Productos = data;
          this.TituloProductos = "LISTA DE Productos";
          this.TablaProductos[0] = "Indicador";
          this.TablaProductos[1] = "Producto";
          this.TablaProductos[2] = "Categoria";
          this.TablaProductos[3] = "Clase";

          }
          else if(op == 2)
          {
            this.comboListaProducto = data;//JSON.parse(data);
            this.MiProducto = null;
            this.TituloProducto = "";
            this.TabBusProducto[0] = "";
            this.TabBusProducto[1] = "";
            this.TabBusProducto[2] = "";
            this.TabBusProducto[3] = "";
            this.TabBusProducto[4] = "";
          }
          else if(op == 3)
          { 
            this.comboEditarProducto  = data;//JSON.parse(data);
            this.MiProductoE = null;
            this.TituloProductoEdit = ""; 
          }              
    },
      error => { console.error(error + " ") });
  }
  else
  {
    this.Productos = null;
    this.TituloProductos = "";
    this.TablaProductos[0] = "";
    this.TablaProductos[1] = "";
    this.TablaProductos[2] = "";
    this.TablaProductos[3] = "";
    this.TablaProductos[4] = "";

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

public buscarProducto() 
{

  var filtovalor = this.filtrarProducto.getRawValue()['combofiltro'];
  this.servi.getProducto('/' + filtovalor).subscribe((data: {}) => {


    this.MiProducto = data;   
    this.TituloProducto = "PRODUCTO SELECCIONADO";
    this.TabBusProducto[0] = "Indicador";
    this.TabBusProducto[1] = "Producto";
    this.TabBusProducto[2] = "Categoria";
    this.TabBusProducto[3] = "Clase";
  
  },
    error => { console.log(error) });

}
//------------------------------------------------------------------------------------------->
//----------------------------------------------------------------------------------------------->
// Insertar un contacto
public InsertarProducto() {

  var datosvalo3 = this.InsertarGProducto.getRawValue()['textNom_producto']
  var datosvalo2 = this.InsertarGProducto.getRawValue()['filCategoria'];
  var datosvalo1 = this.InsertarGProducto.getRawValue()['filClase'];
  var cadena = {"NOM_PRODUCTO": datosvalo3, "CATEGORIA_PRODUCTO": datosvalo2, "CLASE_PRODUCTO":datosvalo1 };

  this.servi.insertProducto(cadena).then
    ( res => {
      }
    ).catch(err => {
    });
    this.InsertarGProducto.reset();
}
 
//--------------------------------------------------------------
// Actualiza el Tipo de Documento 
buscarEditarProducto() 
{
  if ( this.BuscarEvalor != 0)
  {
    this.BuscarEvalor = this.ActualizarAProducto.getRawValue()["BuscarIdProducto"];

  }
  
  this.servi.getProducto('/' + this.BuscarEvalor).subscribe((data: {}) => {

    this.MiProductoE  = data; 
    this.TituloProductoEdit = "PRODUCTO A EDITAR";   
    
  }, error => { console.log(error) });

}

public ActualizaProducto() 
{
  var datosvalo1 = this.ActualizarAProducto.getRawValue()['textNom_producto']
  var datosvalo2 = this.ActualizarAProducto.getRawValue()['filCategoria'];
  var datosvalo3 = this.ActualizarAProducto.getRawValue()['filClase'];
  var cadena = { "ID_PRODUCTO": this.BuscarEvalor,"NOM_PRODUCTO": datosvalo1, "CATEGORIA_PRODUCTO": datosvalo2,
   "CLASE_PRODUCTO":datosvalo3 };

  this.servi.updateProducto(cadena).then
    (
      res => {
        console.log("res  ",res)
      }
    ).catch(err => {
      console.log(err)
    });

    this.BuscarEvalor = 0;
    this.ActualizarAProducto.reset();
     

  }


ngOnInit(): void 
    {
      this.ListaProducto = this.formBuilder.group(
        {
    
        });   
  
        
      this.filtrarProducto = this.formBuilder.group(
      {
        combofiltro: []
      });

      this.InsertarGProducto = this.formBuilder.group(
        {
          textNom_producto: [], 
          filCategoria:[],
          filClase:[]
        });
        this.ActualizarAProducto = this.formBuilder.group(
          {
            BuscarIdProducto:[],  
            textNom_producto: [], 
            filCategoria:[],
            filClase:[]
          });
          this.formBuilder.group
    }
    public Filtro1(){

      this.servi.getListarCatalogoEsp('/'+'7').subscribe((data:any) =>{
        this.catacategoria = data;
      },
      error => {console.log(error)});
    }
    public Filtro2(){

      this.servi.getListarCatalogoEsp('/'+'8').subscribe((data:any) =>{
        this.cataclase= data;
      },
      error => {console.log(error)});
    }
}