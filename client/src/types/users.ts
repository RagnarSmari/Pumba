export interface User{
    Id: number, 
    Name: string, 
    Role: UserRole, 
    Email: string, 
    Kennitala: number,
    PhoneNumber: number
}


export enum UserRole {
   Admin = 0,
   Owner = 1,
   Worker = 2, 
}

const roleNames = {
    [UserRole.Admin]: "Admin",
    [UserRole.Owner]: "User",
    [UserRole.Worker]: "Guest",
};
