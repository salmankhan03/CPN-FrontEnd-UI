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
    customerProfileUpdate: async (body) => {
        console.log(body)
        return requests.post('/user/update',body)
    },
    customerLogout: async () => {
        return requests.get(`/customer/logout`, );
    },
    getStaticTemplates:async (params) =>{
        return requests.get(`/template/list?page=${params?.page}&pageSize=${params?.limit}`, );
    },
    changePassword:async (body) => {
        return requests.post(`/user/update-password`, body);
    },
    getCustomerDetaila:async(id)=>{
        return requests.get(`${id}/get-customer-by-id`)
    }

};

export default AuthServices;
