import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ButtonComponent from '../ButtonComponents/ButtonComponents';

const Order = ({ orderData }) => {
    console.log(orderData)
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
    };

    const handleBackToTable = () => {
        setSelectedOrder(null);
    };


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
                                was placed on {moment(selectedOrder.created_at).format('MMMM D, YYYY')} and is currently Processing.
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
                                        <td>{selectedOrder?.payment?.is_cod_paymend_received === 0 ? 'Cash On Delevery' : 'Online'}</td>
                                    </tr>
                                    <tr>
                                        <th>Total:</th>
                                        <td>${selectedOrder?.total_amount}</td>
                                    </tr>
                                </tfoot>
                            </table>
                            <div className='mt-4'>
                                <div className='row'>
                                    <div className='col-12 col-md-6 col-lg-6'>
                                        <h3>Billing Address</h3>
                                        <address>
                                            <p className='mb-0 mt-0 pt-1'>{selectedOrder?.billing_address?.first_name}</p>
                                            <p className='mb-0 mt-0 pt-1'>{selectedOrder?.billing_address?.street_address}</p>
                                            <p className='mb-0 mt-0 pt-1'>{selectedOrder?.billing_address?.city}  <span className='ml-2'> {selectedOrder?.billing_address?.zipcode}</span></p>
                                            <p className='mb-0 mt-0 pt-1'>{selectedOrder?.billing_address?.state}, <span className='ml-2'> {selectedOrder?.billing_address?.country}</span></p>
                                            <p className='mb-0 mt-0 pt-1'>{selectedOrder?.billing_address?.contact_no}</p><br />
                                            <p>{selectedOrder?.billing_address?.email} </p>
                                        </address>
                                    </div>
                                    <div className='col-12 col-md-6 col-lg-6'>
                                        <h3>Shipping Address</h3>
                                        <address>
                                            <p className='mb-0 mt-0 pt-1'>{selectedOrder?.shipping_address?.first_name}</p>
                                            <p className='mb-0 mt-0 pt-1'>{selectedOrder?.shipping_address?.street_address}</p>
                                            <p className='mb-0 mt-0 pt-1'>{selectedOrder?.shipping_address?.city}  <span className='ml-2'> {selectedOrder?.billing_address?.zipcode}</span></p>
                                            <p className='mb-0 mt-0 pt-1'>{selectedOrder?.shipping_address?.state}, <span className='ml-2'> {selectedOrder?.billing_address?.country}</span></p>
                                            <p className='mb-0 mt-0 pt-1'>{selectedOrder?.shipping_address?.contact_no}</p><br />

                                        </address>
                                    </div>
                                </div>
                            </div>

                            <div className='text-center mt-5'>
                                {/* <button className="btn secondaryBG text-white text-center" onClick={handleBackToTable}>
                                    Back to Orders
                                </button> */}
                                <ButtonComponent
                                                cssClass={`shopping-btn w-auto `}
                                                onClick={handleBackToTable}
                                                label="Back to Orders"
                                            />
                            </div>
                        </div>
                    ) : (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Order </th>
                                    <th>Date</th>
                                    <th className='orderTableHideStatus'>Status</th>
                                    <th>Total</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderData.map((order) => (
                                    <tr key={order?.id}>
                                        <td>#{order?.id}</td>
                                        <td>{moment(order?.created_at).format('DD/MM/YYYY')}</td>
                                        <td className='orderTableHideStatus'>{order?.status}</td>
                                        <td>${order?.total_amount}</td>
                                        <td>
                                            <ButtonComponent
                                                cssClass={`shopping-btn w-auto `}
                                                onClick={() => handleViewOrder(order)}
                                                label="View"
                                            />
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
