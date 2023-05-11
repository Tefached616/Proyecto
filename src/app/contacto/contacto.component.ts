import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
// import { Console } from 'console';
import { ServicioService } from '../servicio.service'

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  title = "MANEJO DE CONTACTOS";

  Contactos: any = [];              //Lista de Tipos de Documentos
  TituloContactos = "";             //Titulo Lista de Tipos de Documentos
  TablaContactos: any = [];        //Encabezados tabla Lista de Tipos de Documentos 

  MiContacto: any = [];             //Tipo de Documento Buscado
  TituloContacto = "";              //Titulo de Tipo de Documento Buscado
  TabBusContacto: any = [];        //Encabezados tabla Tipo de Documento Buscado 
  comboListaContacto: any = [];     //Combo Buscar Tipo de Documento

  TituloContactoEdit = "";          //Titulo de Tipo de Documento a Editar
  MiContactoE: any = [];            //Tipo de Documento a Editar
  comboEditarContacto: any = [];    //Combo Editar Tipo de Documento

  controlLista = 1;               //Control para limpiar la lista
  BuscarEvalor = 1;               //Control para carga del valor a buscar

  cataTipcontacto: any = [];
  catapersonal: any = [];
  combo1: any = [];

   //*****************************************************************************
 //Form group 
  ListaContacto =  new FormGroup (
  {

  });

  filtrarContacto =  new FormGroup(
  {
    combofiltro: new FormControl()
  });

  

  InsertarGContacto =  new FormGroup(
  {
    filContactoPersonal: new FormControl(), 
    textDirContacto:new FormControl(),
    filTipoContacto:new FormControl()
  });

  
  ActualizarAContacto =  new FormGroup(
  {
    BuscarID_CONTACTO:new FormControl(),  
    filContactoPersonal: new FormControl(), 
    textDirContacto:new FormControl(),
    filTipoContacto:new FormControl()
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

public consultaContactoI()
{
      this.servi.getContactos().subscribe((data: any) => 
      {

          let dat = data;
         
          this.Contactos = data;
          this.TituloContactos = "LISTA DE CONTACTOS";
          this.TablaContactos[0] = "indicador";
          this.TablaContactos[1] = "Personal";
          this.TablaContactos[2] = "Dato contacto";
          this.TablaContactos[3] = "Tipo contacto";
      });
  }

//............................................................................................
// Lista Tipos de documentos.

public consultaContactos(op:any)
{
  //console.error(" El listado 1 " );
  if(this.controlLista == 1)
  {
      //console.log("component")
      this.servi.getContactos().subscribe((data: any) => { //revisar


        if (op == 1)
        {
          let dat = data;
         
          this.Contactos = data;
          this.TituloContactos = "LISTA DE CONTACTOS";
          this.TablaContactos[0] = "indicador";
          this.TablaContactos[1] = "Personal";
          this.TablaContactos[2] = "Dato contacto";
          this.TablaContactos[3] = "Tipo contacto";

          }
          else if(op == 2)
          {
            this.comboListaContacto = data;//JSON.parse(data);
            this.MiContacto = null;
            this.TituloContacto = "";
            this.TabBusContacto[0] = "";
            this.TabBusContacto[1] = "";
            this.TabBusContacto[2] = "";
            this.TabBusContacto[3] = "";
          }
          else if(op == 3)
          { 
            this.comboEditarContacto  = data;//JSON.parse(data);
            this.MiContactoE = null;
            this.TituloContactoEdit = ""; 
          }              
    },
      error => { console.error(error + " ") });
  }
  else
  {
    this.Contactos = null;
    this.TituloContactos = "";
    this.TablaContactos[0] = "";
    this.TablaContactos[1] = "";
    this.TablaContactos[2] = "";
    this.TablaContactos[3] = "";
    this.controlLista = 1; 
  }
 
}


//--------------------------------------------------------------------------------------------->
//para Limpiar la lista

  public LimpiarLista() 
    {
      this.controlLista = 0;
    }
//---------------------------------------------------------------------------------------------->
//---------------------------------------------------------------------------------------------->
// Consulta un tipo de documento por medio de su id.

public buscarContacto() 
{

  var filtovalor = this.filtrarContacto.getRawValue()['combofiltro'];
  this.servi.getContacto('/' + filtovalor).subscribe((data: {}) => {


    this.MiContacto = data;   
    this.TituloContacto = "MATERIA PRIMA SELECCIONADA";
    this.TabBusContacto[0] = "Indicador";
    this.TabBusContacto[1] = "Personal";
    this.TabBusContacto[2] = "Dato contacto";
    this.TabBusContacto[3] = "Tipo contacto";
  },
    error => { console.log(error) });

}


//----------------------------------------------------------------------------------------------->
//----------------------------------------------------------------------------------------------->
// Insertar un contacto

public InsertarContacto() {

  var datosvalo3 = this.InsertarGContacto.getRawValue()['filContactoPersonal']
  var datosvalo2 = this.InsertarGContacto.getRawValue()['textDirContacto'];
  var datosvalo1 = this.InsertarGContacto.getRawValue()['filTipoContacto'];
  var cadena = {"ID_PERSONAL": datosvalo3, "DIRDATO_CONTACTO": datosvalo2, "TIPO_CONTACTO":datosvalo1 };

  this.servi.insertContacto(cadena).then
    ( res => {
        //console.log(res)
      }
    ).catch(err => {
      //console.log(err)
    });
    this.InsertarGContacto.reset();
}

//------------------------------------------------------------------------------------------------->
//--------------------------------------------------------------
// Actualiza el Tipo de Documento 
buscarEditarContacto() 
{
  if ( this.BuscarEvalor != 0)
  {
    this.BuscarEvalor = this.ActualizarAContacto.getRawValue()["BuscarID_CONTACTO"];
    
  }
  
  this.servi.getContacto('/' + this.BuscarEvalor).subscribe((data: {}) => {

    this.MiContactoE = data; 
    this.TituloContactoEdit = "CONTACTO A EDITAR";   
    
  }, error => { console.log(error) });

}

public ActualizarContacto() 
{
  // console.log(this.MiContactoE)
  // console.log("😊😊",this.ActualizarAContacto.getRawValue())
  var datosvalo1 = this.ActualizarAContacto.getRawValue()['filContactoPersonal']
  var datosvalo2 = this.ActualizarAContacto.getRawValue()['textDirContacto'];
  var datosvalo3 = this.ActualizarAContacto.getRawValue()['filTipoContacto'];
  var cadena = { "ID_CONTACTO": this.BuscarEvalor,"ID_PERSONAL": datosvalo1, "DIRDATO_CONTACTO": datosvalo2,
   "TIPO_CONTACTO":datosvalo3 };

  this.servi.updateContacto(cadena).then
    (
      res => {
        console.log("res  ",res)
      }
    ).catch(err => {
      console.log(err)
    });

    this.BuscarEvalor = 0;
    this.ActualizarAContacto.reset();
     

  }

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
ngOnInit(): void 
    {
      this.ListaContacto = this.formBuilder.group(
        {
    
        });   
  
        
      this.filtrarContacto = this.formBuilder.group(
      {
        combofiltro: []
      });

      this.InsertarGContacto = this.formBuilder.group(
        {
          filContactoPersonal: [], 
          textDirContacto:[],
          filTipoContacto:[]
        });

        this.ActualizarAContacto = this.formBuilder.group(
          {
            BuscarID_CONTACTO:[],  
            filContactoPersonal: [], 
            textDirContacto:[],
            filTipoContacto:[]
          });
          this.formBuilder.group
      
    }

public Filtro1(){

  this.servi.getListarCatalogoEsp('/'+'2').subscribe((data:any) =>{
    this.cataTipcontacto = data;
    // console.log(data);
    // this.ActualizarAContacto.patchValue({filTipoContacto:"aaaaaa"})
  },
  error => {console.log(error)});
}


public Filtro2(){

  this.servi.getListarPersonalEsp('/').subscribe((data:any) =>{
    this.catapersonal = data;
  },
  error => {console.log(error)});
}

// public Filtro3(){

//   this.servi.getListarCatalogoEsp('/').subscribe((data:any) =>{
//     this.combo1= data;
//   },
//   error => {console.log(error)});
// }
}