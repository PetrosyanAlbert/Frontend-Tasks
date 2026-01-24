import type { Dispatch, SetStateAction } from "react";

export interface IUser {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}

export interface IAccount extends IUser {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    bio: string;
    isAccountPrivate: boolean;
    posts: IPost[];
    avatar: string;
    followers: IAccount[];
    followings: IAccount[];
}

export interface IContext {
    user: IAccount;
    setAccount: Dispatch<SetStateAction<IAccount | null>>;
}

export interface IPost {
    id: number;
    text: string;
    createdAt?: string;
    likesCount: number;
    commentsCount: number;
    likedByMe: boolean;
}

export interface IAccountView {
    user: IAccount;
    followStatus: boolean;
    followMe: boolean;
    requestSent: boolean;
}

export interface IUserPreview {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    avatar: string;
    bio: string;
    isAccountPrivate: boolean;
}

export interface IFollowRequest {
    id: number;
    sender: IUserPreview;
}
