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
            if (category === 'All') {
                tempProducts = products;
            } else {
                tempProducts = products.filter((product) => product.category === category)
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

export const { FILTER_BY_CATEGORY, FILTER_BY_SEARCH } = filterSlice.actions;

export const selectFilteredProducts = (state: RootState) => state.filter.filteredProducts;

export default filterSlice.reducer;