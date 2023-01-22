import { User } from "./User";

export interface Post {
    _id: string,
    postedBy: User,
    text: string,
    createdAt: string,
}

export interface Like {
    _id: string;
    user: string
    post: string
}

export interface PostRequestBody {
    text: string,
}

export interface PostResponseData {
    posts: Array<Post>
    likes: Array<Like>
}

export interface LikeRequestBody {
    postId: string;
}

/*
    userId:{
        type: SchemaTypes.String,
        required: true,
    },
    text:{
        type: SchemaTypes.String,
        required: true,
    },
    likes: {
        type: SchemaTypes.Number,
        required: true,
        default: 0,
    },
    createdAt: {
        type: SchemaTypes.Date,
        required: true,
        default: new Date(),
    },
*/