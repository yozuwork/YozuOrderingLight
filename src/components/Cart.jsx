import { useContext, useEffect } from 'react';
import { CartContext } from '../store';

export default function Cart() {
    const { state , dispatch } = useContext(CartContext);
      useEffect(() => {
        console.log('userData 更新:', state.userData);
    }, [state.userData]);
    return (
        <div className='bg-light p-3'>
                <table className="table-auto w-full border-collapse">
                     <tbody>
                          {state.cartList.map((item)=>{
                              return (
                                 <tr className='border-b' key={item.id}>
                                    <td className='py-2 px-4 text-center align-middle'>
                                            <a 
                                                href="#"
                                                className="text-red-500 hover:underline"
                                                onClick={(e)=>{
                                                    e.preventDefault();
                                                    dispatch({
                                                        type: 'REMOVE_FROM_CART',
                                                        payload: {
                                                            id: item.id
                                                        }
                                                    });
                                                }}    
                                            
                                            >
                                            X    
                                            </a>
                                    </td>
                                    <td className="py-2 px-4 align-middle">
                                        <img src={item.img} alt="商品圖片" className="w-16 h-16 object-cover rounded" />
                                    </td>
                                    <td className="py-2 px-4 align-top">
                                        <div className="flex flex-col items-start">
                                            <span className="font-medium text-gray-900">{item.title}</span>
                                            <span className="text-sm text-gray-500">NT${item.price}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="text-sm text-gray-500">NT${item.price}</span>
                                    </td>
                                    <td className="py-2 px-4 text-center align-middle">
                                        <select
                                            value={item.qty}
                                            onChange={(e) => {
                                                dispatch({
                                                    type: 'CHANGE_CART_QTY',
                                                    payload: {
                                                        id: item.id,
                                                        qty: parseInt(e.target.value)
                                                    }
                                                });
                                            }}
                                            className="block w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            {
                                              [...Array(20)].map((_,index)=>{
                                                return (
                                                    <option value={index+1} key={index}>{index+1}</option>
                                                )
                                              })
                                            
                                            }
                                        </select>
                                    </td>
                                </tr>
                              )
                          })}     
                     </tbody>
                     <tfoot>
                         <tr className="border-t">
                            <td
                                colSpan={5}
                                className="py-4 px-4 text-right text-lg font-semibold text-gray-800 align-middle"
                            >
                                總金額 NT$ {state.total || 0}
                                
                            </td>
                            
                        </tr>
                        <tr>
                            <td colSpan={5}>
                                <form 
                                     className="p-4 space-y-4 bg-white rounded shadow-md max-w-md mx-auto"
                                     onSubmit={(e) => {
                                        e.preventDefault();
                                        dispatch({ type: 'SEND_ORDER' });
                                    }}
                                >
                                    <div>
                                        <label htmlFor="name" className="block mb-1 font-medium text-gray-700">
                                        姓名 *
                                        </label>
                                        <input
                                        type="text"
                                        id="name"
                                        placeholder="請輸入您的姓名"
                                        required
                                        onChange={(e)=>{
                                            dispatch({
                                                type: 'SET_USER_DATA',
                                                payload: { name: e.target.value }
                                            });
                                        }}
                                        className="w-full rounded border border-gray-300 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="ext" className="block mb-1 font-medium text-gray-700">
                                        手機號碼
                                        </label>
                                        <input
                                        type="=phone"
                                        id="ext"
                                        onChange={(e)=>{
                                            dispatch({
                                                type: 'SET_USER_DATA',
                                                payload: { phone: e.target.value }
                                            });
                                        }}
                                        placeholder="請輸入手機號碼（選填）"
                                        className="w-full rounded border border-gray-300 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="notes" className="block mb-1 font-medium text-gray-700">
                                        備註
                                        </label>
                                        <textarea
                                        id="notes"
                                        onChange={(e)=>{
                                            dispatch({
                                                type: 'SET_USER_DATA',
                                                payload: { remark: e.target.value }
                                            });
                                        }}
                                        placeholder="特殊需求或備註（選填）"
                                        rows={3}
                                        className="w-full rounded border border-gray-300 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded"
                                    >
                                        送出訂單
                                    </button>
                                </form>
                            </td>
                        </tr>
                                   
                     </tfoot>
                </table>
        </div>
    );
}