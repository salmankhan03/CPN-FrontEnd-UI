import requests from "./api";

const ProductServices = {
  getAllProducts: async ({ page, limit,  price }) => {
    let obj = {};
    if(price){
      obj.sort = { price: price === "low" ? "asc" : "desc" };
    }

      // let body ={
      //   // category:searchCategory,
      //   // title:searchTitle,
      //   price:searchPrice,
      // }
      // console.log("OBJ",obj)
    return requests.post(
      `/product/list?page=${page}&pageSize=${limit}`,obj
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
  getWeeklyProducts:  async ({page, limit, category}) => {
    return requests.get(`/product/featured-list?category_id=${category}`)
  },
  getDashboardProductslist:  async () => {
    return requests.get(`/product/dashboard-list`)
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
