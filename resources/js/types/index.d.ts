export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}
export interface Category {
    id: number;
    name: string;
}
export interface Product {
    id: number;
    category_id: number;
    category?: Category;
    name: string;
    stock: number;
    price: number;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    flash: {
        message: string | null
    }
};
