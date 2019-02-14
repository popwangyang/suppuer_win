import axios from 'axios';
//测试地址
// export const baseUrl = "https://test.bjywkd.com";
//正式服地址
export const baseUrl = "http://59.63.188.34:8080";
axios.defaults.retry = 4;
axios.defaults.retryDelay = 6000;

const http = axios.create({
        baseURL: baseUrl,
		timeout: 6000
    });
// http 响应 拦截器
http.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
		var config = err.config;
		// If config does not exist or the retry option is not set, reject
		if(!config || !config.retry) return Promise.reject(err);

		// Set the variable for keeping track of the retry count
		config.__retryCount = config.__retryCount || 0;

		// Check if we've maxed out the total number of retries
		if(config.__retryCount >= config.retry) {
			// Reject with the error
			return Promise.reject(err);
		}

		// Increase the retry count
		config.__retryCount += 1;

		// Create new promise to handle exponential backoff
		var backoff = new Promise(function(resolve) {
			setTimeout(function() {
				resolve();
			}, config.retryDelay || 1);
		});

		// Return the promise in which recalls axios to retry the request
		return backoff.then(function() {
			return http(config);
		});
	});
// axios.defaults.timeout = 10;
http.interceptors.request.use(  
     config => {
         let token;
         if(localStorage.getItem('token')!=undefined){
             token=localStorage.getItem('token');
         }else{
             token=null;
         }
        if (token!=null) {
            // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization ='Bearer ' + token;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    })

export const login = (url,params) => { return http({
    headers: {
        'Content-Type':'application/json;'
    },
    url:url,
    method:"POST",
    data: params
    }).then(res => res);
};
//post请求
export const post = (url,params) => { return http({
    headers: {
        'Content-Type':'application/json;'
    },
    url:url,
    method:"POST",
    data:params
}).then(res => res)};
//get请求
export const get = (url,params) => { return http({
    headers: {
        'Content-Type':'application/json;',
    },
    url:url,
    method:"GET",
    params:params
}).then(res => res)};
//patch请求
export const patch = (url,params) => { return http({
    headers: {
        'Content-Type':'application/json;'
    },
    url:url,
    method:"PATCH",
    data:JSON.stringify(params)
}).then(res => res)};
// //patch请求
// export const ktvpatch = (url,params) => { return http({
//     headers: {
//         'Content-Type':'application/json;'
//     },
//     url:url,
//     method:"PATCH",
//     data:JSON.stringify(params)
// }).then(res => res.data)};
// //VIEW请求
// export const VIEW = (url,params) => { return http({
//     headers: {
//         'Content-Type':'application/json;'
//     },
//     url:url,
//     method:"VIEW",
//     data:JSON.stringify([params])
// }).then(res => res.data)};
//DELETE请求
export const DELETE = (url,params) => { return http({
    headers: {
        'Content-Type':'application/json;'
    },
    url:url,
    method:"DELETE",
    data:JSON.stringify([params])
}).then(res => res)};
//put请求
export const put = (url,params) => { return http({
    headers: {
        'Content-Type':'application/json;'
    },
    url:url,
    method:"PUT",
    data:params
}).then(res => res)};
 
