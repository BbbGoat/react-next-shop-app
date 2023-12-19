export interface IProduct {
    id: string;
    name: string;
    thumbnailURL: string;
    imageURL: string[];
    originPrice: number;
    salePrice: number;
    category: string;
    sortCat: string;
    brand: string;
    desc: string;
}

export interface IShippingAddress {
    city: string;
    line: string;
    name: string;
    postalCode: string;
}

export type TCartItem = IProduct & {cartQuantity: number;}

export interface IOrder {
    id: string;
    orderAmount: number;
    orderData: string;
    orderStatus: string;
    orderTime: string;
    userEmail: string;
    userID: string;
    cartItems: TCartItem[];
    shippingAddress: IShippingAddress;
    createdAt: {
        seconds: number;
        nanoseconds: number;
    }
}