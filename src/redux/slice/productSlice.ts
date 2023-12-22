import { IProduct } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IProductState {
    products: IProduct[];
    minPrice: number;
    maxPrice: number;
}

const initialState: IProductState = {
    products: [],
    minPrice: 0,
    maxPrice: 10000,
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        STORE_PRODUCTS(state, action) {
            state.products = action.payload.products;
        },
        STORE_PRODUCTS_SORT(state, action: {payload: {products: IProduct[], category: string}}) {
            const { products, category } = action.payload;
            let tempProducts = [];
            tempProducts = products.filter((product) => product.category === category)
            state.products = tempProducts;
        },
        GET_PRICE_RANGE(state, action) {
            const { products } = action.payload;

            const array: number[] = [];
            products.map((product: IProduct)=>{
                const price = product.salePrice;
                return array.push(price);
            });

            const min = Math.min(...array);
            const max = Math.max(...array);

            state.minPrice = min;
            state.maxPrice = max;
        }
    }
})

// 변경함수 내보내기
export const { STORE_PRODUCTS, GET_PRICE_RANGE, STORE_PRODUCTS_SORT } = productSlice.actions;

// store state 선택자
export const selectProducts = (state: RootState) => state.product.products;
export const selectMinPrice = (state: RootState) => state.product.minPrice;
export const selectMaxPrice = (state: RootState) => state.product.maxPrice

export default productSlice.reducer;