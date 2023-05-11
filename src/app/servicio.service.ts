import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions =
{
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable(
  {
    providedIn: 'root'
  })

export class ServicioService 
{
  
  private Url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  private extractData(res: Response) 
  {
     let body = JSON.parse('' + res);
     return body || {};
   }
   private handleError<T>(operation = 'operation', result?: T) 
   { 
      return (error: any): Observable<T> => {
        console.log(`${operation} failed: ${error.message}`);
        return of(result as T)

    };
   }

   
//#region Metodos catalogo

  // Método Listar de los Tipos de documentos 
  getCatalogos(): Observable<any>
  {

    return this.http.get(this.Url + "/Catalogo" , httpOptions);
   
  }

  
  getListarCatalogoEsp(fil:any): Observable<any>
  {

    return this.http.get(this.Url + "/Catalogo" + fil , httpOptions);
   
  }

  //-------------------------------------------------------------
 // Método mostrar un solo Tipo de documento  

  getCatalogo(id:any): Observable<any> {
  return this.http.get(this.Url + "/Catalogo"+id , httpOptions);
}
  //-------------------------------------------------------------
 // Método para insertar un nuevo Tipo de documento 

 async insertCatalogo(CatalogoD:any): Promise<any> {
  
  return new Promise((resolve, reject) => {
    this.http.post(this.Url + "/Catalogo", CatalogoD, httpOptions).toPromise()
  });
}

  //-------------------------------------------------------------
 // Método para modificar un  Tipo de documento

 async updateCatalogo(cadena:any): Promise<any> {

  return new Promise((resolve, reject) => {
    this.http.put(this.Url + "/Catalogo", cadena, httpOptions).toPromise()
  });
}
//#endregion

//#region METODOS CONTACTOS
  // Método Listar los contactos
  getContactos(): Observable<any>
  {

    return this.http.get(this.Url + "/Contacto" , httpOptions);
   
  }

  getListarContactoEsp(fil:any): Observable<any>
  {

    return this.http.get(this.Url + "/Contacto" + fil , httpOptions);
   
  }
  //-------------------------------------------------------------
 // Método mostrar un solo contacto

  getContacto(id:any): Observable<any> {
  return this.http.get(this.Url + "/Contacto"+id , httpOptions);
}
  //-------------------------------------------------------------
 // Método para insertar un nuevo Contacto

 async insertContacto(ContactoD:any): Promise<any> {

  return new Promise((resolve, reject) => {
    this.http.post(this.Url + "/Contacto", ContactoD, httpOptions).toPromise()
  });
}

  //-------------------------------------------------------------
 // Método para modificar un contacto

 async updateContacto(cadena:any): Promise<any> {

  return new Promise((resolve, reject) => {
    this.http.put(this.Url + "/Contacto", cadena, httpOptions).toPromise()
  });
}
//#endregion

//#region METODOS PERSONAL
  // Método Listar los contactos
  getPersonals(): Observable<any>
  {

    return this.http.get(this.Url + "/Personal" , httpOptions);
   
  }

  getListarPersonalEsp(fil:any): Observable<any>
  {

    return this.http.get(this.Url + "/Personal" + fil , httpOptions);
   
  }
  //-------------------------------------------------------------
 // Método mostrar un solo contacto

  getPersonal(id:any): Observable<any> {
  return this.http.get(this.Url + "/Personal"+id , httpOptions);
}
  //-------------------------------------------------------------
 // Método para insertar un nuevo Contacto

 async insertPersonal(PersonalD:any): Promise<any> {

  return new Promise((resolve, reject) => {
    this.http.post(this.Url + "/Personal", PersonalD, httpOptions).toPromise()
  });
}

  //-------------------------------------------------------------
 // Método para modificar un contacto

 async updatePersonal(cadena:any): Promise<any> {

  return new Promise((resolve, reject) => {
    this.http.put(this.Url + "/Personal", cadena, httpOptions).toPromise()
  });
}
//#endregion

//#region METODOS MATERIA PRIMA
  // Método Listar la Materia Prima
  getMateria_Primas(): Observable<any>
  {
    return this.http.get(this.Url + "/Materia_Prima" , httpOptions);
  }

  getListarMateriaprimaEsp(fil:any): Observable<any>
  {

    return this.http.get(this.Url + "/Materia_Prima" + fil , httpOptions);
   
  }
  //-------------------------------------------------------------
 // Método mostrar un solo Materia Prima

  getMateriaprima(id:any): Observable<any> {
  return this.http.get(this.Url + "/Materia_Prima"+id , httpOptions);
}
  //-------------------------------------------------------------
 // Método para insertar un nuevo Materia Prima

 async insertMateriaprima(MateriaPrimaD:any): Promise<any> {

  return new Promise((resolve, reject) => {
    this.http.post(this.Url + "/Materia_Prima", MateriaPrimaD, httpOptions).toPromise()
  });
}

 // -------------------------------------------------------------
 // Método para modificar un contacto

 async updateMateriaprima(cadena:any): Promise<any> {

  return new Promise((resolve, reject) => {
    this.http.put(this.Url + "/Materia_Prima", cadena, httpOptions).toPromise()
  });
}
//#endregion

//#region METODOS PRODUCCION
// Método Listar los contactos
getProduccions(): Observable<any>
{

  return this.http.get(this.Url + "/Produccion" , httpOptions);
 
}

getListarProduccionEsp(fil:any): Observable<any>
{

  return this.http.get(this.Url + "/Produccion" + fil , httpOptions);
 
}
//-------------------------------------------------------------
// Método mostrar un solo contacto

getProduccion(id:any): Observable<any> {
return this.http.get(this.Url + "/Produccion"+id , httpOptions);
}
//-------------------------------------------------------------
// Método para insertar un nuevo Contacto

async insertProduccion(PersonalD:any): Promise<any> {

return new Promise((resolve, reject) => {
  this.http.post(this.Url + "/Produccion", PersonalD, httpOptions).toPromise()
});
}

//-------------------------------------------------------------
// Método para modificar un contacto

async updateProduccion(cadena:any): Promise<any> {

return new Promise((resolve, reject) => {
  this.http.put(this.Url + "/Produccion", cadena, httpOptions).toPromise()
});
}
//#endregion

//#region METODOS PRODUCTO
getProductos(): Observable<any>
{

  return this.http.get(this.Url + "/Producto" , httpOptions);
 
}

getListarProductoEsp(fil:any): Observable<any>
{

  return this.http.get(this.Url + "/Producto" + fil , httpOptions);
 
}
//-------------------------------------------------------------
// Método mostrar un solo Materia Prima

getProducto(id:any): Observable<any> {
return this.http.get(this.Url + "/Producto"+id , httpOptions);
}
//-------------------------------------------------------------
// Método para insertar un nuevo Materia Prima

async insertProducto(ProductoD:any): Promise<any> {

return new Promise((resolve, reject) => {
  this.http.post(this.Url + "/Producto", ProductoD, httpOptions).toPromise()
});
}

// -------------------------------------------------------------
// Método para modificar un contacto

async updateProducto(cadena:any): Promise<any> {

return new Promise((resolve, reject) => {
  this.http.put(this.Url + "/Producto", cadena, httpOptions).toPromise()
});
}
//#endregion

//#region METODOS TABLA DE PASO
getTpasos(): Observable<any>
{

  return this.http.get(this.Url + "/Productoxmateriaprima" , httpOptions);
 
}

getListarTpasoEsp(fil:any): Observable<any>
{

  return this.http.get(this.Url + "/Productoxmateriaprima" + fil , httpOptions);
 
}
//-------------------------------------------------------------
// Método mostrar un solo Materia Prima

getTpaso(id:any): Observable<any> {
return this.http.get(this.Url + "/Productoxmateriaprima"+id , httpOptions);
}
//-------------------------------------------------------------
// Método para insertar un nuevo Materia Prima

async insertTpaso(ProductoD:any): Promise<any> {

return new Promise((resolve, reject) => {
  this.http.post(this.Url + "/Productoxmateriaprima", ProductoD, httpOptions).toPromise()
});
}

// -------------------------------------------------------------
// Método para modificar un contacto

async updateTpaso(cadena:any): Promise<any> {

return new Promise((resolve, reject) => {
  this.http.put(this.Url + "/Productoxmateriaprima", cadena, httpOptions).toPromise()
});
}
//#endregion
}