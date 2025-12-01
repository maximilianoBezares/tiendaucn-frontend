export interface GetCartResponse {
    buyerId:string;
    userId:Number | null;
    items: CartItem[];
    subTotalPrice: string;
    savings: string;
    totalPrice: string;
}

export interface CartItem{
    productId: number;
    productTitle: string;
    productImageUrl: string;
    price: number;
    quantity: number;
    discount: number;
    subTotalPrice: string;
    savings: string;
    totalPrice: string;
}