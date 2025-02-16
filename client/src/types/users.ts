export interface User{
    ID: number, 
    Name: string,
    Role: UserRole, 
    Email: string,
    Kennitala: number | null, 
    PhoneNumber: number | null,
    
}

export interface UserRequest {
    Name: string, 
    Role: UserRole,
    Email: string, 
    PhoneNumber?: number,
    Kennitala?: number,
    Password: string
}


export enum UserRole {
   Admin = 0,
   Owner = 1,
   Worker = 2, 
   Undefined = 3,
}

export const RoleNames = {
    [UserRole.Admin]: "Admin",
    [UserRole.Owner]: "User",
    [UserRole.Worker]: "Worker",
    [UserRole.Undefined]: "Undefined",
};

export const RoleNameArray = Object.values(RoleNames)
