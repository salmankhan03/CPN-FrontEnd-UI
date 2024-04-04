import requests from "./api";

const AtrributeServices = {
    getAttributeById: async (id) => {
        return requests.get(`/product-attribute/${id}/get-by-id`);
      },
};

export default AtrributeServices;
