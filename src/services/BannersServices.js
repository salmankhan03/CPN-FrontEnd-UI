import requests from "./api";

const BannersServices = {
    getSliders: async () => {
        return requests.get(`/slider-image/list`);
      },
      
    getBanners: async () => {
        return requests.get(`/banner/list`);
      },
};

export default BannersServices;
