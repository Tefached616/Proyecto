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
  
  private Url: string = 'https://proyectoba-production.up.railway.app';

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

    return this.http.get(this.Url + "/api/catalogo" , httpOptions);
   
  }

  
  getListarCatalogoEsp(fil:any): Observable<any>
  {

    return this.http.get(this.Url + "/api/catalogo" + fil , httpOptions);
   
  }

  //-------------------------------------------------------------
 // Método mostrar un solo Tipo de documento  

  getCatalogo(id:any): Observable<any> {
  return this.http.get(this.Url + "/api/catalogo"+id , httpOptions);
}
  //-------------------------------------------------------------
 // Método para insertar un nuevo Tipo de documento 

 async insertCatalogo(CatalogoD:any): Promise<any> {
  
  return new Promise((resolve, reject) => {
    this.http.post(this.Url + "/api/catalogo", CatalogoD, httpOptions).toPromise()
  });
}

  //-------------------------------------------------------------
 // Método para modificar un  Tipo de documento

 async updateCatalogo(cadena:any): Promise<any> {

  return new Promise((resolve, reject) => {
    this.http.put(this.Url + "/api/catalogo", cadena, httpOptions).toPromise()
  });
}
//#endregion

//#region METODOS CONTACTOS
  // Método Listar los contactos
  getContactos(): Observable<any>
  {

    return this.http.get(this.Url + "/api/contacto" , httpOptions);
   
  }

  getListarContactoEsp(fil:any): Observable<any>
  {

    return this.http.get(this.Url + "/api/contacto" + fil , httpOptions);
   
  }
  //-------------------------------------------------------------
 // Método mostrar un solo contacto

  getContacto(id:any): Observable<any> {
  return this.http.get(this.Url + "/api/contacto"+id , httpOptions);
}
  //-------------------------------------------------------------
 // Método para insertar un nuevo Contacto

 async insertContacto(ContactoD:any): Promise<any> {

  return new Promise((resolve, reject) => {
    this.http.post(this.Url + "/api/contacto", ContactoD, httpOptions).toPromise()
  });
}

  //-------------------------------------------------------------
 // Método para modificar un contacto

 async updateContacto(cadena:any): Promise<any> {

  return new Promise((resolve, reject) => {
    this.http.put(this.Url + "/api/contacto", cadena, httpOptions).toPromise()
  });
}
//#endregion

//#region METODOS PERSONAL
  // Método Listar los contactos
  getPersonals(): Observable<any>
  {

    return this.http.get(this.Url + "/api/personal" , httpOptions);
   
  }

  getListarPersonalEsp(fil:any): Observable<any>
  {

    return this.http.get(this.Url + "/api/personal" + fil , httpOptions);
   
  }
  //-------------------------------------------------------------
 // Método mostrar un solo contacto

  getPersonal(id:any): Observable<any> {
  return this.http.get(this.Url + "/api/personal"+id , httpOptions);
}
  //-------------------------------------------------------------
 // Método para insertar un nuevo Contacto

 async insertPersonal(PersonalD:any): Promise<any> {

  return new Promise((resolve, reject) => {
    this.http.post(this.Url + "/api/personal", PersonalD, httpOptions).toPromise()
  });
}

  //-------------------------------------------------------------
 // Método para modificar un contacto

 async updatePersonal(cadena:any): Promise<any> {

  return new Promise((resolve, reject) => {
    this.http.put(this.Url + "/api/personal", cadena, httpOptions).toPromise()
  });
}
//#endregion

//#region METODOS MATERIA PRIMA
  // Método Listar la Materia Prima
  getMateria_Primas(): Observable<any>
  {
    return this.http.get(this.Url + "/api/materia-prima" , httpOptions);
  }

  getListarMateriaprimaEsp(fil:any): Observable<any>
  {

    return this.http.get(this.Url + "/api/materia-prima" + fil , httpOptions);
   
  }
  //-------------------------------------------------------------
 // Método mostrar un solo Materia Prima

  getMateriaprima(id:any): Observable<any> {
  return this.http.get(this.Url + "/api/materia-prima"+id , httpOptions);
}
  //-------------------------------------------------------------
 // Método para insertar un nuevo Materia Prima

 async insertMateriaprima(MateriaPrimaD:any): Promise<any> {

  return new Promise((resolve, reject) => {
    this.http.post(this.Url + "/api/materia-prima", MateriaPrimaD, httpOptions).toPromise()
  });
}

 // -------------------------------------------------------------
 // Método para modificar un contacto

 async updateMateriaprima(cadena:any): Promise<any> {

  return new Promise((resolve, reject) => {
    this.http.put(this.Url + "/api/materia-prima", cadena, httpOptions).toPromise()
  });
}
//#endregion

//#region METODOS PRODUCCION
// Método Listar los contactos
getProduccions(): Observable<any>
{

  return this.http.get(this.Url + "/api/produccion" , httpOptions);
 
}

getListarProduccionEsp(fil:any): Observable<any>
{

  return this.http.get(this.Url + "/api/produccion" + fil , httpOptions);
 
}
//-------------------------------------------------------------
// Método mostrar un solo contacto

getProduccion(id:any): Observable<any> {
return this.http.get(this.Url + "/api/produccion"+id , httpOptions);
}
//-------------------------------------------------------------
// Método para insertar un nuevo Contacto

async insertProduccion(PersonalD:any): Promise<any> {

return new Promise((resolve, reject) => {
  this.http.post(this.Url + "/api/produccion", PersonalD, httpOptions).toPromise()
});
}

//-------------------------------------------------------------
// Método para modificar un contacto

async updateProduccion(cadena:any): Promise<any> {

return new Promise((resolve, reject) => {
  this.http.put(this.Url + "/api/produccion", cadena, httpOptions).toPromise()
});
}
//#endregion

//#region METODOS PRODUCTO
getProductos(): Observable<any>
{

  return this.http.get(this.Url + "/api/producto" , httpOptions);
 
}

getListarProductoEsp(fil:any): Observable<any>
{

  return this.http.get(this.Url + "/api/producto" + fil , httpOptions);
 
}
//-------------------------------------------------------------
// Método mostrar un solo Materia Prima

getProducto(id:any): Observable<any> {
return this.http.get(this.Url + "/api/producto"+id , httpOptions);
}
//-------------------------------------------------------------
// Método para insertar un nuevo Materia Prima

async insertProducto(ProductoD:any): Promise<any> {

return new Promise((resolve, reject) => {
  this.http.post(this.Url + "/api/producto", ProductoD, httpOptions).toPromise()
});
}

// -------------------------------------------------------------
// Método para modificar un contacto

async updateProducto(cadena:any): Promise<any> {

return new Promise((resolve, reject) => {
  this.http.put(this.Url + "/api/producto", cadena, httpOptions).toPromise()
});
}
//#endregion

//#region METODOS TABLA DE PASO
getTpasos(): Observable<any>
{

  return this.http.get(this.Url + "/api/producto-materia-prima" , httpOptions);
 
}

getListarTpasoEsp(fil:any): Observable<any>
{

  return this.http.get(this.Url + "/api/producto-materia-prima" + fil , httpOptions);
 
}
//-------------------------------------------------------------
// Método mostrar un solo Materia Prima

getTpaso(id:any): Observable<any> {
return this.http.get(this.Url + "/api/producto-materia-prima"+id , httpOptions);
}
//-------------------------------------------------------------
// Método para insertar un nuevo Materia Prima

async insertTpaso(ProductoD:any): Promise<any> {

return new Promise((resolve, reject) => {
  this.http.post(this.Url + "/api/producto-materia-prima", ProductoD, httpOptions).toPromise()
});
}

// -------------------------------------------------------------
// Método para modificar un contacto

async updateTpaso(cadena:any): Promise<any> {

return new Promise((resolve, reject) => {
  this.http.put(this.Url + "/api/producto-materia-prima", cadena, httpOptions).toPromise()
});
}
//#endregion
}