import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TCartItem } from "@/types";
import { toast } from "react-toastify";

interface ICartState {
    cartItems: TCartItem[];
    cartTotalQuantity: number;
    cartTotalAmount: number;
    previousURL: string;
}

const initialState: ICartState = {
    cartItems: 
        typeof window !== "undefined" ?
        localStorage.getItem("cartItems") ?
        JSON.parse(localStorage.getItem("cartItems")!) 
        : [] : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    previousURL: ""
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        ADD_TO_CART: (state, action) => {
            // 중복 확인
            const productIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            )

            const increaseCount = action.payload.quantity ? action.payload.quantity : 1
            
            if (productIndex >= 0) {
                // 중복일 경우 기존 개수에 수량만큼 더하기
                state.cartItems[productIndex].cartQuantity += increaseCount;
                toast.success(`${action.payload.name} 상품 수량이 증가하였습니다.`)
            } else {
                // 아닐경우 새로 추가
                const tempProduct = {...action.payload, cartQuantity: increaseCount}
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.name} 상품이 추가되었습니다.`)
            }

            // 로컬스토리지 추가
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        REMOVE_FROM_CART: (state, action) => {
            const newCartItem = state.cartItems.filter(
                (item) => item.id !== action.payload.id
            )

            state.cartItems = newCartItem;
            toast.success(`${action.payload.name}이 장바구니에서 삭제되었습니다.`);

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        CLEAR_CART: (state) => {
            state.cartItems = [];
            toast.success('장바구니가 비었습니다.');

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        SAVE_URL: (state, action) => {
            state.previousURL = action.payload;
        },
        CALCULATE_TOTAL_QUANTITY: (state) => {
            // 카트 총 수량 구하기
            const array: number[] = [];
            state.cartItems.map((item)=>{
                const { cartQuantity } = item;
                const quantity = cartQuantity;
                return array.push(quantity);
            })

            const totalQuantity = array.reduce((a,b)=>{
                return a + b;
            }, 0) // 0부터 시작

            state.cartTotalQuantity = totalQuantity;
            localStorage.setItem('cartCount', JSON.stringify(state.cartTotalQuantity))
        },
        CALCULATE_TOTAL_AMOUNT: (state) => {
            // 카트 총액 구하기
            const array: number[] = [];
            state.cartItems.map((item)=>{
                const { salePrice, cartQuantity } = item;
                const cartItemAmount = salePrice * cartQuantity;
                return array.push(cartItemAmount);
            })

            const totalAmount = array.reduce((a,b)=>{
                return a + b;
            }, 0)

            state.cartTotalAmount = totalAmount;
        },
        INCREASE_CART: (state, action) => {
            // 장바구니에서 +1 할 경우
            const productIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            )
            state.cartItems[productIndex].cartQuantity += 1;
            // toast.success(`${action.payload.name} 수량 증가`)

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        DECREASE_CART: (state, action) => {
            // 장바구니에서 -1 할 경우
            const productIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            )
            if (state.cartItems[productIndex].cartQuantity > 1) {

                state.cartItems[productIndex].cartQuantity -= 1;
                // toast.success(`${action.payload.name} 수량 감소`)

                localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            }
        }

    }
})

export const { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, SAVE_URL, CALCULATE_TOTAL_QUANTITY, CALCULATE_TOTAL_AMOUNT, INCREASE_CART, DECREASE_CART } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectCartTotalQuantity = (state: RootState) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state: RootState) => state.cart.cartTotalAmount;

export default cartSlice.reducer;