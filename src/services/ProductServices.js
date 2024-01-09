import requests from "./api";

const ProductServices = {
  getAllProducts: async ({ page, limit, category, title, price }) => {
    const searchCategory = category !== null ? category : "";
    const searchTitle = title !== null ? title : "";
    const searchPrice = price !== null ? price : "";
      let body ={
        category:searchCategory,
        title:searchTitle,
        price:searchPrice,
      }
    return requests.post(
      `/product/list?page=${page}&pageSize=${limit}`,body
    );
  },
  getMaximumPrice: async () => {
    return requests.get(`/product/get-max-price`);
  },

  getProductById: async (id) => {
    console.log("id",id)
    return requests.get(`/product/${id}/data`);
  },
  getfilterWiseProducts:  async (body) => {
    return requests.post("/product/filter", body);
  },

  addProduct: async (body) => {
    return requests.post("/product/save", body);
  },
  addAllProducts: async (body) => {
    return requests.post("/products/all", body);
  },
  updateProduct: async (id, body) => {
    return requests.post("/product/save", body);
  },
  updateManyProducts: async (body) => {
    return requests.patch("products/update/many", body);
  },
  updateStatus: async (id, body) => {
    return requests.put(`/products/status/${id}`, body);
  },

  deleteProduct: async (id,body) => {
    return requests.delete(`/product/${id}/delete`, body);
  },
  deleteManyProducts: async (body) => {
    return requests.post("/product/multiple_delete", body);
  },
};

export default ProductServices;
