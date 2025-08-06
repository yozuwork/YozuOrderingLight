import { useContext } from 'react';
import { CartContext } from '../store';

export default function Cart() {
    const { state , dispatch } = useContext(CartContext);
   
    return (
        <div className='bg-light p-3'>
                <table className="table-auto w-full border-collapse">
                     <tbody>
                          {state.cartList.map((item,index)=>{
                              <tr className='border-b'>
                                 <td className='py-2 px-4 text-center align-middle'>
                                        <a 
                                            href="#"
                                            className="text-red-500 hover:underline"    
                                        
                                        >
                                        X    
                                        </a>
                                 </td>
                                <td className="py-2 px-4 align-middle">
                                    <img src={item.img} alt="商品圖片" className="w-16 h-16 object-cover rounded" />
                                </td>
                              </tr>
                          })}     
                     </tbody>
                     <tfoot>

                     </tfoot>
                </table>
        </div>
    );
}