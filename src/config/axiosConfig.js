import axios from "axios"
import Toast from 'antd-mobile-rn/lib/toast';

axios.interceptors.request.use(function (config) {
    Toast.loading('loading');
    return config;
});
axios.interceptors.response.use(function (response) {
    Toast.hide();
    return response;
});