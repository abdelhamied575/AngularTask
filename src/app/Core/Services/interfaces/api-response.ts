import { Product } from "./product";

export interface ApiResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}
