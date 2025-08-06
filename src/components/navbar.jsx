import { useContext } from "react"
import { CartContext } from "../store";
export default function Navbar() {
  const {state ,  dispatch} = useContext(CartContext);  
  // 頁面切換處理函數
  const handlePageChange = (page) => {
    dispatch({ type: 'SET_PAGE', payload: page });
  };
  return (
    <nav className='bg-gray-100 shadow'>
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-700">柚子OrderLight</span>

            {/*  導航選單 */}
            <div className="flex  item-center space-x-4">
                <div className="flex space-x-2">
                    <button
                        onClick={() => handlePageChange('order')}
                        className={`px-4 py-2 rounded transition-colors ${
                            state.currentPage === 'order'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        訂便當
                    </button>
                     <button
                        onClick={() => handlePageChange('summary')}
                        className={`px-4 py-2 rounded transition-colors ${
                            state.currentPage === 'summary'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                     >
                        訂單統計
                    </button>
                </div>

                
            </div>
            <button
                type="submit"
                className="relative border border-gray-800 text-gray-800 px-4 py-2 rounded"
             >
                購物車
                <span
                    className="
                    absolute top-0 right-0
                    translate-x-1/2 -translate-y-1/2
                    bg-red-600 text-white text-xs font-bold
                    px-2 py-0.5 rounded-full
                    "
                >
                    {state.cartList.length}
                </span>
            </button>
        </div>  
    </nav>
  )
}