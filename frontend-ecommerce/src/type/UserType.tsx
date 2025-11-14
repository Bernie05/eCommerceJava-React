
export interface Address {
    id?: number;
    name: string;
    mobile: string;
    pinCode: string;
    address: string;
    locality: string;
    city: string;
    state: string;
}

export enum UserRole {
    ROLE_CUSTOMER = 'ROLE_CUSTOMER',
    ROLE_SELLER = 'ROLE_SELLER',
    ROLE_ADMIN = 'ROLE_ADMIN'
}

export interface IUser {
    id? : number;
    fullName: string;
    email: string;
    password?: string;
    role: UserRole;
    addresses?: Address[];
    mobile?: string;
}
