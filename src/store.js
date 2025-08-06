import { createContext } from 'react';
export const CartContext = createContext({});
function cartListTotal(cartList) {
  return cartList.map((item) => item.qty * item.price)
    .reduce((acc, cur) => acc + cur, 0)
}
export const initialState = {
  cartList: [],
  currentPage: 'order', // 新增頁面狀態管理
};
export const reducer = (state, action) => {
    const cartList = [...state.cartList];
    // 在 cartList 裡找 id 與 action.payload.id 相同的商品，回傳索引
    const index = cartList.findIndex((item) => item.id === action.payload.id)
    switch (action.type) {
       case 'SET_PAGE': 
         return {
            ...state,
            currentPage: action.payload, // 更新當前頁面
        }
        case 'ADD_TO_CART':
          console.log('加入購物車', action.payload);
          if(index === -1){
            cartList.push(action.payload);  
          }else{
            //如果找到，當前購物車的項目與加入的購物車項目一致
            cartList[index].qty += action.payload.qty;
          }
          
          return {
              ...state,
              cartList, 
          }
        case 'CHANGE_CART_QTY':
            cartList[index].qty = action.payload.qty;
            return {
                ...state,
                cartList,
                total: cartListTotal(cartList)
         }  

    }
}