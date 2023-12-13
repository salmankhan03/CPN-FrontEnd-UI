import requests from "./api";

const OrderServices = {
  generateOrders: async (body) => {
    return requests.post("/cart/place-order", body);
  },
};

export default OrderServices;
