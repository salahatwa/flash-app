/**
 * GenHub
 * GenHub api
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { GrantedAuthority } from './grantedAuthority';


export interface UserVO { 
    accessToken?: string;
    authorities?: Array<GrantedAuthority>;
    avatar?: string;
    bio?: string;
    comments?: number;
    created?: Date;
    id?: number;
    lastLogin?: Date;
    name?: string;
    posts?: number;
    signature?: string;
    status?: number;
    username?: string;
}