import requests from "./api";

const OrderServices = {
  generateOrders: async (body) => {
    return requests.post("/cart/place-order", body);
  },
  getUserOrderList:async (id) => {
    return requests.get(`/user/${id}/orders-list`);
  },
};

export default OrderServices;
