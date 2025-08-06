
import  Products  from "../components/Products"
import  Cart from "../components/Cart"
export const OrderPage = () => {
  return (
     <div className='max-w-screen-xl mx-auto mt-4 px-4'>
            <div className='grid md:grid-cols-12'>
                <div className='md:col-span-9'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
                        <Products />
                    </div>
                      
                </div>
                <div className='md:col-span-3 bg-gray-200'>
                          <Cart />
                </div>  

            </div>
    </div>
  )
}