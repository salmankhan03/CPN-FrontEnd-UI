import requests from "./api";

const CategoryServices = {
    getAllCategory: async (params) => {
        console.log(params)
    return requests.post(`/category/tree?page=${params?.page}&pageSize=${params?.limit}`);
  },
};

export default CategoryServices;
