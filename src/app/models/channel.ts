import { Page } from "./pageable";



export interface Channel {
    id?: number;
    key?: string;
    name?: string;
    status?: number;
    thumbnail?: string;
    weight?: number;
}


export interface PageChannel extends Page<Channel> {

}
