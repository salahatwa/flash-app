import { Page } from './pageable';
import { PostVO } from './postVO';
import { UserVO } from './userVO';


export interface CommentVO {
    author?: UserVO;
    authorId?: number;
    content?: string;
    created?: string;
    id?: number;
    parent?: CommentVO;
    pid?: number;
    post?: PostVO;
    postId?: number;
    status?: number;
}

export interface PageCommentVO extends Page<CommentVO> {

}
