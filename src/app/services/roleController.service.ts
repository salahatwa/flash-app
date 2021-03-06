// /**
//  * GenHub
//  * GenHub api
//  *
//  * OpenAPI spec version: 1.0
//  * 
//  *
//  * NOTE: This class is auto generated by the swagger code generator program.
//  * https://github.com/swagger-api/swagger-codegen.git
//  * Do not edit the class manually.
//  */
// /* tslint:disable:no-unused-variable member-ordering */

// import { Inject, Injectable, Optional }                      from '@angular/core';
// import { HttpClient, HttpHeaders, HttpParams,
//          HttpResponse, HttpEvent }                           from '@angular/common/http';
// import { CustomHttpUrlEncodingCodec }                        from '../encoder';

// import { Observable }                                        from 'rxjs/Observable';

// import { PageRole } from '../model/pageRole';
// import { Resultobject } from '../model/resultobject';
// import { Role } from '../model/role';

// import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
// import { Configuration }                                     from '../configuration';


// @Injectable()
// export class RoleControllerService {

//     protected basePath = 'https://localhost:8080/socialty/api/v1';
//     public defaultHeaders = new HttpHeaders();
//     public configuration = new Configuration();

//     constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
//         if (basePath) {
//             this.basePath = basePath;
//         }
//         if (configuration) {
//             this.configuration = configuration;
//             this.basePath = basePath || configuration.basePath || this.basePath;
//         }
//     }

//     /**
//      * @param consumes string[] mime-types
//      * @return true: consumes contains 'multipart/form-data', false: otherwise
//      */
//     private canConsumeForm(consumes: string[]): boolean {
//         const form = 'multipart/form-data';
//         for (const consume of consumes) {
//             if (form === consume) {
//                 return true;
//             }
//         }
//         return false;
//     }


//     /**
//      * activate
//      * 
//      * @param active active
//      * @param id id
//      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
//      * @param reportProgress flag to report request and response progress.
//      */
//     public activateUsingPUT(active: boolean, id: number, observe?: 'body', reportProgress?: boolean): Observable<Resultobject>;
//     public activateUsingPUT(active: boolean, id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Resultobject>>;
//     public activateUsingPUT(active: boolean, id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Resultobject>>;
//     public activateUsingPUT(active: boolean, id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

//         if (active === null || active === undefined) {
//             throw new Error('Required parameter active was null or undefined when calling activateUsingPUT.');
//         }

//         if (id === null || id === undefined) {
//             throw new Error('Required parameter id was null or undefined when calling activateUsingPUT.');
//         }

//         let headers = this.defaultHeaders;

//         // authentication (JWT) required
//         if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
//             headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
//         }

//         // to determine the Accept header
//         let httpHeaderAccepts: string[] = [
//             '*/*'
//         ];
//         const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
//         if (httpHeaderAcceptSelected != undefined) {
//             headers = headers.set('Accept', httpHeaderAcceptSelected);
//         }

//         // to determine the Content-Type header
//         const consumes: string[] = [
//             'application/json'
//         ];

//         return this.httpClient.put<Resultobject>(`${this.basePath}/admin/role/activate/${encodeURIComponent(String(id))}/${encodeURIComponent(String(active))}`,
//             null,
//             {
//                 withCredentials: this.configuration.withCredentials,
//                 headers: headers,
//                 observe: observe,
//                 reportProgress: reportProgress
//             }
//         );
//     }

//     /**
//      * delete
//      * 
//      * @param id id
//      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
//      * @param reportProgress flag to report request and response progress.
//      */
//     public deleteUsingDELETE5(id: number, observe?: 'body', reportProgress?: boolean): Observable<Resultobject>;
//     public deleteUsingDELETE5(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Resultobject>>;
//     public deleteUsingDELETE5(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Resultobject>>;
//     public deleteUsingDELETE5(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

//         if (id === null || id === undefined) {
//             throw new Error('Required parameter id was null or undefined when calling deleteUsingDELETE5.');
//         }

//         let headers = this.defaultHeaders;

//         // authentication (JWT) required
//         if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
//             headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
//         }

//         // to determine the Accept header
//         let httpHeaderAccepts: string[] = [
//             '*/*'
//         ];
//         const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
//         if (httpHeaderAcceptSelected != undefined) {
//             headers = headers.set('Accept', httpHeaderAcceptSelected);
//         }

//         // to determine the Content-Type header
//         const consumes: string[] = [
//         ];

//         return this.httpClient.delete<Resultobject>(`${this.basePath}/admin/role/delete/${encodeURIComponent(String(id))}`,
//             {
//                 withCredentials: this.configuration.withCredentials,
//                 headers: headers,
//                 observe: observe,
//                 reportProgress: reportProgress
//             }
//         );
//     }

//     /**
//      * paging
//      * 
//      * @param model model
//      * @param name name
//      * @param page page
//      * @param size size
//      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
//      * @param reportProgress flag to report request and response progress.
//      */
//     public pagingUsingGET(model?: any, name?: string, page?: number, size?: number, observe?: 'body', reportProgress?: boolean): Observable<PageRole>;
//     public pagingUsingGET(model?: any, name?: string, page?: number, size?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageRole>>;
//     public pagingUsingGET(model?: any, name?: string, page?: number, size?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageRole>>;
//     public pagingUsingGET(model?: any, name?: string, page?: number, size?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {





//         let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
//         if (model !== undefined && model !== null) {
//             queryParameters = queryParameters.set('model', <any>model);
//         }
//         if (name !== undefined && name !== null) {
//             queryParameters = queryParameters.set('name', <any>name);
//         }
//         if (page !== undefined && page !== null) {
//             queryParameters = queryParameters.set('page', <any>page);
//         }
//         if (size !== undefined && size !== null) {
//             queryParameters = queryParameters.set('size', <any>size);
//         }

//         let headers = this.defaultHeaders;

//         // authentication (JWT) required
//         if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
//             headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
//         }

//         // to determine the Accept header
//         let httpHeaderAccepts: string[] = [
//             '*/*'
//         ];
//         const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
//         if (httpHeaderAcceptSelected != undefined) {
//             headers = headers.set('Accept', httpHeaderAcceptSelected);
//         }

//         // to determine the Content-Type header
//         const consumes: string[] = [
//         ];

//         return this.httpClient.get<PageRole>(`${this.basePath}/admin/role/list`,
//             {
//                 params: queryParameters,
//                 withCredentials: this.configuration.withCredentials,
//                 headers: headers,
//                 observe: observe,
//                 reportProgress: reportProgress
//             }
//         );
//     }

//     /**
//      * update
//      * 
//      * @param role role
//      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
//      * @param reportProgress flag to report request and response progress.
//      */
//     public updateUsingPUT2(role: Role, observe?: 'body', reportProgress?: boolean): Observable<Role>;
//     public updateUsingPUT2(role: Role, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Role>>;
//     public updateUsingPUT2(role: Role, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Role>>;
//     public updateUsingPUT2(role: Role, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

//         if (role === null || role === undefined) {
//             throw new Error('Required parameter role was null or undefined when calling updateUsingPUT2.');
//         }

//         let headers = this.defaultHeaders;

//         // authentication (JWT) required
//         if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
//             headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
//         }

//         // to determine the Accept header
//         let httpHeaderAccepts: string[] = [
//             '*/*'
//         ];
//         const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
//         if (httpHeaderAcceptSelected != undefined) {
//             headers = headers.set('Accept', httpHeaderAcceptSelected);
//         }

//         // to determine the Content-Type header
//         const consumes: string[] = [
//             'application/json'
//         ];
//         const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
//         if (httpContentTypeSelected != undefined) {
//             headers = headers.set('Content-Type', httpContentTypeSelected);
//         }

//         return this.httpClient.put<Role>(`${this.basePath}/admin/role/update`,
//             role,
//             {
//                 withCredentials: this.configuration.withCredentials,
//                 headers: headers,
//                 observe: observe,
//                 reportProgress: reportProgress
//             }
//         );
//     }

//     /**
//      * view
//      * 
//      * @param id id
//      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
//      * @param reportProgress flag to report request and response progress.
//      */
//     public viewUsingGET3(id: number, observe?: 'body', reportProgress?: boolean): Observable<Role>;
//     public viewUsingGET3(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Role>>;
//     public viewUsingGET3(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Role>>;
//     public viewUsingGET3(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

//         if (id === null || id === undefined) {
//             throw new Error('Required parameter id was null or undefined when calling viewUsingGET3.');
//         }

//         let headers = this.defaultHeaders;

//         // authentication (JWT) required
//         if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
//             headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
//         }

//         // to determine the Accept header
//         let httpHeaderAccepts: string[] = [
//             '*/*'
//         ];
//         const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
//         if (httpHeaderAcceptSelected != undefined) {
//             headers = headers.set('Accept', httpHeaderAcceptSelected);
//         }

//         // to determine the Content-Type header
//         const consumes: string[] = [
//         ];

//         return this.httpClient.get<Role>(`${this.basePath}/admin/role/view/${encodeURIComponent(String(id))}`,
//             {
//                 withCredentials: this.configuration.withCredentials,
//                 headers: headers,
//                 observe: observe,
//                 reportProgress: reportProgress
//             }
//         );
//     }

// }
