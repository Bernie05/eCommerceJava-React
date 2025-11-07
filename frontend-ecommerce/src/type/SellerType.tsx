export interface ISeller {
    id?: number;
    mobile: string;
    otp: string;
    GSTIN: string;
    pickupAddress: IPickupAddress;
    bankDetails: IBankDetails;
    sellerName: string;
    email: string;
    businessDetails: IBusinessDetails;
    password: string;
    accountStatus: string;
}

export interface IPickupAddress {
    name: string;
    mobile: string;
    pinCode: string;
    address: string;
    locality: string;
    city: string;
    state: string;
}

export interface IBankDetails {
    accountNumber: string;
    ifscCode: string;
    accountHolderName: string;
}

export interface IBusinessDetails {
    businessName: string;
}

// export interface Seller {
//     id?: number;
//     mobile: string;
//     otp: string;
//     GSTIN: string;
//     pickupAddress: IPickupAddress;
//     bankDetails: IBankDetails;
//     sellerName: string;
//     email: string;
//     businessDetails: IBusinessDetails;
//     password: string;
//     accountStatus: string;
// }

export interface ISellerReport {
    id: number;
    seller: ISeller;
    totalEarnings: number;
    totalSales: number;
    totalRefunds: number;
    totalTax: number;
    netEarnings: number;
    totalOrders: number;
    canceledOrders: number;
    totalTransactions: number;
}