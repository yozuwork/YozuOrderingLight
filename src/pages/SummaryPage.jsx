import React, { useContext } from 'react';
import { CartContext } from '../store';

export default function SummaryPage() {
  const { state, dispatch } = useContext(CartContext);
  const { cartList, total,  orderList } = state;
  console.log('singleOrder======>', orderList);
  const totalCount = cartList.length;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* 標題與操作 */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">今日訂單統計</h2>
        <div className="text-right">
          <div className="mb-1 text-sm text-gray-600">
            總筆數：{totalCount} 筆 | 總金額：NT$ {total || 0}
          </div>
          <button
            onClick={() => dispatch({ type: 'REMOVE_All_ORDER' })}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
          >
            清除所有訂單
          </button>
        </div>
      </div>

      {/* 訂單內容 */}
      {
        orderList.map((order,index)=>{
            return (
                <div
                  key={index}
                  className="border border-gray-200 rounded-md p-4 relative"
                  style={{ borderLeft: '4px solid #2563EB' }}
                >
                  <div className="flex justify-between text-gray-700 mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{order.userData.name}</h3>
                      <p className="text-sm">手機:{order.userData.phone}</p>
                      <p className="text-sm">備註:{order.userData.remark}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => dispatch({ type: 'REMOVE_ORDER', payload: { index } })}
                      className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                    >
                      刪除
                    </button>
                  </div>
                  <div className="border-t border-gray-300 pt-2">
                    {order.cartList.map((item) => (
                      <div key={item.id} className="flex justify-between text-gray-800">
                        <div>
                          {item.title} x {item.qty}
                        </div>
                        <div>NT$ {item.price * item.qty}</div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-300 mt-2 pt-2 flex justify-end font-semibold text-red-600">
                    總計：NT$ {order.total || 0}
                  </div>
                </div>
            )

        })
      }
      
      {cartList.length === 0 && (
        <p className="text-center text-gray-400 mt-4">目前沒有訂單</p>
      )}
    </div>
  );
}
