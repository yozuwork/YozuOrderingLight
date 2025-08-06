import { useReducer } from 'react'
import { CartContext, reducer , initialState } from './store'
import { OrderPage } from './pages/OrderPage'
import { SummaryPage } from './pages/SummaryPage'
import Navbar from './components/navbar'
import './App.css'

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = { state, dispatch }; 
  // 根據當前頁面狀態渲染對應組件
  const renderCurrentPage = () => {
    switch (state.currentPage) {
      case 'order':
        return <OrderPage />;
      case 'summary':
        return <SummaryPage />;
      default:
        return <OrderPage />;
    }
  };
  return (
    <>
       <CartContext.Provider  value={contextValue}>
          <Navbar/>  
          {renderCurrentPage()}
       </CartContext.Provider>
    </>
  )
}

export default App
