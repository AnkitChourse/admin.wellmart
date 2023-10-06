import axios from "axios";
export const baseURL = `${process.env.REACT_APP_API}`;
export const http2 = `${process.env.REACT_APP_API}/`;
export const adminId = localStorage.getItem("id");

const http = axios.create({
    baseURL: baseURL,
    timeout: 100000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${localStorage.getItem("token")}`,
        // ApiToken: 'U0RvR2x0SEZYa0ljSzgxUkFCUHZpRUpvREFlb0FuTFBPSFA=',
    },
});

// export const http2 = 'https://medzine.svisf.in/'
http.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("token");
        // const signup_token = await AsyncStorage.getItem('@SIGNUP_TOKEN');
        // if(signup_token) config.headers.Authorization = `Bearer ${signup_token}`;
        if (token) config.headers.Authorization = `${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default http;
