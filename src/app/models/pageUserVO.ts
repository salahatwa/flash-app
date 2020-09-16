import { Pageable } from './pageable';
import { Sort } from './sort';
import { UserVO } from './userVO';


export interface PageUserVO { 
    content?: Array<UserVO>;
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number;
    numberOfElements?: number;
    pageable?: Pageable;
    size?: number;
    sort?: Sort;
    totalElements?: number;
    totalPages?: number;
}
