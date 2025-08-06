import React, { useContext } from 'react';
import { CartContext } from '../store';

export default function SummaryPage() {
  const { state, dispatch } = useContext(CartContext);
  const { cartList, total } = state;

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
            onClick={() => dispatch({ type: 'CLEAR_CART' })}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
          >
            清除所有訂單
          </button>
        </div>
      </div>

      {/* 訂單內容 */}
      <div
        className="border border-gray-200 rounded-md p-4 relative"
        style={{ borderLeft: '4px solid #2563EB' }}
      >
        <div className="flex justify-between text-gray-700 mb-2">
          <div>
            <h3 className="font-semibold text-lg">購物車訂單</h3>
            <p className="text-sm">分機：N/A</p>
            <p className="text-sm">備註：無</p>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-2">
          {cartList.map((item) => (
            <div key={item.id} className="flex justify-between text-gray-800">
              <div>
                {item.title} x {item.qty}
              </div>
              <div>NT$ {item.price * item.qty}</div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-300 mt-2 pt-2 flex justify-end font-semibold text-red-600">
          總計：NT$ {total || 0}
        </div>
      </div>

      {cartList.length === 0 && (
        <p className="text-center text-gray-400 mt-4">目前沒有訂單</p>
      )}
    </div>
  );
}
