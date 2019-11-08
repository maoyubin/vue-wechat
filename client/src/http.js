import axios from 'axios'
import router from './router'

// reqest interceptor
axios.interceptors.request.use(config => {
    //console.log('Go through the axios request');
    //console.log('In request localStorage.wxpyqToken=>'+localStorage.mao);
    if(localStorage.mao){
        config.headers.Authorization = localStorage.mao;
    }
    return config;
}, 
error => {
    alert(error.response.data);
    return Promise.reject(error.response.data);
}
);



axios.interceptors.response.use(response => {
    //console.log('Go through the axios response');
    return response;
}, 
error => {
    const { status } = error.response;
    console.log('status=>'+status);
    if(status == 401){
        alert('toekn 过期，请重新登录');
        localStorage.removeItem("mao");
        router.push('/login');
    }else{
        alert(error.response.data);
    }
    
    return Promise.reject(error.response.data);
}
);

export default axios;