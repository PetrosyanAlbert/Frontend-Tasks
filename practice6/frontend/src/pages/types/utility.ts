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
}

export interface IContext {
    user: IAccount;
    setAccount: (user: IAccount) => void;
}
