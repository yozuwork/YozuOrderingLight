import { createContext } from 'react';
export const CartContext = createContext({});
export const initialState = {
  cartList: [],
  currentPage: 'order', // 新增頁面狀態管理
};
export const reducer = (state, action) => {
    switch (action.type) {
       case 'SET_PAGE': 
         return {
            ...state,
            currentPage: action.payload, // 更新當前頁面
         }
    }
}