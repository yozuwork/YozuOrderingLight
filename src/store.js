import { createContext} from 'react';
export const CartContext = createContext({

});
function cartListTotal(cartList) {
  return cartList.map((item) => item.qty * item.price)
    .reduce((acc, cur) => acc + cur, 0)
}

export const initialState = {
  orderList: [],
  singleOrder:{
    cartList: [],
    userData: {}
  },
  cartList: [],
  currentPage: 'order', // 新增頁面狀態管理
  userData:{
    name: '',
    phone: '',
    remark: ''
  },
  total: 0, // 總金額
};
export const reducer = (state, action) => {
    const cartList = [...state.cartList];
    const newSingleOrder = {
      cartList: [...state.cartList],
      userData: { ...state.userData },
      total: cartListTotal(cartList)
    };
    const newOrderList = [...state.orderList];
    // 在 cartList 裡找 id 與 action.payload.id 相同的商品，回傳索引
    const index = action.payload && action.payload.id
    ? cartList.findIndex(item => item.id === action.payload.id)
    : -1;
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
              total: cartListTotal(cartList)
          }
        case 'CHANGE_CART_QTY':
            cartList[index].qty = action.payload.qty;
            return {
                ...state,
                cartList,
                total: cartListTotal(cartList)
         } 
        case 'REMOVE_FROM_CART':
          cartList.splice(index,1);
          return {
              ...state,
              cartList,
              total: cartListTotal(cartList)
          }
        case 'SET_USER_DATA':
          return {
              ...state,
              userData: {
                ...state.userData,
                ...action.payload,  // 利用展開運算符合併更新欄位
              }
          }  
        case 'SEND_ORDER':
          return {
              ...state,
              currentPage: 'summary', // 發送訂單後切換到統計頁面
              orderList: [...state.orderList, newSingleOrder], // 新增訂單加入陣列
              cartList: [],
              userData: {
                name: '',
                phone: '',
                remark: ''
              },
          }
        case 'REMOVE_All_ORDER': 
          return {
              ...state,
              orderList: [],
              cartList: [],
              total: 0,
              userData: {
                name: '',
                phone: '',
                remark: ''
              }
          } 
        case 'REMOVE_ORDER':
          newOrderList.splice(action.payload.index, 1);
          return {
             ...state,
             orderList: newOrderList,
          }
       default:
          return state;   

    }
}