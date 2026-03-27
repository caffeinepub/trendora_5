import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: bigint;
    name: string;
    isSale: boolean;
    imageUrl: string;
    category: ProductCategory;
    salePrice?: number;
    rating: number;
    isNew: boolean;
    price: number;
}
export enum ProductCategory {
    men = "men",
    accessories = "accessories",
    women = "women"
}
export interface backendInterface {
    addToCart(productId: bigint, quantity: bigint): Promise<void>;
    clearCart(): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getCart(): Promise<Array<[Product, bigint]>>;
    getProductsByCategory(category: ProductCategory): Promise<Array<Product>>;
    getWishlist(): Promise<Array<Product>>;
    removeFromCart(productId: bigint): Promise<void>;
    toggleWishlist(productId: bigint): Promise<boolean>;
}
