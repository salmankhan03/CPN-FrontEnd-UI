import requests from "./api";

const BannersServices = {
  getSlogan: async () => {
    return requests.get(`/top-header-slogan/list?page=1&pageSize=20`);
  },
    getSliders: async () => {
        return requests.get(`/slider-image/list`);
      },
      
    getBanners: async () => {
        return requests.get(`/banner/list`);
      },
};

export default BannersServices;
