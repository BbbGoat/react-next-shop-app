import { IProduct } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IFilterState {
    filteredProducts: IProduct[];
}

const initialState: IFilterState = {
    filteredProducts: []
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        FILTER_BY_CATEGORY: (state, action: {payload: {products: IProduct[], category: string}}) => {
            const { products, category } = action.payload;
            let tempProducts = [];
            if (category === '전체') {
                tempProducts = products;
            } else {
                tempProducts = products.filter((product) => product.category === category)
            }
            state.filteredProducts = tempProducts;
        },
        FILTER_BY_SORT: (state, action: {payload: {products: IProduct[], category: string, id: string}}) => {
            const { products, category, id } = action.payload;
            let tempProducts = [];
            if (category === '전체') {
                tempProducts = products.filter((product) => product.category === id);
            } else {
                tempProducts = products.filter((product) => product.sortCat === category)
            }
            state.filteredProducts = tempProducts;
        },
        FILTER_BY_PRICE: (state, action: {payload: {products: IProduct[], price: number}}) => {
            const { products, price } = action.payload;
            let tempProducts = [];

            tempProducts = products.filter((product)=>product.salePrice <= price);

            state.filteredProducts = tempProducts;
        },
        SORT_PRODUCTS: (state, action: {payload: {products: IProduct[], sort: string}}) => {
            const { products, sort } = action.payload;
            let tempProducts: IProduct[] = [];

            if (sort === 'latest') {
                // 등록 날짜별로 비교하기 추가
                tempProducts = products;
            }
            if (sort === 'lowest-price') {
                tempProducts = products.slice().sort((a,b) => {
                    return a.salePrice - b.salePrice;
                })
            }
            if (sort === 'highest-price') {
                tempProducts = products.slice().sort((a,b) => {
                    return b.salePrice - a.salePrice;
                })
            }

            state.filteredProducts = tempProducts;
        },
        
        FILTER_BY_SEARCH: (state, action: {payload: {products: IProduct[], search: string}}) => {
            const { products, search } = action.payload;

            // 검색어 기준으로 필터링
            const tempProducts = products.filter(
                (product) => 
                product.name.toLowerCase().includes(search.toLowerCase()) || 
                product.category.toLowerCase().includes(search.toLowerCase())
            )
            state.filteredProducts = tempProducts;
        },
    }
})

export const { FILTER_BY_CATEGORY, FILTER_BY_SEARCH, FILTER_BY_PRICE, SORT_PRODUCTS, FILTER_BY_SORT } = filterSlice.actions;

export const selectFilteredProducts = (state: RootState) => state.filter.filteredProducts;

export default filterSlice.reducer;