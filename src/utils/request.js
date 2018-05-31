import axios from "axios";

const request = ({ url, method, data = {}, params = {} }) => {
    const option = {
        method: method.toLocaleUpperCase(),
        url,
        data,
        params,
    };
    return new Promise((resolve, reject) => {
        axios(option)
            .then(response => {
                return resolve({
                    ...response.data,
                });
            })
            .catch((err) => {
                if (err.response.status === 403) {
                    const from = `${window.location.hash.replace(window.location.origin, "")}`;
                    window.location.href = `${window.location.origin}/login?from=${from}`;
                } else {
                    return reject(Error('服务器错误，请联系管理员'));
                }
            });
    });
};

request.get = (url, data) => request({ url, method: 'GET', params: data });
request.post = (url, data) => request({ url, method: 'POST', data });
request.put = (url, data) => request({ url, method: 'PUT', data });
request.delete = (url, data) => request({ url, method: 'DELETE', data });
request.patch = (url, data) => request({ url, method: 'PATCH', data });

export default request;