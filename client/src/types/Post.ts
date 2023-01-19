import { User } from "./User";

export interface PostRequestBody {
    text: string,
}

export interface PostResponseData {
    _id: string,
    user: User,
    text: string,
    likes: number,
    createdAt: Date,
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