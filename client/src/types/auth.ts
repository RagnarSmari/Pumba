export interface LoginFormProps{
    onSubmit: (data: {email: string, password: string}) => void;
}

export type LocalStorageUser = {
    Login: string;
    Email: string;
    Avatar: string;
}

export interface LoginRoutePostRequestProprs{
    email: string;
    password: string;
}