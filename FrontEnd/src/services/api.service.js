import axios from "axios";
// const commonConfig = {
//     headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//     },
// };

// export default (baseURL) => {
//     return axios.create({
//         baseURL,
//         ...commonConfig,
//     });
// };
export default (baseURL) => {
    const api = axios.create({
        baseURL,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            // Kiểm tra xem token có tồn tại trong cookie không
            // Nếu có, thêm token vào headers
            ...(localStorage.getItem('token') && {
                token: `Bearer ${localStorage.getItem('token')}`,
            }),
        },
    });

    // Intercept request để thêm token vào headers nếu token thay đổi
    api.interceptors.request.use(config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.token = `Bearer ${token}`;
        }
        return config;
    });
    return api;
};
