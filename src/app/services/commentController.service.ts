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

// import { PageCommentVO } from '../model/pageCommentVO';
// import { Result } from '../model/result';
// import { Resultobject } from '../model/resultobject';

// import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
// import { Configuration }                                     from '../configuration';


// @Injectable()
// export class CommentControllerService {

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
//      * delete
//      * 
//      * @param id id
//      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
//      * @param reportProgress flag to report request and response progress.
//      */
//     public deleteUsingDELETE1(id: number, observe?: 'body', reportProgress?: boolean): Observable<Resultobject>;
//     public deleteUsingDELETE1(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Resultobject>>;
//     public deleteUsingDELETE1(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Resultobject>>;
//     public deleteUsingDELETE1(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

//         if (id === null || id === undefined) {
//             throw new Error('Required parameter id was null or undefined when calling deleteUsingDELETE1.');
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

//         return this.httpClient.delete<Resultobject>(`${this.basePath}/user/comment/delete/${encodeURIComponent(String(id))}`,
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
//     public deleteUsingDELETE2(id: Array<number>, observe?: 'body', reportProgress?: boolean): Observable<Result>;
//     public deleteUsingDELETE2(id: Array<number>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Result>>;
//     public deleteUsingDELETE2(id: Array<number>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Result>>;
//     public deleteUsingDELETE2(id: Array<number>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

//         if (id === null || id === undefined) {
//             throw new Error('Required parameter id was null or undefined when calling deleteUsingDELETE2.');
//         }

//         let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
//         if (id) {
//             id.forEach((element) => {
//                 queryParameters = queryParameters.append('id', <any>element);
//             })
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

//         return this.httpClient.delete<Result>(`${this.basePath}/admin/comment/delete`,
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
//      * list
//      * 
//      * @param page page
//      * @param size size
//      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
//      * @param reportProgress flag to report request and response progress.
//      */
//     public listUsingGET1(page?: number, size?: number, observe?: 'body', reportProgress?: boolean): Observable<PageCommentVO>;
//     public listUsingGET1(page?: number, size?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageCommentVO>>;
//     public listUsingGET1(page?: number, size?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageCommentVO>>;
//     public listUsingGET1(page?: number, size?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {



//         let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
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

//         return this.httpClient.get<PageCommentVO>(`${this.basePath}/admin/comment/list`,
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
//      * post
//      * 
//      * @param pid pid
//      * @param toId toId
//      * @param text text
//      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
//      * @param reportProgress flag to report request and response progress.
//      */
//     public postUsingPOST(pid: number, toId: number, text?: string, observe?: 'body', reportProgress?: boolean): Observable<Resultobject>;
//     public postUsingPOST(pid: number, toId: number, text?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Resultobject>>;
//     public postUsingPOST(pid: number, toId: number, text?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Resultobject>>;
//     public postUsingPOST(pid: number, toId: number, text?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

//         if (pid === null || pid === undefined) {
//             throw new Error('Required parameter pid was null or undefined when calling postUsingPOST.');
//         }

//         if (toId === null || toId === undefined) {
//             throw new Error('Required parameter toId was null or undefined when calling postUsingPOST.');
//         }


//         let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
//         if (text !== undefined && text !== null) {
//             queryParameters = queryParameters.set('text', <any>text);
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

//         return this.httpClient.post<Resultobject>(`${this.basePath}/user/comment/submit/${encodeURIComponent(String(toId))}/${encodeURIComponent(String(pid))}`,
//             null,
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
//      * view
//      * 
//      * @param toId toId
//      * @param page page
//      * @param size size
//      * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
//      * @param reportProgress flag to report request and response progress.
//      */
//     public viewUsingGET1(toId: number, page?: number, size?: number, observe?: 'body', reportProgress?: boolean): Observable<PageCommentVO>;
//     public viewUsingGET1(toId: number, page?: number, size?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageCommentVO>>;
//     public viewUsingGET1(toId: number, page?: number, size?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageCommentVO>>;
//     public viewUsingGET1(toId: number, page?: number, size?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

//         if (toId === null || toId === undefined) {
//             throw new Error('Required parameter toId was null or undefined when calling viewUsingGET1.');
//         }



//         let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
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

//         return this.httpClient.get<PageCommentVO>(`${this.basePath}/user/comment/list/${encodeURIComponent(String(toId))}`,
//             {
//                 params: queryParameters,
//                 withCredentials: this.configuration.withCredentials,
//                 headers: headers,
//                 observe: observe,
//                 reportProgress: reportProgress
//             }
//         );
//     }

// }