import requests from "./api";

const AuthServices = {
    customerLogin: async (body) => {
        console.log(body)
        return requests.post(`/customer/login`, body);
    },
    customerSignUp: async (body) => {
        console.log(body)
        return requests.post(`/customer/signup`, body);
    },
    customerLogout: async () => {
        return requests.get(`/customer/logout`, );
    },
    getStaticTemplates:async (params) =>{
        return requests.get(`/template/list?page=${params?.page}&pageSize=${params?.limit}`, );
    }


};

export default AuthServices;
