export interface IProduct {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    brand: string;
    sizes: string[];
    colors: string[];
    stock: number;
    images: string[];
    createdAt: Date;
}

export interface ICategory {
    _id: string;
    name: string;
    description: string;
    createdAt: Date;
}

export interface IBrand {
    _id: string;
    name: string;
    description: string;
    logoUrl: string;
}