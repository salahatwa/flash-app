import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemStatus } from '../models/models';
import { ApiService } from './api.service';


@Injectable({
    providedIn: 'root'
})
export class StatusService {

    constructor(private apiService: ApiService) {
    }

    public getStatus(): Observable<SystemStatus> {
        return this.apiService.get(`/admin/sys-status`);
    }

}
