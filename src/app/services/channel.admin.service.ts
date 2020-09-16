import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Channel, CustomHttpUrlEncodingCodec, PageChannel, Result } from '../models/models';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class ChannelAdminService {



    constructor(private apiService: ApiService) {
    }



    public delete(id: number): Observable<Result> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteUsingDELETE.');
        }
        return this.apiService.delete(`/admin/channel/delete/${encodeURIComponent(String(id))}`,
        );
    }

    public list(): Observable<Array<Channel>> {
        return this.apiService.get(`/admin/channel/list`);
    }

    public listPage(page?: number, size?: number): Observable<PageChannel> {

        let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', <any>page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', <any>size);
        }

        return this.apiService.get(`/admin/channel/list/page`, queryParameters);
    }


    public update(view: Channel): Observable<Channel> {
        if (view === null || view === undefined) {
            throw new Error('Required parameter view was null or undefined when calling updateUsingPUT.');
        }

        return this.apiService.put(`/admin/channel/update`, view);
    }

    public view(id: number): Observable<Channel> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling viewUsingGET.');
        }
        return this.apiService.get(`/admin/channel/view/${encodeURIComponent(String(id))}`);
    }

    public weight(id: number, weight: number): Observable<Result> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling weightUsingPUT.');
        }

        if (weight === null || weight === undefined) {
            throw new Error('Required parameter weight was null or undefined when calling weightUsingPUT.');
        }

        return this.apiService.put(`/admin/channel/weight/${encodeURIComponent(String(id))}/${encodeURIComponent(String(weight))}`,
            null
        );
    }

}
