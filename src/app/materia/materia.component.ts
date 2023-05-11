import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioService } from '../servicio.service'

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {
  title = "MONDOTECHNO";

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

  cataTmateria: any = [];
  cataPresentacion: any = [];

   //*****************************************************************************
 //Form group 
  ListaMateriaprima =  new FormGroup (
  {

  });

  filtrarMateriaprima =  new FormGroup(
  {
    combofiltro: new FormControl()
  });

  
  InsertarGMateriaprima =  new FormGroup(
  {
    textNomMateria: new FormControl(),
    textCantidad: new FormControl(),
    filTmateria: new FormControl(),
    filPresentacion: new FormControl()
  });

  
  ActualizarAMateria =  new FormGroup(
  {
    BuscarIdmateriaprima:new FormControl(),  
    textNomMateria: new FormControl(),
    textCantidad: new FormControl(),
    filTmateria: new FormControl(),
    filPresentacion: new FormControl()
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
// Consulta un tipo de documento por medio de su id.

public buscarMateriaprima() 
{

  var filtovalor = this.filtrarMateriaprima.getRawValue()['combofiltro'];
  this.servi.getMateriaprima('/' + filtovalor).subscribe((data: {}) => {


    this.MiMateriaprima = data;   
    this.TituloMateriaprima = "CONTACTO SELECCIONADO";
    this.TabBusMateriaprima[0] = "Indicador";
    this.TabBusMateriaprima[1] = "Materia prima";
    this.TabBusMateriaprima[2] = "Cantidad";
    this.TabBusMateriaprima[3] = "Tipo";
    this.TabBusMateriaprima[4] = "Presentacion";
  },
    error => { console.log(error) });

}
//----------------------------------------------------------------------------------------------->
//----------------------------------------------------------------------------------------------->
// Insertar un contacto
public InsertarMateriaprima() {
  var datosvalo1 = this.InsertarGMateriaprima.getRawValue()['textNomMateria']
  var datosvalo2 = this.InsertarGMateriaprima.getRawValue()['textCantidad']
  var datosvalo3 = this.InsertarGMateriaprima.getRawValue()['filTmateria'];
  var datosvalo4 = this.InsertarGMateriaprima.getRawValue()['filPresentacion'];
  var cadena = {"NOM_MATERIA_PRIMA": datosvalo1, "CANTIDAD": datosvalo2, "TIPO_MP":datosvalo3,"PRESENTACION_MP":datosvalo4 };

  this.servi.insertMateriaprima(cadena).then
    ( res => {
      }
    ).catch(err => {
    });
    this.InsertarGMateriaprima.reset();
}

//----------------------------------------------------------------------------------------------->
//----------------------------------------------------------------------------------------------->
//--------------------------------------------------------------
// Actualiza el Tipo de Documento 
buscarEditarMateriaprima() 
{
  if ( this.BuscarEvalor != 0)
  {
    this.BuscarEvalor = this.ActualizarAMateria.getRawValue()["BuscarIdmateriaprima"];

  }
  
  this.servi.getMateriaprima('/' + this.BuscarEvalor).subscribe((data: {}) => {

    this.MiMateriaprimaE  = data; 
    this.TituloMateriaprimaEdit = "MATERIA PRIMA A EDITAR";   
    
  }, error => { console.log(error) });

}

public ActualizarMateria() 
{
  var datosvalo1 = this.ActualizarAMateria.getRawValue()['textNomMateria']
  var datosvalo2 = this.ActualizarAMateria.getRawValue()['textCantidad'];
  var datosvalo3 = this.ActualizarAMateria.getRawValue()['filTmateria'];
  var datosvalo4 = this.ActualizarAMateria.getRawValue()['filPresentacion'];
  var cadena = { "ID_MATERIA_PRIMA": this.BuscarEvalor,"NOM_MATERIA_PRIMA": datosvalo1, "CANTIDAD": datosvalo2,
   "TIPO_MP":datosvalo3,"PRESENTACION_MP":datosvalo4 };

  this.servi.updateMateriaprima(cadena).then
    (
      res => {
        console.log("res  ",res)
      }
    ).catch(err => {
      console.log(err)
    });

    this.BuscarEvalor = 0;
    this.ActualizarAMateria.reset();
     

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

      this.InsertarGMateriaprima = this.formBuilder.group(
        {
          textNomMateria: [],
          textCantidad: [],
          filTmateria: [],
          filPresentacion: []
        });
        
        this.ActualizarAMateria = this.formBuilder.group(
          {
            BuscarIdmateriaprima:[],  
            textNomMateria: [],
            textCantidad: [],
            filTmateria: [],
            filPresentacion: []
          });
          this.formBuilder.group
    }
    public Filtro1(){

      this.servi.getListarCatalogoEsp('/'+'3').subscribe((data:any) =>{
        this.cataTmateria = data;
      },
      error => {console.log(error)});
    }
    
    public Filtro2(){
    
      this.servi.getListarCatalogoEsp('/'+'4').subscribe((data:any) =>{
        this.cataPresentacion = data;
      },
      error => {console.log(error)});
    }

}
