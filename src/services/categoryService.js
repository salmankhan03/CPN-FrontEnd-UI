import requests from "./api";

const CategoryServices = {
    getAllCategory: async (params) => {
    return requests.post(`/category/tree?page=${params?.page}&pageSize=${params?.limit}`);
  },

  getAllBrand: async (params) => {
    return requests.post(`/product-brand/list?page=${params?.page}&pageSize=${params?.limit}`);
  },
};

export default CategoryServices;
