export interface LoginFormProps{
    onSubmit: (data: {email: string, password: string}) => void;
}

export interface LoginRoutePostRequestProprs{
    email: string;
    password: string;
}