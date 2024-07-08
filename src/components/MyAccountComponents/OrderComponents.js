import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import moment from 'moment';


const Order = ({ orderData }) => {
    console.log(orderData)
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
    };

    const handleBackToTable = () => {
        setSelectedOrder(null);
    };
    let orderDetails = {
        productName: 'Anti-virus Carbon Mask × 1',
        productPrice: 520,
        subTotal: 520,
        shippingCharge: 30,
        paymentMethod: 'Cash on delivery',
        GrandTotal: 550

    }


    return (
        <div>
            {orderData?.length === 0 ? (
                <div className='d-flex mt-1 p-4 align-items-center secondaryBG' style={{ borderRadius: 10 }}>
                    <FontAwesomeIcon icon={faExclamationCircle} size="lg" className="text-white" />
                    <p className="mb-0 text-white ml-3"> No order has been made yet.</p>
                    <b className='ml-auto'><Link className='text-white' to="#">Browse products</Link></b>
                </div>
            ) : (
                <div>
                    {selectedOrder ? (
                        <div className='text-left'>
                            <p className='fs-6'>
                                Order #<span className='text-blue'>{selectedOrder?.id} </span>
                                was placed on July 3, 2024 and is currently Processing.
                            </p>
                            <h2 className='mt-5 ml-0'>Order details</h2>
                          
                            <table className="table text-center mt-5">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {selectedOrder?.items.map((item) => (
                                    <tr>
                                        <td>{item?.product?.name}</td>
                                        <td>${item?.product?.sell_price}</td>
                                    </tr>
                                     ))}
                                </tbody>
                                <tfoot>                        
                                    <tr>
                                        <th>Shipping:</th>
                                        <td>${selectedOrder?.shipping_price}</td>
                                    </tr>
                                    {/* <tr>
                                        <th>Subtotal:</th>
                                        <td>${orderDetails.subTotal}</td>
                                    </tr> */}
                                    <tr>
                                        <th>Payment method:</th>
                                        <td>{selectedOrder?.payment?.is_cod_paymend_received === 0 ? 'Cash On Delevery':'Online'}</td>
                                    </tr>
                                    <tr>
                                        <th>Total:</th>
                                        <td>${selectedOrder?.total_amount}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        
                            <div className='text-center mt-5'>
                            <button className="btn secondaryBG text-white text-center" onClick={handleBackToTable}>
                                Back to Orders
                            </button> 
                            </div>
                        </div>
                    ) : (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Order </th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Total</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderData.map((order) => (
                                    <tr key={order?.id}>
                                        <td>#{order?.id}</td>
                                        <td>{moment(order?.created_at).format('DD/MM/YYYY')}</td>
                                        <td>{order?.status}</td>
                                        <td>${order?.total_amount}</td>
                                        <td>
                                            <button className="btn secondaryBG text-white" onClick={() => handleViewOrder(order)}>
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
}
export default Order;
