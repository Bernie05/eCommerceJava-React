import { ISeller } from "./SellerType";

export interface ICategory {
    id?: number;
    name: string;
    categoryId: string;
    parentCategory?: ICategory;
    level: number;
}

export interface IProduct {
    id?: number;
    title: string;
    description: string;
    mrpPrice: number;
    sellingPrice: number;
    discountPercentage?: number;
    quantity: number;
    color: string;
    images: string[];
    numRatings?: number;
    category?: ICategory;
    seller?: ISeller;
    createAt?: Date;
    sizes: string;
}
