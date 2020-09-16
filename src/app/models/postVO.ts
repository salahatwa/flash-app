import { Channel } from './channel';
import { Page } from './pageable';
import { UserVO } from './userVO';


export interface PostVO { 
    author?: UserVO;
    authorId?: number;
    channel?: Channel;
    channelId?: number;
    comments?: number;
    content?: string;
    created?: Date;
    editor?: string;
    favors?: number;
    featured?: number;
    id?: number;
    status?: number;
    summary?: string;
    tags?: string;
    tagsArray?: Array<string>;
    thumbnail?: string;
    title?: string;
    views?: number;
    weight?: number;
}

export interface PagePostVo extends Page<PostVO>{
    
}